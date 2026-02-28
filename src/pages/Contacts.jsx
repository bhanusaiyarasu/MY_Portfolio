import React from 'react'

const Contacts = () => {
    return (
        <section id="contacts">
            <div className="section-title">
                <h2>contacts</h2>
                <div className="section-line" style={{ maxWidth: '300px' }}></div>
            </div>

            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', marginBottom: '3rem', fontSize: '1.1rem' }}>
                I'm currently open to new freelance opportunities and exciting projects.
                Whether you have a specific request or just want to say hi, my inbox is always open!
            </p>

            <div className="contacts-grid">

                {/* Contact Form Terminal Style */}
                <div className="terminal-window" style={{ display: 'flex' }}>
                    <div className="terminal-header">
                        <span>[ new_message.exe - X ]</span>
                    </div>
                    <form style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                        <div className="contact-inputs-row">
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--text-gray)', fontSize: '0.9rem', fontFamily: 'monospace' }}>&gt; name:</label>
                                <input type="text" placeholder="_" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-gray)', padding: '0.8rem', color: 'var(--text-white)', outline: 'none', fontFamily: 'monospace', width: '100%' }} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--text-gray)', fontSize: '0.9rem', fontFamily: 'monospace' }}>&gt; email:</label>
                                <input type="email" placeholder="_" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-gray)', padding: '0.8rem', color: 'var(--text-white)', outline: 'none', fontFamily: 'monospace', width: '100%' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                            <label style={{ color: 'var(--text-gray)', fontSize: '0.9rem', fontFamily: 'monospace' }}>&gt; message:</label>
                            <textarea placeholder="Type your message here..." style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-gray)', padding: '0.8rem', color: 'var(--text-white)', minHeight: '150px', outline: 'none', resize: 'vertical', fontFamily: 'monospace', flexGrow: 1, width: '100%' }}></textarea>
                        </div>
                        <button type="button" className="btn-outline" style={{ alignSelf: 'flex-start', background: 'transparent', cursor: 'pointer', fontFamily: 'monospace' }}>
                            [ SEND_DATA ]
                        </button>
                    </form>
                </div>

                {/* Direct Contact Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="terminal-window" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ padding: '2rem' }}>
                            <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent-purple)', fontSize: '1.2rem' }}>&gt; Direct_Comms</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <a href="mailto:bhanusaiyarasu@gmail.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)', textDecoration: 'none', padding: '1rem', border: '1px solid var(--border-gray)', transition: 'all 0.3s ease', wordBreak: 'break-all' }} className="contact-link-hover">
                                    <i className="fas fa-envelope" style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}></i>
                                    <span style={{ fontFamily: 'monospace' }}>bhanusaiyarasu@gmail.com</span>
                                </a>
                                <a href="https://www.linkedin.com/in/bhanu-sai-yarasu-9a8591357" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)', textDecoration: 'none', padding: '1rem', border: '1px solid var(--border-gray)', transition: 'all 0.3s ease', wordBreak: 'break-all' }} className="contact-link-hover">
                                    <i className="fab fa-linkedin" style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}></i>
                                    <span style={{ fontFamily: 'monospace' }}>Bhanu Sai Yarasu</span>
                                </a>
                                <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)', textDecoration: 'none', padding: '1rem', border: '1px solid var(--border-gray)', transition: 'all 0.3s ease', wordBreak: 'break-all' }} className="contact-link-hover">
                                    <i className="fab fa-github" style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}></i>
                                    <span style={{ fontFamily: 'monospace' }}>bhanusaiyarasu</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Inline CSS for the hover effect specifically for this page */}
            <style jsx>{`
                .contact-link-hover:hover {
                    border-color: var(--accent-purple) !important;
                    background: rgba(199, 120, 221, 0.1) !important;
                    color: var(--text-white) !important;
                    transform: translateX(10px);
                }

                .contacts-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: stretch;
                }

                .contact-inputs-row {
                    display: flex;
                    gap: 1rem;
                }

                @media (max-width: 768px) {
                    .contacts-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .contact-inputs-row {
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </section>
    )
}

export default Contacts
