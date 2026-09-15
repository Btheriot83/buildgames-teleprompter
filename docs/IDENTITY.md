# IDENTITY — MileCue (LOCKED)

**Frozen after Phase A.** Gauntlet rounds must not reseed or rename this world.

## Aesthetic name
**MileCue / Roadside Dispatch**

## Feel
Warm asphalt at dusk under one painted amber mile-marker stripe. Dispatch radio click when play starts. Text rolls like a road stripe under headlights. Confidence from the marker line — not badges.

## Palette
| Token | Hex | Use |
|-------|-----|-----|
| asphalt | `#12110f` | page field |
| asphalt-2 | `#1a1916` | chrome / sidebar |
| panel | `#23211c` | cards / inputs |
| line | `#3d3930` | borders |
| amber | `#e8952a` | marker, primary CTA |
| rust | `#b85428` | danger accent only |
| sand | `#d4c7ab` | display headings |
| fog | `#8f8878` | meta |
| ink | `#f2ebe0` | body |

**Never:** vibe purple (`#6366f1`–`#8b5cf6`), glass blur chrome, saturated glow shadows, blue→indigo gradients.

## Type
- Display: **Barlow Condensed** (uppercase titles)
- UI / prompt: **IBM Plex Sans**
- Meta: **IBM Plex Mono**
- Never: Inter, Geist, Space Grotesk, Fraunces-as-UI, Instrument Serif duo

## Materials / imagery
- Real Imagine assets: `public/asphalt-marker.jpg`, `public/milecue-mark.jpg`
- Motion: `public/asphalt-drift.mp4` (empty board loop) + marker pulse while playing
- No CSS mesh blobs as personality

## Motion rules
- Core job motion = rAF `translateY` scroll
- Marker pulse only while playing (subtle scaleY)
- Stage enter: short rise/blur clear (~520ms)
- transitions.dev recipes OK as feedback (toast, skeleton) — not a substitute for Imagine/video

## Copy voice
Short. Specific. Roadside/dispatch. No SaaS hype, no emoji, no fake stats.
Examples locked: “Empty board”, “Open stage”, “Cut for stage”, “Cue filed”.

## One job
Fullscreen scroll teleprompter + AI script tighten/format via `/api/tighten`.

## What we will NOT change in gauntlet
- Aesthetic name / seed direction
- Palette family (asphalt/amber/rust)
- Type pairing
- Product name **MileCue**
- Local-first storage model (no forced accounts)
