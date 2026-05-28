import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

// Define all skills with their categories and whether they are primary (large, 2x width)
const skillsData = [
  // Frontend
  { name: 'React', category: 'frontend', isPrimary: true, icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', isPrimary: true, icon: '🟦' },
  { name: 'JavaScript', category: 'frontend', isPrimary: false, icon: '🟨' },
  { name: 'Next.js', category: 'frontend', isPrimary: false, icon: '▲' },
  { name: 'HTML5', category: 'frontend', isPrimary: false, icon: '🧡' },
  { name: 'CSS3', category: 'frontend', isPrimary: false, icon: '💙' },
  { name: 'Tailwind CSS', category: 'frontend', isPrimary: false, icon: '🎨' },
  // Creative
  { name: 'Three.js', category: 'creative', isPrimary: true, icon: '🌐' },
  { name: 'GSAP', category: 'creative', isPrimary: true, icon: '⚡' },
  { name: 'WebGL', category: 'creative', isPrimary: false, icon: '📐' },
  { name: 'Framer Motion', category: 'creative', isPrimary: false, icon: '🎬' },
  // Backend
  { name: 'Node.js', category: 'backend', isPrimary: false, icon: '🟢' },
  { name: 'Express', category: 'backend', isPrimary: false, icon: '🚂' },
  { name: 'REST APIs', category: 'backend', isPrimary: false, icon: '🔗' },
  { name: 'MongoDB', category: 'backend', isPrimary: false, icon: '🍃' },
  // Tools
  { name: 'Git', category: 'tools', isPrimary: false, icon: '🐙' },
  { name: 'Figma', category: 'tools', isPrimary: false, icon: '📐' },
  { name: 'Vite', category: 'tools', isPrimary: false, icon: '⚡' },
  { name: 'VS Code', category: 'tools', isPrimary: false, icon: '💻' },
  // Learning
  { name: 'WebAssembly', category: 'learning', isPrimary: false, icon: '⚙️' },
  { name: 'React Native', category: 'learning', isPrimary: false, icon: '📱' },
  { name: 'Astro', category: 'learning', isPrimary: false, icon: '🚀' },
]

const Skills = () => {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      // 1. ScrollTrigger Stagger Entrance
      gsap.fromTo(cards,
        {
          opacity: 0,
          scale: 0.8,
          x: () => gsap.utils.random(-50, 50),
          y: () => gsap.utils.random(-50, 50),
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.0,
          stagger: {
            each: 0.04,
            grid: 'auto',
            from: 'start',
          },
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            // Once entrance is done, initiate independent slow float loop for each card
            cards.forEach((card, idx) => {
              // Store initial float offset
              gsap.to(card, {
                y: '+=10',
                duration: gsap.utils.random(2, 3.5),
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: gsap.utils.random(0, 1),
              })
            })
          }
        }
      )
    }, containerRef)

    // 2. Mouse Proximity Interaction (for desktop pointers)
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    
    const handleMouseMove = (e) => {
      if (isMobile) return
      
      const mouseX = e.clientX
      const mouseY = e.clientY

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2

        const dx = mouseX - cardCenterX
        const dy = mouseY - cardCenterY
        const dist = Math.sqrt(dx * dx + dy * dy)

        // React within 250px radius
        if (dist < 250) {
          const force = (250 - dist) / 250
          // Proximity pull: cards float slightly towards the cursor (max 8px)
          const pullX = (dx / dist) * force * 10
          const pullY = (dy / dist) * force * 10

          gsap.to(card, {
            x: pullX,
            y: pullY,
            duration: 0.4,
            overwrite: 'auto',
          })
        } else {
          // Return to base float coordinate
          gsap.to(card, {
            x: 0,
            duration: 0.6,
            overwrite: 'auto',
          })
        }
      })
    }

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, { x: 0, duration: 0.6, overwrite: 'auto' })
      })
    }

    const section = containerRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      ctx.revert()
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section ref={containerRef} id="skills" className="section skills" style={{ background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            <span>02 · </span>SKILLS
          </div>
          <h2 
            className="skills-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'var(--text-head)',
              color: 'var(--text-primary)',
            }}
          >
            What I work with.
          </h2>
        </div>

        {/* Constellation Zone */}
        <div 
          ref={gridRef}
          className="skills-constellation"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            minHeight: '400px',
            padding: '2rem 0',
          }}
        >
          {skillsData.map((skill, index) => {
            const isPrimary = skill.isPrimary
            return (
              <div
                key={skill.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`skills-card ${isPrimary ? 'primary' : ''}`}
                style={{
                  width: isPrimary ? '240px' : '150px',
                  height: '56px',
                  borderRadius: '99px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: isPrimary 
                    ? '1px solid rgba(200, 255, 0, 0.3)' 
                    : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.25rem',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                data-cursor="card"
              >
                {/* Primary Skill moving border gradient */}
                {isPrimary && (
                  <div
                    className="primary-border-glow"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '99px',
                      padding: '1px',
                      background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                      animation: 'rotate-gradient 4s linear infinite',
                    }}
                  />
                )}

                {/* Skill Icon */}
                <span style={{ fontSize: '1.1rem', zIndex: 2 }}>{skill.icon}</span>
                
                {/* Skill Name */}
                <span 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    zIndex: 2,
                    transition: 'color 0.3s ease',
                  }}
                  className="skill-card-name"
                >
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Skills
