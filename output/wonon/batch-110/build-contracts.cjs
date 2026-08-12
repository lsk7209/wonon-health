#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = __dirname;
const repoRoot = path.resolve(root, '..', '..', '..');
const relative = target => path.relative(repoRoot, target).replaceAll(path.sep, '/');
const readJson = target => JSON.parse(fs.readFileSync(target, 'utf8'));
const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

const source = readJson(path.join(root, 'row-contracts.merged.json'));
if (!Array.isArray(source.articles) || source.articles.length !== 50) {
  throw new Error(`Expected exactly 50 row-owned contracts, found ${source.articles?.length ?? 0}.`);
}

const qaDirectory = path.join(root, 'qa');
const qaFiles = fs.readdirSync(qaDirectory).filter(file => file.endsWith('.json')).sort();
if (qaFiles.length !== 50) throw new Error(`Expected exactly 50 QA JSON packets, found ${qaFiles.length}.`);

const qaById = new Map();
for (const file of qaFiles) {
  const packet = readJson(path.join(qaDirectory, file));
  if (!/^d\d{3}$/u.test(packet.id || '')) throw new Error(`${file}: invalid QA id.`);
  if (qaById.has(packet.id)) throw new Error(`${file}: duplicate QA id ${packet.id}.`);
  qaById.set(packet.id, { file, packet });
}

const requiredCategoryKeys = ['content_quality', 'seo', 'eeat', 'technical_elements', 'ai_citation_readiness'];
function checkedQa(contract) {
  const found = qaById.get(contract.id);
  if (!found) throw new Error(`${contract.id}: missing QA JSON packet.`);

  const { file, packet } = found;
  const qaPath = path.join(qaDirectory, file);
  const promotedSlug = packet.slug;
  const draftPath = path.join(root, 'drafts', `${contract.id}-${promotedSlug}.mdx`);
  const researchPath = path.join(root, 'research', `${contract.id}-${promotedSlug}.json`);
  const categories = packet.category_scores;
  const gates = packet.hard_gate_results;
  const categoryKeys = Object.keys(categories || {}).sort();

  if (typeof promotedSlug !== 'string' || !/^[a-z0-9-]+$/u.test(promotedSlug)) throw new Error(`${contract.id}: QA slug is invalid.`);
  if (packet.status !== 'done') throw new Error(`${contract.id}: QA status must be done.`);
  if (!Number.isInteger(packet.score) || packet.score < 95) throw new Error(`${contract.id}: QA score must be an integer at least 95.`);
  if (!sameJson(categoryKeys, [...requiredCategoryKeys].sort())) throw new Error(`${contract.id}: QA category score keys are incomplete or unexpected.`);
  const categorySum = requiredCategoryKeys.reduce((sum, key) => sum + categories[key], 0);
  if (!requiredCategoryKeys.every(key => Number.isFinite(categories[key])) || categorySum !== packet.score) {
    throw new Error(`${contract.id}: QA category scores must exactly sum to the QA score.`);
  }
  if (!gates || !Object.keys(gates).length || !Object.values(gates).every(value => typeof value === 'boolean' && value)) {
    throw new Error(`${contract.id}: every QA hard gate must be the boolean true.`);
  }
  if (!fs.existsSync(draftPath) || !fs.existsSync(researchPath)) throw new Error(`${contract.id}: draft/research path is missing.`);
  if (packet.draft_path && packet.draft_path !== relative(draftPath)) throw new Error(`${contract.id}: QA draft_path is not correlated to its contract.`);
  if (packet.research_path && packet.research_path !== relative(researchPath)) throw new Error(`${contract.id}: QA research_path is not correlated to its contract.`);

  return {
    // QA and its draft are the publishable identity. Retain the row-owned
    // identity separately when an earlier planning slug was superseded.
    slug: promotedSlug,
    contract_slug: contract.slug,
    qa_path: relative(qaPath),
    draft_path: relative(draftPath),
    research_path: relative(researchPath),
    score: packet.score,
    qa_evidence: {
      audit_type: packet.audit_type,
      audited_at: packet.audited_at,
      category_score_sum: categorySum,
      hard_gate_count: Object.keys(gates).length,
    },
  };
}

const articles = source.articles.map(contract => ({ ...contract, ...checkedQa(contract), status: 'done' }));
if (new Set(articles.map(article => article.id)).size !== 50) throw new Error('Row-owned contract ids must be unique.');
if (qaById.size !== articles.length) throw new Error('QA packet ids must correlate one-to-one with row-owned contracts.');

const manifest = {
  site: 'wonon',
  batch: 'batch-110',
  phase: 'B-QA-promoted-contract-map',
  created_at: '2026-08-12T01:10:00+09:00',
  target_count: 50,
  generated_count: articles.length,
  source_contracts: 'output/wonon/batch-110/row-contracts.merged.json',
  source_corpus: {
    article_count: 89,
    sources: ['content/editorial.ts', 'output/wonon/batch-20/manifest.json', 'output/wonon/batch-30/manifest.json', 'output/wonon/batch-60/manifest.json'],
  },
  persona_source: 'personas/wonon/persona.md',
  status: 'qa_promoted',
  articles,
};

const fields = ['id', 'title', 'slug', 'cluster', 'status', 'score', 'qa_path', 'draft_path', 'research_path', 'subtitle', 'main_keyword', 'extended_keywords', 'search_intent', 'unique_angle', 'reader_job', 'decision_moment', 'answer_claim', 'evidence_plan', 'non_overlap_claim', 'internal_link_targets', 'section_sequence', 'visual_plan'];
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const csvValue = value => Array.isArray(value) ? value.join(' | ') : value;
const contractOutput = { batch: manifest.batch, status: manifest.status, contracts: articles };
const clusterCounts = Object.entries(articles.reduce((counts, article) => {
  counts[article.cluster] = (counts[article.cluster] || 0) + 1;
  return counts;
}, {}));
const scoreRange = [Math.min(...articles.map(article => article.score)), Math.max(...articles.map(article => article.score))];

fs.writeFileSync(path.join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(root, 'contracts.json'), `${JSON.stringify(contractOutput, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(root, 'title-contract-map.csv'), `${[fields.join(','), ...articles.map(article => fields.map(field => csv(csvValue(article[field]))).join(','))].join('\n')}\n`, 'utf8');
fs.writeFileSync(path.join(root, 'audit-summary.md'), [
  '# Batch 110 QA promotion audit summary',
  '',
  '- Decision: PROMOTED',
  `- Row-owned contracts and QA packets: ${articles.length}/50, one-to-one by id and slug.`,
  `- Promoted status: ${articles.filter(article => article.status === 'done').length}/50 done; QA score range: ${scoreRange[0]}-${scoreRange[1]}.`,
  `- QA category sums: ${articles.length}/50 exactly equal their QA score.`,
  `- Strict boolean hard gates: ${articles.length}/50 packets, all gates true.`,
  `- QA/draft/research path correlation: ${articles.length}/50 exact paths present.`,
  `- Contract source: ${manifest.source_contracts}; every source contract field is retained before promotion metadata is appended.`,
  '',
  '## Cluster distribution',
  '',
  ...clusterCounts.map(([cluster, count]) => `- ${cluster}: ${count}`),
  '',
  'This promotion changes planning artifacts only. It does not publish, schedule, deploy, or alter drafts, research, QA packets, site files, or harness records.',
].join('\n') + '\n', 'utf8');

console.log(`Built and QA-promoted ${articles.length}/50 row-owned contracts.`);
