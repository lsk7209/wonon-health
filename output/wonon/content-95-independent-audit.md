# Independent 95-Point Content Gate Audit

**Run:** 2026-08-12 KST (post-normalization and route repair)  
**Scope:** Current repository catalog, release rules, all content QA artifacts (including `baseline-qa`), internal article-link targets, TypeScript, tests, and production build.  
**Gate:** Every release-covered article requires exactly one QA packet, `status: "done"`, `score >= 95`, category scores totaling the declared score, and every declared hard-gate value equal to boolean `true`.

## Verdict: PASS

All 89 release-covered catalog articles meet the 95-point metadata gate and have valid internal article-link targets. The previous six packet inconsistencies, six missing baseline packets, and one invalid article target were absent in this fresh re-audit.

## Fresh evidence

| Check | Result |
| --- | --- |
| Catalog reconciliation | **89** catalog rows; **89** unique slugs |
| Release coverage | **20** baseline-public + **69** scheduled = **89**; no overlap |
| QA cardinality | **89** QA files for **89** expected rows; exactly one packet per row; no orphans |
| Score gate | **89/89** scores >=95 (baseline packets are 95; other packets are 99) |
| Status gate | **89/89** `status: "done"` |
| Category arithmetic | **89/89** category-score sums equal their declared score |
| Hard gates | **89/89** packets have non-empty gates and every declared value is boolean `true` |
| JSON integrity | **180/180** JSON artifacts under `output/wonon` parsed successfully with Node |
| Internal article links | **249** MDX `/article/...` links; **0** targets absent from the 89-slug catalog |
| TypeScript | `npx tsc --noEmit` exit 0 |
| Tests | `npm test`: **3 passed, 0 failed** |
| Build | `npm run build`: Next.js compiled, type-checked, and generated all routes successfully |

## Catalog categories

| Category | Catalog rows | QA packets | Result |
| --- | ---: | ---: | --- |
| Static baseline editorial | 6 | 6 (`baseline-qa`, matched by `slug`) | PASS |
| Editorial additions (`a007`–`a009`) | 3 | 3 | PASS |
| Batch-20 (`b001`–`b020`) | 20 | 20 | PASS |
| Batch-30 (`a001`–`a030`) | 30 | 30 | PASS |
| Batch-60 (`c001`–`c030`) | 30 | 30 | PASS |
| **Total** | **89** | **89** | **PASS** |

## Regression evidence

- The scheduler suite confirmed the explicit 20-article baseline, exact scheduled publication boundary, and ordered batch-30/batch-60 five-hour slots.
- The repaired `sexual-pain-visit-note` internal target now resolves to registered article slug `menopause-when-to-see-a-doctor`; the complete 249-link scan has no absent target.
- QA normalization was evaluated strictly: values such as the prior string-like pass markers are not accepted. Every current gate was read as JSON boolean `true`.

## Limitations

- This is an integrity and release-gate verification of current stored QA evidence, catalog membership, link targets, and application validation. It does not independently repeat medical-source research for every one of the 89 articles.
- Five batch-30 drafts still rely on the established filename-derived slug fallback rather than explicit `slug` frontmatter. Their effective catalog slugs and QA mapping are valid; normalize that metadata before adopting frontmatter-only tooling.
