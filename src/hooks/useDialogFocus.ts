import { useEffect, type RefObject } from 'react'

export function useDialogFocus(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void, closeOnEscape = true) {
  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    requestAnimationFrame(() => focusable()[0]?.focus())

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const targets = focusable()
      const first = targets[0]
      const last = targets[targets.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [closeOnEscape, onClose, open, ref])
}
