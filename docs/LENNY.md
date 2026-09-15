# Lenny / Anshu — MileCue (Teleprompter.com)

## 1. Discover
- Seed (never shown in UI): `f9736f69b86a43902c23a964c78261c2320351fc7a0e2c54dd01e89f490ac5a5` via `openssl rand -hex 32`
- Hex-derived palette: `#f9736f` warm coral→reinterpreted as amber marker `#f0a030`; `#69b86a` moss; `#43902c` olive; `#c78261` copper; `#c23203` rust; `#0e2c54` deep navy muted into asphalt; **avoided** purple chunks `#dd01e8` / `#9f49` vibe-purple per ANTI_SLOP.
- Direction briefs:
  1. **MileCue / Roadside Dispatch** — asphalt charcoal, amber mile-marker reading line, diesel rust, Barlow Condensed + IBM Plex (picked — Brandon diesel/roadside edge)
  2. **Glass Studio** — cool slate + cyan HUD (too SaaS / teleprompter.com adjacent)
  3. **Newsprint Cue** — cream paper + ink (weak for dark fullscreen prompt)
- Ambition: distinctive roadside craft + rAF scroll engine + transitions.dev microfeedback — not “clean modern teleprompter clone”.

## 2. Define
- Implementer built Vite + React + TS, localStorage scripts, library + fullscreen prompt.
- Independent critic opens **live original** https://www.teleprompter.com/ and the live MileCue demo; scores in `docs/CRITIC_VS_ORIGINAL.md`.
- Anti-slop: no vibe-purple, no Inter/Geist identity, no 3-card marketing grid, no fake stats, no emoji nav.

## 3. Deliver
- Core loop: sample script → Open prompt → Play (rAF scroll) → speed/font/mirror → Esc back.
- Cut: cloud sync, team remotes, VoiceGlide product, captions, social streaming, accounts.
- transitions.dev (free, real UX): success-check, toast, error-state-shake, skeleton-reveal, texts-reveal, number-pop-in, panel-reveal (chrome), tabs not needed for two-view SPA.
- Live demo + App Desk smoke required before Brandon ping.

## Live evidence
- Demo: (filled after deploy)
- Smoke log: docs/live-smoke-log.json
- Critic: docs/CRITIC_VS_ORIGINAL.md
