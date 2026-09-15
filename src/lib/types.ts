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
  title: 'Dispatch wrap — sample',
  body: `Eyes on the amber line.

Thank them. Name the fault. Give the ETA. Close clean.

Breathe on the commas.
Let the scroll carry you.

If the line sits high, move the marker.
If you’re rushing, tap ↓.
Space starts. Space stops.

This cue stays on this machine.
Export when you leave.

Esc exits the stage.`,
  updatedAt: Date.now(),
}
