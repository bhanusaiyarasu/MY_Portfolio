import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import MagneticButton from '../ui/MagneticButton'

const About = () => {
  const containerRef = useRef(null)
  const quoteRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const curlyRef = useRef(null)

  const quote = "I build interfaces the way good films are made — every frame intentional, every cut precise."
  const words = quote.split(" ")

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Quote word clip reveal
      gsap.to('.about-quote-word', {
        y: '0%',
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      // 2. Left block entrance
      gsap.fromTo(leftColRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      )

      // 3. Right block entrance (staggered 0.15s after left block)
      gsap.fromTo(rightColRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      )

      // 4. Code block lines stagger fade in
      gsap.fromTo('.code-line',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 70%',
          }
        }
      )

      // 5. Curly brace glow animation
      gsap.to(curlyRef.current, {
        opacity: 0.15,
        textShadow: '0 0 20px rgba(200, 255, 0, 0.4)',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })

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
    <section ref={containerRef} id="about" className="section about" style={{ overflow: 'hidden' }}>
      <div className="container">
        
        {/* Moment 1 — Big statement */}
        <div className="about-quote-container" ref={quoteRef} style={{ marginBottom: '6rem' }}>
          <div className="section-label" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            <span>01 · </span>ABOUT
          </div>
          <h2 
            className="about-quote" 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontStyle: 'italic', 
              fontSize: 'var(--text-head)', 
              lineHeight: 1.3,
              fontWeight: 400,
              color: 'var(--text-primary)',
              maxWidth: '1000px',
            }}
          >
            {words.map((word, idx) => (
              <span key={idx} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.2rem' }}>
                <span className="about-quote-word" style={{ display: 'inline-block', transform: 'translateY(100%)', marginRight: '0.35em' }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Moment 2 — Split layout */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Block (60%) */}
          <div ref={leftColRef} className="about-left-col">
            <p 
              className="about-bio"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
              }}
            >
              Frontend developer based in <strong>Hyderabad, India</strong>. 3+ years crafting fast, precise digital experiences. I obsess over the details nobody notices until they're missing.
            </p>

            <div 
              className="about-stats-lines"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
              }}
            >
              <div className="about-stat-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>◈</span> 50+ Projects shipped
              </div>
              <div className="about-stat-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>◈</span> 3+ Years in the craft
              </div>
            </div>

            <div style={{ marginTop: '3.5rem' }}>
              <MagneticButton
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="magnetic-btn"
              >
                Initiate Connection
              </MagneticButton>
            </div>
          </div>

          {/* Right Block (40%): Glowing code flourish instead of photo */}
          <div 
            ref={rightColRef} 
            className="about-right-col"
            style={{
              position: 'relative',
              padding: '2.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              minHeight: '280px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Giant curly braces behind code */}
            <div 
              ref={curlyRef}
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '-20px',
                fontFamily: 'var(--font-display)',
                fontSize: '15vw',
                color: 'var(--accent-primary)',
                opacity: 0.05,
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              &#123; &#125;
            </div>

            {/* Code Block */}
            <pre 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
                zIndex: 1,
              }}
            >
              <code style={{ color: 'var(--text-secondary)' }}>
                <div className="code-line"><span style={{ color: 'var(--accent-primary)' }}>const</span> <span style={{ color: '#4fc1ff' }}>bhanu</span> = &#123;</div>
                <div className="code-line">  role: <span style={{ color: '#ce9178' }}>"Frontend Dev"</span>,</div>
                <div className="code-line">  passion: <span style={{ color: '#ce9178' }}>"motion + code"</span>,</div>
                <div className="code-line">  status: <span style={{ color: '#ce9178' }}>"open to work"</span>,</div>
                <div className="code-line">  location: <span style={{ color: '#ce9178' }}>"India 🇮🇳"</span></div>
                <div className="code-line">&#125;;</div>
              </code>
            </pre>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
