# Batch-110 Wave 3 independent final QA

Audited 2026-08-12 04:23 KST. Scope: d007, d009, d010, d011, d012. Only Wave 3 QA artifacts changed.

## Verdict

PASS — all five drafts are `done`, score at least 95, exact category sums, and strict boolean hard gates all `true`.

| ID | Score | Visible Hangul | H2 | Internal routes | Runs | Sources | Max 7-token Jaccard |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| d007 | 97 | 4,576 | 5 | 3 | 5 | 5 | 0.0019311233 |
| d009 | 97 | 4,343 | 5 | 3 | 5 | 5 | 0.0023403544 |
| d010 | 96 | 4,123 | 5 | 3 | 5 | 6 | 0.0028726460 |
| d011 | 96 | 4,115 | 5 | 3 | 5 | 6 | 0.0028726460 |
| d012 | 97 | 5,162 | 6 | 3 | 5 | 5 | 0.0017784553 |

Fresh evidence: all 27 cited official/primary URLs returned HTTP 200 during this audit; every source has date, accessed date, role, and `used_for`; every authored internal route is registered in `content/editorial.ts`; all substantive H2s have an exact `data_points[].supports_section` mapping with no orphan mapping; and all files parse as UTF-8 with no replacement character. The 7-token normalized comparison used 97 documents per target, including the current five and the available predecessor corpus documents; all maxima remain far below the policy threshold.

Repairs re-audited: d009 gained its missing heat-and-swelling mapping; d010/d011 gained complete research fields, a third current internal route, and all-H2 mappings; d010 detail claims were synchronized with matching body sentences; d012 mapped all six H2s exactly.
