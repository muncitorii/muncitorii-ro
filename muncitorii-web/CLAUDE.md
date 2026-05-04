@AGENTS.md

# Muncitorii.ro

Marketplace pentru muncitori, handymen, contractori în România. Next.js 15 + React 19 + Tailwind 4. Pre-Supabase, mock data centralizată în `src/lib/`.

## Înainte de orice cod

Citește `DESIGN_SYSTEM.md` la rădăcină. Conține tokens, componente, structura paginilor, planul Sprint 0.

## Fișiere-cheie

- `DESIGN_SYSTEM.md` — spec complet design + plan
- `MUNCITORII_LAUNCH_READINESS.md` — ce trebuie pentru lansare beta
- `MUNCITORII_SUPABASE_INTEGRATION_PLAN.md` — schema DB + ordine migrare (Sprint 1, după Sprint 0)
- `src/lib/jobs.ts` — tipuri + mock pentru lucrări (template pentru `lib/workers.ts`)
- `src/components/dashboard-layout.tsx` — wrapper pentru paginile dashboard
- `homepage-preview-concept-v7.html` — referință vizuală + sursa logo SVG

## Direcție design

A+ : warm & human + premium discipline. Adaptat RO. Vezi `DESIGN_SYSTEM.md` pentru paletă (slate-blue 900 + terracotta accent), tipografie (Geist), reguli stricte.

## Status

Pre-Supabase, mock data, Sprint 0 (UI polish) în curs. NU integrăm DB înainte de finalizarea polish-ului.
