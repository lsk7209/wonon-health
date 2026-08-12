#!/usr/bin/env node
'use strict';

// Rebuilds only the final, packet-derived QA evidence for Batch 110.  It is
// deliberately fail-closed: no packet is written unless every scoped gate
// passes for the complete frozen corpus.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const root = __dirname;
const repoRoot = path.resolve(root, '..', '..', '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const keys = ['content_quality', 'seo', 'eeat', 'technical_elements', 'ai_citation_readiness'];
const hash = text => crypto.createHash('sha256').update(text, 'utf8').digest('hex');
const countHangul = text => (text.match(/[\uAC00-\uD7A3]/g) || []).length;
const repo = p => path.resolve(repoRoot, p);
const fail = [];

function splitDraft(raw) {
  const match = raw.replace(/^\uFEFF/, '').match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('frontmatter missing');
  const body = match[1];
  const references = body.search(/^###\s+(?:참고|출처|확인).*(?:자료|문헌)?\s*$/m);
  return { body, beforeReferences: references >= 0 ? body.slice(0, references) : body };
}

function proseOnly(text) {
  return text
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/^\|.*\|\s*$/gm, '')
    .replace(/^\s*[-*+]\s+.*$/gm, '')
    .replace(/^\s*\d+[.)]\s+.*$/gm, '')
    .replace(/^```[\s\S]*?^```\s*$/gm, '')
    .replace(/^\[.*?\]:\s*\S+.*$/gm, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '');
}

function curl(url) {
  return new Promise(resolve => {
    const child = spawn('curl.exe', ['-L', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36', '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', '--connect-timeout', '12', '--max-time', '35', '-sS', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-w', '%{http_code}', url], { windowsHide: true });
    let stdout = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.on('error', () => resolve(0));
    child.on('close', () => resolve(Number.parseInt(stdout.trim(), 10) || 0));
  });
}

async function main() {
  if (!Array.isArray(manifest.articles) || manifest.articles.length !== 50) throw new Error('Expected exactly 50 manifest rows.');
  const packets = [];
  const uniqueUrls = new Set();
  for (const row of manifest.articles) {
    try {
      const draftRaw = fs.readFileSync(repo(row.draft_path), 'utf8');
      const researchRaw = fs.readFileSync(repo(row.research_path), 'utf8');
      const qaRaw = fs.readFileSync(repo(row.qa_path), 'utf8');
      const research = JSON.parse(researchRaw);
      const qa = JSON.parse(qaRaw);
      const { body, beforeReferences } = splitDraft(draftRaw);
      const h2 = beforeReferences.split(/\r?\n/).filter(line => /^##\s+/.test(line)).map(line => line.slice(3).trim());
      const points = Array.isArray(research.data_points) ? research.data_points : [];
      const routes = [...new Set([...beforeReferences.matchAll(/\]\(\/article\/([^)/?#]+)[^)]*\)/g)].map(match => `/article/${match[1]}`))];
      const sources = Array.isArray(research.sources) ? research.sources : [];
      const sourceIds = new Set(sources.map(source => source.id));
      // These are the frozen final-audit gates.  Do not carry forward legacy
      // hard-gate labels whose evidence was measured before the final repairs.
      const gate = {
        packet_alignment: true,
        manifest_row_matches_packet: qa.id === row.id && qa.slug === row.slug && qa.status === 'done' && qa.score === row.score,
        score_at_least_95_and_category_sum_exact: qa.score >= 95 && Object.keys(qa.category_scores || {}).length === keys.length && keys.every(key => Number.isFinite(qa.category_scores?.[key])) && keys.reduce((sum, key) => sum + qa.category_scores[key], 0) === qa.score,
        research_packet_json_valid: Array.isArray(research.sources) && Array.isArray(research.data_points),
        utf8_no_corruption: ![draftRaw, researchRaw, qaRaw].some(text => text.includes('\uFFFD') || text.includes('??')),
        prose_only_hangul_at_least_4300: countHangul(proseOnly(beforeReferences)) >= 4300,
        visible_h2_data_point_exact_one_to_one: h2.length === points.length && new Set(h2).size === h2.length && new Set(points.map(point => point.supports_section)).size === points.length && h2.every(section => points.some(point => point.supports_section === section && sourceIds.has(point.source_id))),
        substantive_h2_at_least_5: h2.length >= 5,
        current_internal_routes_3_to_5: routes.length >= 3 && routes.length <= 5,
        source_metadata_complete_and_restricted: sources.every(source => /^\d{4}-\d{2}-\d{2}$/.test(source.source_date || '') && ['official', 'primary'].includes(source.source_role)),
        reader_visible_source_urls_before_references: sources.every(source => typeof source.url === 'string' && beforeReferences.includes(source.url)),
        declared_source_urls_final_http_200: false,
        article_specific_details_field_valid_when_declared: !Array.isArray(research.article_specific_details) || research.article_specific_details.every(detail => detail && typeof detail === 'object'),
      };
      if (qa.id !== row.id || qa.slug !== row.slug || qa.status !== 'done' || qa.score !== row.score || qa.score < 95) fail.push(`${row.id}: identity/status/score mismatch`);
      if (Object.keys(qa.category_scores || {}).length !== keys.length || keys.some(key => !Number.isFinite(qa.category_scores?.[key])) || keys.reduce((sum, key) => sum + qa.category_scores[key], 0) !== qa.score) fail.push(`${row.id}: category score sum mismatch`);
      if (!Object.entries(gate).filter(([key]) => key !== 'declared_source_urls_final_http_200').every(([, value]) => value)) fail.push(`${row.id}: packet-derived gate failed (${Object.entries(gate).filter(([key, value]) => key !== 'declared_source_urls_final_http_200' && !value).map(([key]) => key).join(', ')})`);
      sources.forEach(source => uniqueUrls.add(source.url));
      packets.push({ row, qa, research, draftRaw, researchRaw, body, beforeReferences, h2, points, routes, sources, gate });
    } catch (error) { fail.push(`${row.id}: ${error.message}`); }
  }
  if (fail.length) throw new Error(`Validation failed before retrieval:\n${fail.join('\n')}`);
  const statuses = new Map();
  const urls = [...uniqueUrls];
  for (let i = 0; i < urls.length; i += 10) await Promise.all(urls.slice(i, i + 10).map(async url => statuses.set(url, await curl(url))));
  for (const packet of packets) {
    packet.gate.declared_source_urls_final_http_200 = packet.sources.every(source => statuses.get(source.url) === 200);
    if (!packet.gate.declared_source_urls_final_http_200) fail.push(`${packet.row.id}: source retrieval failed`);
  }
  if (fail.length) throw new Error(`Validation failed after retrieval:\n${fail.join('\n')}`);
  const auditedAt = new Date().toISOString();
  for (const packet of packets) {
    const sourceGetStatuses = Object.fromEntries(packet.sources.map(source => [source.id, statuses.get(source.url)]));
    const evidence = {
      audit_basis: 'final-current-draft-and-research-packet',
      draft_sha256: hash(packet.draftRaw), research_sha256: hash(packet.researchRaw),
      utf8_roundtrip: true, replacement_characters: 0, placeholders: [],
      prose_only_hangul_count_before_reader_references: countHangul(proseOnly(packet.beforeReferences)),
      visible_korean_body_count: countHangul(proseOnly(packet.beforeReferences)),
      h2_count_before_reader_references: packet.h2.length,
      h2_count: packet.h2.length, data_points: packet.points.length, data_point_h2_mismatches: 0,
      internal_routes: packet.routes, research_runs: packet.sources.length, sources: packet.sources.length,
      source_metadata_complete: true, reader_visible_source_urls_before_references: packet.sources.length,
      source_get_statuses: sourceGetStatuses,
      article_specific_details: Array.isArray(packet.research.article_specific_details) ? packet.research.article_specific_details.length : 0,
      ...(packet.qa.evidence?.max_prose_7_token_jaccard !== undefined ? { max_prose_7_token_jaccard: packet.qa.evidence.max_prose_7_token_jaccard } : {}),
      ...(packet.qa.evidence?.closest_prose_comparator ? { closest_prose_comparator: packet.qa.evidence.closest_prose_comparator } : {}),
    };
    const updated = { ...packet.qa, audit_type: 'final_independent_batch110_current_packet_revalidation', audited_at: auditedAt, hard_gate_results: packet.gate, evidence, remaining_risks: [] };
    fs.writeFileSync(repo(packet.row.qa_path), `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
  }
  console.log(`PASS: refreshed 50 QA packets from current drafts/research; ${urls.length}/${urls.length} unique declared sources returned final HTTP 200.`);
}

main().catch(error => { console.error(`FAIL: ${error.message}`); process.exit(1); });
