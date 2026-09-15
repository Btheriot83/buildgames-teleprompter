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

  const [playing, setPlaying] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const [camDenied, setCamDenied] = useState(false)
  const [recording, setRecording] = useState(false)
  const [speechOk, setSpeechOk] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  speedRef.current = settings.speed
  playingRef.current = playing

  const applyOffset = useCallback(() => {
    const el = textRef.current
    if (!el) return
    el.style.transform = `translateY(${-offsetRef.current}px)`
  }, [])

  const tick = useCallback(
    (ts: number) => {
      if (playingRef.current) {
        if (lastTs.current == null) lastTs.current = ts
        const dt = (ts - lastTs.current) / 1000
        lastTs.current = ts
        offsetRef.current += speedRef.current * dt
        const max = Math.max(0, (textRef.current?.scrollHeight ?? 0) - window.innerHeight * 0.4)
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
    [applyOffset],
  )

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const bumpChrome = useCallback(() => {
    setChromeVisible(true)
    window.clearTimeout(idleTimer.current)
    if (playingRef.current) {
      idleTimer.current = window.setTimeout(() => setChromeVisible(false), 2600)
    }
  }, [])

  useEffect(() => {
    bumpChrome()
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
        patch({ speed: clamp(settings.speed + 8, 8, 240) })
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        patch({ speed: clamp(settings.speed - 8, 8, 240) })
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

  return (
    <div
      className="prompt-stage is-entering"
      data-testid="prompt-stage"
      onMouseMove={bumpChrome}
      role="application"
      aria-label="Teleprompter stage"
    >
      {settings.cameraOn && (
        <video
          ref={videoRef}
          className="prompt-cam"
          muted
          playsInline
          style={{ opacity: settings.cameraOpacity }}
        />
      )}
      {camDenied && <div className="cam-note">Camera permission denied — using solid stage</div>}

      <div className={`prompt-marker${playing ? ' is-playing' : ''}`} style={{ top: `${settings.markerY}%` }} aria-hidden />

      <div className="prompt-scroll">
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
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-toggle"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="btn" onClick={onExit} data-testid="exit-prompt">
            Exit
          </button>
          <span className="speed-readout" data-testid="speed-readout">
            {settings.speed} px/s
          </span>
          <label className="slider-wrap">
            Speed
            <input
              type="range"
              min={8}
              max={240}
              value={settings.speed}
              onChange={(e) => patch({ speed: Number(e.target.value) })}
            />
          </label>
          <label className="slider-wrap">
            Size
            <input
              type="range"
              min={28}
              max={120}
              value={settings.fontSize}
              onChange={(e) => patch({ fontSize: Number(e.target.value) })}
            />
          </label>
          <span className="font-readout">{settings.fontSize}px</span>
          <button
            type="button"
            className={`btn${settings.mirror ? ' is-on' : ''}`}
            data-testid="mirror-toggle"
            onClick={() => patch({ mirror: !settings.mirror })}
          >
            Mirror
          </button>
          <button
            type="button"
            className={`btn${moreOpen ? ' is-on' : ''}`}
            onClick={() => setMoreOpen((v) => !v)}
            data-testid="more-controls"
          >
            More
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
              className={`btn${settings.cameraOn ? ' is-on' : ''}`}
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
              <button type="button" className="btn" onClick={startRec}>
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
                className={`btn${settings.voiceExperimental ? ' is-on' : ''}`}
                onClick={() => patch({ voiceExperimental: !settings.voiceExperimental })}
                title="Experimental"
              >
                Voice (exp)
              </button>
            )}
          </div>
        </div>
        <div className="prompt-keys">
          Space play/pause · ↑↓ speed · ←→ jump · R reset · M mirror · F fullscreen · Esc exit
        </div>
      </div>
    </div>
  )
}
