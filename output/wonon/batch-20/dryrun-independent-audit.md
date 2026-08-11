# Batch 20 dry-run independent audit

- Audited: 2026-08-11 KST
- Scope: `b001`, `b009`, `b013`, `b016`, and `b019`
- Evidence method: fresh UTF-8-SIG JSON parsing, direct MDX analysis, local route inventory, and a fresh strict manifest audit.

## Verdict

**PASS — all five dry-run articles clear the >=90 score and hard-gate threshold.**

The prior parser finding was an encoding-handling false negative. Fresh UTF-8-SIG parsing succeeds for `manifest.json` and all ten research/QA evidence packets. The authoritative strict audit exits 0 with zero warnings, no duplicate/contract/template/research risks, and five distinct structure, visual, heading, CTA, and section-role patterns.

## Fresh evidence

| Article | Visible Korean body chars* | H2 | Valid local internal links | Research runs / sources / data points | QA score / category sum | Status |
|---|---:|---:|---:|---:|---:|---|
| b001 | 3,509 | 8 | 3 | 4 / 6 / 6 | 94 / 94 | done |
| b009 | 3,510 | 8 | 3 | 4 / 6 / 6 | 94 / 94 | done |
| b013 | 3,731 | 6 | 3 | 4 / 6 / 5 | 92 / 92 | done |
| b016 | 3,694 | 7 | 3 | 4 / 5 / 6 | 93 / 93 | done |
| b019 | 3,845 | 7 | 3 | 4 / 6 / 7 | 94 / 94 | done |

\*Recomputed after excluding frontmatter, code blocks, URLs, Markdown link destinations, and common Markdown syntax. Every result exceeds the 3,500-character policy floor.

- UTF-8-SIG parser: `manifest.json` plus all five research and five QA files parsed successfully.
- Source/data ledger: each research file has 4 runs, 5–6 sources, 2 article-specific details, source dates/access dates, `source_role`, `used_for`, and `supports_section`; `fact_traceability_pass` is true for every article.
- Fact-traceability spot check: each of the two declared article-specific details per article has strong exact Korean-token presence in the corresponding draft: b001 16/16 and 12/12; b009 17/17 and 19/19; b013 10/11 and 19/19; b016 12/12 and 7/7; b019 11/11 and 14/14.
- Local links: all fifteen `/article/...` targets resolve to existing slugs in `content/editorial.ts`.
- QA: every declared hard-gate result in each QA packet is `true`, `pass`, or `{ pass: true }`; no false or missing result was found. Each stated score equals its category-score sum.

## Cross-batch anti-template check

Fresh `manifest.py audit --window 5 --strict --fail-on-warning` completed with exit code 0 and `warnings: []`.

| Pattern dimension | Result |
|---|---|
| Structure types | 5 distinct: timeline-explainer, environmental-map, scenario-branch, measurement-protocol, notice-annotation |
| Visual sequences | 5 distinct |
| Heading patterns | 5 distinct |
| CTA types | 5 distinct: prepare, decide, contact, verify, apply |
| Section-role sequences | 5 distinct |
| Exact H2 reuse | None across the five drafts |
| Seven-Hangul-character shingle Jaccard | 0.0030–0.0103; maximum b013/b016, well below the 0.28 cross-cluster policy threshold |
| Manifest risk fields | `missing_metadata`, planning, contract, duplicate, title-template, content-template, similarity, source-reuse, and research gaps are all empty |

The title-contract map now records the required contract and anti-template metadata for all five: reader job, decision moment, answer claim, evidence plan, non-overlap claim, structure reason, title/subtitle pattern signatures, opening frame, section-role sequence, and CTA type. The manifest status and each QA status are reconciled to `done`.

## Acceptance-gate matrix

| Requirement | Status | Evidence |
|---|---|---|
| Score >=90 plus score consistency | VERIFIED | b001 94, b009 94, b013 92, b016 93, b019 94; every category sum matches. |
| Visible Korean body >=3,500 | VERIFIED | Fresh recomputation: 3,509–3,845. |
| Research gate and YMYL source evidence | VERIFIED | Valid UTF-8-SIG research JSON; 4 runs and 5–6 typed/date-stamped sources each; no incomplete source/data-point fields; all QA YMYL gates pass. |
| Fact traceability and specific-detail use | VERIFIED | All traceability flags are true; two details per article; independent exact-token spot checks above. |
| Heading quality and structure fit | VERIFIED | 6–8 H2s per article, no exact H2 reuse; five distinct manifest heading/structure types; QA heading gates pass. |
| Internal route validity | VERIFIED | Three valid existing `/article` targets per article. |
| Contract/title/CTA/template uniqueness | VERIFIED | Fresh strict window-5 audit reports no related risk; five distinct structure, visual, heading, CTA, and role-sequence values. |
| QA evidence and done-state consistency | VERIFIED | All five QA packets parse and have passing hard gates; manifest and QA both record `done`. |
| Strict batch gate | VERIFIED | `manifest.py audit --window 5 --strict --fail-on-warning`: exit 0, warnings 0, done 5 / failed 0 / review_needed 0. |

## Regression risk

**Low for this dry-run gate.** The remaining normal risk is medical-content freshness at publication time; the articles intentionally avoid diagnosis, treatment selection, and fixed personal screening rules. Reconfirm volatile official guidance immediately before any publish step.

## Recommendation

**APPROVE** the five-article dry run and allow the next controlled batch step.
