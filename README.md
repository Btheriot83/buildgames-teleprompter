# MileCue — Teleprompter.com replacement (Build Games)

Local-first browser teleprompter. Scripts and settings live in `localStorage`. No accounts, no backend, no telemetry.

**Aesthetic:** asphalt charcoal · amber mile-marker · diesel rust — Barlow Condensed + IBM Plex.

## Setup

```bash
npm install
npm run dev
```

Production-style local preview:

```bash
npm run build && npm start
```

Tests: `npm test`

## Core loop

1. Library lists scripts (sample included).
2. Edit title/body — autosave on blur.
3. **Open prompt** → fullscreen scrolling stage.
4. Space play/pause; scroll is `requestAnimationFrame` at px/s (not CSS animation).

## Keyboard (prompt view)

| Key | Action |
|-----|--------|
| Space | Play / pause |
| ↑ / ↓ | Speed ±8 px/s |
| ← / → | Jump ~3s of scroll |
| R | Reset to top |
| M | Mirror (text only) |
| F | Fullscreen |
| Esc | Exit prompt |

## Optional

- **Camera** — `getUserMedia` behind text at adjustable opacity (needs localhost/HTTPS). Denied → solid stage, one quiet note.
- **Record** — MediaRecorder → `.webm` download (camera+mic only; text not composited).
- **Voice (experimental)** — SpeechRecognition fuzzy nudge; hidden if unavailable.

## Data

- Scripts: `localStorage` key `milecue-scripts-v1` — `{id,title,body,updatedAt}`
- Settings: `milecue-settings-v1`
- Export / Import JSON from the top bar. Backup = export.

## Limits vs Teleprompter.com

No cloud sync, VoiceGlide™, remotes, captions, multi-platform resize, team licensing, or native apps. This is a personal local replacement for the scroll-and-deliver loop.

## Stack

Vite + React + TypeScript. Plain CSS. transitions.dev free recipes wired into real UX (toast, success-check, skeleton, texts-reveal, number-pop-in, error shake).
