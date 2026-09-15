import type { VercelRequest, VercelResponse } from '@vercel/node'

type Body = { text?: string; mode?: 'tighten' | 'teleprompter' }

const SYSTEM = `You rewrite scripts for a fullscreen teleprompter.
Rules:
- Preserve the speaker's meaning and voice; cut fluff and filler.
- Break into short spoken lines (~8–12 words). One idea per line.
- Use a blank line between beats as a natural pause.
- No markdown, bullets, numbers, or quotes around the whole script.
- Return ONLY the rewritten script text.`

type Provider =
  | { kind: 'openai-compat'; name: string; url: string; key: string; model: string }
  | { kind: 'anthropic'; name: string; url: string; key: string; model: string }

function providers(): Provider[] {
  const shared = process.env.BUILD_GAMES_LLM_API_KEY?.trim()
  const xai =
    process.env.XAI_API_KEY?.trim() ||
    process.env.GROK_API_KEY?.trim() ||
    (shared?.startsWith('xai-') ? shared : undefined)
  const openai =
    process.env.OPENAI_API_KEY?.trim() ||
    (shared && !shared.startsWith('xai-') ? shared : undefined)
  const out: Provider[] = []
  const seen = new Set<string>()
  const push = (p: Provider) => {
    const id = `${p.kind}:${p.url}:${p.model}`
    if (seen.has(id)) return
    seen.add(id)
    out.push(p)
  }

  // Prefer xAI per /workspace/build-games/gauntlet/LLM.md
  if (xai || shared) {
    const key = xai || (shared as string)
    push({
      kind: 'openai-compat',
      name: xai ? 'xai' : 'shared-xai-first',
      url:
        (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '') +
        '/chat/completions',
      key,
      model:
        process.env.MODEL ||
        process.env.XAI_MODEL ||
        process.env.GROK_MODEL ||
        'grok-2-latest',
    })
  }
  if (openai) {
    push({
      kind: 'openai-compat',
      name: 'openai',
      url:
        (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '') +
        '/chat/completions',
      key: openai,
      model: process.env.MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    })
  }
  const anth =
    process.env.ANTHROPIC_API_KEY?.trim() || process.env.ANTHROPIC_AUTH_TOKEN?.trim()
  if (anth) {
    const base = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(
      /\/$/,
      '',
    )
    push({
      kind: 'anthropic',
      name: 'anthropic',
      url: base + '/v1/messages',
      key: anth,
      model:
        process.env.MODEL || process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    })
  }
  return out
}

async function callProvider(
  p: Provider,
  user: string,
): Promise<{ text: string; model: string; provider: string }> {
  if (p.kind === 'openai-compat') {
    const r = await fetch(p.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${p.key}`,
      },
      body: JSON.stringify({
        model: p.model,
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: user },
        ],
      }),
    })
    const data = (await r.json()) as {
      error?: { message?: string }
      model?: string
      choices?: { message?: { content?: string } }[]
    }
    if (!r.ok) throw new Error(data.error?.message || `${p.name} ${r.status}`)
    const text = data.choices?.[0]?.message?.content?.trim() || ''
    if (!text) throw new Error(`${p.name} empty response`)
    return { text, model: data.model || p.model, provider: p.name }
  }

  const r = await fetch(p.url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': p.key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: p.model,
      max_tokens: 4096,
      system: SYSTEM,
      messages: [{ role: 'user', content: user }],
    }),
  })
  const data = (await r.json()) as {
    error?: { message?: string }
    model?: string
    content?: { type: string; text?: string }[]
  }
  if (!r.ok) throw new Error(data.error?.message || `${p.name} ${r.status}`)
  const text = (data.content || [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text || '')
    .join('')
    .trim()
  if (!text) throw new Error(`${p.name} empty response`)
  return { text, model: data.model || p.model, provider: p.name }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = (
    typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  ) as Body
  const text = (body.text || '').trim()
  if (!text) return res.status(400).json({ error: 'text required' })
  if (text.length > 24000) return res.status(400).json({ error: 'text too long' })

  const list = providers()
  if (!list.length) {
    return res.status(503).json({
      error: 'AI not configured',
      hint: 'Set BUILD_GAMES_LLM_API_KEY (or XAI_API_KEY / OPENAI_API_KEY) on the server',
    })
  }

  const mode = body.mode === 'tighten' ? 'tighten' : 'teleprompter'
  const user =
    mode === 'tighten'
      ? `Tighten this script for spoken delivery:\n\n${text}`
      : `Format this as teleprompter copy with short lines and pause beats:\n\n${text}`

  const errors: string[] = []
  for (const p of list) {
    try {
      const out = await callProvider(p, user)
      return res.status(200).json({
        text: out.text,
        model: out.model,
        provider: out.provider,
        mode,
      })
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'failed')
    }
  }
  return res.status(502).json({ error: errors[errors.length - 1] || 'all providers failed' })
}
