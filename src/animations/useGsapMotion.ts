import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'

type MotionSetup = (root: HTMLElement) => void

function restoreVisibleContent(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-gsap-target]').forEach((element) => {
    element.style.removeProperty('opacity')
    element.style.removeProperty('visibility')
    element.style.removeProperty('transform')
  })
}

export function useGsapMotion(scope: RefObject<HTMLElement | null>, setup: MotionSetup) {
  useGSAP(() => {
    const root = scope.current
    if (!root) return

    let media: ReturnType<typeof gsap.matchMedia> | undefined

    try {
      media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => setup(root))
    } catch {
      try {
        media?.revert()
      } catch {
        // Motion is optional; leave the original content visible if setup fails.
      }
      restoreVisibleContent(root)
    }

    return () => media?.revert()
  }, { scope })
}
