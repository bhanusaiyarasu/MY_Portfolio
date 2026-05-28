import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

const journeyEntries = [
  {
    year: '2023',
    role: 'Diploma in Computer Eng.',
    company: 'GRIET — Hyderabad',
    desc: 'Mastering data structures, algorithms, OOP concepts, and relational databases. Top performer in academic programming.',
    tech: ['C++', 'Java', 'SQL', 'Data Structures']
  },
  {
    year: '2023',
    role: 'Open Source Developer',
    company: 'GitHub — Remote',
    desc: 'Building creative side projects including 3D web experiences, AI-powered mobile apps, and interactive UI component libraries.',
    tech: ['Three.js', 'Android', 'WebGL', 'Open Source']
  },
  {
    year: '2024',
    role: 'AI & Prompt Engineer',
    company: 'Self-directed — Remote',
    desc: 'Leveraging LLMs, advanced prompt design, and automation tools to accelerate frontend development workflows by 3x.',
    tech: ['AI/ML', 'Prompt Design', 'Automation', 'LLMs']
  },
  {
    year: '2024',
    role: 'Developer Intern',
    company: 'Tech Industry — Hyderabad',
    desc: 'Building production web applications using React. Focused on performance optimization, responsive design, and agile workflows.',
    tech: ['React', 'JavaScript', 'CSS3', 'WordPress']
  }
]

const Journey = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const dragIndicatorRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const indicator = dragIndicatorRef.current

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Horizontal pin scrolling on desktop/tablet (>= 768px)
      mm.add("(min-width: 768px)", () => {
        // Horizontal travel animation
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })

        // Fade out drag indicator after starting horizontal scroll
        gsap.to(indicator, {
          opacity: 0,
          x: 40,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=200',
            scrub: true,
          }
        })
      })

      // Vertical layout animations for mobile (< 768px)
      mm.add("(max-width: 767px)", () => {
        // Just fade/slide each item in vertically on scroll
        const cards = section.querySelectorAll('.journey-card')
        cards.forEach(card => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          )
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="journey-section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
      <div 
        className="journey-container"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 0',
        }}
      >
        {/* Section Heading */}
        <div className="container" style={{ position: 'relative', zIndex: 5, pointerEvents: 'none' }}>
          <div className="section-label" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            <span>04 · </span>JOURNEY
          </div>
          <h2 
            className="journey-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'var(--text-head)',
              color: 'var(--text-primary)',
              marginBottom: '2rem',
            }}
          >
            My Timeline.
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={dragIndicatorRef}
          className="journey-indicator text-mono"
          style={{
            position: 'absolute',
            top: '4.5rem',
            right: '4rem',
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 10,
          }}
        >
          <span>SCROLL DOWN TO TRAVEL</span>
          <span style={{ animation: 'bounce-horizontal 1.5s infinite', display: 'inline-block' }}>→</span>
        </div>

        {/* Horizontal Track Wrapper */}
        <div 
          ref={trackRef} 
          className="journey-track"
          style={{
            display: 'flex',
            paddingLeft: '10vw',
            paddingRight: '15vw',
            gap: '80px',
            alignItems: 'center',
            height: '70vh',
            minHeight: '400px',
            position: 'relative',
          }}
        >
          {/* Horizontal dotted connector line (desktop only) */}
          <div 
            className="journey-connector-line"
            style={{
              position: 'absolute',
              top: '50%',
              left: '10vw',
              right: '15vw',
              height: '1px',
              borderTop: '1px dashed rgba(200, 255, 0, 0.25)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {journeyEntries.map((item, idx) => (
            <div 
              key={idx} 
              className="journey-card"
              style={{
                width: '420px',
                flexShrink: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                height: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              data-cursor="card"
            >
              {/* Year Backdrop */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '6.5rem',
                  color: 'var(--accent-primary)',
                  opacity: 0.08,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {item.year}
              </div>

              {/* Card Left Accent Line */}
              <div 
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: '3px',
                  backgroundColor: 'var(--accent-primary)',
                  borderRadius: '0 4px 4px 0',
                }}
              />

              {/* Title & Info */}
              <div>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.75rem', 
                    color: 'var(--accent-primary)', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {item.year} · {item.company}
                </span>
                
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.6rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    marginTop: '0.5rem',
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}
                >
                  {item.role}
                </h3>

                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.9rem', 
                    lineHeight: 1.6, 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Tech stack pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.5rem' }}>
                {item.tech.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
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

export default Journey
