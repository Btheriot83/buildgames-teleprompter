# MileCue Play scroll fix

**Symptom:** Open stage → hit Play — button flips to Pause / % ticks, but cue text stays glued.

**Root cause:** `.prompt-stage.is-entering .prompt-text` ran `mile-stage-rise` with `animation-fill-mode: both` and keyframes that set `transform: translateY(0)`. The stage kept `is-entering` forever. CSS animations beat inline `style.transform`, so rAF wrote `translateY(-Npx)` while computed transform stayed identity (`matrix(1,0,0,1,0,0)`).

**Fix:**
1. Drive scroll with `--prompt-y` + `transform: translateY(var(--prompt-y))` (not raw inline transform alone).
2. Enter animation is opacity-only — never owns `transform`.
3. Drop `is-entering` after ~560ms so fill-mode cannot pin forever.
4. E2E asserts **computed** translateY delta (inline style alone was a false green).

**Proof:** `npm run test:e2e` + live smoke screenshots with Y delta.

## Live proof (2026-09-14 PT)

- Demo: https://buildgames-teleprompter.vercel.app
- PR: https://github.com/Btheriot83/buildgames-teleprompter/pull/10 (merged)
- Before: `gauntlet/shots/play-broken-before.png` — Pause/% moved, computed transform identity
- After: `gauntlet/shots/play-fixed-after.png` — cue text advanced
- Metrics: beforeY=0 → afterY≈-42..-45 (`play-fixed-metrics.json`); `npm run smoke:live` → `scrolled=true`

