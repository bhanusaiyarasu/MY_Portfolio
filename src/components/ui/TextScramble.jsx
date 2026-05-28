import React, { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'

const TextScramble = ({ text, speed = 30, delay = 0, scrambleOnHover = false, className = '' }) => {
  const [displayText, setDisplayText] = useState(text)
  const isScrambling = useRef(false)
  const originalText = text

  const scramble = () => {
    if (isScrambling.current) return
    isScrambling.current = true

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return originalText[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= originalText.length) {
        clearInterval(interval)
        isScrambling.current = false
      }

      iteration += 1 / 3
    }, speed)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble()
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [text])

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      scramble()
    }
  }

  return (
    <span className={className} onMouseEnter={handleMouseEnter}>
      {displayText}
    </span>
  )
}

export default TextScramble
