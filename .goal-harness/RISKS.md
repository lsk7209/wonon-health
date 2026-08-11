# RISKS

| Risk | Impact | Likelihood | Mitigation | Trigger | Status |
|---|---|---|---|---|---|
| Medical misinformation or implied diagnosis | high | medium | Official sources, non-diagnostic wording, visible care boundaries, no invented reviewer | content review | active |
| DNS change disrupts parent domain | high | low | Add only `wonon` record, capture existing state, never replace apex records | DNS execution | active |
| Deployment/account mutation | medium | medium | Use authenticated CLI, exact project/domain only, record rollback | deploy | authorized by user |
| Secret exposure | high | low | Never print tokens/key contents; use existing profiles | all phases | controlled |
| AdSense/scaled-content quality risk | high | medium | Small curated launch set, trust pages, no bulk thin content | audit | active |

# Risk Notice

Task: Create a Vercel project/domain mapping and a new DNS record for `wonon.ehon365.kr`.
Why Needed: Required for the requested public launch.
Impact Scope: New project and subdomain only; parent domain records must remain unchanged.
Rollback: Remove the new Vercel domain/project mapping and only the newly-created `wonon` DNS record.
Safer Alternative: Local-only build, which would not meet the requested outcome.
Approval Needed: Already explicitly authorized by the user's launch request.
