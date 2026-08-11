# Persona Writer Audit Summary

- Decision: CONTINUE
- Stop reason: none
- Site: wonon
- Target: nextjs
- Total: 20
- Done: 0
- Review needed: 0
- Failed: 0
- Blockers: 0
- Review signals: 0

## Blocking Issues

- Planning gaps: 0
- Duplicate angle/search-intent risks: 0
- Title template risks: 0
- Article contract risks: 0
- Keyword diversity risks: 0
- Content template risks: 0

## Top Missing Planning Fields

- None

## First Fix Targets

- None

## Next Commands

```powershell
python .\scripts\manifest.py repair-sheet --manifest 'output\wonon\batch-20\manifest.json' --out 'output\wonon\batch-20\repair-sheet.csv'
python .\scripts\manifest.py export-map --manifest 'output\wonon\batch-20\manifest.json' --out 'output\wonon\batch-20\title-contract-map.csv'
python .\scripts\manifest.py import-map --manifest 'output\wonon\batch-20\manifest.json' --csv 'output\wonon\batch-20\title-contract-map.csv'
python .\scripts\manifest.py audit --manifest 'output\wonon\batch-20\manifest.json' --window 0 --strict --fail-on-warning
```
