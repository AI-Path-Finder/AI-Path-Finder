# Orion AI

A modern AI-native SaaS web application that helps companies discover, prioritize, and evaluate AI implementation opportunities.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Premium landing page** — Futuristic SaaS design with animated floating opportunity cards
- **Business discovery wizard** — Typeform-inspired multi-step onboarding flow
- **AI opportunity detection** — Simulated analysis engine generating ranked recommendations
- **Prioritization matrix** — Interactive 2×2 matrix (value vs. difficulty) with detail modals
- **ROI simulator** — Dynamic calculator with premium Recharts visualizations
- **Executive recommendation** — Final summary with reasoning and next steps

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Recharts
- Supabase (optional persistence)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product Flow

1. `/` — Landing page with hero and floating AI opportunity cards
2. `/onboarding` — 7-step discovery wizard
3. `/analysis` — AI analysis simulation + opportunity cards
4. `/prioritize` — Interactive prioritization matrix
5. `/roi` — ROI calculator with charts
6. `/recommendation` — Executive summary and final recommendation

## Supabase Setup (Optional)

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor
3. Add credentials to `.env.local`

Without Supabase, assessment data persists in `localStorage`.

## Deploy

Deploy to [Vercel](https://vercel.com) with one click. Set environment variables if using Supabase.

## License

MIT
