# Halo

> Reply to every review in your brand voice.

Halo is a review reputation manager. It pulls new reviews from Google Business Profile, Yelp, G2, and Trustpilot into one inbox, drafts a sentiment-aware reply in the business's brand voice with Claude, and posts the reply back to the source platform after the owner approves it.

Built as one of six portfolio products by Brady Sandmann.

## What's in this build

- Magic-link sign-in via Supabase Auth
- Three seed businesses (Sunrise Yoga, Carriage Lane Coffee, Beacon Roofing) auto-loaded for every new user
- 18 seed reviews across Google + Yelp, 5★/4★/3★/1★ mix
- Inbox split view with filters (all / new / replied / negative), per-business filter
- Claude-drafted replies, brand-voice-aware. Falls back to a deterministic local drafter if no API key is wired client-side
- Inline edit, regenerate, save, approve & post (sketch-mode), skip
- Per-business brand-voice editor at `/app/businesses`
- Row-level security on every table — users only ever see their own data

## Stack

- Vite + React 18 + TypeScript
- Tailwind 3 with a warm cream + amber palette
- Supabase (Postgres + Auth, schema `halo`, RLS on every table)
- Anthropic SDK (`@anthropic-ai/sdk`) — drafting calls happen client-side via the SDK with `dangerouslyAllowBrowser` for the demo. In production this lives behind a Vercel serverless route.

## Schema

Three tables in the `halo` schema (`businesses`, `reviews`, `drafts`). Every table has RLS — owning user only.

See `supabase/schema.sql` for the canonical version.

## Local dev

```bash
cp .env.example .env.local
# fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

## Deploy

Vercel project: `prj_XyTnTAXK1firhtOdf8uHZHvhyON4`. Build command `npm run build`, output `dist/`. Set the `VITE_*` env vars in the Vercel project settings before deploying.

## Brand notes

- Warm cream `#F7F5F0` background. Never pure black.
- Amber `#D97706` is the only accent on positive UI. Rose `#BE3E54` is reserved for 1-star markers.
- Source Serif 4 for display, Inter for body, JetBrains Mono for review metadata.
- Halo mark: concentric rings with a glow dot. Inline SVG, never bitmap.

## Future scope

Real Google Business Profile OAuth, real Yelp + G2 integrations, an Anthropic-backed serverless drafting route, response analytics, multi-team support, auto-post toggles per business.
