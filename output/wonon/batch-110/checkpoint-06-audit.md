# Wave 6 independent QA audit

- Audited: 2026-08-12 KST
- Scope: d024, d025, d026, d027, d028
- Verdict: **PASS.** All five rows pass every hard gate at 97.

| Article | Status | Score | Blocking fresh evidence |
| --- | --- | ---: | --- |
| d024 | done | 97 | 4,109 prose-only Hangul; all hard gates passed. |
| d025 | done | 97 | 4,139 prose-only Hangul; all hard gates passed. |
| d026 | done | 97 | 4,228 prose-only Hangul; all hard gates passed. |
| d027 | done | 97 | 4,330 prose-only Hangul; all hard gates passed. |
| d028 | done | 97 | 4,111 prose-only Hangul; all gates passed. |

## Fresh verification evidence

- UTF-8 semantic scan: all five decode cleanly, with zero replacement characters.
- Heading/data-point mapping: d024 5/7, d025 5/5, d026 5/5, d027 6/6, d028 5/7; every H2 has an exact mapped data point.
- Links: d024 4/4, d025 3/3, d026 3/3, d027 3/3, d028 3/3 registered.
- Research: each packet has five research runs and 5-7 dated accessed official/primary sources. Fresh redirect-following GET requests returned 200 for all 30 URLs (d024 6, d025 6, d026 5, d027 6, d028 7).
- Citations and details: all packets contextually cite their source sets; d024/d025/d026/d028 materially use three article-specific details and d027 uses two. YMYL boundaries avoid diagnosis, prescription, dose, medication change, or self-treatment instruction.
- Originality: re-compared repaired d024-d027 against all 116 available prior/current batch draft comparators (117 documents total). No normalized title or H2 duplicate occurred. Maximum seven-token prose Jaccard: d024 0; d025 0.001467; d026 0.000365; d027 0.

No draft, research packet, manifest, site code, schedule, or harness record was changed by this QA lane.
