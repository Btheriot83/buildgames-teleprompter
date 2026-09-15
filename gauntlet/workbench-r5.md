# MileCue integrity workbench — r5 (Cueglass Desk)

Bar: https://www.teleprompter.com/  
Demo: https://buildgames-teleprompter.vercel.app  
Identity: MileCue / Cueglass Desk (Anshu reseed locked)  
Play scroll: `--prompt-y` + opacity-only enter (PLAY_FIX.md) — must not regress.

## Phase A
- commit: c02440c
- shots: gauntlet/shots-r5/a1-*.png
- techniquesDone: [1,2,3,4,5,6,7,8]

## transitions.dev (wired on real actions)
- toast: ToastHost autosave/cue filed/tighten/errors
- success-check: ok toasts
- error-state-shake: empty Open stage / import fail
- panel-reveal: Open stage enter
- skeleton-reveal: boot library
- number-pop-in: New cue count
- texts-reveal: Cue board heading


## r1 — fonts
- files: src/lib/types.ts, src/index.css
- shot: gauntlet/shots-r5/r1-stage-fonts.png
- verdict: Larger default type closer to teleprompter.com stage mock; bar still wins packaging.
- commit: 06c694d

## r2 — contrast
- files: src/index.css
- shot: gauntlet/shots-r5/r2-stage-contrast.png
- verdict: White script pops harder on cueglass; bar still cleaner device mock.
- commit: 4d674dd

## r3 — buttons
- files: src/index.css
- shot: gauntlet/shots-r5/r3-buttons-transport.png
- verdict: Play is the obvious primary; still denser chrome than teleprompter.com mobile bar.
- commit: 450ef20

## r4 — bar gap
- files: src/index.css, src/App.tsx
- shot: gauntlet/shots-r5/r4-bar-gap-job.png
- verdict: Job line names Play scroll; teleprompter.com still wins hero/product photography.
- commit: 64a5bc0

## r5 — reading line (+ bar A/B)
- files: src/lib/types.ts, src/index.css
- shot: gauntlet/shots-r5/r5-reading-line.png
- bar: gauntlet/shots-r5/bar-r5-home.png
- verdict: Hairline closer to hardware cue desk; original still wins VoiceGlide/device depth.
- commit: 414baad

## r6 — library cards
- files: src/index.css
- shot: gauntlet/shots-r5/r6-flat-cue-cards.png
- verdict: Cue board quieter; still ticket aesthetic vs SaaS list on bar.
- commit: 3a9b076

## r7 — stage topbar
- files: src/index.css
- shot: gauntlet/shots-r5/r7-stage-topbar.png
- verdict: Topbar less shouty vs dream target; reading field still the hero.
- commit: f0c775d

## r8 — dream chrome
- files: src/index.css, src/lib/types.ts
- shot: gauntlet/shots-r5/r8-dream-chrome.png
- target: gauntlet/shots-r5/dream-target.png
- verdict: Closer to dream target density; original still wins polished mobile chrome.
- commit: 3d7d6a4

## r9 — start hint
- files: src/index.css, src/components/PromptView.tsx
- shot: gauntlet/shots-r5/r9-start-hint.png
- verdict: Overlay less loud; script remains readable underneath.
- commit: 86800dc

## r10 — final editor (+ bar A/B)
- files: src/index.css
- shot: gauntlet/shots-r5/r10-final-library.png, r10-final-stage.png, r10-final-playing.png
- bar: gauntlet/shots-r5/bar-r10-home.png
- verdict: Cueglass reading craft clearly improved vs Roadside asphalt stage; teleprompter.com still wins overall packaging/VoiceGlide. Play scroll held (e2e green).
- commit: 86f4752

## Honest overall
Original teleprompter.com still wins blind product A/B (light SaaS, device mock, VoiceGlide). MileCue closed stage readability gap via Cueglass Desk reseed + 10 integrity loops under locked identity. Core job ≤3s: Write cue → Open stage → Play scroll.
