# Wave 8 independent QA audit

- Audited: 2026-08-12 KST
- Scope: d034, d036, d037, d038, d039. d035 is excluded: its existing dry-run QA packet remains `done`/97 and was used only as a non-overlap comparator.
- Verdict: **PASS.** All five rows pass every strict persona-writer gate at 97/100 after fresh repair verification.

| Article | Status | Score | Fresh evidence / blocking issue |
| --- | --- | ---: | --- |
| d034 | done | 97 | 4,611 prose-only Hangul; 5/5 H2 mappings; 4 registered links; 4 runs; six dated official/primary sources, contextual citations, and fresh GET 200. |
| d036 | done | 97 | 4,654 prose-only Hangul; 5/5 H2 mappings; 4 registered links; 4 runs; 5/5 dated official sources, contextual citations, and fresh GET 200. |
| d037 | done | 97 | 4,720 prose-only Hangul; 6/6 H2 mappings; 3 registered links; 5 runs; 5/5 dated official/primary sources, contextual citations, and fresh GET 200. |
| d038 | done | 97 | 4,938 prose-only Hangul; 6/6 H2 mappings; 3 registered links; 5 runs; 5/5 dated official/primary sources, contextual citations, and fresh GET 200. |
| d039 | done | 97 | 4,345 prose-only Hangul; 6/6 H2 mappings; 3 registered links; 5 runs; 6/6 dated official sources, contextual citations, and fresh GET 200. |

## Fresh verification evidence

- UTF-8 / length: the five scoped draft/research packets decode with zero replacement characters. Prose-only Hangul counts are 4,611 / 4,654 / 4,720 / 4,942 / 4,345.
- Traceability and YMYL: every scoped draft has exact data-point coverage for every substantive H2: d034 5/5, d036 5/5, d037 6/6, d038 6/6, d039 6/6. All packets include at least three material article-specific details and keep diagnosis, medication selection, dose change, and emergency-triage decisions outside the article's authority.
- Registered internal routes: all 17 scoped `/article/` links resolve to registered `content/editorial.ts` slugs; counts are 4 / 4 / 3 / 3 / 3.
- Fresh source HTTP check: redirect-following GET with a browser-compatible user agent produced d034 `200/200/200/200/200/200`, d036 `200/200/200/200/200`, d037 `200/200/200/200/200`, d038 `200/200/200/200/200`, and d039 `200/200/200/200/200/200` in source-record order.
- Originality: each scoped prose body was compared against 122 other local documents (84 prior corpus plus 38 other available batch-110 drafts). No scoped title or H2 duplicate was found. Maximum normalized seven-token Jaccard: d034 0.003854136; d036 0.000968367; d037 0.000918836; d038 0.000869313; d039 0.000680504.

No drafts, research packets, manifest, site code, schedule, or harness documents were changed by this QA lane.
