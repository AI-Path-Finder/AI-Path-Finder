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

## Deploy to GitHub Pages

The project is configured as a static Next.js export and deploys automatically
to GitHub Pages from the `master` branch.

1. Create the GitHub repository `ai-path-finder/AI-Path-Finder`.
2. Push this project to its `master` branch.
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. Wait for the `Deploy to GitHub Pages` workflow to finish.

The application will be available at:

`https://ai-path-finder.github.io/AI-Path-Finder/`

To verify the same static export locally:

```bash
npm run build:pages
```

The generated website is written to `out/`.

Supabase remains optional. To enable persistence when deploying through GitHub
Actions, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
repository variables and expose them in the build step. Without them, the app
uses browser `localStorage`.

## License

MIT
