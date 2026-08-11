# EVIDENCE

## Validation Level

Level: 3

## Commands Run

| Command | Result | Notes |
|---|---|---|
| harness-init.py | PASS | size=large, domain=adsense-audit, created=2026-08-11T09:17:05+09:00 |
| ssh kang4 | PASS | Connected to server-1 shared account |
| uapi DNS parse_zone zone=ehon365.kr | SAFE FAIL | Account does not control this zone; no mutation |
| Resolve-DnsName ehon365.kr -Type NS | PASS | ns1 through ns4.hosting.co.kr |
| npm install | PASS | 30 packages, 0 vulnerabilities |
| npm run build | PASS | TypeScript and 22 static pages |
| project-stack-audit.py | PASS | Next.js/npm/Vercel, zero warnings/errors |
| ga4-auto-setup.py --inject | PASS | `G-3NJ07LPVXD` configured |
| adsense-auto-setup.py --inject --ads-txt | PASS | Auto ads and ads.txt configured |
| gh repo create/push | PASS | `lsk7209/wonon-health`, commits `ad2ad17` and `58f5f16` |
| vercel --prod | PASS | deployment `dpl_CDrE5eWBFxcVgQtufV7dXSoXqH6a`, 22 pages |
| vercel domains add/inspect | ACTION REQUIRED | exact record `A wonon.ehon365.kr 76.76.21.21` |
| public Vercel route smoke | PASS | home, articles, trust, robots, sitemap, ads.txt all HTTP 200 |
| canonical audit | FAIL then FIXED | per-route self canonicals added in `58f5f16` and redeployed |
| custom domain DNS | BLOCKED | NXDOMAIN; server-1 account does not control zone |

### 2026-08-11 09:42 KST - Third blocker audit

- `Resolve-DnsName wonon.ehon365.kr`: no A answer / NXDOMAIN.
- `curl https://hosting.co.kr`: connection timed out again.
- `vercel domains inspect wonon.ehon365.kr`: domain mapping exists, configuration remains invalid, exact required record remains `A wonon.ehon365.kr 76.76.21.21`.
- Conclusion: No meaningful in-scope progress is possible without authenticated authoritative DNS access; objective remains incomplete.

## Test Results

| Test | Result | Notes |
|---|---|---|

## Failed Checks

## Fixes Applied

## Completion Evidence

### 2026-08-11 10:14 KST - Site-development increment

| Check | Result | Evidence |
|---|---|---|
| `npm run build` | PASS | Next.js 16.3.0 compiled and generated 24 static pages, including `/search` |
| `npx tsc --noEmit` | PASS | No TypeScript errors |
| `git diff --check` | PASS | No whitespace errors; only Windows line-ending notices |
| Search experience | IMPLEMENTED | Keyword input, five quick filters, live result count, empty state, topic fallbacks |
| Symptom-led guide | IMPLEMENTED | Four private client-side paths, explicit non-diagnostic label, urgent-care warning |
| Article depth | IMPLEMENTED | Per-article key takeaways, today checklist, and three clinician questions for all six articles |
| Mobile navigation | IMPLEMENTED | Search remains visible; essential links retain 44px targets; compact 410px layout |

DNS verification is intentionally excluded from this increment at the user's direction.
