# Batch-60 Site Release Audit

Audited: 2026-08-11 KST  
Scope: local batch-60 integration and request-time publication schedule only. No deployment, push, or production mutation was performed.

## Verdict

**INCOMPLETE — runtime smoke evidence unavailable.** All static, schedule, test, type, and production-build checks below pass. The local HTTP runtime check could not be started because the environment rejected the background-process command; consequently, the future-route 404/noindex and live discoverability assertions have source-level and build evidence, but not fresh HTTP-response evidence.

## Fresh evidence

- `npm test`: PASS — 3/3 tests passed. The suite proves baseline 20 visibility before the first slot; exact publication at the first slot; 69 schedule entries; all 5-hour gaps; batch-30 and batch-60 ordering; batch-60 boundary at `2026-08-19T23:00:00+09:00`; and final total 89 at `2026-08-26T00:00:00+09:00`.
- `npx tsc --noEmit`: PASS (exit 0).
- `git diff --check`: PASS (exit 0; only line-ending warnings).
- `npm run build`: PASS — Next.js production build compiled, type-checked, collected data, and generated all routes successfully.
- Independent in-memory artifact audit: PASS.
  - Catalog composition is exactly `9` static + `20` batch-20 + `30` batch-30 + `30` batch-60 = `89`; all 89 slugs are unique.
  - Batch-60 manifest contains 30 articles, all `status: done` and `score: 99`; its ordered slug list exactly matches the 30 batch-60 draft slugs and the final 30 schedule entries.
  - Each batch-60 draft has at least 5 embedded source URLs (no uncited draft); all 30 associated research and QA packets exist, with QA `done` at score 99.
  - Schedule code and `docs/content-schedule.json` are byte-for-byte equivalent at the parsed item level: 69 unique scheduled slugs, baseline 20, exact 5-hour gaps, first `2026-08-11T20:00:00+09:00`, batch-60 first `2026-08-19T23:00:00+09:00`, and final `2026-08-26T00:00:00+09:00`.

## Acceptance criteria

| Criterion | Status | Evidence |
| --- | --- | --- |
| Catalog has 89 unique articles | VERIFIED | Independent catalog calculation: 9 + 20 + 30 + 30 = 89; duplicates: none. |
| Exactly the approved 30 are integrated | VERIFIED | Manifest, draft-directory, catalog filter, and final schedule segment have the same ordered 30 slugs. |
| Manifest, code, and docs schedule agree | VERIFIED | Parsed code schedule equals `docs/content-schedule.json`; manifest exactly equals the final 30 entries. |
| 20 baseline + 69 scheduled = 89 total | VERIFIED | Selector test passes at frozen final timestamp; independent schedule counts agree. |
| Five-hour cadence and boundary timestamps | VERIFIED | All 68 intervals are exactly 18,000,000 ms; frozen tests cover before/at first and batch-60 boundary timestamps. |
| Future articles are 404/noindex and absent from article/search/topic/sitemap listings | PARTIAL | Route gate (`isPublicArticle` then `notFound`), metadata `index:false, follow:false`, and public-only selectors are present in article, articles, search, topic, and sitemap code; build passes. Fresh local HTTP response proof was blocked by the execution environment. |
| Published article exposes JSON-LD citations | PARTIAL | Article route derives JSON-LD `citation` from longform URL citations; all batch-60 drafts contain citations. Frozen selector boundary test passes, but no rendered at-boundary HTTP page was available. |

## Blocker and next evidence

The only blocker is the unavailable local HTTP smoke test. Start the already-built app in an allowed local process context and capture these fresh assertions for `shingles-vaccine-visit-prep` before and at its frozen publication time: pre-slot 404 with `noindex`; absent from `/articles`, `/search`, `/topic/everyday-care`, and `/sitemap.xml`; at-slot 200 with Article JSON-LD containing non-empty `citation`.

## Regression risk

Low for compilation and schedule mechanics: the fresh selector tests, project type check, diff check, and production build all pass. Medium for request-time rendering only until the blocked HTTP assertions are captured.
