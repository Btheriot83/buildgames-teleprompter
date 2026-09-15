# Gauntlet workbench R4 — MileCue (Phase B4 INTEGRITY)

**Identity locked:** MileCue / Roadside Dispatch (asphalt / amber / Barlow Condensed + IBM Plex). **No reseed.**  
Dispatch theme = **skin only**. Job = **teleprompter**: write cue → Open stage → scroll.

Bar: https://www.teleprompter.com/  
Demo: https://buildgames-teleprompter.vercel.app  
Before: `shots-r4/r0-live-before-library.png` · Bar baseline: `shots-r4/bar-r0-home.png`

**Brandon:** still not close to original — close the gap with REAL per-round proof (INTEGRITY_GATE).  
**Honest critic baseline:** original wins clean light SaaS + device-stage mock; MileCue loses on chrome soup, density, and stage polish under locked dark identity.

## r1 — fonts (stage prompt type)
- files: src/index.css (.prompt-text weight 700, tracking -0.015em, pure #fff, harder shadow)
- shot: gauntlet/shots-r4/r1-stage-fonts.png
- verdict: white glyphs read sharper on stage than B3 sand ink, but original device mock still cleaner (less chrome around the text)
- commit: 99000ba

## r2 — contrast (stage reading veil)
- files: src/index.css (.stage-read-veil 0.92 black, dimmer road, darker fades; reassert r1 prompt type)
- shot: gauntlet/shots-r4/r2-stage-contrast.png
- verdict: stage text finally sits on a near-black column like original's dark device screen; road photo no longer washes glyphs — original still wins on marketing clarity, but stage contrast gap narrowed
- commit: a31a947

## r3 — buttons (transport Play weight)
- files: src/index.css (.btn-transport larger/hotter amber; Exit quieter; nudge + clusters tighter tool deck)
- shot: gauntlet/shots-r4/r3-buttons-transport.png
- verdict: Play reads as the one orange tool CTA closer to original's Start-for-free weight pattern; Exit no longer competes — original still has cleaner consumer chrome overall
- commit: a0cd9cd


## Dream-loop
- baseline: `.dream-loop/baseline-library.png`, `.dream-loop/baseline-stage.png`
- target: `.dream-loop/target.png` (also `gauntlet/shots-r4/dream-target.png`) — refined UI screenshot under Roadside Dispatch toward teleprompter.com craft clarity
- critic axis: live → target AND live → teleprompter.com bar

## Transitions.dev wiring log
| Recipe | Action |
|--------|--------|
| toast (`t-toast`) | ToastHost on autosave / cue filed / tighten / errors |
| success-check (`t-success-check`) | ok toasts (Cue filed, Autosaved, Cut down) |
| number-pop-in (`t-digit`) | Cue board count digits |
| texts-reveal (`t-texts-reveal`) | Cue board heading |
| skeleton (`.t-skeleton`) | Boot library skeleton |

## r4 — bar gap (compact job rail vs numbered steps)
- files: src/App.tsx (job-rail), src/index.css (.job-rail; hide .job-loop; shorter hero), .gitignore (.dream-loop), gauntlet/shots-r4/dream-target.png
- shot: gauntlet/shots-r4/r4-bar-gap-job-rail.png
- verdict: vs target+bar — killing 01·02·03 strip closes anti-slop and density gap; hero still taller/busier than dream target and original still wins light SaaS clarity
- commit: dc76462

## r5 — bar gap / dream density (cue cards)
- files: src/index.css (smaller ticket-mile, quieter stub, denser script-card), .gitignore
- shot: gauntlet/shots-r4/r5-library-density.png · bar A/B: gauntlet/shots-r4/bar-r5-home.png
- verdict: vs target — cue board denser and less billboard; vs bar — original still wins clean white product marketing + single orange CTA fantasy; MileCue remains dark tool
- commit: 9c0f241


## r6 — transitions (error-state-shake on empty Open stage)
- files: src/App.tsx (title/body get t-error-state-shake is-shaking), src/index.css
- shot: gauntlet/shots-r4/r6-error-shake.png
- transitions: error-state-shake → Open stage with empty cue / import fail; toast+success-check already on ok paths
- verdict: vs target/bar — feedback is real interaction not CSS-only; original still wins polish of empty-to-record fantasy
- commit: 627a962

