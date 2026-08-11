# Wave 2 Independent Editorial Re-audit

Audit time: 2026-08-11 KST  
Scope: repaired `b002`, `b003`, `b005`, `b010`, and `b014`. This audit independently read the current MDX bytes with a throwing UTF-8 decoder, current research/QA JSON, `content/editorial.ts`, and live source URLs. Earlier QA claims were treated as assertions, not proof. The shared manifest and site were not edited.

## Verdict

**FAIL — no article is eligible for a final `done`/release claim yet.**

The prior mojibake failure is repaired: all five files are valid UTF-8 Korean and clear the reader-visible 3,500-Hangul gate. However, `b010` has a currently dead research URL (CDC S6, HTTP 404), `b005` and `b010` do not put every listed research source into reader-visible citations, and the strict temporary-manifest gate exits 2 with warnings. The shared manifest also still records all five rows as `pending` with no completion metadata.

| ID | Article body / links / details | Research and citation status | Verdict |
| --- | --- | --- | --- |
| b002 | PASS: 3,763 conservative visible Hangul; 3/3 valid current internal routes; both specific details materially appear with inline citations. | PASS: 6/6 dated sources, 6/6 reader-visible, all live HTTP 200. | PARTIAL — blocked only by manifest completion/strict audit. |
| b003 | PASS: 3,833 Hangul; 3/3 routes; source-backed heat/palpitations, log, and urgent-boundary details materially cited. | PASS: 6/6 dated sources and reader-visible citations. NHS/NHLBI URLs returned 200; AHA returns 403 to this automated check, not a 404/dead URL. | PARTIAL — blocked only by manifest completion/strict audit. |
| b005 | PASS: 3,662 Hangul; 3/3 routes; wake-log and next-day-function details materially cited. | PARTIAL: all six sources carry access dates, but S6 NIA is not cited in the reader body (the body instead cites an unlisted NHS page). NIA returns 405 to this automated request, not a confirmed dead URL. | FAIL — citation traceability and manifest gate. |
| b010 | PASS: 3,729 Hangul; 3/3 routes; NIAMS/BHOF material details materially cited. | FAIL: S6 CDC `https://www.cdc.gov/osteoporosis/about/index.html` returned HTTP 404 and is not reader-cited. | FAIL — dead evidence and manifest gate. |
| b014 | PASS: 4,318 Hangul; 3/3 routes; NIDDK 2–3-day diary and NHLBI sleep-apnea context materially appear with inline citations. | PASS: 6/6 dated records and all listed URLs are reader-visible (S1/S5 share the current NIDDK diagnosis URL); all checked URLs, including the replacement for the former AUA S5, returned HTTP 200. | PARTIAL — blocked only by manifest completion/strict audit. |

## Fresh evidence

### Byte-safe encoding and body gate

Each MDX byte stream was decoded with `.NET UTF8Encoding(false, true)`. After stripping frontmatter, Markdown link URLs, and raw URLs, the conservative literal `U+AC00–U+D7A3` count was as follows. Samples were also inspected as decoded Unicode code points; for example b002 begins `U+B9C8 U+C9C0 U+B9C9 ...`, b003 `U+C5F4 U+C774 ...`, b005 `U+C0C8 U+BCBD ...`, b010 `U+AC74 U+AC15 ...`, and b014 `U+C0C8 U+BCBD ...`, which are ordinary Hangul syllables rather than a console-decoding artifact.

| ID | UTF-8 | Visible Hangul | Numeric entities | U+FFFD | C1 controls | Mojibake heuristic |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| b002 | valid | 3,763 | 0 | 0 | 0 | 0 |
| b003 | valid | 3,833 | 0 | 0 | 0 | 0 |
| b005 | valid | 3,662 | 0 | 0 | 0 | 0 |
| b010 | valid | 3,729 | 0 | 0 | 0 | 0 |
| b014 | valid | 4,318 | 0 | 0 | 0 | 0 |

### Research, material details, and reader citations

Every research packet parses, has four research runs, six sources, and an access date of `2026-08-11` on each source. The explicit material details are present in readable cited prose: b002 preserves observed colour/amount and medication-context notes; b003 separates heat symptoms, cardiac sensation, and urgent signals; b005 separates heat/voiding/pain/worry and next-day function; b010 preserves measurement context and painless vertebral-fracture caution; b014 preserves the 2–3-day bladder diary and the non-diagnostic sleep-apnea context.

Reader-visible research URLs: b002 6/6, b003 6/6, b005 5/6 (S6 absent), b010 5/6 (S6 absent), b014 6/6 after source-URL deduplication. The b014 replacement is the current NIDDK diagnosis URL and returned 200. Live GET checks yielded 200 for all b002 and b014 URLs, all NIH/NIAMS/USPSTF/BHOF URLs except b010 S6, and b003 NHS/NHLBI URLs. AHA returned 403 to automated retrieval for S3–S5; this is access control rather than evidence of a dead page. NIA returned 405 for b005 S4/S6; also not a 404/dead-page result.

### Current internal routes

The route inventory was extracted from the current `content/editorial.ts`. Each draft has exactly three `/article/` targets, and all 15 targets resolve to a current slug. This includes the repaired targets previously reported as broken.

### QA arithmetic

All five QA files are JSON-valid and state `status: done`, `score: 99`; their five category values independently sum to 99; all recorded hard-gate booleans are true; and each contains one explicit deducted category plus a nonempty reason. These QA statements cannot override the independent failures above, especially b010's fresh HTTP 404.

### Cross-article distinction

Raw decoded article bodies were independently compared using seven-Hangul-character shingles against the five focus drafts and the existing completed batch drafts. The largest observed Jaccard overlaps were b002/b001 `0.015357` (110 shared shingles), b003/b017 `0.008674` (69), b005/b014 `0.007305` (58), b010/b009 `0.008691` (63), and b014/b005 `0.007305` (58). The five focus-pair maximum is b005/b014 at `0.007305`. This is low raw-text overlap and supports semantic distinctness; their openings, structures, visual artifacts, and reader jobs are also materially different.

### Strict manifest audit

The real shared `output/wonon/batch-20/manifest.json` remains at `done: 6`; b002/b003/b005/b010/b014 are all `pending`, lack draft/research/QA paths and completion metadata, and therefore cannot prove release readiness. Its strict audits pass only because they exclude these five pending rows.

An isolated temporary candidate manifest was constructed from the current draft/research/QA artifacts; the shared manifest was not touched. Both commands were run with `--strict --fail-on-warning`:

```text
python .../manifest.py audit --manifest <temporary candidate> --window 5 --strict --fail-on-warning   -> exit 2
python .../manifest.py audit --manifest <temporary candidate> --window 20 --strict --fail-on-warning  -> exit 2
```

The audit reports missing persisted `body_shingle_hashes` on candidate rows and a draft-similarity warning caused by the manifest representation; independently recomputed raw MDX shingles above do **not** show substantive prose overlap. Regardless of that representation issue, a non-zero strict-audit exit is a hard release failure. The shared manifest must be updated with the actual completion fields and regenerated shingle hashes, then audited again without warnings.

## Acceptance criteria

| Criterion | Status | Evidence |
| --- | --- | --- |
| UTF-8 Korean; no entities, U+FFFD, C1, or mojibake; Hangul >=3,500 | VERIFIED | Throwing byte decode, code-point samples, and 3,662–4,318 visible-Hangul counts. |
| 4 research runs, 6 dated sources, official/primary YMYL basis | PARTIAL | All packets meet count/date requirements, but b010 S6 is dead. |
| Live research URLs, including b014 replacement | PARTIAL | b014 replacement is live HTTP 200; b010 CDC S6 is HTTP 404. |
| Exact material details and reader-visible citations | PARTIAL | All material details appear with citations; b005/b010 omit listed S6 from reader citations. |
| Three valid internal links | VERIFIED | 15/15 targets exist in current route inventory. |
| QA score exactly 99 with one explicit deduction | VERIFIED as metadata | Every QA category sum is 99 with a documented one-point deduction; fresh evidence still overrides b010's stale hard-gate assertion. |
| Cross-article distinctness | VERIFIED | Max seven-Hangul-shingle Jaccard 0.015357 across checked corpus. |
| Strict temp-manifest audit with no warnings | FAIL | Window 5 and window 20 `--strict --fail-on-warning` both exit 2; real manifest excludes the five candidates. |

## Required repairs

1. Replace/remove b010 S6 with a current live official source, update the claim ledger accordingly, and cite it in reader-visible prose if retained.
2. Either cite b005 S6 in reader-visible prose where it materially supports a statement or remove/remap it; perform the same source-to-body reconciliation for every b010 source after S6 replacement.
3. Persist each article's actual paths, score, structure/visual/opening/section/CTA metadata, and generated body-shingle hashes in the shared manifest; do not rely on the temporary eligibility simulation.
4. Rerun strict manifest audits with `--window 5` and `--window 20` until both return exit 0 with no warnings, then independently recheck the source URLs and b010 citation mapping.

## Recommendation

**REQUEST CHANGES.** The text-encoding repair is verified, but the live-source and strict-manifest hard gates prevent approval.
