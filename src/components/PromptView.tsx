import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp, fuzzyFindToken, jumpPx } from '../lib/scroll'
import type { PromptSettings, Script } from '../lib/types'

type Props = {
  script: Script
  settings: PromptSettings
  onSettings: (s: PromptSettings) => void
  onExit: () => void
  onToast: (text: string, kind?: 'ok' | 'err' | 'info') => void
}

export function PromptView({ script, settings, onSettings, onExit, onToast }: Props) {
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const offsetRef = useRef(0)
  const playingRef = useRef(false)
  const speedRef = useRef(settings.speed)
  const lastTs = useRef<number | null>(null)
  const rafRef = useRef(0)
  const idleTimer = useRef(0)
  const mediaRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const tokenIndexRef = useRef(0)
  const scrubbingRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const [camDenied, setCamDenied] = useState(false)
  const [recording, setRecording] = useState(false)
  const [speechOk, setSpeechOk] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [showStartHint, setShowStartHint] = useState(true)
  const [entering, setEntering] = useState(true)
  const [scrollPct, setScrollPct] = useState(0)

  speedRef.current = settings.speed
  playingRef.current = playing

  const maxOffset = useCallback(() => {
    return Math.max(0, (textRef.current?.scrollHeight ?? 0) - window.innerHeight * 0.42)
  }, [])

  const applyOffset = useCallback(() => {
    const el = textRef.current
    if (!el) return
    // CSS var — never fight enter-animation transform on the same property
    el.style.setProperty('--prompt-y', `${-offsetRef.current}px`)
    const max = Math.max(1, maxOffset())
    setScrollPct(Math.min(100, Math.round((offsetRef.current / max) * 100)))
  }, [maxOffset])

  const tick = useCallback(
    (ts: number) => {
      if (playingRef.current && !scrubbingRef.current) {
        if (lastTs.current == null) lastTs.current = ts
        const dt = (ts - lastTs.current) / 1000
        lastTs.current = ts
        offsetRef.current += speedRef.current * dt
        const max = maxOffset()
        if (offsetRef.current > max) {
          offsetRef.current = max
          playingRef.current = false
          setPlaying(false)
        }
        applyOffset()
      } else {
        lastTs.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    },
    [applyOffset, maxOffset],
  )

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Drop enter class after rise so fill-mode cannot pin transform forever
  useEffect(() => {
    const t = window.setTimeout(() => setEntering(false), 560)
    return () => window.clearTimeout(t)
  }, [])

  const bumpChrome = useCallback(() => {
    setChromeVisible(true)
    window.clearTimeout(idleTimer.current)
    if (playingRef.current) {
      idleTimer.current = window.setTimeout(() => setChromeVisible(false), 2800)
    }
  }, [])

  useEffect(() => {
    bumpChrome()
    if (playing) setShowStartHint(false)
  }, [playing, bumpChrome])

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    setSpeechOk(Boolean(SR))
  }, [])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!settings.cameraOn) {
        mediaRef.current?.getTracks().forEach((t) => t.stop())
        mediaRef.current = null
        if (videoRef.current) videoRef.current.srcObject = null
        return
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        mediaRef.current = stream
        setCamDenied(false)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          void videoRef.current.play()
        }
      } catch {
        setCamDenied(true)
        onSettings({ ...settings, cameraOn: false })
        onToast('Camera blocked — solid stage instead', 'info')
      }
    }
    void run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.cameraOn])

  useEffect(() => {
    return () => {
      mediaRef.current?.getTracks().forEach((t) => t.stop())
      try {
        recognitionRef.current?.stop()
      } catch {
        /* ignore */
      }
      window.clearTimeout(idleTimer.current)
    }
  }, [])

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!settings.voiceExperimental || !SR) {
      try {
        recognitionRef.current?.stop()
      } catch {
        /* ignore */
      }
      recognitionRef.current = null
      return
    }
    const tokens = script.body.split(/\s+/).filter(Boolean)
    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      const last = ev.results[ev.results.length - 1]
      if (!last) return
      const phrase = last[0]?.transcript?.trim().split(/\s+/).pop() || ''
      const idx = fuzzyFindToken(tokens, phrase, Math.max(0, tokenIndexRef.current - 2))
      if (idx >= 0) {
        tokenIndexRef.current = idx
        const ratio = tokens.length ? idx / tokens.length : 0
        const max = Math.max(0, (textRef.current?.scrollHeight ?? 0) * 0.85)
        offsetRef.current = clamp(ratio * max, 0, max)
        applyOffset()
      }
    }
    try {
      rec.start()
      recognitionRef.current = rec
    } catch {
      /* ignore */
    }
    return () => {
      try {
        rec.stop()
      } catch {
        /* ignore */
      }
    }
  }, [settings.voiceExperimental, script.body, applyOffset])

  const patch = useCallback(
    (partial: Partial<PromptSettings>) => onSettings({ ...settings, ...partial }),
    [onSettings, settings],
  )

  const nudgeSpeed = (delta: number) => patch({ speed: clamp(settings.speed + delta, 8, 240) })
  const nudgeSize = (delta: number) => patch({ fontSize: clamp(settings.fontSize + delta, 28, 120) })

  // Wheel scrub — teleprompter tool feel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!(e.target as HTMLElement)?.closest?.('.prompt-stage')) return
      e.preventDefault()
      bumpChrome()
      offsetRef.current = clamp(offsetRef.current + e.deltaY * 0.85, 0, maxOffset())
      applyOffset()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [applyOffset, bumpChrome, maxOffset])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      bumpChrome()
      if (e.key === 'Escape') {
        e.preventDefault()
        onExit()
        return
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        setPlaying((p) => !p)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        nudgeSpeed(8)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        nudgeSpeed(-8)
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        offsetRef.current = Math.max(0, offsetRef.current - jumpPx(settings.speed))
        applyOffset()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        offsetRef.current += jumpPx(settings.speed)
        applyOffset()
        return
      }
      if (e.key === '[' || e.key === '-') {
        e.preventDefault()
        nudgeSize(-4)
        return
      }
      if (e.key === ']' || e.key === '=' || e.key === '+') {
        e.preventDefault()
        nudgeSize(4)
        return
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        offsetRef.current = 0
        applyOffset()
        return
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        patch({ mirror: !settings.mirror })
        return
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        if (!document.fullscreenElement) void document.documentElement.requestFullscreen()
        else void document.exitFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, onExit, applyOffset, bumpChrome, patch])

  const startRec = () => {
    const stream = mediaRef.current
    if (!stream) {
      onToast('Turn on camera first', 'err')
      return
    }
    try {
      const rec = new MediaRecorder(stream)
      chunksRef.current = []
      rec.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data)
      }
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `milecue-${Date.now()}.webm`
        a.click()
        URL.revokeObjectURL(url)
        onToast('Recording saved', 'ok')
      }
      rec.start()
      recorderRef.current = rec
      setRecording(true)
      onToast('Recording…', 'info')
    } catch {
      onToast('Recording unavailable', 'err')
    }
  }

  const stopRec = () => {
    recorderRef.current?.stop()
    recorderRef.current = null
    setRecording(false)
  }

  const onScrubStart = (clientY: number) => {
    scrubbingRef.current = true
    bumpChrome()
    const ratio = clamp(clientY / window.innerHeight, 0, 1)
    offsetRef.current = ratio * maxOffset()
    applyOffset()
  }

  const onScrubMove = (clientY: number) => {
    if (!scrubbingRef.current) return
    const ratio = clamp(clientY / window.innerHeight, 0, 1)
    offsetRef.current = ratio * maxOffset()
    applyOffset()
  }

  const onScrubEnd = () => {
    scrubbingRef.current = false
  }

  return (
    <div
      className={`prompt-stage t-panel-reveal${entering ? ' is-entering' : ''}${playing ? ' is-playing' : ''}`}
      data-state="in"
      data-testid="prompt-stage"
      onMouseMove={(e) => {
        bumpChrome()
        onScrubMove(e.clientY)
      }}
      onMouseUp={onScrubEnd}
      onMouseLeave={onScrubEnd}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) onScrubMove(t.clientY)
      }}
      onTouchEnd={onScrubEnd}
      role="application"
      aria-label="Teleprompter stage — scrolling cue"
    >
      <div className="stage-road" aria-hidden>
        <img className="stage-road-img" src="/asphalt-marker.jpg" alt="" />
        <div className="stage-road-vignette" />
        <div className="stage-road-grain" />
      </div>

      {settings.cameraOn && (
        <video
          ref={videoRef}
          className="prompt-cam"
          muted
          playsInline
          style={{ opacity: settings.cameraOpacity }}
        />
      )}
      {camDenied && <div className="cam-note">Camera blocked — night road stage</div>}

      <div className={`stage-topbar${chromeVisible ? '' : ' is-hidden'}`}>
        <span className="stage-badge">TELEPROMPTER</span>
        <span className="stage-script-title">{script.title || 'Untitled cue'}</span>
        {settings.mirror && <span className="stage-mirror-chip">MIRROR</span>}
        <span className="stage-scroll-pct" data-testid="scroll-pct">
          {scrollPct}%
        </span>
      </div>

      <div
        className="stage-progress"
        role="slider"
        aria-label="Scroll position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={scrollPct}
        data-testid="scroll-scrub"
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1)
          offsetRef.current = ratio * maxOffset()
          applyOffset()
          bumpChrome()
        }}
      >
        <div className="stage-progress-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      {showStartHint && !playing && (
        <button
          type="button"
          className="stage-start-hint"
          data-testid="start-hint"
          onClick={() => setPlaying(true)}
        >
          <span className="stage-start-main">Space to scroll</span>
          <span className="stage-start-sub">Wheel scrub · reading line fixed</span>
        </button>
      )}

      {/* Flat reading veil — high-contrast column like a real prompter */}
      <div
        className="stage-read-veil"
        style={{ width: `${Math.min(96, settings.textWidth + 8)}%` }}
        aria-hidden
      />

      <div
        className={`prompt-marker${playing ? ' is-playing' : ''}`}
        style={{ top: `${settings.markerY}%` }}
        aria-hidden
      >
        <span className="prompt-marker-paint" />
        <span className="prompt-marker-cap prompt-marker-cap-l">READ</span>
        <span className="prompt-marker-cap prompt-marker-cap-r">LINE</span>
      </div>

      <div
        className="prompt-scroll"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest('.prompt-chrome, .stage-topbar, .stage-start-hint, button, input, label'))
            return
          onScrubStart(e.clientY)
        }}
        onTouchStart={(e) => {
          const t = e.touches[0]
          if (t) onScrubStart(t.clientY)
        }}
      >
        <div
          ref={textRef}
          className="prompt-text"
          data-testid="prompt-text"
          style={{
            fontSize: settings.fontSize,
            lineHeight: settings.lineHeight,
            width: `${settings.textWidth}%`,
          }}
        >
          <div style={{ transform: settings.mirror ? 'scaleX(-1)' : undefined }}>{script.body}</div>
        </div>
      </div>

      <div className={`prompt-chrome${chromeVisible ? '' : ' is-hidden'}`}>
        <div className="prompt-controls">
          {/* Transport cluster — real teleprompter tool buttons */}
          <div className="transport" role="group" aria-label="Scroll transport">
            <button
              type="button"
              className="btn btn-transport btn-scroll"
              data-testid="play-toggle"
              onClick={() => setPlaying((p) => !p)}
            >
              <span className="transport-glyph" aria-hidden>
                {playing ? '❚❚' : '▶'}
              </span>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-testid="reset-scroll"
              onClick={() => {
                offsetRef.current = 0
                applyOffset()
              }}
              title="Reset scroll (R)"
            >
              Reset
            </button>
          </div>

          <div className="control-cluster" role="group" aria-label="Scroll speed">
            <span className="cluster-label">Speed</span>
            <button type="button" className="btn btn-nudge" onClick={() => nudgeSpeed(-8)} aria-label="Slower">
              −
            </button>
            <span className="speed-readout" data-testid="speed-readout">
              {settings.speed}
              <em>px/s</em>
            </span>
            <button type="button" className="btn btn-nudge" onClick={() => nudgeSpeed(8)} aria-label="Faster">
              +
            </button>
            <label className="slider-wrap slider-inline">
              <input
                type="range"
                min={8}
                max={240}
                value={settings.speed}
                onChange={(e) => patch({ speed: Number(e.target.value) })}
                aria-label="Speed slider"
              />
            </label>
          </div>

          <div className="control-cluster" role="group" aria-label="Type size">
            <span className="cluster-label cluster-aa">
              <span className="aa-sm">A</span>
              <span className="aa-lg">A</span>
            </span>
            <button type="button" className="btn btn-nudge" onClick={() => nudgeSize(-4)} aria-label="Smaller type">
              −
            </button>
            <span className="font-readout">{settings.fontSize}px</span>
            <button type="button" className="btn btn-nudge" onClick={() => nudgeSize(4)} aria-label="Larger type">
              +
            </button>
            <label className="slider-wrap slider-inline">
              <input
                type="range"
                min={28}
                max={120}
                value={settings.fontSize}
                onChange={(e) => patch({ fontSize: Number(e.target.value) })}
                aria-label="Font size slider"
              />
            </label>
          </div>

          <button
            type="button"
            className={`btn btn-tool${settings.mirror ? ' is-on' : ''}`}
            data-testid="mirror-toggle"
            onClick={() => patch({ mirror: !settings.mirror })}
          >
            Mirror
          </button>
          <button
            type="button"
            className={`btn btn-tool${moreOpen ? ' is-on' : ''}`}
            onClick={() => setMoreOpen((v) => !v)}
            data-testid="more-controls"
          >
            More
          </button>
          <button type="button" className="btn btn-exit" onClick={onExit} data-testid="exit-prompt">
            Exit
          </button>

          <div className="prompt-more" hidden={!moreOpen}>
            <label className="slider-wrap">
              Width
              <input
                type="range"
                min={40}
                max={96}
                value={settings.textWidth}
                onChange={(e) => patch({ textWidth: Number(e.target.value) })}
              />
            </label>
            <label className="slider-wrap">
              Marker
              <input
                type="range"
                min={15}
                max={70}
                value={settings.markerY}
                onChange={(e) => patch({ markerY: Number(e.target.value) })}
              />
            </label>
            <label className="slider-wrap">
              Leading
              <input
                type="range"
                min={120}
                max={200}
                value={Math.round(settings.lineHeight * 100)}
                onChange={(e) => patch({ lineHeight: Number(e.target.value) / 100 })}
              />
            </label>
            <button
              type="button"
              className={`btn btn-tool${settings.cameraOn ? ' is-on' : ''}`}
              onClick={() => patch({ cameraOn: !settings.cameraOn })}
            >
              Camera
            </button>
            {settings.cameraOn && (
              <label className="slider-wrap">
                Cam opacity
                <input
                  type="range"
                  min={0.05}
                  max={0.85}
                  step={0.05}
                  value={settings.cameraOpacity}
                  onChange={(e) => patch({ cameraOpacity: Number(e.target.value) })}
                />
              </label>
            )}
            {settings.cameraOn && !recording && (
              <button type="button" className="btn btn-tool" onClick={startRec}>
                Record
              </button>
            )}
            {recording && (
              <button type="button" className="btn btn-danger" onClick={stopRec}>
                Stop rec
              </button>
            )}
            {speechOk && (
              <button
                type="button"
                className={`btn btn-tool${settings.voiceExperimental ? ' is-on' : ''}`}
                onClick={() => patch({ voiceExperimental: !settings.voiceExperimental })}
                title="Experimental"
              >
                Voice (exp)
              </button>
            )}
          </div>
        </div>
        <div className="prompt-keys">
          Space play/pause · Wheel scrub · ↑↓ speed · [ ] size · ←→ jump · R reset · M mirror · Esc exit
        </div>
      </div>
    </div>
  )
}
