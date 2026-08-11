# Wave 3 independent audit — final revalidation

Audited: 2026-08-11 KST. Revalidation scope: repaired issues for b004, b006, b007 and consistency checks for b011 and b015. Drafts, shared manifest, and site code were not modified by this audit.

## Final verdict

| Article | Status | Fresh evidence |
| --- | --- | --- |
| b004 | **PASS** | All three authored internal links are registered exactly once in `content/editorial.ts`: menopause-when-to-see-a-doctor, hot-flash-daily-record, health-checkup-questions. |
| b006 | **PASS** | All three authored internal links are registered exactly once: sleep-after-45, women-sleep-apnea-menopause-signs, menopause-when-to-see-a-doctor. |
| b007 | **FAIL** | The MedlinePlus replacement is live and mapped in research/front matter, but it is not reader-visible in the draft's rendered body. `content/longform.ts` parses only the typed fields and discards `readerSources`; the body contains only S1/S2 citations and no `restlesslegs.html` link. |
| b011 | **PASS** | Prior-pass packet remains byte-safe, has three registered internal links, and retains complete 99-point QA fields. |
| b015 | **PASS** | Prior-pass packet remains byte-safe, has three registered internal links, and retains complete 99-point QA fields. |

Overall result: **FAIL**. A final batch PASS cannot be issued until b007 makes the new MedlinePlus source a rendered reader-visible citation (or removes the source from the reader-source contract).

## Fresh acceptance evidence

### Internal routes: 15 of 15 registered

Each authored `/article/<slug>` link was extracted from the five MDX bodies and checked against an exact `slug: '<slug>'` entry in `content/editorial.ts`.

| Article | routes checked | registered |
| --- | --- | --- |
| b004 | menopause-when-to-see-a-doctor; hot-flash-daily-record; health-checkup-questions | 3/3 |
| b006 | sleep-after-45; women-sleep-apnea-menopause-signs; menopause-when-to-see-a-doctor | 3/3 |
| b007 | sleep-after-45; women-sleep-apnea-menopause-signs; health-checkup-questions | 3/3 |
| b011 | bone-health-small-steps; health-checkup-questions; gsm-dryness-urinary-signs | 3/3 |
| b015 | gsm-dryness-urinary-signs; health-checkup-questions; bone-health-small-steps | 3/3 |

### b007 source replacement

- Fresh HTTP check: `https://medlineplus.gov/restlesslegs.html` returned **200**.
- The replacement is consistently mapped as `S3` in `research/b007.json` and as `[S3 MedlinePlus 하지불안증후군]` in the draft front matter.
- It is **not** reader-visible under the current rendering contract. `LongformArticle` receives only `longform.body`; `LongformArticle`'s type and `parseDraft()` omit `readerSources`; a body-only search found no MedlinePlus URL or S3 citation. This is a release-blocking traceability gap, not a transport failure.

### Byte safety, research packet, and QA consistency

Raw bytes were decoded with .NET strict UTF-8. Visible Hangul was conservatively counted after removing front matter, URLs, HTML tags, and Markdown punctuation. Every research packet still has five dated official sources, four runs, two article-specific details, and zero unresolved claims. QA category values sum to 99, every QA has status `done`, all QA hard-gate values are true, and each retains exactly one named deduction with a reason.

| Article | UTF-8 | visible Hangul | U+FFFD / C1 / entities / mojibake | official + dated sources | runs / details / unresolved | QA score sum / hard-gate failures |
| --- | --- | ---: | --- | --- | --- | --- |
| b004 | PASS | 3,735 | 0 / 0 / 0 / 0 | 5 / 5 | 4 / 2 / 0 | 99 / 0 |
| b006 | PASS | 3,715 | 0 / 0 / 0 / 0 | 5 / 5 | 4 / 2 / 0 | 99 / 0 |
| b007 | PASS | 3,705 | 0 / 0 / 0 / 0 | 5 / 5 | 4 / 2 / 0 | 99 / 0 |
| b011 | PASS | 3,837 | 0 / 0 / 0 / 0 | 5 / 5 | 4 / 2 / 0 | 99 / 0 |
| b015 | PASS | 3,828 | 0 / 0 / 0 / 0 | 5 / 5 | 4 / 2 / 0 | 99 / 0 |

### Temporary-artifact audit

`qa/wave3-temp-manifest.json` is absent. A fresh workspace scan for `*temp*` and `*tmp*` files outside `node_modules` returned no results.

## Required repair

Add a visible in-body b007 citation to `https://medlineplus.gov/restlesslegs.html` that supports the surrounding claim, or extend the typed longform/rendering contract so `readerSources` is rendered to readers. Then rerun the source-visibility and route/byte/QA checks. No other Wave 3 repair is currently required by this audit.
