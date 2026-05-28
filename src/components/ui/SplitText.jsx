import React from 'react'

const SplitText = ({ text, className = '', charClassName = '', wordClassName = '' }) => {
  if (typeof text !== 'string') return null

  return (
    <span className={`split-text-wrap ${className}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`split-word ${wordClassName}`}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`split-char ${charClassName}`}
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default SplitText
