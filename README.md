# YatraX — Idle Capacity Exchange

YatraX is a complete tourism-technology prototype created for Smart India Hackathon 2026. It redirects travellers from overcrowded destinations toward suitable nearby places with unused hotel rooms, guide availability, cab seats, and activity slots. The application demonstrates incentives, reverse bidding, traveller safety, vendor recovery, and measurable destination impact without presenting simulated information as real-world data.

## Key Features

- Rule-based trip planner with validation and unique daily itinerary suggestions
- Tamil Nadu destination load and capacity dashboard with one-time redirect cashback
- Reverse-bid marketplace with verified simulated offers and single-offer acceptance
- Tourism Coin wallet, reward history, trip sharing, and transparent SOS demo behavior
- Vendor registration, idle-capacity listings, tourist requests, offers, bookings, and revenue metrics
- SIH-focused impact dashboard with animated progress and trend visualizations
- Current weather from Open-Meteo geocoding and forecast APIs with rule-based travel advice
- Responsive navigation, keyboard accessibility, reduced-motion support, and persistent demo safeguards

## Technology

- TanStack Start, React 19, and TypeScript
- Tailwind CSS 4 plus a custom responsive visual system
- Lucide icons
- Netlify Database with Drizzle ORM for prototype event persistence
- Browser localStorage for device-level demo state and one-time interaction safeguards
- Open-Meteo for keyless current weather data

## Local Development

Install dependencies and start the TanStack Start development server:

```bash
pnpm install
pnpm dev
```

For local Netlify platform emulation, run:

```bash
netlify dev --port 8889
```

Open the displayed local URL. No frontend API keys are required for weather data.

## Data Transparency

Marketplace offers, load scores, availability, balances, vendor performance, and impact metrics are predefined simulated demo data. Recommendations are rule-based, and AI integration is planned. Only weather returned by Open-Meteo is current API data.
