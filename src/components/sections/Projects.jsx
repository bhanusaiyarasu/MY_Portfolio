import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { projects } from '../../data/projects'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

// Custom robust inline SVG Github icon to guarantee build stability
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Projects = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.project-card')

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="projects" className="section projects">
      <div className="container">
        <div className="section-label">
          <span>03 · </span>Featured Work
        </div>

        <div className="bento-grid">
          {projects.map((project) => {
            const sizeClass = project.featured ? 'bento-wide' : 'bento-sm'
            const formattedNumber = String(project.id).padStart(2, '0')

            return (
              <div
                key={project.id}
                className={`project-card ${sizeClass}`}
                data-cursor="card"
              >
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-card-overlay">
                    <div className="project-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        data-cursor="link"
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <GithubIcon /> Github
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        data-cursor="link"
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <ExternalLink size={14} style={{ marginRight: '0.25rem' }} /> Live
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-number">{formattedNumber}</div>
                  <h3 className="project-title" data-cursor="text">{project.title}</h3>
                  <p className="project-desc" data-cursor="text">{project.description}</p>
                  <div className="project-tags">
                    {project.tech.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-arrow">
                  <ArrowUpRight />
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
