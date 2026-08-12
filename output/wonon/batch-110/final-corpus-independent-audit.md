# Batch-110 final independent frozen audit

- Audited: 2026-08-12 KST against the frozen current filesystem.
- Scope: all 50 manifest rows and their declared draft, research, and QA packets.
- Write scope: this report only. No corpus, site, catalog, or schedule artifact was modified.

## Verdict: PASS

All required strict corpus gates passed. The batch is eligible for the separate integration and scheduling decision; this audit did not perform either action.

## Fresh reproducible method

Every declared packet was decoded as UTF-8 and re-encoded byte-for-byte. The scan rejected byte-decoding failures, U+FFFD, and literal `??` corruption markers.

For the prose-only measure, the parser removed frontmatter, headings, list rows, tables, fenced code, Markdown links and URL syntax, footnote-definition rows, and the final reader-reference block. The final reader-reference block begins at the last H3 matching `참고...자료`, `출처...자료`, or `확인...자료`. It then counted Hangul code points matching `[\uAC00-\uD7A3]`.

For every article, the audit compared visible pre-reference H2 headings with `research.data_points[].supports_section` as an exact one-to-one set: identical membership, equal cardinality, and no duplicate mapping values. Internal links were extracted from the same pre-reference reader-visible body, required to be 3--5 distinct `/article/` routes, and resolved against the current longform draft directories used by `content/longform.ts` plus static editorial slugs.

Every research source was required to have an ISO `YYYY-MM-DD` `source_date`, a `source_role` of exactly `official` or `primary`, and its declared URL visibly present before the final reader-reference block.

Finally, a fresh curl sweep covered every unique declared source URL with `curl.exe -L`, Chrome-like User-Agent and `Accept` headers, 12-second connect timeout, 35-second total timeout, and ten concurrent requests. The strict retrieval condition was final HTTP 200.

## Gate results

| Gate | Result | Fresh evidence |
|---|---|---|
| Packet alignment | PASS | 50 manifest rows; 50 drafts, 50 research packets, and 50 QA packets present. |
| QA artifact validity | PASS | 50/50 are `done`; every score is at least 95; declared category sums equal scores; all hard-gate values are literal boolean `true`. |
| UTF-8 / corruption scan | PASS | 150 packet files round-trip as UTF-8; zero U+FFFD, literal `??`, or decoding failures. |
| Prose-only Hangul >=4,300 | PASS | 50/50 pass the documented parser. |
| Visible H2/data-point exact one-to-one map | PASS | 50/50 pass exact membership, cardinality, and duplicate-map checks. |
| Current internal routes | PASS | 50/50 have 3--5 distinct reader-visible `/article/` routes; all resolve against the current runtime catalog inputs. |
| Source metadata | PASS | 262/262 records have full ISO dates and roles restricted to `official` or `primary`. |
| Reader-visible source use before references | PASS | 262/262 declared source URLs occur before the final reader-reference block. |
| Redirect-following GET | PASS | Fresh Chrome-like `curl -L` sweep: 248/248 unique declared source URLs returned final HTTP 200. |

## Recommendation

**APPROVE THE CORPUS GATE.** Keep this frozen packet set unchanged until the separately authorized catalog integration and five-hour scheduling work begins; rerun this audit if any draft, research, QA, or source URL changes.
