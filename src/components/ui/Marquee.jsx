import React from 'react'

const Marquee = ({ items, className = '', speedClass = '' }) => {
  // Duplicate items to ensure seamless scrolling
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className={`marquee-wrap ${className}`}>
      <div className={`marquee-track ${speedClass}`}>
        {duplicatedItems.map((item, index) => (
          <span key={index} className="marquee-item" data-cursor="text">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
