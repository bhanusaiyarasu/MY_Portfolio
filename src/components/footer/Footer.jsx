import React, { useState, useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

const Footer = () => {
  const [timeStr, setTimeStr] = useState('')
  const nameLine1Ref = useRef(null)
  const nameLine2Ref = useRef(null)
  const footerRef = useRef(null)

  // Local Clock implementation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // ScrollTrigger clip-path entrance reveal for the centerpiece text
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-name-line-wrap',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleScramble = (e, originalChar) => {
    if (originalChar === ' ') return
    const el = e.currentTarget
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*-+='
    let iterations = 0
    
    // Scramble 6 times in 300ms (50ms interval)
    const interval = setInterval(() => {
      el.innerText = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      iterations++
      if (iterations >= 6) {
        clearInterval(interval)
        el.innerText = originalChar
      }
    }, 50)
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer ref={footerRef} className="footer-full-viewport" style={{ background: 'linear-gradient(to bottom, #070707, #0b0b0b)', height: '100vh', minHeight: '650px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3.5rem 0 2rem' }}>
      {/* Grain noise overlay */}
      <div className="grain-overlay" style={{ opacity: 0.03, pointerEvents: 'none' }} />

      {/* TOP (15% height) */}
      <div className="container" style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border)', marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c8ff00', boxShadow: '0 0 8px #c8ff00', display: 'inline-block' }} />
            <span>AVAILABLE FOR WORK · 2026</span>
          </div>
          <div style={{ letterSpacing: '0.05em' }}>
            LOCAL TIME: {timeStr}
          </div>
        </div>
      </div>

      {/* MIDDLE (55% height) — THE CENTERPIECE */}
      <div 
        style={{ 
          flex: '0 0 55%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative' 
        }}
      >
        {/* Line 1 */}
        <div 
          className="footer-name-line-wrap"
          style={{ 
            width: '100%', 
            textAlign: 'center', 
            overflow: 'hidden',
          }}
        >
          <h2 
            ref={nameLine1Ref}
            className="footer-name-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15vw',
              lineHeight: 0.95,
              color: 'var(--text-primary)',
              margin: 0,
              userSelect: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            {"BHANU SAI".split("").map((char, idx) => (
              <span
                key={idx}
                onMouseEnter={(e) => handleScramble(e, char)}
                style={{ display: 'inline-block', cursor: 'pointer', transition: 'color 0.2s', width: char === ' ' ? '4vw' : 'auto' }}
                className="glitch-char"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Thin lime divider line stretching full width */}
        <div 
          style={{ 
            width: '80%', 
            height: '1px', 
            backgroundColor: 'var(--accent-primary)', 
            opacity: 0.7, 
            margin: '1rem 0',
            boxShadow: '0 0 10px rgba(200, 255, 0, 0.3)'
          }} 
        />

        {/* Line 2 */}
        <div 
          className="footer-name-line-wrap"
          style={{ 
            width: '100%', 
            textAlign: 'center', 
            overflow: 'hidden',
          }}
        >
          <h2 
            ref={nameLine2Ref}
            className="footer-name-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15vw',
              lineHeight: 0.95,
              color: 'var(--text-primary)',
              margin: 0,
              userSelect: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            {"YARASU".split("").map((char, idx) => (
              <span
                key={idx}
                onMouseEnter={(e) => handleScramble(e, char)}
                style={{ display: 'inline-block', cursor: 'pointer', transition: 'color 0.2s', width: char === ' ' ? '4vw' : 'auto' }}
                className="glitch-char"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* BOTTOM (30% height) */}
      <div 
        className="container" 
        style={{ 
          flex: '0 0 30%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end' 
        }}
      >
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            alignItems: 'center', 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border)'
          }}
          className="footer-bottom-grid"
        >
          {/* Left Column */}
          <div style={{ textAlign: 'left' }}>
            © {new Date().getFullYear()} Bhanu Sai Yarasu. <br />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Crafted with obsession.</span>
          </div>

          {/* Center Column: Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }} className="footer-links-row">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} data-cursor="link" style={{ transition: 'color 0.2s' }} className="footer-nav-link">Home</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} data-cursor="link" style={{ transition: 'color 0.2s' }} className="footer-nav-link">Work</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} data-cursor="link" style={{ transition: 'color 0.2s' }} className="footer-nav-link">About</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} data-cursor="link" style={{ transition: 'color 0.2s' }} className="footer-nav-link">Skills</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} data-cursor="link" style={{ transition: 'color 0.2s' }} className="footer-nav-link">Contact</a>
          </div>

          {/* Right Column: Back to top */}
          <div style={{ textAlign: 'right' }}>
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')} 
              data-cursor="link" 
              style={{ 
                color: 'var(--accent-primary)', 
                textDecoration: 'none', 
                fontWeight: 600,
                fontSize: '0.9rem',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s'
              }}
              className="footer-back-to-top"
            >
              Back to top ↑
            </a>
          </div>
        </div>

        {/* Tech Stack Footer Line */}
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Built with React · GSAP · Three.js · Lenis
        </div>
      </div>
    </footer>
  )
}

export default Footer
