# IDENTITY — MileCue (LOCKED after Anshu r5 reseed)

**Frozen after Phase A (Cueglass Desk).** Gauntlet r5 rounds must not reseed or rename this world.

## Aesthetic name
**MileCue / Cueglass Desk**

Evolved from Roadside Dispatch: library keeps roadside clipboard skin; **stage** is hardware cueglass.

## Feel
Matte near-black cueglass at eye line. One thin amber hairline you trust. Soft dispatch click when Play starts. Text rolls under the line. Confidence from the read line — not badges, not asphalt wallpaper.

## Palette
| Token | Hex | Use |
|-------|-----|-----|
| asphalt | `#0c0b0a` | page field |
| asphalt-2 | `#141210` | chrome / sidebar |
| panel | `#1b1915` | cards / inputs |
| line | `#3f3a32` | borders |
| amber | `#e8941f` | hairline, primary CTA |
| rust | `#b85428` | danger only |
| sand | `#e6d9bf` | display headings |
| fog | `#948c7c` | meta |
| ink | `#f5eee4` | body |

**Never:** vibe purple, glass blur chrome, saturated glow, blue→indigo gradients, decorative body washes.

## Type
- Display: **Barlow Condensed**
- UI / prompt: **IBM Plex Sans**
- Meta: **IBM Plex Mono**
- Never: Inter, Geist, Space Grotesk, Fraunces-as-UI

## Materials / imagery
- Cueglass stage: `public/cueglass-stage.jpg` (Imagine)
- Brand mark: `public/milecue-mark.jpg` (Imagine r5)
- Motion: `public/cueglass-drift.mp4` (or asphalt-drift fallback) + marker pulse while playing
- Library may keep asphalt tile as quiet field — stage must not

## Motion rules
- Core job = rAF `--prompt-y` → `translateY(var(--prompt-y))`
- **Enter animation opacity-only** — never owns `transform` (PLAY_FIX.md)
- Drop `is-entering` after ~560ms
- Marker pulse only while playing
- transitions.dev as feedback only

## Copy voice
Short. Specific. Dispatch + cue desk. No SaaS hype, no emoji, no fake stats.
Locked: “Empty board”, “Open stage”, “Cut for stage”, “Cue filed”, “cueglass”.

## One job
Write cue → Open stage → Play scroll. AI tighten via `/api/tighten`.

## What we will NOT change in gauntlet
- Aesthetic name / Cueglass Desk direction
- Palette family (near-black / amber)
- Type pairing
- Product name **MileCue**
- Local-first storage
- Play scroll architecture (`--prompt-y`, opacity-only enter)
