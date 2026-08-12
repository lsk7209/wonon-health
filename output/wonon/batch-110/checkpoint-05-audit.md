# Wave 5 independent QA audit

- Audited: 2026-08-12 06:15 KST
- Scope: d018, d019, d020, d022, d023
- Verdict: **PASS.** All five rows pass every independently verified hard gate at 97.

| Article | Status | Score | Fresh evidence |
| --- | --- | ---: | --- |
| d018 | done | 97 | 4,436 visible Hangul; 5 H2, exact mapping; 4 research runs; 5 dated/accessed official sources, all live GET 200; 3 registered internal routes; material coverage 0.893/0.632; 5 contextual citations; 107-document maximum seven-token Jaccard 0.001701. |
| d019 | done | 97 | 4,483 visible Hangul; 5 H2, exact mapping; 4 runs; 5 dated/accessed official sources, all GET 200; 4 registered internal routes; coverage 0.769/0.893; 5 contextual citations; maximum Jaccard 0.002557. |
| d020 | done | 97 | 4,594 visible Hangul; 8 H2, exact mapping; 5 runs; five dated/accessed official sources all fresh GET 200; S2 FDA `article:published_time` is 2026-05-27 and all source/data-point dates now synchronize; coverage 0.938/0.765; 5 contextual citations; maximum Jaccard 0.005299. |
| d022 | done | 97 | 4,528 visible Hangul; 8 H2, exact mapping; 5 runs; five dated/accessed official sources all GET 200; S1/S3 Last Reviewed dates and the replacement CDC S5 date independently confirmed; coverage 0.643/0.789; 5 contextual citations; maximum Jaccard 0.003502. |
| d023 | done | 97 | 4,459 visible Hangul; 5 H2, exact mapping; 4 runs; 5 dated/accessed official sources, all GET 200; 3 registered internal routes; coverage 0.895/0.850; 5 contextual citations; maximum Jaccard 0.002264. |

## Verified common gates

- All five drafts decode as UTF-8 without replacement characters and exceed 4,000 visible Hangul characters.
- All source URLs were fetched independently on 2026-08-12 and returned HTTP 200 (25/25).
- Every source is cited contextually in the prose; all H2/data-point mappings are complete; each article has at least two material details at or above 0.45 token coverage.
- All referenced internal article routes are registered in the current editorial/schedule records.
- Full available-draft-corpus originality comparison used 108 drafts (107 comparators per row). No title, H2, artifact, or prose seven-token overlap breach was found.
- Each draft maintains the YMYL boundary: no diagnosis, prescription, dose instruction, or self-treatment instruction.

## Final re-audit

- d020's S2 and S4 source/data-point dates are now exact matches, and its five sources were freshly fetched with HTTP 200 in the final audit window.
- No hard-gate failures or repair items remain across d018, d019, d020, d022, and d023.

No drafts, research packets, manifest, site code, schedule, or harness records were edited by this QA lane.
