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
| error-state-shake | Empty Open stage / import fail on title+body |
| panel-reveal | PromptView on Open stage enter |
| skeleton-reveal | Boot library shell |

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
- commit: 52260b0


## r7 — transitions (panel-reveal on Open stage)
- files: src/components/PromptView.tsx (t-panel-reveal data-state=in), src/index.css
- shot: gauntlet/shots-r4/r7-stage-panel-reveal.png
- transitions: panel-reveal → Open stage enter
- verdict: vs target — stage enter feels intentional; vs bar — original device mock still cleaner empty-to-record fantasy
- commit: af2d94a


## r8 — dream (thin job banner vs video hero)
- files: src/App.tsx (job-banner; slim status rail), src/index.css (hide .library-hero)
- shot: gauntlet/shots-r4/r8-dream-job-banner.png
- verdict: vs target.png — closer (no video soup, job line + one Open stage); vs bar — original still wins bright consumer polish
- commit: 5d4830e


## r9 — dream (editor CURRENT CUE chrome)
- files: src/App.tsx (CURRENT CUE / CUES / STAGE PREVIEW labels), src/index.css
- shot: gauntlet/shots-r4/r9-dream-editor-chrome.png
- verdict: vs target — labels closer; vs bar — still denser/tool-dark than white SaaS original
- commit: b883f9b


## r10 — dream/bar (thinner reading line)
- files: src/index.css (.prompt-marker 6px; quieter caps)
- shot: gauntlet/shots-r4/r10-reading-line.png · bar A/B: gauntlet/shots-r4/bar-r10-home.png
- verdict: vs target/bar — marker guides without dominating white glyphs; original still cleaner device-stage marketing mock
- commit: ff42cba


## r11 — dream (quieter stage start hint)
- files: src/components/PromptView.tsx, src/index.css
- shot: gauntlet/shots-r4/r11-start-hint.png
- verdict: vs target/bar — less billboard over the prompt; original still wins empty-to-record fantasy
- commit: 2499ff0


## r12 — transitions (skeleton-reveal on boot)
- files: src/App.tsx (loading-shell t-skeleton-reveal), src/index.css
- shot: gauntlet/shots-r4/r12-skeleton-boot.png
- transitions: skeleton-reveal → initial boot skeleton
- verdict: vs bar — boot feedback is real; original marketing still cleaner first paint
- commit: 8d5f01d


## r13 — fonts (cue title sentence case)
- files: src/index.css (.title-input no uppercase)
- shot: gauntlet/shots-r4/r13-title-sentence.png
- verdict: vs target — titles read as scripts not road signs; vs bar — closer to product-tool clarity
- commit: 2c41d6c


## r14 — buttons (single Open stage primary)
- files: src/App.tsx (remove stage-preview-go), src/index.css
- shot: gauntlet/shots-r4/r14-single-primary.png
- verdict: vs target/bar — one loud amber CTA like original Start-for-free pattern; preview no longer duplicates
- commit: 614179c


## r15 — dream/bar (quieter stage topbar)
- files: src/index.css (.stage-topbar / badge / title)
- shot: gauntlet/shots-r4/r15-stage-topbar.png · bar A/B: gauntlet/shots-r4/bar-r15-home.png
- verdict: vs target — chrome yields to white prompt; vs bar — original device mock still simpler
- commit: ffdca6f

