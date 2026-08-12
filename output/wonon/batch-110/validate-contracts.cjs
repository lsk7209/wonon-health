#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = __dirname;
const repoRoot = path.resolve(root, '..', '..', '..');
const readJson = target => JSON.parse(fs.readFileSync(target, 'utf8'));
const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const requiredCategoryKeys = ['content_quality', 'seo', 'eeat', 'technical_elements', 'ai_citation_readiness'];
const relative = target => path.relative(repoRoot, target).replaceAll(path.sep, '/');
const resolveRepoPath = value => path.resolve(repoRoot, value);
const failures = [];

const manifest = readJson(path.join(root, 'manifest.json'));
const contractsFile = readJson(path.join(root, 'contracts.json'));
const source = readJson(path.join(root, 'row-contracts.merged.json'));
const rows = manifest.articles;
const sourceById = new Map(source.articles.map(article => [article.id, article]));

if (manifest.status !== 'qa_promoted' || manifest.phase !== 'B-QA-promoted-contract-map') failures.push('Manifest is not in the QA-promoted state.');
if (manifest.target_count !== 50 || manifest.generated_count !== 50 || !Array.isArray(rows) || rows.length !== 50) failures.push('Manifest must contain exactly 50 promoted contracts.');
if (contractsFile.batch !== manifest.batch || contractsFile.status !== manifest.status || !sameJson(contractsFile.contracts, rows)) failures.push('contracts.json does not exactly mirror the promoted manifest contracts.');
if (!Array.isArray(source.articles) || source.articles.length !== 50) failures.push('Merged row-owned contract source must contain exactly 50 rows.');

const qaPaths = new Set();
for (const row of rows) {
  const sourceRow = sourceById.get(row.id);
  if (!sourceRow) {
    failures.push(`${row.id}: not found in the merged row-owned source.`);
    continue;
  }
  for (const [key, value] of Object.entries(sourceRow)) {
    if (['slug', 'status', 'score'].includes(key)) continue;
    if (!sameJson(row[key], value)) failures.push(`${row.id}: contract field ${key} changed during promotion.`);
  }
  if (row.contract_slug !== sourceRow.slug) failures.push(`${row.id}: row-owned contract slug was not retained.`);
  if (row.status !== 'done' || !Number.isInteger(row.score) || row.score < 95) failures.push(`${row.id}: promoted status/score is invalid.`);
  if (typeof row.qa_path !== 'string' || !row.qa_path.startsWith('output/wonon/batch-110/qa/') || qaPaths.has(row.qa_path)) {
    failures.push(`${row.id}: QA path is missing, invalid, or duplicated.`);
    continue;
  }
  qaPaths.add(row.qa_path);
  const qaPath = resolveRepoPath(row.qa_path);
  const expectedDraft = `output/wonon/batch-110/drafts/${row.id}-${row.slug}.mdx`;
  const expectedResearch = `output/wonon/batch-110/research/${row.id}-${row.slug}.json`;
  if (row.draft_path !== expectedDraft || row.research_path !== expectedResearch || !fs.existsSync(resolveRepoPath(expectedDraft)) || !fs.existsSync(resolveRepoPath(expectedResearch))) failures.push(`${row.id}: draft/research path correlation failed.`);
  if (!fs.existsSync(qaPath)) {
    failures.push(`${row.id}: QA packet path does not exist.`);
    continue;
  }
  let qa;
  try { qa = readJson(qaPath); } catch { failures.push(`${row.id}: QA packet is not valid JSON.`); continue; }
  const categoryKeys = Object.keys(qa.category_scores || {}).sort();
  const categorySum = requiredCategoryKeys.reduce((sum, key) => sum + qa.category_scores?.[key], 0);
  if (qa.id !== row.id || qa.slug !== row.slug) failures.push(`${row.id}: QA id/slug does not correlate to the promoted contract.`);
  if (qa.status !== 'done' || qa.score !== row.score || qa.score < 95) failures.push(`${row.id}: QA status/score does not correlate to the promotion.`);
  if (!sameJson(categoryKeys, [...requiredCategoryKeys].sort()) || !requiredCategoryKeys.every(key => Number.isFinite(qa.category_scores?.[key]) && qa.category_scores[key] >= 0) || categorySum !== qa.score) failures.push(`${row.id}: QA category sum is not exact.`);
  const gates = qa.hard_gate_results;
  if (!gates || !Object.keys(gates).length || !Object.values(gates).every(value => typeof value === 'boolean' && value)) failures.push(`${row.id}: strict hard-gate validation failed.`);
  if (qa.draft_path && qa.draft_path !== expectedDraft) failures.push(`${row.id}: QA draft path does not correlate.`);
  if (qa.research_path && qa.research_path !== expectedResearch) failures.push(`${row.id}: QA research path does not correlate.`);
  if (row.qa_evidence?.category_score_sum !== qa.score || row.qa_evidence?.hard_gate_count !== Object.keys(gates || {}).length) failures.push(`${row.id}: promotion QA evidence is stale or incomplete.`);
}

const actualQaPaths = fs.readdirSync(path.join(root, 'qa')).filter(file => file.endsWith('.json')).map(file => relative(path.join(root, 'qa', file)));
if (qaPaths.size !== 50 || actualQaPaths.length !== 50 || actualQaPaths.some(qaPath => !qaPaths.has(qaPath))) failures.push('The 50 promoted rows do not correlate one-to-one with actual QA JSON paths.');
const csvRows = fs.readFileSync(path.join(root, 'title-contract-map.csv'), 'utf8').trim().split(/\r?\n/);
if (csvRows.length !== 51) failures.push(`CSV needs 50 data rows, found ${csvRows.length - 1}.`);

if (failures.length) {
  console.error(`FAIL\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('PASS: 50/50 contracts promoted from row-owned source; each has one matching done QA packet, score >=95, exact category sum, strict boolean hard gates, and correlated QA/draft/research paths.');
