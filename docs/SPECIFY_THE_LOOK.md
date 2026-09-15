# Specify the look — MileCue / Cueglass Desk

Nate Parrott: pick fonts, colors, mood **before** screens. This is the contest identity — not sandy Teleprompter / Apple calm clone branding.

## Mood
Matte near-black cueglass at eye line. One thin amber hairline you trust. Soft dispatch click when Play starts. Text rolls under the line. Confidence from the read line — chrome stays quiet. Hardware desk, not marketing poster, not brass tally board.

## Audience
Creators and operators who need a browser stage now: write cue → open stage → scroll. Local-first. No account wall.

## Fonts
| Role | Face | Notes |
|------|------|--------|
| Display / brand | **Barlow Condensed** | Headings, MileCue wordmark — condensed, not Inter |
| UI chrome | **IBM Plex Sans** | Buttons, labels, editor |
| Reading (stage) | **Lexend** | Optical sizing; stage body only |
| Meta / telemetry | **IBM Plex Mono** | Sparse — status chips, not button chrome |

**Never:** Inter, Geist, Space Grotesk, Fraunces-as-UI, SF Pro as brand (Apple calm craft OK in motion/spacing — not as MileCue face).

## Palette
| Token | Hex | Use |
|-------|-----|-----|
| asphalt | `#0c0b0a` | page field |
| asphalt-2 | `#141210` | chrome / sidebar |
| panel | `#1b1915` | cards / inputs |
| line | `#3f3a32` | hairline borders |
| amber | `#e8941f` | **single accent** — hairline, primary CTA |
| amber-hot | `#f0b04a` | hover / ready |
| rust | `#b85428` | danger only |
| sand | `#e6d9bf` | display headings |
| fog | `#948c7c` | meta |
| ink | `#f5eee4` | body |
| cue-read | `#fafaf8` | stage reading text |
| cue-black | `#000000` | pure stage field |

**Never:** vibe purple, glass blur chrome, saturated glow, blue→indigo gradients, decorative body washes, tally-red as brand.

## Surfaces & cards
- Soft elevated panels: `border-radius: 10–14px`, hairline `1px solid var(--line)`
- Layered shadow (no glow): `0 1px 2px rgba(0,0,0,.35), 0 8px 24px rgba(0,0,0,.28)`
- Hover lift: `translateY(-2px)` + slightly deeper shadow
- Press: `scale(0.98)` · `cubic-bezier(.2,.8,.2,1)` ~180ms
- Library cue cards: dark panel (not ticket-paper wash)

## Chrome to cut
- Brass / tally ON AIR cheese
- Thick 3px amber billboard bars where a hairline will do
- Fake stats, sparkle badges, “AI-powered” copy
- CSS-only fake prompter (static screenshot pretending to scroll)

## Chrome to keep (job)
- Write cue → Open stage → Play scroll
- Speed / size / pos / mirror / optional cam
- Local library + Tighten

## Nate alive (homepage)
Hero **live mini-prompter** uses `--prompt-y` transform scroll with Play/Pause, Restart, Pace — same mechanic as stage. One primary CTA: **Open the desk**.

## Motion
- 160–240ms ease for hover/press
- Stage enter: opacity-only (`mile-stage-rise`) — never owns `transform` (PLAY lock)
- Onboarding celebrate: soft check pulse, ≤600ms — no carnival

## Copy voice
Short. Dispatch + cue desk. Second person. Contractionsctions. Locked words: “Empty board”, “Open stage”, “Cut for stage”, “Cue filed”, “cueglass”.
