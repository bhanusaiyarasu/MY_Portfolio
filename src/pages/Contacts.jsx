import React from 'react'

const Contacts = () => {
    const [revealedIds, setRevealedIds] = React.useState(new Set());

    React.useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-reveal-id');
                    if (id) {
                        setRevealedIds(prev => {
                            if (prev.has(id)) return prev;
                            const next = new Set(prev);
                            next.add(id);
                            return next;
                        });
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="contacts" className="contacts-section">
            <div
                className={`section-title reveal ${revealedIds.has('contact-title') ? 'active' : ''}`}
                data-reveal-id="contact-title"
            >
                <h2>&gt; connect_to_network</h2>
                <div className="section-line"></div>
            </div>

            <p className="contact-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.8 }}>
                Have a project in mind or want to collaborate? Send a transmission through the terminal below, or reach out via any of my social channels.
            </p>

            <div className="neural-contact-container">
                {/* Main Terminal Window */}
                <div
                    className={`terminal-glass reveal ${revealedIds.has('contact-form') ? 'active' : ''}`}
                    data-reveal-id="contact-form"
                >
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
                            </div>

                            <div className="terminal-input-wrap">
                                <span className="terminal-prompt">$ input_email:</span>
                                <input type="email" className="terminal-field" placeholder="user@remote.host" />
                            </div>

                            <div className="terminal-input-wrap">
                                <span className="terminal-prompt">$ input_subject:</span>
                                <input type="text" className="terminal-field" placeholder="project_inquiry" />
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

                {/* Contact Info Sidebar */}
                <div
                    className={`contact-sidebar reveal ${revealedIds.has('contact-info') ? 'active' : ''}`}
                    data-reveal-id="contact-info"
                >
                    <div className="terminal-glass" style={{ marginBottom: '2rem' }}>
                        <div className="terminal-content" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                                <div className="orb-glow" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '2px' }}>UPLINK_STATUS: ACTIVE</span>
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

                    {/* Quick Response Card */}
                    <div className="terminal-glass">
                        <div className="terminal-content" style={{ padding: '1.5rem' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '1rem' }}>RESPONSE_TIME</div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                Average response time: <strong style={{ color: 'white' }}>Under 24 hours</strong>. Currently available for freelance projects, internships, and collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts
