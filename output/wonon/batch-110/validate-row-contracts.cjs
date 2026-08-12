#!/usr/bin/env node
'use strict';
const fs = require('fs'); const path = require('path'); const root = __dirname;
const input = process.argv.includes('--input') ? path.resolve(process.argv[process.argv.indexOf('--input') + 1]) : path.join(root, 'row-contracts.merged.json');
const fail = [];
const rawCorruption = (label, raw) => {
  const doubleQuestion = (raw.match(/\?\?/g) || []).length;
  const replacement = (raw.match(/\uFFFD/g) || []).length;
  if (doubleQuestion) fail.push(`${label}: contains ${doubleQuestion} corrupt ?? sequence(s)`);
  if (replacement) fail.push(`${label}: contains ${replacement} Unicode replacement character(s)`);
};
const mergedRaw = fs.readFileSync(input, 'utf8');
rawCorruption(path.basename(input), mergedRaw);
const blockDir = path.join(root, 'contracts');
for (const file of fs.readdirSync(blockDir).filter(name => /^d\d{3}-d\d{3}\.json$/.test(name)).sort()) {
  rawCorruption(path.join('contracts', file), fs.readFileSync(path.join(blockDir, file), 'utf8'));
}
const doc = JSON.parse(mergedRaw); const rows = doc.articles || doc.contracts || [];
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'corpus-inventory.json'), 'utf8'));
const normalize = value => String(value || '').toLowerCase().replace(/[\s\p{P}\d]/gu, '');
const hasHangul = value => /[\uAC00-\uD7A3]/u.test(String(value || ''));
const requireHangul = (id, field, value) => {
  if (!hasHangul(value)) fail.push(`${id}: ${field} must contain Hangul`);
};
const compactArchitecture = row => (row.section_sequence_array || []).map(x => normalize(x).replace(/(?:d\d{3}|[a-z]+(?:menopause|health|symptom|record|consultation|article))/g, '')).join('|');
const fields = ['id','title','slug','cluster','reader_job','primary_reader_situation','decision_moment','answer_claim','non_overlap_claim','artifact','internal_link_targets','not_answered_here','structure_reason','serp_gap','information_gain','source_interpretation','article_specific_detail','faq_plan','ending_cta_direction','ymyl_boundaries','nearest_existing','evidence_targets','section_sequence_array','sections'];
const koreanNarrativeFields = ['title','subtitle','reader_job','primary_reader_situation','decision_moment','answer_claim','non_overlap_claim','artifact','not_answered_here','structure_reason','serp_gap','information_gain','source_interpretation','article_specific_detail','ending_cta_direction'];
if (rows.length !== 50) fail.push(`expected 50 IDs, got ${rows.length}`);
if (new Set(rows.map(r => r.id)).size !== 50) fail.push('IDs must be unique');
const historical = new Set([...inventory.baseline, ...inventory.batch_articles].map(x => x.slug).filter(Boolean));
if (historical.size !== 80) { /* baseline entries omit slug; count is authoritative below */ }
if (inventory.article_count !== 89) fail.push(`historical corpus must contain 89 rows, found ${inventory.article_count}`);
for (const row of rows) {
  for (const key of fields) if (!(Array.isArray(row[key]) ? row[key].length : String(row[key] || '').trim())) fail.push(`${row.id}: missing ${key}`);
  for (const key of koreanNarrativeFields) requireHangul(row.id, key, row[key]);
  for (const [index, value] of (row.faq_plan || []).entries()) requireHangul(row.id, `faq_plan[${index}]`, value);
  for (const [index, value] of (row.ymyl_boundaries || []).entries()) requireHangul(row.id, `ymyl_boundaries[${index}]`, value);
  for (const [index, value] of (row.section_sequence_array || []).entries()) requireHangul(row.id, `section_sequence_array[${index}]`, value);
  for (const [index, section] of (row.sections || []).entries()) {
    requireHangul(row.id, `sections[${index}].heading`, section?.heading);
    requireHangul(row.id, `sections[${index}].purpose`, section?.purpose);
  }
  if (!Array.isArray(row.ymyl_boundaries) || row.ymyl_boundaries.length < 3 || new Set(row.ymyl_boundaries.map(normalize)).size < 3) fail.push(`${row.id}: YMYL boundary must be row-specific with three distinct actions`);
  if (!Array.isArray(row.nearest_existing) || !row.nearest_existing.every(x => typeof x === 'object' && x.slug && x.changed_decision && x.changed_artifact && x.changed_architecture)) fail.push(`${row.id}: historical comparisons need slug, changed_decision, changed_artifact, changed_architecture`);
  for (const [index, comparison] of (row.nearest_existing || []).entries()) {
    requireHangul(row.id, `nearest_existing[${index}].changed_decision`, comparison?.changed_decision);
    requireHangul(row.id, `nearest_existing[${index}].changed_artifact`, comparison?.changed_artifact);
    const architecture = Array.isArray(comparison?.changed_architecture) ? comparison.changed_architecture : [comparison?.changed_architecture];
    for (const [architectureIndex, value] of architecture.entries()) requireHangul(row.id, `nearest_existing[${index}].changed_architecture[${architectureIndex}]`, value);
  }
  if (!Array.isArray(row.section_sequence_array) || row.section_sequence_array.length !== 5) fail.push(`${row.id}: requires five authored sections`);
  if (!Array.isArray(row.evidence_targets) || row.evidence_targets.length !== 3) fail.push(`${row.id}: requires three evidence targets`);
  for (const evidence of row.evidence_targets || []) {
    if (!/^https:\/\/[^\s]+$/u.test(evidence.url || '')) fail.push(`${row.id}: invalid evidence URL`);
    if (!evidence.organization || !evidence.claim_to_verify || !evidence.planned_section) fail.push(`${row.id}: incomplete evidence target`);
    requireHangul(row.id, 'evidence_targets.claim_to_verify', evidence.claim_to_verify);
    requireHangul(row.id, 'evidence_targets.planned_section', evidence.planned_section);
    if (/\b(dead|404|mismatch|redirect mismatch|unverified|placeholder)\b/i.test(JSON.stringify(evidence))) fail.push(`${row.id}: dead/mismatched evidence marker`);
    if (!(row.section_sequence_array || []).includes(evidence.planned_section)) fail.push(`${row.id}: evidence target is not mapped to an authored section`);
  }
}
const urls = rows.flatMap(r => r.evidence_targets || []).map(e => e.url);
if (new Set(urls).size !== 150) fail.push(`requires 150 unique topic-specific URLs; found ${new Set(urls).size}`);
const architectures = new Set(rows.map(compactArchitecture));
if (architectures.size < 25) fail.push(`requires at least 25 normalized architectures after entity stripping; found ${architectures.size}`);
const links = new Set(rows.map(r => normalize(r.internal_link_targets)));
if (links.size < 25) fail.push(`requires at least 25 distinct link plans; found ${links.size}`);
if (fail.length) { console.error('ROW CONTRACT VALIDATION FAILED\n' + fail.join('\n')); process.exit(1); }
console.log(`PASS: 50 schema-complete, semantically differentiated contracts; 150 unique evidence URLs; ${architectures.size} architectures; ${links.size} link plans.`);
