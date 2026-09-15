import { useMemo, useState } from 'react'
import { createScript, loadScripts, saveScripts } from '../lib/storage'
import type { Script } from '../lib/types'

export const ONBOARD_KEY = 'milecue-onboarded.v1'

const DEMO_LINES = `Driver, this is MileCue board.

You're on I-17 northbound.
Mile two-fourteen.

We've got a tech rolling.
ETA forty minutes.

Stay with the truck.
Call me when you see the amber light bar.

That's it. Clear.`

type Props = {
  onDone: (script?: Script, openStage?: boolean) => void
  onSkip: () => void
}

export function Onboarding({ onDone, onSkip }: Props) {
  const [step, setStep] = useState(0)
  const [text, setText] = useState('')
  const [celebrating, setCelebrating] = useState(false)
  const dots = useMemo(() => [0, 1, 2, 3], [])

  function markDone() {
    try {
      localStorage.setItem(ONBOARD_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  function finish(opts: { withScript: boolean; openStage: boolean }) {
    markDone()
    if (!opts.withScript) {
      onSkip()
      return
    }
    const body = text.trim() || DEMO_LINES
    const existing = loadScripts()
    const s = createScript('First cue')
    s.body = body
    const next = [s, ...existing.filter((x) => x.id !== s.id)]
    saveScripts(next)
    setCelebrating(true)
    window.setTimeout(() => onDone(s, opts.openStage), 520)
  }

  return (
    <div className="onboard-scrim" role="dialog" aria-modal="true" aria-label="Welcome to MileCue">
      <div className="onboard-card">
        <div className="onboard-dots" aria-hidden>
          {dots.map((d) => (
            <span key={d} className={d === step ? 'on' : ''} />
          ))}
        </div>

        {step === 0 && (
          <>
            <h2>Cueglass desk</h2>
            <p>Your lines under one amber read line. Local — nothing leaves this browser.</p>
            <div className="onboard-actions">
              <button type="button" className="skip" onClick={() => finish({ withScript: false, openStage: false })}>
                Skip
              </button>
              <button type="button" className="next" onClick={() => setStep(1)}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Drop a few lines</h2>
            <p>Paste what you&apos;ll say — or load a short sample.</p>
            <textarea
              className="onboard-sample"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your cue here…"
              aria-label="Demo cue"
            />
            <button type="button" className="onboard-seed" onClick={() => setText(DEMO_LINES)}>
              Use a sample
            </button>
            <div className="onboard-actions">
              <button type="button" className="skip" onClick={() => finish({ withScript: false, openStage: false })}>
                Skip
              </button>
              <button type="button" className="next" onClick={() => setStep(2)}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Set the pace</h2>
            <p>Speed, size, and mirror wait on stage. Space plays. Esc brings you back.</p>
            <div className="onboard-actions">
              <button type="button" className="skip" onClick={() => finish({ withScript: false, openStage: false })}>
                Skip
              </button>
              <button type="button" className="next" onClick={() => setStep(3)}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Open stage</h2>
            <p>Jump in with your cue. Hit Play when you&apos;re ready to scroll.</p>
            {celebrating && (
              <div className="onboard-celebrate" aria-hidden>
                <div className="onboard-check">✓</div>
              </div>
            )}
            <div className="onboard-actions">
              <button type="button" className="skip" onClick={() => finish({ withScript: false, openStage: false })}>
                Skip
              </button>
              <button
                type="button"
                className="next"
                onClick={() => finish({ withScript: true, openStage: true })}
                disabled={celebrating}
              >
                Open stage
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function isOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARD_KEY) === '1'
  } catch {
    return false
  }
}
