# Batch 30 Phase-B contract audit — third-pass repair

Status: **READY FOR INDEPENDENT REVIEW; NOT AUTHORIZED FOR DRAFTING YET**

Generated: 2026-08-11 16:40 KST

## What changed

- Replaced the corrupted, placeholder-filled contract generator with a UTF-8 generator.
- Rebuilt all 30 contracts around distinct reader situations, decision moments, reader artifacts, boundaries, and information architectures.
- Reframed high-risk rows `a003`, `a006`, `a023`, `a026`, and `a028`; added explicit separations from legacy and batch-20 overlaps for `a002`, `a003`, `a006`, `a014`, `a016`, `a018`, `a021`–`a024`, `a026`–`a028`, and `a030`.
- Added 2–4 preliminary official-document targets per contract. These are research targets, not claims asserted in a draft.

## Validator evidence

```text
node .\output\wonon\batch-30\rewrite-contracts.cjs
rebuilt 30 contracts; UTF-8 manifest and CSV synchronized

node .\output\wonon\batch-30\validate-contracts.cjs
PASS: 30 contracts | 90 evidence targets | 30 unique architectures/artifacts | zero placeholders/broken tokens

replacement: 0
csvReplacement: 0
utf8Korean: true
articles: 30
```

`validate-contracts.cjs` rejects: missing Phase-B fields, replacement characters or `??`, malformed Korean particle joins identified by the critic, incomplete research targets, duplicate artifacts, duplicate architectures/section-role sequences/FAQ tuples/CTAs, high intro-frame shingle similarity, and named high-risk legacy/batch-20 overlap gaps.

## Next gate

An independent critic must read the regenerated CSV and manifest, test semantic separation (not only validator output), and either approve the five-article dry run or return precise repairs. No article prose has been created in this phase.
