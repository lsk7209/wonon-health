# Wave 9 independent QA audit

- Audited: 2026-08-12 KST
- Scope: d040, d041, d042, d043, d044.
- Verdict: **PASS.** Every scoped row passes the strict persona-writer gates and is independently approved at 97/100.

| Article | Status | Score | Fresh evidence |
| --- | --- | ---: | --- |
| d040 | done | 97 | 4,223 prose-only Hangul; 5/5 H2 traceability; three registered links; five dated official sources/citations; all five GET 200. |
| d041 | done | 97 | 4,347 prose-only Hangul; 5/5 map; three registered links; five distinct dated official URLs/citations; all GET 200. |
| d042 | done | 97 | 4,378 prose-only Hangul; 6/6 map; three registered links; five official plus one expert-reference source, all dated/cited and GET 200. |
| d043 | done | 97 | 4,212 prose-only Hangul; 6/6 traceability; three registered links; five dated official sources/citations; all GET 200. |
| d044 | done | 97 | 5,048 prose-only Hangul; 6/6 map; three registered links; five dated official sources with accessed dates/citations; all GET 200. |

## Fresh verification evidence

- UTF-8 / length: all scoped draft and research packets decode without replacement characters. Prose-only Hangul counts are 4,223 / 4,347 / 4,378 / 4,212 / 5,048.
- Traceability and YMYL: every H2 has an exact research map (d040 5/5, d041 5/5, d042 6/6, d043 6/6, d044 6/6); every packet has five research runs and three material article-specific details. Claims remain informational and do not diagnose, prescribe, set doses, or replace urgent evaluation.
- Internal links: every scoped draft has exactly three `/article/` links and every linked slug is registered in the current editorial corpus.
- Sources and citations: all 26 source records are dated and freshly reached with redirect-following HTTP/1.1 GET using a browser-compatible User-Agent and Accept header; every response was 200. Every source is contextual in reader-visible prose. d042 has five official and one expert-reference source; the other four rows each have five official sources.
- Originality: each scoped prose body was compared against 127 other local MDX documents (83 prior-corpus plus 44 other batch-110 drafts). No scoped title or H2 duplicate was found. Maximum normalized seven-token Jaccard: d040 0; d041 0.001678416; d042 0.000935454; d043 0.000935454; d044 0.000597015.
- Regression checks: `npm test` passed 3/3, `npx tsc --noEmit` exited 0, and `git diff --check -- output/wonon/batch-110` exited 0.

Only Wave 9 QA JSONs and this checkpoint were changed by this QA lane.
