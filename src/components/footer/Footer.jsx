import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const nameChars = "BHANU SAI YARASU".split("")

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      if (pageHeight > 0 && window.scrollY / pageHeight > 0.3) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        
        {/* Scrambling Mega Text */}
        <div className="footer-mega" data-cursor="text">
          <h2 className="footer-mega-text">
            {nameChars.map((char, index) => (
              <span
                key={index}
                className="footer-mega-char"
                style={{ display: 'inline-block', width: char === ' ' ? '0.3em' : 'auto' }}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Bhanu Sai Yarasu. Built with React & GSAP.
          </div>

          <div className="footer-links">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="footer-link" data-cursor="link">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="footer-link" data-cursor="link">About</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="footer-link" data-cursor="link">Skills</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="footer-link" data-cursor="link">Projects</a>
            <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="footer-link" data-cursor="link">Experience</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="footer-link" data-cursor="link">Contact</a>
          </div>

          <div className="footer-social">
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="back-to-top"
                aria-label="Back to top"
                data-cursor="link"
              >
                <ArrowUp />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
