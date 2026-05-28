import { useEffect, useRef, useCallback, useState } from 'react'

const CURSOR_STATES = {
  DEFAULT: 'default',
  HOVER_LINK: 'hover-link',
  HOVER_CARD: 'hover-card',
  HOVER_TEXT: 'hover-text',
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

    // Outer ring has smooth lag
    outerPos.current.x = lerp(outerPos.current.x, pos.current.x, 0.15)
    outerPos.current.y = lerp(outerPos.current.y, pos.current.y, 0.15)

    inner.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px) translate(-50%, -50%)`
    outer.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`

    rafId.current = requestAnimationFrame(updateCursor)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const onMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const onMouseDown = () => setState(CURSOR_STATES.CLICKING)
    const onMouseUp = () => setState(CURSOR_STATES.DEFAULT)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Detect hover targets
    const onMouseOver = (e) => {
      const target = e.target
      if (target.closest('a, button, [data-cursor="link"]')) {
        setState(CURSOR_STATES.HOVER_LINK)
      } else if (target.closest('[data-cursor="card"], .bento-card')) {
        setState(CURSOR_STATES.HOVER_CARD)
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, span, [data-cursor="text"]')) {
        setState(CURSOR_STATES.HOVER_TEXT)
      }
    }

    const onMouseOut = (e) => {
      const target = e.target
      if (target.closest('a, button, [data-cursor="link"], [data-cursor="card"], .bento-card, p, h1, h2, h3, h4, h5, h6, span, [data-cursor="text"]')) {
        setState(CURSOR_STATES.DEFAULT)
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
