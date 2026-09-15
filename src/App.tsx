import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PromptView } from './components/PromptView'
import { ToastHost, type ToastMsg } from './components/Toast'
import {
  createScript,
  exportAll,
  importScripts,
  loadScripts,
  loadSettings,
  saveScripts,
  saveSettings,
} from './lib/storage'
import type { PromptSettings, Script } from './lib/types'

type View = 'library' | 'prompt'

export default function App() {
  const [booting, setBooting] = useState(true)
  const [scripts, setScripts] = useState<Script[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [settings, setSettings] = useState<PromptSettings>(() => loadSettings())
  const [view, setView] = useState<View>('library')
  const [toasts, setToasts] = useState<ToastMsg[]>([])
  const [titleError, setTitleError] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const bodyTimer = useRef(0)

  useEffect(() => {
    const list = loadScripts()
    setScripts(list)
    setSelectedId(list[0]?.id ?? null)
    const t = window.setTimeout(() => setBooting(false), 280)
    return () => clearTimeout(t)
  }, [])

  const selected = useMemo(
    () => scripts.find((s) => s.id === selectedId) ?? null,
    [scripts, selectedId],
  )

  const persist = useCallback((next: Script[]) => {
    setScripts(next)
    saveScripts(next)
  }, [])

  const pushToast = useCallback((text: string, kind: ToastMsg['kind'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setToasts((t) => [...t, { id, text, kind }])
  }, [])

  const [tightening, setTightening] = useState(false)

  const onTighten = async () => {
    if (!selected || !selected.body.trim()) {
      pushToast('Write something first', 'err')
      return
    }
    setTightening(true)
    try {
      const res = await fetch('/api/tighten', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: selected.body, mode: 'teleprompter' }),
      })
      const data = (await res.json()) as { text?: string; error?: string; hint?: string; model?: string }
      if (!res.ok) {
        pushToast(data.error || data.hint || 'Tighten failed', 'err')
        return
      }
      if (!data.text) {
        pushToast('Empty AI response', 'err')
        return
      }
      updateSelected({ body: data.text })
      pushToast(data.model ? `Cut down · ${data.model}` : 'Cut down for the stage', 'ok')
    } catch {
      pushToast('Tighten network error', 'err')
    } finally {
      setTightening(false)
    }
  }

  const updateSelected = (patch: Partial<Script>) => {
    if (!selected) return
    const next = scripts.map((s) =>
      s.id === selected.id ? { ...s, ...patch, updatedAt: Date.now() } : s,
    )
    persist(next)
  }

  const onNew = () => {
    const s = createScript(`Cue ${scripts.length + 1}`)
    persist([s, ...scripts])
    setSelectedId(s.id)
    pushToast('Cue filed', 'ok')
  }

  const onDelete = () => {
    if (!selected) return
    if (!window.confirm(`Delete “${selected.title}”?`)) return
    const next = scripts.filter((s) => s.id !== selected.id)
    if (next.length === 0) {
      const s = createScript('Untitled cue')
      persist([s])
      setSelectedId(s.id)
    } else {
      persist(next)
      setSelectedId(next[0].id)
    }
    pushToast('Deleted', 'info')
  }

  const onExport = () => {
    const blob = new Blob([exportAll(scripts)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `milecue-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    pushToast('Backup exported', 'ok')
  }

  const onImportFile = async (file: File) => {
    try {
      const text = await file.text()
      const imported = importScripts(text)
      persist([...imported, ...scripts])
      setSelectedId(imported[0]?.id ?? selectedId)
      pushToast(`Imported ${imported.length}`, 'ok')
    } catch {
      setTitleError(true)
      window.setTimeout(() => setTitleError(false), 600)
      pushToast('Import failed — check JSON', 'err')
    }
  }

  const openPrompt = () => {
    if (!selected || !selected.body.trim()) {
      setTitleError(true)
      window.setTimeout(() => setTitleError(false), 600)
      pushToast('Write something first', 'err')
      return
    }
    setView('prompt')
  }

  const onSettings = (s: PromptSettings) => {
    setSettings(s)
    saveSettings(s)
  }

  const onBodyChange = (body: string) => {
    if (!selected) return
    const next = scripts.map((s) =>
      s.id === selected.id ? { ...s, body, updatedAt: Date.now() } : s,
    )
    setScripts(next)
    window.clearTimeout(bodyTimer.current)
    bodyTimer.current = window.setTimeout(() => saveScripts(next), 400)
  }

  const onBodyBlur = () => {
    saveScripts(scripts)
    pushToast('Autosaved', 'ok')
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <h1>MileCue</h1>
          <span className="tag">local cue</span>
        </div>
        <div className="topbar-actions">
          <button type="button" className="btn" onClick={onExport}>
            Export
          </button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void onImportFile(f)
              e.target.value = ''
            }}
          />
          <button type="button" className="btn btn-primary" onClick={onNew} data-testid="new-script">
            New cue
          </button>
        </div>
      </header>

      {booting ? (
        <div className="layout skeleton-lib" aria-busy>
          <aside className="sidebar">
            <div className="t-skeleton" />
            <div className="t-skeleton" />
            <div className="t-skeleton" />
          </aside>
          <main className="editor">
            <div className="t-skeleton" style={{ height: '3rem', margin: '0 0 1rem' }} />
            <div className="t-skeleton" style={{ height: '16rem' }} />
          </main>
        </div>
      ) : (
        <div className="layout">
          <aside className="sidebar">
            <div className="sidebar-head">
              <h2 className="t-texts-reveal" data-state="in">
                Library
              </h2>
              <span className="t-digit-group is-animating" aria-label={`${scripts.length} scripts`}>
                {String(scripts.length)
                  .split('')
                  .map((d, i) => (
                    <span key={`${d}-${i}`} className="t-digit" data-stagger={i}>
                      {d}
                    </span>
                  ))}
              </span>
            </div>
            <ul className="script-list">
              {scripts.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`script-card${s.id === selectedId ? ' is-active' : ''}`}
                    onClick={() => setSelectedId(s.id)}
                    data-testid={`script-${s.id}`}
                  >
                    <p className="title">{s.title || 'Untitled'}</p>
                    <p className="meta">{new Date(s.updatedAt).toLocaleString()}</p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="editor">
            {!selected ? (
              <div className="empty-hero">
                <video
                  className="empty-motion"
                  src="/asphalt-drift.mp4"
                  poster="/asphalt-marker.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden
                />
                <div className="stripe" />
                <h2>Empty board</h2>
                <p>Nothing on the board. Write a cue, or grab one from the library.</p>
                <button type="button" className="btn btn-primary" onClick={onNew}>
                  New cue
                </button>
              </div>
            ) : (
              <>
                <div className="editor-toolbar">
                  <input
                    className={`title-input t-input${titleError ? ' is-error' : ''}`}
                    value={selected.title}
                    onChange={(e) => updateSelected({ title: e.target.value })}
                    onBlur={() => saveScripts(scripts)}
                    aria-label="Script title"
                    data-testid="script-title"
                  />
                  <button
                    type="button"
                    className="btn btn-ai"
                    onClick={() => void onTighten()}
                    disabled={tightening}
                    data-testid="tighten-ai"
                  >
                    {tightening ? 'Cutting…' : 'Cut for stage'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openPrompt}
                    data-testid="open-prompt"
                  >
                    Open stage
                  </button>
                  <button type="button" className="btn btn-danger" onClick={onDelete}>
                    Delete
                  </button>
                </div>
                <textarea
                  className={`body-input t-input${titleError ? ' is-error' : ''}`}
                  value={selected.body}
                  onChange={(e) => onBodyChange(e.target.value)}
                  onBlur={onBodyBlur}
                  spellCheck
                  aria-label="Script body"
                  data-testid="script-body"
                  placeholder="Lines you’ll say — short beats, blank line for a pause."
                />
                <div className="hint-row">
                  <span>
                    Saves here. Tighten when the draft rambles.
                  </span>
                  <span>
                    Stage: <kbd>Space</kbd> · <kbd>M</kbd> mirror · <kbd>Esc</kbd> out
                  </span>
                </div>
              </>
            )}
          </main>
        </div>
      )}

      {view === 'prompt' && selected && (
        <PromptView
          script={selected}
          settings={settings}
          onSettings={onSettings}
          onExit={() => setView('library')}
          onToast={pushToast}
        />
      )}

      <ToastHost items={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  )
}
