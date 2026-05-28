import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const barRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = 'hidden'

    const counterObj = { value: 0 }
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      }
    })

    // Progress counter animation (000 to 100)
    tl.to(counterObj, {
      value: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value))
      }
    }, 0)

    // Progress bar fill animation
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power1.inOut'
    }, 0)

    // "B·S" pulse once at 1.2s
    tl.to('.preloader-initials', {
      scale: 1.05,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    }, 1.2)

    // Exit phase:
    // 1. "B·S" scales up and fades
    tl.to('.preloader-initials', {
      scale: 2,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, '+=0.1')

    // 2. Entire preloader clips upward
    tl.to(containerRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      ease: 'power4.inOut'
    }, '-=0.25')

    return () => {
      document.body.style.overflow = ''
    }
  }, [onComplete])

  const formattedCount = String(count).padStart(3, '0')

  return (
    <div 
      ref={containerRef} 
      className="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#070707',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
    >
      {/* Film grain noise overlay */}
      <div className="grain-overlay" style={{ opacity: 0.04 }} />

      {/* Top Right Counter */}
      <div 
        className="preloader-counter text-mono"
        style={{
          position: 'absolute',
          top: '3.5rem',
          right: '4rem',
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        {formattedCount}
      </div>

      {/* Center Initials */}
      <div 
        className="preloader-initials" 
        data-cursor="text"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20vw',
          color: 'var(--accent-primary)',
          letterSpacing: '0.3em',
          marginLeft: '0.15em', // optical alignment for letter spacing
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        B·S
      </div>

      {/* Thin Bottom Progress Bar wrapper */}
      <div 
        className="preloader-bar-wrap"
        style={{
          position: 'absolute',
          bottom: '10vh',
          width: '60vw',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div 
          ref={barRef} 
          className="preloader-bar" 
          style={{
            height: '100%',
            width: '0%',
            backgroundColor: 'var(--accent-primary)',
          }}
        />
      </div>
    </div>
  )
}

export default Preloader
