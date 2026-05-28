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

    // Progress counter animation
    tl.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value))
      }
    }, 0)

    // Progress bar fill animation
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.6,
      ease: 'power1.inOut'
    }, 0)

    // Slide up exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut'
    }, '+=0.2')

    return () => {
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="preloader">
      <div className="grain-overlay" />
      <div className="preloader-counter">{count}%</div>
      <div className="preloader-initials" data-cursor="text">
        B.S
      </div>
      <div className="preloader-bar-wrap">
        <div ref={barRef} className="preloader-bar" />
      </div>
    </div>
  )
}

export default Preloader
