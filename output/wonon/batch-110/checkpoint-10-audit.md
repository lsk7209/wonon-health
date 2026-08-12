# Wave 10 independent re-QA audit

- Audited: 2026-08-12 KST, final fresh re-check after d045/d049 source repairs.
- Scope: d045 and d049 re-QA; d046–d048 preserved from the prior approved audit.
- Verdict: **PASS — 5/5 approved.** All rows are `done` at 96 or 97 with every strict hard gate true.

| Article | Status | Score | Fresh evidence |
| --- | --- | ---: | --- |
| d045 | done | 97 | Repaired packet: 4,551 prose-only Hangul; 5 H2s covered by 5 data points; 3 approved routes; five dated official/primary sources; five body-contextual citations; fresh redirect-following GET 200 for all five sources. |
| d046 | done | 96 | Preserved approved result: five H2/data-point coverage, three approved routes, five dated official sources, five contextual citations, and 5/5 GET 200. |
| d047 | done | 96 | Preserved approved result: five H2s covered, three approved routes, five dated official sources, five contextual citations, and 5/5 GET 200. |
| d048 | done | 96 | Preserved approved result: five H2s covered, three approved routes, five dated official sources, five contextual citations, and 5/5 GET 200. |
| d049 | done | 97 | Repaired packet: 4,728 prose-only Hangul; 6 H2s covered by 6 data points; 3 approved routes; five dated official sources; five body-contextual citations; fresh redirect-following GET 200 for all five sources. |

## Fresh re-QA evidence for d045 and d049

- Source retrieval: d045 D45-S1…D45-S5 all returned 200 after redirects, including the two PubMed primary-data records. d049 D49-S1…D49-S5 all returned 200 after redirects; the repaired HHS Office on Women's Health URLs replaced the previous NIA 405 responses.
- Roles and dates: d045 has three official and two primary-data sources, all dated; d049 has five dated official sources. Every source has a non-empty `used_for` field.
- Contextual citations: each declared URL occurs in a body evidence citation and in the reference list: 5/5 per re-QA row.
- Structure and routes: d045 is 5 H2/5 data points; d049 is 6 H2/6 data points; there are no missing H2s or orphan data-point sections. Each has exactly three routes, all present in the 139-route approved pre-integration catalog/manifest set.
- Format and safety: both draft/research packets parse and round-trip as UTF-8 with zero U+FFFD; no raw Markdown placeholder, TODO, FIXME, template marker, or script marker was found. Both exceed 4,000 prose-only Hangul and retain observation, record-preparation, care-seeking, and no-diagnosis/no-prescription YMYL boundaries.
- Originality: normalized seven-token Jaccard against 131 other local MDX documents: d045 0.001276732 (closest d046); d049 0.000667557 (closest a018). No title or H2 duplicate was found.
- QA integrity: category score sums match each score; `done` occurs only where every hard-gate boolean is true and score is at least 95.

Only d045/d049 QA JSONs and this checkpoint were changed by this re-QA lane. d046–d048 QA packets, all drafts, all research, manifest, site, schedule, and production systems were not changed.
