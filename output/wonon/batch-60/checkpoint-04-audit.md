# Batch-60 Wave 4 independent audit

- Audited: 2026-08-11 23:10 KST
- Scope: c018, c020, c021, c022, and c024 drafts and research packets; the 59-article historical corpus; approved batch-60 drafts; and the registered route inventory.
- Verdict: **PASS — 5/5 records qualify as `done` at 99.**

| ID | Visible Hangul | H2 | Links | Runs | Dated sources | Mapping | Result |
|---|---:|---:|---:|---:|---:|---|---|
| c018 | 3,613 | 6 | 3 distinct registered routes | 4 | 5 | 6/6 exact | 99/done |
| c020 | 3,635 | 6 | 3 distinct registered routes | 4 | 5 | 6/6 exact | 99/done |
| c021 | 3,622 | 6 | 3 distinct registered routes | 5 | 5 | 6/6 exact | 99/done |
| c022 | 3,598 | 6 | 3 distinct registered routes | 5 | 5 | 6/6 exact | 99/done |
| c024 | 4,383 | 6 | 3 distinct registered routes | 5 | 5 | 6/6 exact | 99/done |

Fresh post-repair gates passed for every record: UTF-8 with no replacement/placeholder marker; visible-Hangul count excluding front matter and the terminal source list; at least five substantive H2 headings; exactly three distinct registered internal routes; at least three dated, specific official sources; reader-visible source URLs/titles; ordered `h2_mapping` exactly matching the substantive H2 sequence; every `supports_section` represented; every mapping evidence ID resolving to a source; and at least three materially used article-specific details.

Initial failures were repaired before promotion: c018, c020, and c024 were extended beyond 3,500 visible Hangul; c020's colliding final H2 and matching research mapping were renamed; c021 replaced its unregistered batch-draft link with a registered route. The full re-audit confirmed the repaired values above.

Fresh normalized seven-token checks against the 59 historical articles plus approved batch-60 drafts found no title or substantive-H2 collision. Maxima: c018 0.002171 (6 shared), c020 0.002179 (6), c021 0.001052 (3), c022 0.001075 (3), c024 0.001356 (4). All are far below the 0.18 threshold.

YMYL boundaries remain explicit: the drafts do not diagnose, prescribe, alter medication, select tests, or delay urgent contact. Each 99 score has exactly one honest AI-citation-readiness deduction; no hard-gate failure remains.

Fresh command: `node output/wonon/batch-60/validate-contracts.cjs` passed with 30 Phase-B contracts, 12 clusters, 90 evidence targets, no placeholders, and unique contract surfaces. This audit modified only the five QA JSON records and this checkpoint; it did not modify the manifest, site, schedule, or harness.
