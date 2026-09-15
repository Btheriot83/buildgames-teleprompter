# Friend walkthrough — MileCue

**Activation event:** First cue scrolling on the cueglass stage (Play advancing `--prompt-y`).

Teach by doing. Calm friend beside the desk — not a feature tour.

## Cards (4 max)

| # | Title | Body | Primary CTA | Skip |
|---|-------|------|-------------|------|
| 1 | Cueglass desk | Your lines under one amber read line. Local — nothing leaves this browser. | Continue | Skip |
| 2 | Drop a few lines | Paste what you’ll say, or load a short sample. | Continue | Skip |
| 3 | Set the pace | Speed, size, and mirror wait on stage. Space plays. Esc brings you back. | Continue | Skip |
| 4 | Open stage | Jump in with your cue. Hit Play when you’re ready. | Open stage | Skip |

## Persist
- Key: `milecue-onboarded.v1`
- Completing or skipping sets the flag; return visits never restart
- `?onboard=1` forces preview (clears flag once)

## Seed
Card 2 can inject sample body into a new “First cue” script if the board is empty of user intent — otherwise keep existing library.

## Voice rules
Hand-written. No “AI-powered,” badges, fake stats, or sparkle. One CTA per card + always-visible Skip.
