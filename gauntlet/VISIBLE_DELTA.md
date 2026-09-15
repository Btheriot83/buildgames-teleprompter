# Visible delta — MileCue (visibility rework)

**Honest note:** Previous Phase B gauntlet failed Brandon’s eye test — no unmistakable change vs the old dark generic teleprompter. This pass amplifies locked **Roadside Dispatch** (asphalt/amber/sand, Barlow Condensed + IBM Plex) until the live site is obvious in under 3 seconds. No aesthetic reseed.

**Demo:** https://buildgames-teleprompter.vercel.app

## Before / after paths

| View | Before (failed gauntlet) | After (this pass) |
|------|--------------------------|-------------------|
| Library | `gauntlet/shots/before-live-library.png` | `gauntlet/shots/after-live-library.png` |
| Stage | `gauntlet/shots/before-live-stage.png` | `gauntlet/shots/after-live-stage.png` |
| Local verify | `gauntlet/shots/before-library.png` / `before-stage.png` | `gauntlet/shots/local-library.png` / `local-stage.png` |

## What changed that you can see (5 bullets)

1. **Full-bleed asphalt field + hero band** — tiled asphalt texture behind the whole library; full-width `asphalt-drift.mp4` hero with amber highway stripe through billboard copy (“EYES ON THE AMBER LINE”).
2. **Giant amber READ LINE on stage** — ~18px painted amber bar with glow, chevrons, and READ/LINE mile-marker caps (was a thin 2px hairline).
3. **Barlow Condensed billboard titles** — MileCue brand, hero title, dispatch board heading, and cue title input at condensed uppercase billboard scale (sand on asphalt).
4. **Dispatch ticket / mile-marker cards** — sand ticket-paper cards with black “01 MI” mile stubs and perforated stubs (not generic SaaS rows).
5. **Night-road stage** — full-bleed `asphalt-marker.jpg` road with center stripe + grit overlay (not a flat `#121110` panel).

## Assets added
- `public/asphalt-tile.jpg` — AI asphalt grit tile
- `public/ticket-paper.jpg` — dispatch ticket paper
- `public/amber-stripe.jpg` — painted amber stripe texture
- `public/night-road.jpg` — darkened road hero poster
