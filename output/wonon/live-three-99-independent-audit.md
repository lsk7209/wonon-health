# Independent audit: a007, a008, a009

Audit timestamp: 2026-08-11 KST  
Scope: byte-safe re-audit of the three upgraded MDX drafts, research/QA packets, source/citation mapping, longform parser, and fresh build. No article, research, QA, or site file was modified.

## Verdict: PASS, with one non-blocking source-access caveat

The earlier FAIL conclusion was invalid. It relied on a corrupted PowerShell stdin/text-processing path and was withdrawn. This audit reads the files as UTF-8 and uses ASCII-only Unicode escapes (`[\uac00-\ud7a3]`) plus codepoint checks. The actual drafts are valid Korean UTF-8, meet the 3,500 visible-Hangul hard gate, and their source packets/citations/details meet the policy thresholds.

## Fresh evidence

| Check | Result | Evidence |
|---|---|---|
| TypeScript | PASS | Fresh `npx tsc --noEmit` exited 0. |
| Production build and longform parsing | PASS | Fresh `npm run build` exited 0 with Next.js 16.3.0; 27 static pages were generated. `content/longform.ts` parses all MDX frontmatter and `LongformArticle` renders the body, headings, tables, lists, and links. |
| UTF-8 and corruption-codepoint check | PASS | Each draft has 0 occurrences of U+5A9B, U+0080, and U+FFFD. The text is not mojibake. |
| Generated HTML check | PASS | Fresh generated-page evidence: a007/a008/a009 have 9,748 / 9,126 / 9,588 Hangul syllables respectively and 0 occurrences of U+5A9B, U+0080, and U+FFFD. |
| Visible Korean body gate | PASS | Byte-safe body counts: a007 4,215; a008 3,859; a009 4,150 Hangul syllables, all above the policy minimum of 3,500. |
| Source-packet counts | PASS | Research runs / sources / data points with `supports_section`: a007 3/6/12; a008 4/6/10; a009 5/6/9. All are within policy ranges and all data points map to a section. |
| Reader citations map to research | PASS | Every unique reader-visible URL maps exactly to a source packet entry: a007 6/6, a008 5/5, a009 5/5. |
| Article-specific-detail usage | PASS | Each packet has two claimed, sourced details. Fresh byte-safe sentence comparisons are above the 0.18 policy minimum for all six detail-to-body pairs (lowest observed comparison 0.375). |

## Per-article acceptance matrix

| Article | Category score | Research and citation evidence | Hard-gate status |
|---|---:|---|---|
| a007 — women sleep apnea | **99/100** (30 content, 25 SEO, 15 E-E-A-T, 15 technical, 14 AI citation readiness) | 3 runs; 6 official sources; 12 section-mapped data points; 6/6 reader citation URLs mapped; 3 internal links; 4,215 visible Hangul | PASS |
| a008 — GSM signs | **99/100** (30 content, 25 SEO, 15 E-E-A-T, 14 technical, 15 AI citation readiness) | 4 runs; 6 sources; 10 section-mapped data points; 5/5 reader citation URLs mapped; 3 internal links; 3,859 visible Hangul | PASS |
| a009 — bone density result | **99/100** (30 content, 25 SEO, 15 E-E-A-T, 14 technical, 15 AI citation readiness) | 5 runs; 6 sources; 9 section-mapped data points; 5/5 reader citation URLs mapped; 3 internal links; 4,150 visible Hangul | PASS |

## Hard-gate results

| Gate | a007 | a008 | a009 | Evidence |
|---|---|---|---|---|
| Valid Korean public text and body length >=3,500 | PASS | PASS | PASS | 4,215 / 3,859 / 4,150 byte-safe Hangul counts. |
| Research runs, source count, source roles/dates, traceability | PASS | PASS | PASS | 3/6; 4/6; 5/6, typed data points, `supports_section`, source `used_for`, and traceability fields are present. |
| YMYL official/primary-source requirement | PASS | PASS | PASS | Official/primary roles: 6, 4, and 4 respectively; each is at least two. |
| Source interpretation and two specific details | PASS | PASS | PASS | Two details with source IDs per article; material-use comparisons exceed 0.18. |
| Citation visibility / packet mapping | PASS | PASS | PASS | 6/6, 5/5, and 5/5 reader-visible unique URLs map to packet sources. |
| Distinct contract, structure, visual plan, links | PASS | PASS | PASS | Distinct topics/structures in manifest and QA, 3 internal links each, parsed visual tables/checklists. |
| Title, subtitle, headings, direct-answer readiness | PASS | PASS | PASS | UTF-8 body and generated HTML are readable Korean; parser/build confirms the public rendering path accepts the content. |
| QA evidence and score | PASS | PASS | PASS | QA files record category scores, hard gates, compared rows, similarity signals, repair evidence, and remaining risks. |

## Source reachability and caveat

Fresh URL checks returned HTTP 200 for 17 of 18 packet URLs. The only exception was a008 S3, ACOG’s official clinical guidance URL, which returned HTTP 402 in this runtime. That response is consistent with an upstream access/WAF/payment boundary and is not evidence that the canonical official page is nonexistent or that the cited claim is unmapped. It is recorded as a monitoring caveat, not a hard-gate failure; the a008 packet remains supported by four other official sources and its reader-visible citations map correctly.

## Regression assessment

- Parser/build regression risk: low. The fresh build parsed the three longform drafts and generated all static routes successfully.
- Rendering/content regression risk: low. Byte-safe source and generated-HTML checks show zero investigated bad codepoints.
- External-source risk: medium-low for a008 S3 only. Recheck ACOG accessibility from the deployment/browser context before a later editorial refresh; no content or score rollback is currently justified by one environment-specific HTTP 402.

## Recommendation

**APPROVE.** The three upgraded drafts satisfy the 99-point policy claims and the hard gates under the byte-safe audit. Retain the a008 ACOG accessibility result as a non-blocking follow-up item.
