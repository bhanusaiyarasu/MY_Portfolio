import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { gsap } from '../../utils/gsap'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const linksRef = useRef([])

  // Floating pill visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially in case of reload
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.querySelector(item.href)).filter(Boolean)
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
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
      // Animate mobile menu open
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      })
      // Stagger items
      gsap.fromTo(
        linksRef.current,
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
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`navbar ${isVisible ? 'visible' : ''}`}>
        <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')} data-cursor="link">
          BS
        </a>

        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, item.href)}
              data-cursor="link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            data-cursor="link"
          >
            <div className="theme-toggle-knob">
              {theme === 'dark' ? '☀' : '☾'}
            </div>
          </button>

          <div className="availability-badge" data-cursor="text">
            <span className="availability-dot" />
            <span>Available</span>
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
      <div ref={mobileMenuRef} className="mobile-menu">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.href}
            ref={(el) => (linksRef.current[index] = el)}
            href={item.href}
            className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, item.href)}
            data-cursor="link"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar
