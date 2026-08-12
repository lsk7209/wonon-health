# Batch-110 checkpoint 02 final independent wave-2 audit

Audited 2026-08-12 04:32 KST. Scope: d001, d002, d004, d005, d006. Only these QA packets and this checkpoint changed.

## Verdict

**PASS — all 5/5 wave-2 rows are `done`, score 97, and every strict boolean gate is true.**

| ID | Score | Visible Korean body | H2 maps | Current links | Fresh source GETs | Prose-only 7-token max |
| --- | ---: | ---: | --- | --- | --- | ---: |
| d001 | 97 | 4,000 | 5/5 | 3 | 5/5 HTTP 200 | 0.0015064779 |
| d002 | 97 | 3,996 | 5 unique H2 / 6 points | 3 | 5/5 HTTP 200 | 0.0053835801 |
| d004 | 97 | 4,246 | 10/10 | 3 | 5/5 HTTP 200 | 0.0009328358 |
| d005 | 97 | 4,281 | 10/10 | 3 | 5/5 HTTP 200 | 0.0011239112 |
| d006 | 97 | 4,226 | 6/6 | 3 | 6/6 HTTP 200 | 0.0011239112 |

## Fresh evidence

- d002/S5 replacement `https://womenshealth.gov/menopause/menopause-treatment` returned HTTP 200 and is an official source; all five d002 sources now return HTTP 200.
- d005/E4 replacement `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c4358ba7-1bf8-4b0a-9407-5ac279d04555` returned HTTP 200 and is a primary drug-label source; all five d005 sources now return HTTP 200.
- UTF-8 round-trip is exact with zero replacement characters for all five drafts. Visible body counts, current internal routes, exact H2/data-point maps, YMYL boundaries, and prose-only normalized seven-token comparisons against the 89-article corpus, approved dry run, and wave peers pass.

No manifest, catalog, schedule, publication, or live-site change was made.
