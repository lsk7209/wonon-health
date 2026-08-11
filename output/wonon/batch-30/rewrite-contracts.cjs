/* Source of truth: contracts/a001-a010.json, a011-a020.json, a021-a030.json.
 * This file only merges and maps authored block text; it does not generate prose. */
const fs = require('fs');
const path = require('path');
const root = __dirname;
const contractFiles = ['a001-a010.json', 'a011-a020.json', 'a021-a030.json'];
const blocks = contractFiles.flatMap(name => JSON.parse(fs.readFileSync(path.join(root, 'contracts', name), 'utf8')).contracts);
if (blocks.length !== 30 || new Set(blocks.map(x => x.id)).size !== 30) throw new Error('Expected 30 unique contract blocks');
const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const oldById = new Map(manifest.articles.map(a => [a.id, a]));
const list = xs => xs.join(' | ');
const evidence = xs => list(xs.map(x => `${x.organization}: ${x.claim_to_verify}`));
const applications = xs => list(xs.map(x => `${x.organization}: ${x.applicability}`));
const artifactPath = (folder, id, extension) => {
  const dir = path.join(root, folder);
  if (!fs.existsSync(dir)) return '';
  const name = fs.readdirSync(dir).find(file => file === `${id}.${extension}` || file.startsWith(`${id}-`) && file.endsWith(`.${extension}`));
  return name ? `output/wonon/batch-30/${folder}/${name}` : '';
};
manifest.articles = blocks.map(block => {
  const old = oldById.get(block.id) || {};
  const draftPath = artifactPath('drafts', block.id, 'mdx');
  const researchPath = artifactPath('research', block.id, 'json');
  const qaPath = artifactPath('qa', block.id, 'json');
  const qa = qaPath ? JSON.parse(fs.readFileSync(path.join(process.cwd(), qaPath), 'utf8')) : null;
  const approved = Boolean(draftPath && researchPath && qa && qa.status === 'done' && qa.score >= 99);
  return {
    ...old,
    id: block.id, slug: block.slug, title: block.title,
    status: approved ? 'done' : 'contract_ready',
    score: approved ? qa.score : '',
    draft_path: draftPath,
    research_path: researchPath,
    qa_path: qaPath,
    subtitle: block.reader_artifact,
    main_keyword: block.title,
    extended_keywords: block.reader_artifact,
    keyword_role: block.information_architecture,
    search_intent: block.reader_situation,
    unique_angle: block.reader_artifact,
    structure_type_candidate: block.information_architecture,
    primary_reader_situation: block.reader_situation,
    decision_criterion: block.non_overlap,
    ending_cta_direction: block.cta,
    reader_job: block.reader_artifact,
    decision_moment: block.intro_frame,
    answer_claim: block.non_overlap,
    evidence_plan: evidence(block.evidence_targets),
    non_overlap_claim: block.non_overlap,
    not_answered_here: block.non_overlap,
    structure_reason: block.information_architecture,
    separate_reason: block.non_overlap,
    serp_gap: block.reader_artifact,
    information_gain: block.reader_artifact,
    source_interpretation: applications(block.evidence_targets),
    article_specific_detail: block.reader_artifact,
    intro_frame: block.intro_frame,
    section_sequence: list(block.section_sequence),
    faq_plan: list(block.faq_plan),
    visual_plan: block.reader_artifact,
    reader_artifact: block.reader_artifact,
    information_architecture: block.information_architecture,
    cta: block.cta,
    evidence_targets: block.evidence_targets,
    updated: '2026-08-11T16:25:00+09:00'
  };
});
manifest.stats = {
  ...manifest.stats,
  total: 30,
  done: manifest.articles.filter(article => article.status === 'done').length,
  review_needed: manifest.articles.filter(article => article.status === 'review_needed').length,
  failed: manifest.articles.filter(article => article.status === 'failed').length
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
const cols = ['id','status','score','draft_path','research_path','qa_path','title','slug','long_tail','topic_hints','cluster','is_pillar','keyword_category','keyword_modifiers','subtitle','main_keyword','extended_keywords','keyword_role','search_intent','unique_angle','structure_type_candidate','primary_reader_situation','decision_criterion','ending_cta_direction','internal_link_targets','reader_job','decision_moment','answer_claim','evidence_plan','non_overlap_claim','not_answered_here','structure_reason','separate_reason','serp_gap','information_gain','source_interpretation','article_specific_detail','intro_frame','section_sequence','faq_plan','visual_plan'];
const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
fs.writeFileSync(path.join(root, 'title-contract-map.csv'), [cols.join(','), ...manifest.articles.map(a => cols.map(c => quote(a[c])).join(','))].join('\n') + '\n', 'utf8');
