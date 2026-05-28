import React, { useRef } from 'react'

const BentoCard = ({ children, className = '', size = 'bento-sm', ...props }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      className={`bento-card ${size} ${className}`}
      onMouseMove={handleMouseMove}
      data-cursor="card"
      {...props}
    >
      {children}
    </div>
  )
}

export default BentoCard
