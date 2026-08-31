# YatraX Project Guide

## Overview

YatraX is a Smart India Hackathon 2026 tourism prototype that matches unused rooms, seats, guides, and activity slots with travellers seeking affordable, lower-crowd trips. Predefined marketplace, capacity, wallet, vendor, and impact figures are always presented as simulated demo data. Only Open-Meteo responses are current API data.

## Architecture

- `src/routes/index.tsx` mounts the single-page application.
- `src/components/YatraXApp.tsx` contains the reusable UI sections and interaction flows.
- `src/data/demoData.ts` contains typed, predefined prototype datasets.
- `src/services/weather.ts` handles Open-Meteo geocoding, current weather, and rule-based advisories.
- `src/utils/storage.ts` manages browser demo state and optional event persistence.
- `src/routes/api/demo-events.ts` validates and stores selected prototype events.
- `db/schema.ts` is the Drizzle schema source of truth.
- `netlify/database/migrations/` contains generated Netlify Database migrations.
- `src/styles.css` defines the visual system, responsive layouts, motion, and accessibility states.

## Conventions

- Use TypeScript and React function components.
- Keep user-generated text rendered through React rather than raw HTML.
- Keep simulated values in `src/data/demoData.ts` and label them accurately in the interface.
- Never describe predefined data as live, real-time, or AI-generated.
- Preserve one-time safeguards for cashback and accepted marketplace offers.
- Persist browser-specific prototype state through the `yatrax:` localStorage prefix.
- Log durable prototype events through `/api/demo-events`; never expose database credentials in client code.
- Use semantic controls, visible focus styles, and accessible labels.
- Respect `prefers-reduced-motion` when adding animation.

## Database Changes

Define schema changes in `db/schema.ts`, then generate a named migration into `netlify/database/migrations/` with Drizzle Kit. Do not hand-edit generated migration snapshots and do not create tables from application code.

## Visual Direction

The interface uses a dark navy travel-technology aesthetic with emerald, cyan, and soft-gold accents. Important headings use DM Serif Display; body and UI text use Plus Jakarta Sans. Preserve the scenic layered hero, glass panels, restrained glow, and low-clutter information hierarchy.
