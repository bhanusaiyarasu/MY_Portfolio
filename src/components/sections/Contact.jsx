import React, { useState } from 'react'
import { Send, Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

// Custom robust inline SVG social icons to guarantee build stability
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
    subject: 'Collaboration',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')
    
    // Simulate premium transmission sequence
    setTimeout(() => {
      setStatus('sent')
      setFormData({
        name: '',
        email: '',
        subject: 'Collaboration',
        message: '',
      })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1800)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          
          {/* Left Column: CTA & Info */}
          <div className="contact-info-col">
            <div className="section-label">
              <span>05 · </span>Connect
            </div>
            
            <h2 className="contact-heading" data-cursor="text">
              Let's build something <br />
              <em>legendary</em> together.
            </h2>
            
            <p className="contact-subtext" data-cursor="text">
              Have an idea, inquiry, or just want to synchronize networks? Send a secure transmission through the terminal on the right or establish an direct uplink through my communication channels.
            </p>

            <a
              href="mailto:bhanusaiyarasu@gmail.com"
              className="contact-email"
              data-cursor="link"
            >
              bhanusaiyarasu@gmail.com
            </a>

            <div className="contact-social-links" style={{ marginTop: '2rem' }}>
              <a
                href="https://github.com/bhanusaiyarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                data-cursor="link"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/bhanu-sai-yarasu-9a8591357"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                data-cursor="link"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Terminal-style Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">input_name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="guest_user"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">input_email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="user@remote.host"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">transmission_protocol</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="link"
                >
                  <option value="Collaboration">Collaboration / Project</option>
                  <option value="Freelance">Freelance Inquiry</option>
                  <option value="Internship">Internship Opportunity</option>
                  <option value="Greeting">Just Saying Hello</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">input_message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Type your transmission here..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  data-cursor="text"
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="submit-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: (status === 'sending' || status === 'sent') ? 'not-allowed' : 'none',
                }}
              >
                {status === 'idle' && (
                  <>
                    <Send size={16} /> Broadcast Transmission
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span className="availability-dot" style={{ animationDuration: '0.8s' }} /> Transmitting Uplink...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <Check size={16} /> Signal Transmitted Successfully
                  </>
                )}
              </MagneticButton>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
