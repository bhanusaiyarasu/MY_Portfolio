import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { gsap } from '../../utils/gsap'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const { theme } = useTheme()
  const [isFloating, setIsFloating] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const linksRef = useRef([])

  // Track scroll to trigger floating pill state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFloating(true)
      } else {
        setIsFloating(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight active section based on scroll
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.querySelector(item.href)).filter(Boolean)
    // Add home section to watch list
    const homeSection = document.querySelector('#home')
    if (homeSection) sections.push(homeSection)

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setActiveSection(id === 'home' ? 'home' : `#${id}`)
        }
      })
    }, observerOptions)

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  // Mobile menu GSAP animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll')
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      )
    } else {
      document.body.classList.remove('no-scroll')
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      // Find offset to adjust for floating menu height
      const offset = 90
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <header className={`navbar ${isFloating ? 'floating-pill' : ''}`}>
        {/* Logo Monogram */}
        <a 
          href="#home" 
          className="nav-logo" 
          onClick={(e) => handleLinkClick(e, '#home')} 
          data-cursor="link"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--accent-primary)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}
        >
          B·S
        </a>

        {/* Navigation links (hidden on mobile) */}
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, item.href)}
              data-cursor="link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                position: 'relative',
                padding: '0.25rem 0',
                transition: 'color 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Theme Toggle & Mobile Hamburger */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <ThemeToggle />

          {/* Availability Dot (only visible when floating or large screens) */}
          <div 
            className="availability-badge" 
            data-cursor="text"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-secondary)',
            }}
          >
            <span 
              className="availability-dot" 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#c8ff00',
                display: 'inline-block',
                boxShadow: '0 0 10px #c8ff00',
                animation: 'pulse 2s infinite',
              }}
            />
            <span className="availability-text">Available</span>
          </div>

          <button
            className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            data-cursor="link"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef} 
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#070707',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="grain-overlay" style={{ opacity: 0.05 }} />
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.href}
            ref={(el) => (linksRef.current[index] = el)}
            href={item.href}
            className={`nav-link ${activeSection === item.href ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, item.href)}
            data-cursor="link"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar
