# Wave 2 independent QA audit

Re-audited 2026-08-11 22:18 KST: c012 mapping repair; c008, c009, c010, and c011 approvals retained.

| ID | Verdict | Score | Evidence-backed finding |
| --- | --- | ---: | --- |
| c008 | PASS | 99 | All hard gates pass: 3,647 visible Hangul, 5 substantive H2 sections, 3 registered internal targets, 5 dated role-tagged sources and runs, exact H2 mappings, visible citations, YMYL boundary, and material details. |
| c009 | PASS | 99 | All hard gates pass: 3,579 visible Hangul, 5 substantive H2 sections, 3 registered internal targets, 5 dated role-tagged sources and runs, exact H2 mappings, visible citations, YMYL boundary, and material details. |
| c010 | PASS | 99 | All hard gates pass: 3,643 visible Hangul, 6 substantive H2 sections, 3 registered internal targets, 5 dated role-tagged sources and runs, exact H2 mappings, visible citations, YMYL boundary, and material details. |
| c011 | PASS | 99 | All hard gates pass: 3,599 visible Hangul, 6 substantive H2 sections, 3 registered internal targets, 5 dated role-tagged sources and runs, exact H2 mappings, visible citations, YMYL boundary, and material details. |
| c012 | PASS | 99 | Mapping repair passes: its seven canonical research `h2_mapping` headings exactly match the seven visible substantive H2 sections; every data point support section is represented, and all remaining gates pass. |

Fresh validation evidence:

- UTF-8 reads completed with no replacement characters in all ten target artifacts (five drafts and five research JSON files).
- Each draft has at least 3,500 visible Hangul, exactly three internal article links whose slugs are registered in the existing corpus or Phase-B manifest, dated specific HTTPS sources with non-empty `source_role` and `used_for`, research runs, reader-visible footnotes, material source-backed details, and an explicit no-diagnosis/no-treatment YMYL boundary.
- c008–c012 have exact draft-H2-to-research mappings. The c012 re-audit verified seven canonical mappings with roles/evidence and representation of every `data_points[].supports_section` value.
- Fresh normalized seven-token shingle comparisons used the 50 available prior MDX drafts (the other nine of the documented 59 are editorial catalog records) plus all ten approved Batch-60 drafts. Best Jaccard scores: c008 0.00563, c009 0.00213, c010 0.00398, c011 0.00392, c012 0.00123; all are below the 0.18 same-cluster gate.

Checkpoint verdict: PASS. Wave 2 is 5/5 at 99/done with no remaining QA blocker.
