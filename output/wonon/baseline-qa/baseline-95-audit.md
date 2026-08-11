# Static baseline 95-point QA audit

Audited: 2026-08-12 KST

The six release-covered static catalog entries have one parseable QA packet each. Every packet is `done`, totals **95/100**, and declares every hard gate true.

| Slug | Score | Exact limitation |
| --- | ---: | --- |
| `menopause-when-to-see-a-doctor` | 95 | Three short body paragraphs; AI must retain consultation context. |
| `hot-flash-daily-record` | 95 | Record method is intentionally non-diagnostic and brief. |
| `sleep-after-45` | 95 | Not a full sleep-disorder assessment. |
| `bone-health-small-steps` | 95 | Does not individualize fracture-risk or exercise plans. |
| `health-checkup-questions` | 95 | Does not interpret a person's test values. |
| `national-screening-checklist-2026` | 95 | Eligibility and preparation require current official lookup. |

## Evidence and repairs

- All twelve source URLs in the six catalog rows returned HTTP 200 during this audit.
- Each visible static page already has three takeaways, three immediate actions, three clinician questions, a visible source box, Article JSON-LD, canonical metadata, and noindex handling for non-public routes.
- The only content-structure repair was a related-reading section with exactly three contextual internal links per baseline guide. This closes the corpus internal-link gate without changing schedules, publication eligibility, or medical claims.
- Originality is supported by six distinct reader jobs: consultation timing, symptom logging, sleep-habit review, bone-health preparation, result-question preparation, and official screening eligibility lookup. The audit did not claim a numeric prose-similarity threshold for these short static entries.

## Scoring method

Each row is scored `28 content + 23 SEO + 15 E-E-A-T + 15 technical + 14 AI citation readiness = 95`. The five-point deduction is intentional: four points for the concise static-body depth and one point for the risk that an extracted answer could omit the required individual-context caveat. The packets enumerate claim-to-source mappings and the applicable YMYL boundary.
