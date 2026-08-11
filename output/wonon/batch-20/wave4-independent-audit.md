# Wave 4 independent audit — b008, b012, b018, b020

Audited: 2026-08-11 KST. This is a fresh, independent re-verification of the
current draft, research, and QA packets. The batch manifest is deliberately
excluded from the readiness verdict: leader promotion is the authorized
post-verification step.

## Verdict

**PASS — all four editorial packets are ready for leader manifest promotion.**

The repaired traceability locators and b020 KDCA source were verified directly.
The four triples stayed stable through a 35-second re-read after validation.

## Fresh evidence

| ID | draft SHA-256 prefix | visible Hangul | U+FFFD / entity / CJK corruption | exact claim locators | reader-visible sources | registered internal routes | QA score / sum |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| b008 | `be03ec01b54d` | 3,868 | 0 / 0 / 0 | 6 / 6 | 6 / 6 | 3 / 3 | 99 / 99 |
| b012 | `bcda787cf903` | 3,801 | 0 / 0 / 0 | 5 / 5 | 5 / 5 | 3 / 3 | 99 / 99 |
| b018 | `64d5340eb638` | 3,982 | 0 / 0 / 0 | 6 / 6 | 6 / 6 | 3 / 3 | 99 / 99 |
| b020 | `762d5a0e8137` | 3,918 | 0 / 0 / 0 | 6 / 6 | 6 / 6 | 3 / 3 | 99 / 99 |

The encoding check decoded source bytes as UTF-8 and inspected Unicode code
points; it did not rely on PowerShell console rendering. Each draft exceeds
the conservative 3,500 visible-Hangul threshold. All eight JSON packets parse
successfully; every research source has a source date and accessed date, and
no source date is later than 2026-08-11.

## Repaired traceability and source checks

- b008: all six `supports_section` values now exactly match visible headings,
  including the numbered sleep-pattern headings. All six NHLBI citations are
  reader-visible and returned HTTP 200.
- b018: all six data-point locators now exactly match visible headings; all
  five external citations and the one internal context source are visible.
- b020: all six locators exactly match visible headings. The failed National
  Cancer Information Center URL was replaced with the reader-visible KDCA URL
  `https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5296`.
  It maps to S5's cited safety/official-context claim and returned HTTP 200.
- Fresh live URL run: **21 / 21** distinct external research URLs returned HTTP
  200 (including the ASCCP redirect to its canonical patient-resources page).

Every draft contains exactly three distinct `/article/` links. All 12 targets
are current registered slugs in `content/editorial.ts`; no extra or unregistered
route was found.

## Cross-batch regression check

Against all 16 currently completed rows, no substantive seven-token editorial
overlap was found for b008 or b012. b018's maximum was 6 / 1,284 shingles
(0.467%) and b020's was 3 / 1,277 (0.235%); both are non-material common
phrasing. Shared b008/b012 matches were only repeated inline callout CSS and
were excluded from editorial-overlap assessment.

## Recommendation

**APPROVE packet readiness and proceed with the leader-owned manifest
promotion.** No article, shared manifest, or site file was changed by this
audit.

