/** Jump distance in pixels for ~3 seconds at current speed */
export function jumpPx(speedPxPerSec: number, seconds = 3): number {
  return Math.max(24, speedPxPerSec * seconds)
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

/** Fuzzy token match for experimental voice tracking */
export function fuzzyFindToken(haystack: string[], needle: string, from = 0): number {
  const n = needle.toLowerCase().replace(/[^a-z0-9']/g, '')
  if (!n || n.length < 2) return -1
  for (let i = from; i < haystack.length; i++) {
    const t = haystack[i].toLowerCase().replace(/[^a-z0-9']/g, '')
    if (!t) continue
    if (t === n || t.startsWith(n) || n.startsWith(t)) return i
  }
  return -1
}
