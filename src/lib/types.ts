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
export const SCRIPTS_KEY = 'milecue-scripts-v1'

export const DEFAULT_SETTINGS: PromptSettings = {
  speed: 48,
  fontSize: 56,
  lineHeight: 1.45,
  textWidth: 72,
  mirror: false,
  markerY: 38,
  cameraOpacity: 0.35,
  cameraOn: false,
  voiceExperimental: false,
}

export const SAMPLE_SCRIPT: Script = {
  id: 'sample-dispatch-001',
  title: 'Sample — roadside wrap',
  body: `Alright crew — this is your MileCue sample.

Keep your eyes on the amber line. Breathe on the commas. Let the scroll do the walking.

Today we roll a short dispatch: thank the customer, name the issue, give the ETA, and close clean.

One — open with calm. Two — state the facts without fluff. Three — own the next step.

If the marker feels high, drag it. If the pace feels hot, tap down arrow. Space starts and stops.

This copy lives only in your browser. Export anytime. No accounts. No cloud.

End of sample. Hit Escape to leave the prompt stage.`,
  updatedAt: Date.now(),
}
