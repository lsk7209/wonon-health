#!/usr/bin/env node
'use strict';
/* Merge only explicitly authored row blocks.  It never borrows generic fields from manifest.json. */
const fs = require('fs');
const path = require('path');
const root = __dirname;
const blockDir = path.join(root, 'contracts');
const legacy = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const legacyById = new Map(legacy.articles.map(row => [row.id, row]));
const out = process.argv.includes('--out') ? path.resolve(process.argv[process.argv.indexOf('--out') + 1]) : null;
const files = fs.readdirSync(blockDir).filter(f => /^d\d{3}-d\d{3}\.json$/.test(f)).sort();
const required = ['id','title','slug','cluster','reader_job','situation','decision_moment','answer_claim','artifact','architecture'];
const requiredPhaseB = ['title','slug','cluster','subtitle','long_tail','main_keyword','extended_keywords','search_intent','unique_angle','reader_job','primary_reader_situation','decision_moment','answer_claim','evidence_plan','non_overlap_claim','not_answered_here','structure_reason','internal_link_targets','serp_gap','information_gain','source_interpretation','article_specific_detail','section_sequence_array','sections','faq_plan','visual_plan','evidence_targets','article_research_question_seed','reader_outcome_seed','ymyl_boundaries'];
const fail = [];
const text = v => typeof v === 'string' ? v.trim() : '';
const list = v => Array.isArray(v) ? v.filter(Boolean) : v == null ? [] : [v];
const architectureOf = row => {
  const raw = Array.isArray(row.architecture) ? row.architecture : Array.isArray(row.sections) ? row.sections : typeof row.architecture === 'string' ? row.architecture.split(/\s*\|\s*/) : [];
  return raw.map((item, index) => typeof item === 'string' ? { order: index + 1, heading: item, purpose: item } : { order: Number(item?.order) || index + 1, heading: text(item?.heading || item?.title || item?.section), purpose: text(item?.purpose || item?.role || item?.heading || item?.title || item?.section) }).filter(x => x.heading);
};
const routeSlugs = value => text(value).split(/\s*\|\s*/).map(target => target.match(/^\/article\/([a-z0-9-]+)$/i)?.[1]).filter(Boolean);
const genericRouteSlugs = new Set(['health-checkup-questions', 'medication-reconciliation-sheet', 'menopause-when-to-see-a-doctor']);
const linkPlanOf = (row, nearest) => {
  const explicit = routeSlugs(row.internal_link_targets || row.link_plan);
  const explicitlyAuthored = explicit.length === 3 && new Set(explicit).size === 3 && !explicit.every(slug => genericRouteSlugs.has(slug));
  if (explicitlyAuthored) return explicit.map(slug => `/article/${slug}`).join(' | ');
  const historical = nearest.map(item => text(item?.slug)).filter(slug => /^[a-z0-9-]+$/i.test(slug));
  if (new Set(historical).size >= 3) return [...new Set(historical)].slice(0, 3).map(slug => `/article/${slug}`).join(' | ');
  return text(row.internal_link_targets || row.link_plan);
};
function sourceTargets(row) {
  const items = list(row.evidence_targets).length ? row.evidence_targets : list(row.sources);
  const sections = architectureOf(row);
  return items.map((s, i) => ({
    organization: text(Array.isArray(s) ? s[2] : s?.organization || s?.org || s?.publisher), url: text(Array.isArray(s) ? s[0] : s?.url),
    claim_to_verify: text(Array.isArray(s) ? s[1] : s?.verification_question || s?.claim_to_verify || s?.question),
    planned_section: text(Array.isArray(s) ? sections[i]?.heading : s?.planned_section || s?.section || sections[i]?.heading || '')
  }));
}
function normalize(row) {
  const identity = legacyById.get(row.id) || {};
  const identityMatches = identity.slug === row.slug;
  const faq = list(row.faq).length ? list(row.faq) : list(row.faq_plan).length ? list(row.faq_plan) : list(row.faq_cta?.faq);
  const cta = text(row.cta || row.faq_cta?.cta || (typeof row.faq_cta === 'string' ? row.faq_cta : ''));
  const ymyl = list(row.ymyl_boundaries).length ? list(row.ymyl_boundaries) : list(row.ymyl_boundary).length ? list(row.ymyl_boundary) : list(row.ymyl);
  const sections = architectureOf(row); const architecture = sections.map(s => s.heading);
  const nearestRaw = row.nearest_existing ?? row.historical_comparisons ?? row.nearest_existing_articles ?? row.nearest;
  const nearest = Array.isArray(nearestRaw) ? nearestRaw : typeof nearestRaw === 'string' ? nearestRaw.split(/\s*,\s*/).filter(Boolean).map(slug => ({ slug })) : [];
  const r = {
    ...row,
    // Identity-only fallback: title and cluster are not editorial synthesis, and the slug match above prevents accidental overlay.
    title: text(row.title) || (identityMatches ? text(identity.title) : ''),
    cluster: text(row.cluster) || (identityMatches ? text(identity.cluster) : ''),
    architecture,
    situation: text(row.situation || row.primary_reader_situation),
    primary_reader_situation: text(row.situation || row.primary_reader_situation),
    non_overlap_claim: text(row.non_overlap_boundary || row.non_overlap || row.non_overlap_claim),
    section_sequence_array: architecture,
    section_sequence: architecture.join(' | '),
    sections,
    artifact: text(row.artifact || row.visual_plan),
    faq_plan: faq, ending_cta_direction: cta || text(row.ending_cta_direction), cta: cta || text(row.ending_cta_direction),
    ymyl_boundaries: ymyl,
    evidence_targets: sourceTargets(row),
    visual_plan: text(row.artifact || row.visual_plan),
    structure_type_candidate: text(row.structure_type_candidate || row.artifact || row.visual_plan),
    structure_reason: text(row.architecture_reason || row.structure_reason),
    internal_link_targets: linkPlanOf(row, nearest),
    nearest_existing: nearest,
  };
  return r;
}
const rows = [];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(blockDir, file), 'utf8'));
  const sourceRows = Array.isArray(data) ? data : (data.contracts || data.articles || data.rows);
  if (!Array.isArray(sourceRows)) fail.push(`${file}: expected contracts/articles/rows array`);
  else rows.push(...sourceRows.map(normalize));
}
for (const r of rows) {
  for (const key of required) if (!text(r[key]) && !list(r[key]).length) fail.push(`${r.id || 'unknown'}: missing authored ${key}`);
  for (const key of requiredPhaseB) if (!text(r[key]) && !list(r[key]).length) fail.push(`${r.id || 'unknown'}: cannot synthesize required Phase-B field ${key}`);
  if (r.architecture.length !== 5) fail.push(`${r.id}: architecture must be exactly five authored sections`);
  if (r.evidence_targets.length !== 3) fail.push(`${r.id}: requires exactly three authored evidence targets`);
  if (!r.nearest_existing.length) fail.push(`${r.id}: requires row-owned historical 89 comparison fields`);
}
if (new Set(rows.map(r => r.id)).size !== rows.length) fail.push('duplicate row id across contract blocks');
if (rows.length !== 50) fail.push(`expected 50 rows, found ${rows.length}`);
const result = { site: 'wonon', batch: 'batch-110', phase: 'B-contracts-merged-from-row-blocks', articles: rows };
if (out) fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n', 'utf8');
else process.stdout.write(JSON.stringify(result, null, 2) + '\n');
if (fail.length) { console.error('MERGE BLOCKED\n' + fail.join('\n')); process.exit(1); }
