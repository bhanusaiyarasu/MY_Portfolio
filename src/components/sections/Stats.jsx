import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

const statsData = [
  { value: 15, suffix: '+', label: 'Projects Completed' },
  { value: 500, suffix: '+', label: 'GitHub Commits' },
  { value: 3, suffix: 'x', label: 'Dev Acceleration (AI)' },
  { value: 24, suffix: '/7', label: 'Active Learning' },
]

const Stats = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.stat-number-val')

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const targetVal = parseInt(item.getAttribute('data-target'), 10)
        const obj = { val: 0 }

        gsap.to(obj, {
          val: targetVal,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            item.innerText = Math.floor(obj.val)
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="section stats">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-item" data-cursor="text">
              <div className="stat-number">
                <span
                  className="stat-number-val"
                  data-target={stat.value}
                >
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
