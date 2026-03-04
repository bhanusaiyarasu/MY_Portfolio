import React from 'react'

const Contacts = () => {
    return (
        <section id="contacts" className="contacts-section">
            <div className="section-title">
                <h2>&gt; connect_to_network</h2>
                <div className="section-line"></div>
            </div>

            <div className="neural-contact-container">
                {/* Main Terminal Window */}
                <div className="terminal-glass">
                    <div className="scanline"></div>
                    <div className="terminal-header">
                        <div className="terminal-title">
                            <i className="fas fa-terminal"></i>
                            <span>SSH: bhanusai@portfolio ~ % </span>
                        </div>
                        <div className="terminal-controls">
                            <div className="control-dot red"></div>
                            <div className="control-dot yellow"></div>
                            <div className="control-dot green"></div>
                        </div>
                    </div>

                    <div className="terminal-content">
                        <form className="terminal-form">
                            <div className="terminal-input-wrap">
                                <span className="terminal-prompt">$ input_name:</span>
                                <input type="text" className="terminal-field" placeholder="guest_user" />
                                <div className="terminal-cursor"></div>
                            </div>

                            <div className="terminal-input-wrap">
                                <span className="terminal-prompt">$ input_email:</span>
                                <input type="email" className="terminal-field" placeholder="user@remote.host" />
                            </div>

                            <div className="terminal-input-wrap">
                                <span className="terminal-prompt">$ input_message:</span>
                                <textarea className="terminal-field" rows="4" placeholder="Type your transmission here..."></textarea>
                            </div>

                            <button type="button" className="neural-send-btn">
                                <i className="fas fa-satellite-dish"></i>
                                <span>BROADCAST_TRANSMISSION</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Satellite Hub / Contact Info */}
                <div className="contact-sidebar">
                    <div className="terminal-glass" style={{ marginBottom: '2rem' }}>
                        <div className="terminal-content" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                                <div className="orb-glow" style={{ width: '15px', height: '15px' }}></div>
                                <span style={{ fontFamily: 'Fira Code', fontSize: '0.8rem' }}>UPLINK_STATUS: ACTIVE</span>
                            </div>
                            <div className="contact-info-list">
                                <a href="mailto:bhanusaiyarasu@gmail.com" className="info-item">
                                    <div className="info-icon"><i className="fas fa-envelope"></i></div>
                                    <div className="info-text">
                                        <span className="info-label">MAIL_PROTOCOL</span>
                                        <span className="info-value">bhanusaiyarasu@gmail.com</span>
                                    </div>
                                </a>
                                <a href="https://linkedin.com/in/bhanu-sai-yarasu-9a8591357" target="_blank" rel="noreferrer" className="info-item">
                                    <div className="info-icon"><i className="fab fa-linkedin"></i></div>
                                    <div className="info-text">
                                        <span className="info-label">LINKEDIN_SYNC</span>
                                        <span className="info-value">Bhanu Sai Yarasu</span>
                                    </div>
                                </a>
                                <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noreferrer" className="info-item">
                                    <div className="info-icon"><i className="fab fa-github"></i></div>
                                    <div className="info-text">
                                        <span className="info-label">GITHUB_REPO</span>
                                        <span className="info-value">bhanusaiyarasu</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts
