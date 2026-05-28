import React, { useRef, useCallback } from 'react'
import { gsap } from '../../utils/gsap'

const MagneticButton = ({ children, className = '', as: Component = 'button', ...props }) => {
  const btnRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])

  return (
    <Component
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="link"
      {...props}
    >
      {children}
    </Component>
  )
}

export default MagneticButton
