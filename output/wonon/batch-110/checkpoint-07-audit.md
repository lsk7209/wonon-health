# Wave 7 independent QA audit

- Audited: 2026-08-12 KST
- Scope: d029, d030, d031, d032, d033
- Verdict: **PASS.** All five rows pass every strict persona-writer gate.

| Article | Status | Score | Fresh evidence / blocking issue |
| --- | --- | ---: | --- |
| d029 | done | 97 | 4,200 prose-only Hangul; 6 substantive H2s exactly mapped; 3 registered links; 4 runs; 5/5 official sources, all GET 200. |
| d030 | done | 97 | 4,236 prose-only Hangul; 6 substantive H2s exactly mapped; 3 registered links; 4 runs; 5/5 official sources, all GET 200. |
| d031 | done | 97 | 4,243 prose-only Hangul; 5 substantive H2s exactly mapped; 3 registered links; 4 runs; 5/5 official-or-primary sources, all GET 200 after the S4 repair. |
| d032 | done | 97 | 4,249 prose-only Hangul; 5 substantive H2s exactly mapped; 3 registered links; 4 runs; 5/5 official sources, all GET 200. |
| d033 | done | 97 | 4,686 prose-only Hangul; 6 substantive H2s exactly mapped; 4 registered links; 5 runs; 6/6 official-or-primary sources, all GET 200 after the final-H2 mapping repair. |

## Fresh verification evidence

- Semantic UTF-8: all five draft/research packets decode as UTF-8 with zero replacement characters; prose-only Hangul counts are 4,200 / 4,236 / 4,243 / 4,249 / 4,686.
- Heading traceability: d029 6/6, d030 6/6, d031 5/5, d032 5/5, d033 6/6 exact substantive-H2 mappings.
- Internal links: d029-d032 have 3/3 and d033 has 4/4 registered routes in `content/editorial.ts`.
- Research/source metadata: runs are 4 / 4 / 4 / 4 / 5; source counts are 5 / 5 / 5 / 5 / 6. All source records are dated/accessed and contextual URLs in drafts match the respective source set.
- Fresh redirect-following URL check: the repaired d031 and d033 source sets returned 11/11 HTTP 200; all 26 wave source URLs are currently GET 200 (5 + 5 + 5 + 5 + 6).
- Material detail coverage: every row has three source-backed article-specific details with normalized-token coverage at least 0.474; each draft retains YMYL boundaries against diagnosis, prescription, or self-directed medication changes.
- Originality: each row was compared with 117 other available documents (83 prior-corpus drafts and 34 other batch-110 drafts). There are zero title/H2 duplicates. Maximum prose-only normalized seven-token Jaccard is d029 0, d030 0, d031 0, d032 0.000727273, d033 0.000298597.

No drafts, research packets, manifest, site code, schedule, or harness records were changed by this QA lane.
