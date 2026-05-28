import React from 'react'
import { useCursor } from '../../hooks/useCursor'

const CustomCursor = () => {
  const { innerRef, outerRef, textRef, state, isVisible, isDesktop } = useCursor()

  if (!isDesktop) return null

  const cursorClass = isVisible ? `cursor-${state}` : 'cursor-hidden'

  const getText = () => {
    switch (state) {
      case 'hover-link': return 'View'
      case 'hover-card': return 'Explore'
      default: return ''
    }
  }

  return (
    <>
      <div ref={innerRef} className={`cursor-inner ${cursorClass}`} />
      <div ref={outerRef} className={`cursor-outer ${cursorClass}`}>
        <span ref={textRef} className="cursor-text">{getText()}</span>
      </div>
    </>
  )
}

export default CustomCursor
