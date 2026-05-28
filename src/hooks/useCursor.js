import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap } from '../utils/gsap'

export const CURSOR_STATES = {
  DEFAULT: 'default',
  HOVER_LINK: 'hover-link',
  HOVER_CARD: 'hover-card',
  HOVER_TEXT: 'hover-text',
  HOVER_BUTTON: 'hover-button',
  DRAGGING: 'dragging',
  CLICKING: 'clicking',
}

export function useCursor() {
  const innerRef = useRef(null)
  const outerRef = useRef(null)
  const textRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const innerPos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const [state, setState] = useState(CURSOR_STATES.DEFAULT)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredElement, setHoveredElement] = useState(null)
  const rafId = useRef(null)

  // Check if device has fine pointer (desktop)
  const isDesktop = typeof window !== 'undefined'
    && window.matchMedia('(pointer: fine)').matches

  const lerp = (start, end, factor) => start + (end - start) * factor

  const updateCursor = useCallback(() => {
    const inner = innerRef.current
    const outer = outerRef.current
    if (!inner || !outer) return

    // Inner dot follows instantly
    innerPos.current.x = pos.current.x
    innerPos.current.y = pos.current.y

    // Outer ring has smooth lag (100ms lerp approx 0.15 per frame at 60fps)
    const prevX = outerPos.current.x
    const prevY = outerPos.current.y
    outerPos.current.x = lerp(outerPos.current.x, pos.current.x, 0.15)
    outerPos.current.y = lerp(outerPos.current.y, pos.current.y, 0.15)

    // Calculate velocity and angle
    const dx = outerPos.current.x - prevX
    const dy = outerPos.current.y - prevY
    const velocity = Math.sqrt(dx * dx + dy * dy)
    
    // Default rotation is along movement direction
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)

    // Apply translation to inner drop (teardrop shape)
    inner.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px) translate(-50%, -50%)`

    // Handle states and scaling
    let scaleX = 1
    let scaleY = 1
    let opacity = 1

    if (state === CURSOR_STATES.DEFAULT) {
      // Squish on fast movement
      scaleX = 1 + Math.min(velocity * 0.06, 0.8)
      scaleY = Math.max(0.4, 1 - Math.min(velocity * 0.04, 0.5))
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`
    } else if (state === CURSOR_STATES.HOVER_LINK) {
      // If hovering a link, compute angle to link center to point the arrow at it
      if (hoveredElement) {
        try {
          const rect = hoveredElement.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const toX = centerX - pos.current.x
          const toY = centerY - pos.current.y
          angle = Math.atan2(toY, toX) * (180 / Math.PI)
        } catch (err) {
          // Fallback to movement angle
        }
      }
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(1, 1)`
    } else if (state === CURSOR_STATES.HOVER_CARD) {
      // Morph to horizontal pill
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(1, 1)`
    } else if (state === CURSOR_STATES.HOVER_TEXT) {
      // 2px wide, 28px tall line
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(1, 1)`
    } else if (state === CURSOR_STATES.HOVER_BUTTON) {
      // Cursor is hidden when hovering magnetic button
      opacity = 0
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(0.1, 0.1)`
    } else if (state === CURSOR_STATES.DRAGGING) {
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(1, 1)`
    } else if (state === CURSOR_STATES.CLICKING) {
      outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(1, 1)`
    }

    if (state === CURSOR_STATES.HOVER_BUTTON) {
      inner.style.opacity = 0
    } else {
      inner.style.opacity = 1
    }

    rafId.current = requestAnimationFrame(updateCursor)
  }, [state, hoveredElement])

  useEffect(() => {
    if (!isDesktop) return

    const onMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const triggerSplatter = () => {
      const outer = outerRef.current
      if (!outer) return
      const dots = outer.querySelectorAll('.splatter-dot')
      if (dots.length === 0) return

      gsap.killTweensOf(dots)
      dots.forEach((dot, i) => {
        const angleVal = (i * 360 / dots.length) * (Math.PI / 180)
        const distance = gsap.utils.random(15, 30)
        const x = Math.cos(angleVal) * distance
        const y = Math.sin(angleVal) * distance

        gsap.fromTo(dot,
          { x: 0, y: 0, opacity: 0.8, scale: 1 },
          {
            x: x,
            y: y,
            opacity: 0,
            scale: 0.2,
            duration: 0.45,
            ease: 'power2.out'
          }
        )
      })
    }

    const onMouseDown = () => {
      setState(CURSOR_STATES.CLICKING)
      triggerSplatter()
    }
    const onMouseUp = () => setState(CURSOR_STATES.DEFAULT)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Detect hover targets
    const onMouseOver = (e) => {
      const target = e.target
      
      const magneticBtn = target.closest('[data-magnetic]')
      const interactiveLink = target.closest('a, [data-cursor="link"]')
      const bentoCard = target.closest('[data-cursor="card"], .project-card, .skills-card')
      const textElement = target.closest('p, h1, h2, h3, h4, h5, h6, .text-scramble')

      if (magneticBtn) {
        setState(CURSOR_STATES.HOVER_BUTTON)
      } else if (interactiveLink) {
        setHoveredElement(interactiveLink)
        setState(CURSOR_STATES.HOVER_LINK)
      } else if (bentoCard) {
        setState(CURSOR_STATES.HOVER_CARD)
      } else if (textElement) {
        setState(CURSOR_STATES.HOVER_TEXT)
      }
    }

    const onMouseOut = (e) => {
      const target = e.target
      
      const magneticBtn = target.closest('[data-magnetic]')
      const interactiveLink = target.closest('a, [data-cursor="link"]')
      const bentoCard = target.closest('[data-cursor="card"], .project-card, .skills-card')
      const textElement = target.closest('p, h1, h2, h3, h4, h5, h6, .text-scramble')

      if (magneticBtn || interactiveLink || bentoCard || textElement) {
        setState(CURSOR_STATES.DEFAULT)
        setHoveredElement(null)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    rafId.current = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isDesktop, isVisible, updateCursor])

  return { innerRef, outerRef, textRef, state, isVisible, isDesktop }
}
