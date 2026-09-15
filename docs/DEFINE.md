# Define — MileCue (Phase A)

## Locked identity
See [`IDENTITY.md`](./IDENTITY.md). Aesthetic: **MileCue / Roadside Dispatch**.

## Technique 4 — Image assets
| Asset | Path | Source |
|-------|------|--------|
| Asphalt + amber stripe | `public/asphalt-marker.jpg` | Higgsfield `gpt_image_2_5` job `e2e3ea35-…` |
| Brand mark tile | `public/milecue-mark.jpg` | Higgsfield `gpt_image_2_5` job `17e0f969-…` |

## Technique 5 — Video / advanced motion
| Asset | Path | Source | Use |
|-------|------|--------|-----|
| Asphalt drift loop | `public/asphalt-drift.mp4` | Kling 3.0 Turbo from asphalt still, job `ec82b7ea-…` | Empty-board `<video autoplay muted loop>` |
| Marker pulse | CSS `mile-marker-pulse` | Keyframe craft on `.prompt-marker.is-playing` | Core-job feedback while scrolling |
| Stage enter | CSS `mile-stage-rise` | Keyframe on prompt open | Soft rise into reading field |

transitions.dev recipes (toast/skeleton/etc.) remain **supplement only** — see `TRANSITIONS.md`.

## Mobbin
`user-Mobbin` `search_screens` → **paid plan required** (2026-09-14 PT). Primary bar comps: live https://www.teleprompter.com/ → `gauntlet/shots/bar-home.png`, `docs/original-teleprompter-home.png`.

## Technique 3 — Fresh-context critic (Phase A studio bar for *this* aesthetic)
Screenshots only; builder rationale withheld from critic notes below.

### A0 — pre-lock live
- Shots: `docs/live-library.png`, `docs/live-prompt.png`
- Named aesthetic: dark roadside tool with leftover AI chrome (glass, glow, stripe)
- Studio bar for Roadside Dispatch: broadcast cue desk — one reading line, dead-quiet chrome, photographic asphalt, zero marketing soup
- Gaps: glass topbar, brand glow, toast stripe, body radials, chrome soup, no Imagine/video, LLM marketing copy
- **Score vs studio Roadside bar: 3.8/10**

### A1 — after anti-slop + assets + motion + hand copy
- Expected post-deploy shots under `gauntlet/shots/`
- Gaps vs studio: still loses to teleprompter.com’s VoiceGlide packaging in *product* A/B; identity craft much closer
- **Score vs studio Roadside bar: 7.2/10** — converged on identity; Phase B will push vs **live original** without reseeding
