import { useEffect, useRef, useState } from 'react'

const SAMPLE = `Driver, this is MileCue board.

You're on I-17 northbound.
Mile two-fourteen.

Broken serpentine. Cab's hot.
Hazards on.

We've got a tech rolling from Flagstaff.
ETA forty minutes.

Stay with the truck.
Call me when you see the amber light bar.

That's it. Clear.`

/** Live mini-prompter — real --prompt-y scroll, playable controls (Nate: make it alive). */
function LiveMiniPrompter() {
  const textRef = useRef<HTMLDivElement>(null)
  const yRef = useRef(38)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(26)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion.current) setPlaying(false)
  }, [])

  useEffect(() => {
    const tick = (t: number) => {
      if (!lastRef.current) lastRef.current = t
      const dt = Math.min(0.05, (t - lastRef.current) / 1000)
      lastRef.current = t
      if (playing && !reduceMotion.current) {
        yRef.current -= speed * dt
        if (yRef.current < -130) yRef.current = 42
        if (textRef.current) {
          textRef.current.style.setProperty('--prompt-y', `${yRef.current}%`)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, speed])

  function restart() {
    yRef.current = 38
    if (textRef.current) textRef.current.style.setProperty('--prompt-y', '38%')
  }

  return (
    <div className="mkt-preview" role="region" aria-label="Live cueglass preview">
      <div className="mkt-preview-bar">
        <span>Try it</span>
        <span>Cueglass scroll</span>
      </div>
      <div className="mkt-preview-scroll">
        <span className="mkt-cue-line" aria-hidden />
        <div
          className="mkt-preview-text"
          ref={textRef}
          style={{ ['--prompt-y' as string]: '38%' }}
        >
          {SAMPLE}
        </div>
      </div>
      <div className="mkt-preview-controls">
        <button
          type="button"
          className="mkt-ctrl primary"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="mkt-ctrl" onClick={restart}>
          Restart
        </button>
        <label className="mkt-speed">
          <span>Pace</span>
          <input
            type="range"
            min={12}
            max={56}
            step={2}
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            aria-label="Scroll pace"
          />
        </label>
      </div>
    </div>
  )
}

type Props = {
  onOpenDesk: () => void
}

export function Marketing({ onOpenDesk }: Props) {
  return (
    <div className="mkt">
      <nav className="mkt-nav" aria-label="Primary">
        <div className="mkt-logo">
          <img src="/milecue-mark.jpg" alt="" width={28} height={28} />
          <span>MileCue</span>
        </div>
        <button type="button" className="mkt-nav-cta" onClick={onOpenDesk}>
          Open the desk
        </button>
      </nav>

      <section className="mkt-hero">
        <div className="mkt-hero-copy">
          <p className="mkt-kicker">Cueglass Desk · local-first</p>
          <h1>
            Write the cue.
            <br />
            Open stage.
            <br />
            Scroll.
          </h1>
          <p className="mkt-lede">
            Browser teleprompter with a real cueglass read line — speed, mirror, and optional
            cam. Scripts stay on this machine.
          </p>
          <div className="mkt-actions">
            <button type="button" className="mkt-primary" onClick={onOpenDesk}>
              Open the desk
            </button>
          </div>
        </div>

        <LiveMiniPrompter />
      </section>

      <section className="mkt-proof" aria-label="What you get">
        <article className="mkt-card">
          <h3>Fixed scroll</h3>
          <p>One pace under the amber line. Space plays. Esc exits.</p>
        </article>
        <article className="mkt-card">
          <h3>Mirror for glass</h3>
          <p>Flip for a beam-splitter rig without leaving the browser.</p>
        </article>
        <article className="mkt-card">
          <h3>Read &amp; record</h3>
          <p>Optional cam plate while you scroll — clip stays local.</p>
        </article>
        <article className="mkt-card">
          <h3>Tighten</h3>
          <p>Cut a rambling draft for the stage when you need it.</p>
        </article>
      </section>

      <footer className="mkt-foot">
        <span>Cues and settings stay in this browser. Nothing is uploaded for scroll.</span>
        <span>MileCue · Cueglass Desk</span>
      </footer>
    </div>
  )
}
