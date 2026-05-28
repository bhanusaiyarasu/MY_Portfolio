import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import hackerMe from '../../assets/hacker-me.png'
import MagneticButton from '../ui/MagneticButton'

const About = () => {
  const containerRef = useRef(null)
  const textColRef = useRef(null)
  const imgColRef = useRef(null)

  useEffect(() => {
    const textCol = textColRef.current
    const imgCol = imgColRef.current

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger slide-in and fade-in
      gsap.fromTo(
        textCol,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        imgCol,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
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

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={containerRef} id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          
          {/* Left Column: Bio / Text */}
          <div ref={textColRef} className="about-text-col">
            <div className="section-label">
              <span>01 · </span>Who I Am
            </div>
            
            <h2 className="about-heading" data-cursor="text">
              Engineering with <em>Aesthetics</em> & <em>Scalability</em>
            </h2>
            
            <p className="about-text" data-cursor="text">
              I'm <strong>Bhanu Sai Yarasu</strong>, a driven Computer Engineering student and Developer Intern based in Hyderabad, India. I specialize in building immersive, high-performance web ecosystems and mobile applications. Blending a rigorous engineering discipline with custom creative coding, I bridge the gap between design and development to create unforgettable digital experiences.
            </p>

            <div className="about-highlights">
              <div className="about-highlight" data-cursor="text">
                <span className="about-highlight-number">3+</span>
                <span className="about-highlight-label">Years Learning</span>
              </div>
              <div className="about-highlight" data-cursor="text">
                <span className="about-highlight-number">15+</span>
                <span className="about-highlight-label">Projects Completed</span>
              </div>
              <div className="about-highlight" data-cursor="text">
                <span className="about-highlight-number">3x</span>
                <span className="about-highlight-label">Workflow Acceleration</span>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <MagneticButton
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="magnetic-btn"
                style={{ padding: '0.875rem 2rem' }}
              >
                Initiate Connection
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Portrait Image */}
          <div ref={imgColRef} className="about-img-col" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="about-image-wrap" data-cursor="card" style={{ maxWidth: '380px', width: '100%' }}>
              <img src={hackerMe} alt="Bhanu Sai Yarasu portrait" />
              <div className="about-image-frame" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
