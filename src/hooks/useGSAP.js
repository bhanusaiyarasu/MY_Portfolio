import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap'

export function useGSAP(callback, deps = [], scope = null) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap, ScrollTrigger)
    }, scope)

    return () => ctx.current?.revert()
  }, deps)

  return ctx
}

/**
 * Convenience: animate elements in on scroll.
 * Usage: useScrollReveal('.reveal-item', { y: 60 })
 */
export function useScrollReveal(selector, fromVars = {}, toVars = {}, triggerOpts = {}) {
  useEffect(() => {
    const defaults = {
      y: 60,
      opacity: 0,
      ...fromVars,
    }

    const toDefaults = {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      ...toVars,
    }

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        ...defaults,
        scrollTrigger: {
          trigger: elements[0].closest('section') || elements[0],
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...triggerOpts,
        },
        ...toDefaults,
      })
    })

    return () => ctx.revert()
  }, [selector])
}
