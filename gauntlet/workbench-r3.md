# Gauntlet workbench R3 — MileCue (Phase B3)

**Identity locked:** MileCue / Roadside Dispatch (asphalt / amber / Barlow Condensed + IBM Plex). **No reseed.**  
Dispatch theme = **skin only**. Job = **teleprompter**: write cue → Open stage → scroll.

Bar: https://www.teleprompter.com/ (shots: `b3-original-home.png`, `b3-original-app-signin.png`, `b3-original-home-full.png`)  
Demo: https://buildgames-teleprompter.vercel.app  
Before: `b3-live-before-library.png` · After: `b3-after-library.png`, `b3-after-stage-hint.png`, `b3-after-stage-scroll.png`, `b3-after-stage-controls.png`

**Honest critic baseline:** ~3.8 vs live original (Brandon: not close or better). Focus: stage craft, scroll UX, type, contrast, controls.

## Round 1 — Original side-by-side capture
- Pieces: live teleprompter.com home + app.teleprompter.com sign-in screenshots; live MileCue before library
- Critic: original wins on clean light SaaS + orange tool CTAs + device-stage mock with white-on-black prompt text; we lose on washed warm-on-warm + busy chrome
- Verdict: gap named → craft rounds

## Round 2 — Contrast tokens (kill wash)
- Pieces: darker asphalt field, brighter ink `#f8f3ea`, hotter amber `#f0a020`, fog lifted to readable `#9a917f`, sand only for display accents
- Critic: sand/fog/amber no longer collapse into one muddy midtone → **pass**
- Visible: ink headings punch; meta quieter

## Round 3 — Library type hierarchy
- Pieces: cue card titles → IBM Plex Sans sentence case (not Barlow shout); brand/section Condensed only; title input size down
- Critic: board reads as script list, not all-caps billboard → **pass**

## Round 4 — Button weight like a teleprompter tool
- Pieces: **Open stage** sole amber primary; Cut for stage → tool; Delete → quiet; New cue → tool; Export/Import quiet
- Critic: one job CTA earns weight (matches original’s single orange primary pattern) → **pass**

## Round 5 — Hero stripe off the title
- Pieces: amber mile stripe moved under hero copy (never through “WRITE CUE → …”)
- Critic: hero verb readable in ≤3s; flat stripe kept as identity → **pass**

## Round 6 — Stage preview marker rail
- Pieces: READ LINE sits on top rail of preview; cue text clear below (no line cutting glyphs)
- Critic: preview proves scroll job without wrecking sample lines → **pass**

## Round 7 — Stage reading veil
- Pieces: flat black `stage-read-veil` column behind prompt text; road photo dimmed; vignette solid flats (no gradient chrome)
- Critic: white prompt text finally competes with original’s clean dark stage → **pass** (biggest craft delta)

## Round 8 — Prompt type defaults
- Pieces: default 64px / 1.55 leading / 68% width / 42 px/s; Plex weight 600; white ink + hard shadow
- Critic: spoken-line scale closer to studio prompter → **pass**

## Round 9 — Reading line craft
- Pieces: thinner 10px amber marker; quieter READ/LINE caps; softer pulse; night-road kept (Brandon liked stage)
- Critic: marker guides without dominating text → **pass**

## Round 10 — Transport control deck
- Pieces: ▶ Play / ❚❚ Pause amber transport; Reset; Speed cluster (− value + slider); AA size cluster (− value + slider); Mirror/More/Exit
- Critic: controls chosen like a real teleprompter tool (Tt / speed / play), not random SaaS buttons → **pass**

## Round 11 — Scroll UX: wheel scrub
- Pieces: wheel adjusts offset; hint copy “Wheel to scrub”
- Critic: stage feels operable like a prompter deck → **pass**

## Round 12 — Scroll UX: drag + progress scrub
- Pieces: click-drag on stage scrubs; top progress bar seekable
- Critic: jump-to-line without only relying on ←→ → **pass**

## Round 13 — Keyboard size nudges
- Pieces: `[` `]` / `-` `=` adjust font size live
- Critic: matches original’s live Tt adjustment expectation → **pass**

## Round 14 — Cue script line craft
- Pieces: SEED_SCRIPTS broken into shorter spoken lines (hotshot/shop/insurance)
- Critic: real cues scroll as teleprompter beats, not paragraphs → **pass**

## Round 15 — Stage chrome typography
- Pieces: topbar title → Plex UI (not Condensed shout); badge quieter; % tabular mono
- Critic: stage chrome stops competing with prompt glyphs → **pass**

## Round 16 — Playing state + flat chrome audit
- Pieces: `.is-playing` on stage; transport inset; progress fill amber-hot; topbar/sidebar flat solids (no decorative gradients/glow/glass)
- Critic: anti-slop hard bar held → **pass**

## Round 17 — Editor contrast / body pad
- Pieces: solid asphalt editor/textarea; body 1.08rem/1.6; fog hints; primary Open stage leftmost in toolbar
- Critic: write-cue surface clearer before stage → **pass**

## Round 18 — Side-by-side critic (honest)
- Pieces: after shots vs original home/sign-in
- Critic: **original still wins overall** (VoiceGlide, cloud, recording suite, consumer polish). MileCue closes stage readability + transport craft under Roadside Dispatch. Score ~**5.6/10** (from ~3.8) — closer, **not better**.
- Biggest remaining gaps: voice-follow polish, empty-to-record fantasy, marketing polish of original, lighter library density

## Round 19 — Coherence + tests
- Pieces: vitest seed + settings; playwright core-loop (Open stage → Play scrolls); tsc + production build green
- Verdict: **pass**

## Round 20 — Ship
- Pieces: workbench-r3.md + status-teleprompter-r3.json; PR merge; Vercel redeploy; live smoke
- Verdict: **ship B3**

## Visibility gate (≤3s vs pre-B3 live)
1. Hero title no longer sliced by amber stripe
2. Open stage is the only loud amber CTA; Delete quiet
3. Cue titles sentence-case Plex (not all-caps Condensed)
4. Stage: black reading veil + white 64px text
5. Stage controls: Play + Speed + AA clusters (tool deck)

## Identity check
- Aesthetic name unchanged: MileCue / Roadside Dispatch
- Palette family asphalt/amber/rust retained (contrast tuned, not reseeding)
- Type pairing Barlow Condensed + IBM Plex retained
- Night-road stage + amber READ LINE retained
- Flat no-gradient chrome held
