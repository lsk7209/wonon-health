# RISKS

# Risk Notice — Search Console API Sitemap Submission

Task: Authenticate with an existing Google credential under `D:\env` and submit the canonical sitemap to the matching Search Console property.
Why Needed: The user explicitly requested real GSC sitemap activation and success verification.
Impact Scope: Only the matching `wonon.ehon365.kr` GSC property and `https://wonon.ehon365.kr/sitemap.xml`; no unrelated properties, DNS, GA4, or AdSense settings.
Rollback: Delete only the submitted sitemap feed through the Search Console API if the wrong property/path is detected. Credential files remain read-only.
Safer Alternative: Public sitemap validation only, which would not satisfy the requested GSC success outcome.
Approval Needed: Explicitly authorized by the user in this thread.

| Risk | Impact | Likelihood | Mitigation | Trigger | Status |
|---|---|---|---|---|---|
| Medical misinformation or implied diagnosis | high | medium | Official sources, non-diagnostic wording, visible care boundaries, no invented reviewer | content review | active |
| DNS change disrupts parent domain | high | low | Add only `wonon` record, capture existing state, never replace apex records | DNS execution | active |
| Deployment/account mutation | medium | medium | Use authenticated CLI, exact project/domain only, record rollback | deploy | authorized by user |
| Secret exposure | high | low | Never print tokens/key contents; use existing profiles | all phases | controlled |
| AdSense/scaled-content quality risk | high | medium | Small curated launch set, trust pages, no bulk thin content | audit | active |
| Thirty-article batch becomes templated or cannibalizes existing pages | high | medium | Full contract map first, five-article dry run, rolling independent audits, zero exact semantic overlap gate | title/draft audit | active |
| Scheduled articles leak through direct URLs, sitemap, search, or stale cache | high | medium | Central publication predicate, request-time evaluation, frozen-time tests across all discovery surfaces | scheduler integration | active |
| Five-hour schedule uses the wrong timezone or ordering | medium | medium | Store ISO timestamps with `+09:00`, preserve manifest order, verify first/last and boundary timestamps | schedule generation | active |

# Risk Notice

Task: Create a Vercel project/domain mapping and a new DNS record for `wonon.ehon365.kr`.
Why Needed: Required for the requested public launch.
Impact Scope: New project and subdomain only; parent domain records must remain unchanged.
Rollback: Remove the new Vercel domain/project mapping and only the newly-created `wonon` DNS record.
Safer Alternative: Local-only build, which would not meet the requested outcome.
Approval Needed: Already explicitly authorized by the user's launch request.

# Risk Notice — Scheduled Production Publishing

Task: Integrate and deploy thirty new articles with automatic five-hour release timing.
Why Needed: The user explicitly requested continuing publication at five-hour intervals after the public baseline.
Impact Scope: Article visibility, direct routes, search/topic/list pages, sitemap, and Vercel production deployment; DNS and AdSense accounts are excluded.
Rollback: Promote the previous Vercel deployment and retain the schedule/QA artifacts for correction.
Safer Alternative: Keep all thirty as local drafts, which would not satisfy the requested scheduled-publication outcome.
Approval Needed: Explicitly authorized in the current user request.
