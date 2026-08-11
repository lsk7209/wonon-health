# Batch 60: Phase-B article contracts

This folder is a planning-only handoff for 30 Korean, middle-aged women's health articles. It does not add routes, drafts, schedules, or publication state.

- `manifest.json` is the persona-writer-compatible source of truth.
- `contracts.json` retains the full Phase-B contract fields and three evidence targets per article.
- `title-contract-map.csv` is the review/import surface.
- `build-contracts.cjs` deterministically rebuilds all generated artifacts as UTF-8.
- `validate-contracts.cjs` fails closed on missing fields, template/placeholders, invalid targets, duplicate contract surfaces, insufficient clusters, malformed CSV count, and exact current-corpus title collisions.

Run from the repository root:

```powershell
node .\output\wonon\batch-60\build-contracts.cjs
node .\output\wonon\batch-60\validate-contracts.cjs
```

Drafting guardrails: research each evidence target live before prose; retain the three YMYL boundaries; do not convert a contract into diagnostic, treatment, medication, supplement, test-selection, or publishing instructions.
