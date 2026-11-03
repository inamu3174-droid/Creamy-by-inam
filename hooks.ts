import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Adds `.in` to every `.reveal` inside `root` once it scrolls into view of `scroller`. */
export function useReveal(scroller: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      }),
      { root, threshold: 0.15 },
    )
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [scroller])
}

/** Tracks an element's width (used to scale the SVG "goo" filter with the card). */
export function useWidth(ref: RefObject<HTMLElement | null>) {
  const [w, setW] = useState(1160)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return w
}