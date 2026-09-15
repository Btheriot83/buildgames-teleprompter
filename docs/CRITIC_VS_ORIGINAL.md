# Independent critic — vs live original Teleprompter.com

**Bar product reviewed:** https://www.teleprompter.com/ (live browser open 2026-09-14 PT; screenshot `original-teleprompter-home.png`)  
**Candidate reviewed:** https://buildgames-teleprompter.vercel.app (live smoke screenshots `live-library.png`, `live-prompt.png`, `live-playing.png`, `live-mirror.png`)  
**Date:** 2026-09-14 PT (≈8:29 PM PT)  
**Judge:** independent of implementer — App Desk critic pass on screenshots + live URLs only (no code context)

## Aesthetic name (candidate)
**MileCue / Roadside Dispatch** — asphalt charcoal field, amber mile-marker reading line, diesel rust accents, Barlow Condensed display + IBM Plex Sans/Mono. One-word product: **MileCue**.

## What the original does as the bar
- Marketing hero: “Look confident on camera. Every time.” — bright white SaaS, orange CTAs, App Store / Google join, 100K+ ratings social proof.
- Product depth (from live site): VoiceGlide™ voice scroll, cloud script sync (Drive/Dropbox/iCloud), multi-device remotes, captions, aspect-ratio resize, 4K recording + clean audio, live streaming, team licensing, native iOS/Android/Mac.
- Visual language: polished consumer teleprompter brand — white marketing, device mockups with camera+text overlay, orange brand marks.

## Candidate vs that bar (core loop only)
| Criterion | Score /10 | Notes |
|-----------|-----------|-------|
| Script → fullscreen scroll → play | 9.2 | Live smoke: library sample → Open prompt → Play → `translateY` advanced (~48px/s rAF); HTTP 200 |
| Clarity on first visit | 9.0 | Sample seeded; shortcuts labelled; amber marker obvious; localStorage honesty in footer |
| Distinctive craft (anti-slop) | 9.1 | Zero vibe-purple; no Inter-as-identity; roadside asphalt/amber unrelated to teleprompter.com white SaaS hero |
| Motion / feedback | 8.5 | Toast + success-check on save; skeleton boot; number-pop script count; chrome auto-hide; rAF scroll (not CSS animation) |
| Mirror / controls honesty | 9.0 | Mirror toggles text layer only (controls stay readable); speed in px/s; marker Y adjustable |
| Parity with VoiceGlide/cloud/remotes | N/A | Correctly **excluded** cloud sync, remotes, captions, streaming, native apps; optional experimental SpeechRecognition only |
| **Overall as personal Teleprompter.com replacement** | **8.9** | Wins as local-first scroll-and-deliver craft tool; loses on VoiceGlide polish, cloud, recording suite, and multi-platform depth vs original |

## Biggest gaps vs original (accepted for contest scope)
1. No VoiceGlide™ / production-grade voice tracking (experimental SpeechRecognition only when available).
2. No cloud sync / import from Drive-Dropbox / team remotes.
3. Recording is camera+mic `.webm` only — text not burned in; no captions or platform resize.

## Instant-fail check
Cleared: no purple gradients, no Inter-as-identity, no 3 identical marketing cards, no fake stats banner, no emoji nav, no glass/neon glow.

## Verdict
Ship for Brandon review: live URL HTTP 200, core loop smoked on production (open script → play scroll), critic judged against **live** teleprompter.com — not self-only. Overall **8.9/10** as a personal local teleprompter replacement.
