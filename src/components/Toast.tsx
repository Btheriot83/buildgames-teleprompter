import { useEffect, useState } from 'react'

export type ToastMsg = { id: string; text: string; kind?: 'ok' | 'err' | 'info' }

export function ToastHost({
  items,
  onDismiss,
}: {
  items: ToastMsg[]
  onDismiss: (id: string) => void
}) {
  return (
    <div className="toast-host" aria-live="polite">
      {items.map((t) => (
        <ToastItem key={t.id} item={t} onDone={() => onDismiss(t.id)} />
      ))}
    </div>
  )
}

function ToastItem({ item, onDone }: { item: ToastMsg; onDone: () => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const a = requestAnimationFrame(() => setOpen(true))
    const hide = window.setTimeout(() => setOpen(false), 2200)
    const gone = window.setTimeout(onDone, 2600)
    return () => {
      cancelAnimationFrame(a)
      clearTimeout(hide)
      clearTimeout(gone)
    }
  }, [onDone])

  return (
    <div className={`toast-item t-toast${open ? ' is-open' : ''}`}>
      {item.kind === 'ok' && (
        <span className="t-success-check" data-state={open ? 'in' : 'out'} aria-hidden>
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M12 24l8 8 16-18" />
          </svg>
        </span>
      )}
      <span>{item.text}</span>
    </div>
  )
}
