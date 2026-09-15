# Deliver — MileCue (Phase A)

## Technique 6 — Cuts
1. Topbar `backdrop-filter` glass — gone
2. Brand-mark amber glow — gone
3. Toast left accent stripe — gone
4. Decorative body radial gradients — gone
5. Prompt chrome soup — Camera/Record/Voice/Width/Marker/Leading behind **More**
6. Marker neon bloom — hard line only (+ play pulse, intentional)
7. No accounts / cloud / billing / FAQ / fake stats / emoji nav
8. Oversized PNG textures — JPEG/MP4 only in `public/`

## Technique 7 — AI tells cleared (ANTI_SLOP)
| Tell | Status |
|------|--------|
| Vibe purple | Clear |
| Hero gradients / gradient text | Clear |
| Glassmorphism | Clear (was present → removed) |
| Colored glow | Clear (brand glow removed) |
| Inter / Geist / Space Grotesk | Clear — Barlow Condensed + IBM Plex |
| Fraunces-everywhere | Clear |
| Hero font gimmick / centered Inter hero | Clear — tool UI, not marketing hero |
| 3 identical icon cards | Clear |
| Numbered 1·2·3 marketing strip | Clear |
| Fake stat banner | Clear |
| Headline badge pill | Clear |
| Emoji nav | Clear |
| Accent stripe cards | Clear (toast stripe removed) |
| shadcn fingerprint | Clear — custom CSS |
| FAQ accordion filler | Clear |
| Empty CSS blobs | Clear — Imagine + video |

## Technique 8 — Hand copy (before → after)
| Surface | Before (LLM/first pass) | After (hand) |
|---------|-------------------------|--------------|
| Tagline | local teleprompter | local cue |
| Empty H2 | No cue loaded | Empty board |
| Empty body | Create a script or pick one from the roadside library. | Nothing on the board. Write a cue, or grab one from the library. |
| Primary create | New script | New cue |
| Primary open | Open prompt | Open stage |
| AI CTA | Tighten with AI | Cut for stage |
| AI success | Script tightened | Cut down for the stage |
| Placeholder | Write the lines you’ll deliver… | Lines you’ll say — short beats, blank line for a pause. |
| Hint | Autosave on blur · local · AI tighten via API | Saves here. Tighten when the draft rambles. |
| Sample title | Sample — roadside wrap | Dispatch wrap — sample |
| Sample body | Long crew monologue with numbered steps | Short spoken beats; amber-line instructions; Esc exits |
| Document title | MileCue — local teleprompter | MileCue — local cue stage |

## First-visit loop
Demo → sample cue → **Open stage** → Play (marker pulse + rAF scroll) → Esc. **Cut for stage** hits `/api/tighten` when keyed.
