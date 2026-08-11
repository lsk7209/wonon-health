# Batch-60 independent dry-run audit

Reviewed: 2026-08-11 21:24 KST

## Verdict: PASS

The repaired c002, c004, c019, c023, and c027 packets all clear the independent 99-point gates. Each receives `done` / `99` with exactly one explicit deduction: AI citation readiness (14/15), reserved because these YMYL articles must retain their uncertainty and escalation context and cannot act as stand-alone diagnostic advice.

| ID | Hangul | Links | Runs / sources | Exact H2 mappings | Best existing / dry-run 7-token overlap | Result |
|---|---:|---:|---:|---:|---|---|
| c002 | 4,007 | 3 valid | 4 / 5 | 5 / 5 | b005: 2 shared, J=0.00578; dry-run: 0 | 99 done |
| c004 | 3,885 | 3 valid | 4 / 5 | 5 / 5 | a008: 7 shared, J=0.01813; c027: 1, J=0.00302 | 99 done |
| c019 | 3,681 | 3 valid | 4 / 5 | 5 / 5 | a007: 0 shared; c023: 1, J=0.00358 | 99 done |
| c023 | 3,763 | 3 valid | 5 / 5 | 5 / 5 | a007: 0 shared; c019: 1, J=0.00358 | 99 done |
| c027 | 4,348 | 3 valid | 4 / 5 | 5 / 5 | a018: 6 shared, J=0.02222; c004: 1, J=0.00302 | 99 done |

## Fresh evidence

- UTF-8: no U+FFFD replacement character in any inspected draft.
- Internal routes: every draft has exactly three `/article/` links; all fifteen target slugs are registered in current `content/*.ts` or `app/*.tsx`.
- Sources: each packet has five reader-visible sources, 3–5 research runs, source dates, `source_role`, and `used_for`. Repaired dates include c004 S5, c019 S1/S3/S4/S5, c023 S1–S4, and c027 S2.
- Traceability: all 25 `data_points[].supports_section` values exactly match their repaired visible H2 text.
- Material details: two or more research-specific details are substantively used in every draft; examples are recorded in each companion QA JSON.
- YMYL: all drafts are non-diagnostic, refuse treatment/medication selection, give appropriate contact/escalation boundaries, and are supported with official or primary-style sources.

## Reproducible normalized 7-token shingle comparison

Corpus: 59 existing articles = 3 existing output drafts + 20 batch-20 drafts + 30 batch-30 drafts + 6 non-longform public baseline articles extracted from `content/editorial.ts`; plus the five current dry-run drafts.

Algorithm: NFKC-normalize, lowercase, tokenize with `[가-힣a-z0-9]+`, form unique contiguous seven-token shingles, then calculate shared-shingle count, Jaccard similarity, and candidate containment for every pair. The per-packet retained values above are the maximum observed existing-corpus and dry-run comparisons. The maximum Jaccard is c027 vs existing a018 at 0.02222 (6 shared of 164 candidate shingles), far below a high-overlap signal; dry-run comparisons are at most one shared shingle.

No high normalized seven-token overlap was found. The corpus originality gate passes.
