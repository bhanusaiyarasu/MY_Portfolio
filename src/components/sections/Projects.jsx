import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { projects } from '../../data/projects'
import { ExternalLink } from 'lucide-react'

// Custom robust inline SVG Github icon to guarantee build stability
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Projects = () => {
  const containerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll('.project-bento-card')

    const ctx = gsap.context(() => {
      // Bento cards staggered entry on scroll
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    // Animated conic-gradient angle tracker for hover effect on featured projects
    const featuredCards = gridRef.current.querySelectorAll('.project-bento-card.featured')
    
    featuredCards.forEach(card => {
      let tween = null

      const handleMouseEnter = () => {
        // Animate --angle variable from 0 to 360 degrees
        card.style.setProperty('--angle', '0deg')
        tween = gsap.to(card, {
          '--angle': '360deg',
          duration: 3,
          repeat: -1,
          ease: 'none',
        })
      }

      const handleMouseLeave = () => {
        if (tween) {
          tween.kill()
          card.style.setProperty('--angle', '0deg')
        }
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)

      card._cleanup = () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    return () => {
      ctx.revert()
      featuredCards.forEach(card => {
        if (card._cleanup) card._cleanup()
      })
    }
  }, [])

  return (
    <section ref={containerRef} id="projects" className="section projects" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section label */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            <span>03 · </span>WORK
          </div>
          <h2 
            className="projects-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'var(--text-head)',
              color: 'var(--text-primary)',
            }}
          >
            Selected Projects.
          </h2>
        </div>

        {/* Bento Magazine Layout */}
        <div 
          ref={gridRef}
          className="projects-bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {projects.map((project, idx) => {
            // Asymmetric mapping:
            // Item 1 (idx=0) Husk Harbour -> Featured (2/3 width)
            // Item 2 (idx=1) Voxalis 3D -> Small (1/3 width)
            // Item 3 (idx=2) Ribhance -> Small (1/3 width)
            // Item 4 (idx=3) Portfolio V3 -> Featured (2/3 width)
            
            const isFeatured = idx === 0 || idx === 3
            const gridColumn = isFeatured ? 'span 2' : 'span 1'
            const formattedNumber = String(project.id).padStart(2, '0')

            return (
              <div
                key={project.id}
                className={`project-bento-card ${isFeatured ? 'featured' : ''}`}
                style={{
                  gridColumn: gridColumn,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  minHeight: isFeatured ? '360px' : '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                data-cursor="card"
              >
                {/* Custom property angle definition container */}
                {isFeatured && (
                  <div
                    className="conic-glow-border"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      padding: '1px',
                      background: 'conic-gradient(from var(--angle, 0deg), transparent 20%, var(--lime-glow) 40%, transparent 60%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                )}

                {/* Top Info */}
                <div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.8rem', 
                      color: 'var(--accent-primary)', 
                      marginBottom: '1rem',
                      fontWeight: 600
                    }}
                  >
                    {formattedNumber}
                  </div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      fontSize: isFeatured ? '2.25rem' : '1.75rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      marginBottom: '1rem',
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  {/* Tech stack pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.6rem',
                          border: '1px solid rgba(200, 255, 0, 0.3)',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative/static description before hover */}
                <div style={{ marginTop: '2rem' }}>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.75rem', 
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em' 
                    }}
                  >
                    Hover to Reveal Details
                  </span>
                </div>

                {/* Hover Slide Up Reveal Overlay (clip-path reveal) */}
                <div
                  className="project-hover-reveal"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--bg-raised)',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    clipPath: 'inset(100% 0 0 0)',
                    transition: 'clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2,
                  }}
                >
                  <div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.8rem', 
                        color: 'var(--accent-primary)',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '1rem' 
                      }}
                    >
                      {formattedNumber} · {project.tag || 'Project Info'}
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        transition: 'border-color 0.3s, color 0.3s',
                      }}
                      className="proj-btn"
                      data-cursor="link"
                    >
                      <GithubIcon /> GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        transition: 'border-color 0.3s, color 0.3s',
                      }}
                      className="proj-btn"
                      data-cursor="link"
                    >
                      <ExternalLink size={16} style={{ marginRight: '0.35rem' }} /> Live Link
                    </a>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects
