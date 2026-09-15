import {
  DEFAULT_SETTINGS,
  SEED_SCRIPTS,
  SCRIPTS_KEY,
  SETTINGS_KEY,
  type PromptSettings,
  type Script,
} from './types'

function uid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function seedBoard(): Script[] {
  const now = Date.now()
  return SEED_SCRIPTS.map((s, i) => ({
    ...s,
    updatedAt: now - i * 1000 * 60 * 35,
  }))
}

export function loadScripts(): Script[] {
  try {
    const raw = localStorage.getItem(SCRIPTS_KEY)
    if (!raw) {
      const seed = seedBoard()
      localStorage.setItem(SCRIPTS_KEY, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw) as Script[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seed = seedBoard()
      localStorage.setItem(SCRIPTS_KEY, JSON.stringify(seed))
      return seed
    }
    return parsed
  } catch {
    return seedBoard()
  }
}

export function saveScripts(scripts: Script[]): void {
  localStorage.setItem(SCRIPTS_KEY, JSON.stringify(scripts))
}

export function createScript(title = 'Untitled cue'): Script {
  return {
    id: uid(),
    title,
    body: '',
    updatedAt: Date.now(),
  }
}

export function loadSettings(): PromptSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<PromptSettings>) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(s: PromptSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
}

export function exportAll(scripts: Script[]): string {
  return JSON.stringify({ version: 1, exportedAt: Date.now(), scripts }, null, 2)
}

export function importScripts(json: string): Script[] {
  const data = JSON.parse(json) as { scripts?: Script[] } | Script[]
  const list = Array.isArray(data) ? data : data.scripts
  if (!Array.isArray(list)) throw new Error('Invalid backup')
  return list.map((s) => ({
    id: typeof s.id === 'string' ? s.id : uid(),
    title: String(s.title || 'Imported'),
    body: String(s.body || ''),
    updatedAt: Number(s.updatedAt) || Date.now(),
  }))
}
