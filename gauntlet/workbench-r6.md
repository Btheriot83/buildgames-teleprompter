# MileCue integrity workbench — r6 (Cueglass Desk locked)

Bar: https://www.teleprompter.com/  
Demo: https://buildgames-teleprompter.vercel.app  
Identity: MileCue / Cueglass Desk — **LOCKED** (no reseed)  
Play scroll: `--prompt-y` + opacity-only enter (PLAY_FIX.md) — must not regress.

## transitions.dev (held from prior waves)
- toast / success-check / error-state-shake / panel-reveal / skeleton-reveal / number-pop-in / texts-reveal

## Dream-loop
- baseline: `.dream-loop/baseline-library.png`, `.dream-loop/baseline-stage.png`
- target: `.dream-loop/target.png` → `gauntlet/shots-r6/dream-target.png`

## r1 — fonts
- files: src/lib/types.ts, src/index.css
- shot: gauntlet/shots-r6/r1-stage-fonts.png
- verdict: Tighter tracking + 68px default closer to device mock type; bar still wins packaging.
- commit: 336228d

## r2 — contrast
- files: src/index.css
- shot: gauntlet/shots-r6/r2-stage-contrast.png
- verdict: Near-solid cueglass column; road wash nearly gone; original still cleaner device photography.
- commit: 74d4160

## r3 — buttons
- files: src/index.css
- shot: gauntlet/shots-r6/r3-buttons-transport.png
- verdict: Circular amber Play matches dream-target weight; secondary tools quieter — bar still has consumer chrome polish.
- commit: a247aa8

## r4 — bar gap
- files: src/index.css, src/App.tsx
- shot: gauntlet/shots-r6/r4-bar-gap-job.png
- verdict: Job strip denser / shorter title; teleprompter.com still wins bright SaaS hero clarity.
- commit: 3ec4dd7

## r5 — reading line (+ bar A/B)
- files: src/index.css
- shot: gauntlet/shots-r6/r5-reading-line.png
- bar: gauntlet/shots-r6/bar-r5-home.png
- verdict: 2px hairline + quieter caps; original still wins VoiceGlide/device depth fantasy.
- commit: 782c415

## r6 — library cards
- files: src/index.css
- shot: gauntlet/shots-r6/r6-flat-cue-cards.png
- verdict: List-row cue board (ticket-mile hidden); still dark tool vs white SaaS list.
- commit: e45b846

## r7 — stage topbar
- files: src/index.css
- shot: gauntlet/shots-r6/r7-stage-topbar.png
- verdict: Topbar less shouty vs dream target; reading field remains the hero.
- commit: bb38184

## r8 — dream chrome
- files: src/index.css
- shot: gauntlet/shots-r6/r8-dream-chrome.png
- target: gauntlet/shots-r6/dream-target.png
- verdict: Centered control deck closer to target; original still wins polished mobile chrome.
- commit: 7930c84

## r9 — start hint
- files: src/index.css, src/components/PromptView.tsx
- shot: gauntlet/shots-r6/r9-start-hint.png
- verdict: Overlay quieter + auto-dismiss 2.4s; script stays readable underneath.
- commit: 1a18578

## r10 — final editor (+ bar A/B)
- files: src/index.css
- shot: gauntlet/shots-r6/r10-final-library.png, r10-final-stage.png, r10-final-playing.png
- bar: gauntlet/shots-r6/bar-r10-home.png
- verdict: Editor craft tightened under Cueglass; teleprompter.com still wins overall packaging/VoiceGlide. Play scroll held (e2e green).
- commit: 4b9a20f

## Honest overall
Original teleprompter.com still wins blind product A/B (light SaaS, device mock, VoiceGlide). MileCue closed more stage/chrome density under locked Cueglass Desk across 10 integrity loops. Core job ≤3s: Write cue → Open stage → Play scroll. Play `--prompt-y` did not regress.
