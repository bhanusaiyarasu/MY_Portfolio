import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { experiences } from '../../data/experience'

const Experience = () => {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const timeline = timelineRef.current
    const entries = timeline.querySelectorAll('.timeline-entry')

    const ctx = gsap.context(() => {
      // Toggle animate class on timeline on scroll
      gsap.to(timeline, {
        scrollTrigger: {
          trigger: timeline,
          start: 'top 80%',
          onEnter: () => timeline.classList.add('animate'),
        },
      })

      // Toggle visible class on each entry on scroll
      entries.forEach((entry) => {
        gsap.to(entry, {
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            onEnter: () => entry.classList.add('visible'),
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="experience" className="section experience">
      <div className="container">
        <div className="section-label">
          <span>04 · </span>Journey & Experience
        </div>

        <div ref={timelineRef} className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-entry">
              <div className="timeline-node" />
              <div className="timeline-date">{exp.period}</div>
              <h3 className="timeline-role" data-cursor="text">{exp.role}</h3>
              <div className="timeline-company" data-cursor="text">{exp.company} — {exp.location}</div>
              <p className="timeline-desc" data-cursor="text">{exp.description}</p>
              <div className="timeline-tech">
                {exp.tech.map((tag, index) => (
                  <span key={index} className="timeline-tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
