import { beforeEach, describe, expect, it } from 'vitest'
import {
  createScript,
  exportAll,
  importScripts,
  loadScripts,
  loadSettings,
  saveScripts,
  saveSettings,
} from '../src/lib/storage'
import { DEFAULT_SETTINGS, SCRIPTS_KEY, SETTINGS_KEY } from '../src/lib/types'
import { clamp, fuzzyFindToken, jumpPx } from '../src/lib/scroll'

beforeEach(() => {
  localStorage.clear()
})

describe('storage', () => {
  it('seeds sample script on first load', () => {
    const list = loadScripts()
    expect(list.length).toBe(1)
    expect(list[0].title).toMatch(/Sample/i)
    expect(localStorage.getItem(SCRIPTS_KEY)).toBeTruthy()
  })

  it('persists create + export/import roundtrip', () => {
    const a = createScript('Dispatch A')
    a.body = 'Hello mile'
    saveScripts([a])
    const json = exportAll([a])
    localStorage.removeItem(SCRIPTS_KEY)
    const back = importScripts(json)
    expect(back[0].title).toBe('Dispatch A')
    expect(back[0].body).toBe('Hello mile')
  })

  it('loads default settings and merges', () => {
    expect(loadSettings().speed).toBe(DEFAULT_SETTINGS.speed)
    saveSettings({ ...DEFAULT_SETTINGS, speed: 99, mirror: true })
    expect(localStorage.getItem(SETTINGS_KEY)).toBeTruthy()
    expect(loadSettings().speed).toBe(99)
    expect(loadSettings().mirror).toBe(true)
  })
})

describe('scroll helpers', () => {
  it('jumpPx scales with speed', () => {
    expect(jumpPx(50, 3)).toBe(150)
  })
  it('clamp bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
  })
  it('fuzzyFindToken', () => {
    const tokens = ['Keep', 'your', 'eyes', 'on', 'the', 'amber']
    expect(fuzzyFindToken(tokens, 'eyes')).toBe(2)
    expect(fuzzyFindToken(tokens, 'Amber')).toBe(5)
  })
})
