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
- commit: f93345a

## r2 — contrast (stage reading veil)
- files: src/index.css (.stage-read-veil 0.92 black, dimmer road, darker fades; reassert r1 prompt type)
- shot: gauntlet/shots-r4/r2-stage-contrast.png
- verdict: stage text finally sits on a near-black column like original's dark device screen; road photo no longer washes glyphs — original still wins on marketing clarity, but stage contrast gap narrowed
- commit: 1a0fc48

