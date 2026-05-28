import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'

const CountUp = ({ end, duration = 2, delay = 0, suffix = '' }) => {
  const [value, setValue] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const obj = { val: 0 }
    
    // Parse integer from end value (e.g. "50+" -> 50)
    const endNum = parseInt(end, 10) || 0

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: endNum,
        duration: duration,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setValue(Math.floor(obj.val))
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [end, duration, delay])

  return (
    <span ref={elementRef}>
      {value}{suffix}
    </span>
  )
}

export default CountUp
