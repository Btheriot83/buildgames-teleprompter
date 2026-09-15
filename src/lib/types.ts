export type Script = {
  id: string
  title: string
  body: string
  updatedAt: number
}

export type PromptSettings = {
  speed: number // px per second
  fontSize: number // px
  lineHeight: number
  textWidth: number // % of viewport
  mirror: boolean
  markerY: number // % from top
  cameraOpacity: number
  cameraOn: boolean
  voiceExperimental: boolean
}

export const SETTINGS_KEY = 'milecue-settings-v1'
/** B2: bumped so first-load seeds real teleprompter cues (not product-meta sample). */
export const SCRIPTS_KEY = 'milecue-scripts-v2'

export const DEFAULT_SETTINGS: PromptSettings = {
  speed: 42,
  fontSize: 64,
  lineHeight: 1.55,
  textWidth: 68,
  mirror: false,
  markerY: 36,
  cameraOpacity: 0.28,
  cameraOn: false,
  voiceExperimental: false,
}

/** Real spoken cues — short lines for scroll UX; roadside flavor OK. */
export const SEED_SCRIPTS: Script[] = [
  {
    id: 'cue-hotshot-eta-001',
    title: 'Hotshot ETA — I-17 mile 214',
    body: `Driver, this is MileCue board.

You're on I-17 northbound.
Mile two-fourteen.

Broken serpentine. Cab's hot.
Hazards on.

We've got a tech rolling from Flagstaff.
ETA forty minutes.
White Dodge. Unit seven.

Stay with the truck.
If temp climbs past two-twenty, shut it down.
Call me when you see the amber light bar.

That's it. Clear.`,
    updatedAt: Date.now() - 1000 * 60 * 40,
  },
  {
    id: 'cue-shop-wrap-002',
    title: 'Shop wrap — customer pickup',
    body: `Thanks for waiting.

We replaced the glow plugs and the relay.
Battery held a load test clean.
Oil's topped. Filter stamped.

Total is four-eighty even.
Card or fleet account — either works.

Keys are on the board under your name.
Call if the idle dips under six hundred.

Appreciate the business.
Drive safe.`,
    updatedAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: 'cue-insurance-003',
    title: 'Insurance call — roadside claim',
    body: `Hi, this is dispatch for AZ Mobile Diesel.

I'm calling about claim number four-nine-two-eight.
Tow was at mile marker eighty-one on the sixty.

Cause was a failed water pump.
No other vehicles involved.
Photos and invoice are in the portal.

Tech notes are in the attachment.
Call me back if adjuster needs a statement.

Thanks.`,
    updatedAt: Date.now() - 1000 * 60 * 180,
  },
]

/** @deprecated use SEED_SCRIPTS[0] — kept for tests that import SAMPLE_SCRIPT */
export const SAMPLE_SCRIPT: Script = SEED_SCRIPTS[0]
