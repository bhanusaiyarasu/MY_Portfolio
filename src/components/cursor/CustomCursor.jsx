import React from 'react'
import { useCursor, CURSOR_STATES } from '../../hooks/useCursor'

const CustomCursor = () => {
  const { innerRef, outerRef, textRef, state, isVisible, isDesktop } = useCursor()

  if (!isDesktop) return null

  const cursorClass = isVisible ? `cursor-${state}` : 'cursor-hidden'

  const getText = () => {
    switch (state) {
      case CURSOR_STATES.HOVER_LINK:
        return '→'
      case CURSOR_STATES.HOVER_CARD:
        return 'OPEN'
      case CURSOR_STATES.DRAGGING:
        return '← →'
      default:
        return ''
    }
  }

  return (
    <>
      {/* Inner drop: teardrop shape */}
      <div 
        ref={innerRef} 
        className={`cursor-inner ${cursorClass}`}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '0 50% 50% 50%',
          transform: 'rotate(-45deg)',
          backgroundColor: 'var(--accent-primary)',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
        }}
      />

      {/* Outer ink spread: translucent ellipse / pill / line */}
      <div 
        ref={outerRef} 
        className={`cursor-outer ${cursorClass}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span 
          ref={textRef} 
          className="cursor-text"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: state === CURSOR_STATES.HOVER_LINK ? '1.25rem' : '0.65rem',
            fontWeight: 700,
            letterSpacing: state === CURSOR_STATES.HOVER_LINK ? '0' : '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            pointerEvents: 'none',
            display: 'inline-block',
            // If it's the arrow, we want it to align perfectly
            transform: state === CURSOR_STATES.HOVER_LINK ? 'translateY(-1px)' : 'none',
          }}
        >
          {getText()}
        </span>

        {/* 6 Splatter dots for click burst */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="splatter-dot"
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              pointerEvents: 'none',
              opacity: 0,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default CustomCursor
