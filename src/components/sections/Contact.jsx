import React, { useState } from 'react'
import MagneticButton from '../ui/MagneticButton'

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Collaboration',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('bhanusaiyarasu@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')
    
    // Simulate premium transmission sequence
    // Form can easily connect to EmailJS here
    setTimeout(() => {
      setStatus('sent')
      setFormData({
        name: '',
        email: '',
        projectType: 'Collaboration',
        message: '',
      })
      setTimeout(() => setStatus('idle'), 4000)
    }, 2000)
  }

  return (
    <section id="contact" className="section contact" style={{ background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container">
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          
          {/* Left Column: CTA & Info */}
          <div className="contact-info-col">
            <div className="section-label" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
              <span>05 · </span>CONTACT
            </div>
            
            <h2 
              className="contact-heading" 
              data-cursor="text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'var(--text-head)',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Let's build something.
            </h2>
            
            <p 
              className="contact-subtext" 
              data-cursor="text"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '450px',
              }}
            >
              Available for freelance & full-time. Usually respond within 24 hours.
            </p>

            {/* Copyable direct email */}
            <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <a
                href="#copy-email"
                onClick={handleCopyEmail}
                className="contact-email-link"
                data-cursor="link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  borderBottom: '2px solid rgba(200, 255, 0, 0.25)',
                  paddingBottom: '4px',
                  transition: 'border-color 0.3s ease',
                }}
              >
                bhanusaiyarasu@gmail.com <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>↗</span>
              </a>

              {copied && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '-28px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)',
                    animation: 'fadeIn 0.25s ease',
                  }}
                >
                  Copied ✓
                </span>
              )}
            </div>

            {/* Social row */}
            <div className="contact-social-row" style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
              <a
                href="https://github.com/bhanusaiyarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-item"
                data-cursor="link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
                }}
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/bhanu-sai-yarasu-9a8591357"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-item"
                data-cursor="link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
                }}
              >
                <LinkedinIcon /> LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-item"
                data-cursor="link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
                }}
              >
                <TwitterIcon /> Twitter
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Bhanu Sai Yarasu"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                  style={{ width: '100%', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', transition: 'border-color 0.3s' }}
                />
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="bhanu@remote.dev"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                  style={{ width: '100%', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', transition: 'border-color 0.3s' }}
                />
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="projectType" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="link"
                  style={{ width: '100%', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', transition: 'border-color 0.3s', cursor: 'pointer', appearance: 'none', background: 'transparent' }}
                >
                  <option value="Collaboration" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Collaboration / Project</option>
                  <option value="Freelance" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Freelance Work</option>
                  <option value="Full-time" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Full-Time Role</option>
                  <option value="Uplink" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Just Saying Hello</option>
                </select>
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="message" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Describe your project, timeline, and goals..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                  style={{ width: '100%', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', transition: 'border-color 0.3s', resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="submit-btn"
                data-magnetic
                style={{
                  width: '100%',
                  height: '52px',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#070707',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: (status === 'sending' || status === 'sent') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  marginTop: '1rem',
                }}
              >
                {status === 'idle' && 'SEND IT →'}
                {status === 'sending' && 'SENDING...'}
                {status === 'sent' && 'SENT ✓'}
              </MagneticButton>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
