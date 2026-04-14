import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hackerMe from '../assets/hacker-me.png'
import Lightning from '../components/Lightning/Lightning'

const About = () => {
    const [revealedIds, setRevealedIds] = useState(new Set());
    const [typedTexts, setTypedTexts] = useState({});

    useEffect(() => {
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

    // Typing animation for terminal cards
    useEffect(() => {
        const titles = ['Frontend Development', 'WordPress Solutions', 'Mobile Development', 'AI-Powered Workflow'];
        titles.forEach((title, i) => {
            let charIndex = 0;
            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    setTypedTexts(prev => ({
                        ...prev,
                        [i]: title.slice(0, charIndex + 1)
                    }));
                    charIndex++;
                    if (charIndex >= title.length) clearInterval(interval);
                }, 50);
            }, i * 400);
            return () => clearTimeout(timer);
        });
    }, []);

    const services = [
        { icon: 'fab fa-react', title: 'Frontend Development', desc: 'Building responsive, high-performance web applications with React, modern CSS, and component-driven architecture.', cmd: 'npm run build' },
        { icon: 'fab fa-wordpress', title: 'WordPress Solutions', desc: 'Creating custom themes, plugins, and full CMS ecosystems tailored to business needs.', cmd: 'wp deploy --live' },
        { icon: 'fab fa-android', title: 'Mobile Development', desc: 'Developing native Android applications with Android Studio, ML Kit and modern UI.', cmd: 'gradle assembleRelease' },
        { icon: 'fas fa-brain', title: 'AI-Powered Workflow', desc: 'Integrating AI tools like Antigravity, Cursor, and Windsurf to ship code 3x faster.', cmd: 'ai --boost --deploy' }
    ];

    return (
        <div className="about-page-wrapper">
            {/* ===== HERO SECTION — Side by side layout ===== */}
            <section
                id="about"
                className={`about-hero-section sticky-hero reveal ${revealedIds.has('about-hero') ? 'active' : ''}`}
                data-reveal-id="about-hero"
            >
                <div className="immersive-bg">
                    <Lightning hue={270} speed={1.2} intensity={2.0} size={1} />
                </div>
                <div className="grain-overlay"></div>

                <div className="hero-edge-ui">
                    <div className="edge-top">
                        <div className="top-left-group">
                            <div className="social-side-group">
                                <div className="social-indicator-hub">
                                    <div className="indicator-line"></div>
                                    <div className="indicator-dot"></div>
                                </div>
                                <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noreferrer" className="social-icon-btn"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/bhanu-sai-yarasu-9a8591357" target="_blank" rel="noreferrer" className="social-icon-btn"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <div className="system-status">
                                <div className="status-dot"></div>
                                SYSTEM ACTIVE // ABOUT_MODULE
                            </div>
                        </div>
                        <div className="location-info">
                            <i className="fas fa-map-marker-alt"></i> INDIA // GMT +5:30
                        </div>
                    </div>

                    <div className="edge-right">
                        <div className="rotated-text">
                            CREATIVE DEVELOPER © 2026
                        </div>
                    </div>

                    <div className="edge-bottom">
                        <div className="scroll-indicator">
                            SCROLL TO EXPLORE
                        </div>
                    </div>
                </div>

                <div className="about-hero-layout">
                    <div className="about-hero-text">
                        <div className="about-tag">// WHO I AM</div>
                        <h1 className="about-mega-title">ABOUT</h1>
                        <h1 className="about-mega-title name-title">BHANUSAI</h1>
                        <p className="about-hero-desc">
                            I'm <strong>Bhanusai</strong>, a driven <strong>Computer Engineer & Developer Intern</strong> based in India.
                            I craft immersive digital experiences that blend <strong>React, WordPress, and Android</strong> development
                            with a modern, AI-powered workflow. Every project I touch is engineered for
                            <strong> performance, aesthetics, and scalability</strong>.
                        </p>
                        <div className="about-hero-ctas">
                            <Link to="/contacts" className="btn-premium btn-primary-grad" style={{ background: 'var(--electric-purple)', color: '#fff', boxShadow: '0 0 25px var(--electric-purple-glow)' }}>
                                <i className="fas fa-bolt"></i> GET IN TOUCH
                            </Link>
                            <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noreferrer" className="btn-premium btn-secondary-glass">
                                <i className="fab fa-github"></i> GITHUB PROFILE
                            </a>
                        </div>
                    </div>

                    <div className="about-hero-portrait">
                        <div className="portrait-frame">
                            <div className="portrait-badge">
                                <div className="badge-dot"></div>
                            </div>
                            <img src={hackerMe} alt="Bhanusai - Developer Portrait" />
                            <div className="portrait-overlay">
                                <span>BHANUSAI.DEV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section
                className={`about-stats-section stacked-section reveal ${revealedIds.has('about-stats') ? 'active' : ''}`}
                data-reveal-id="about-stats"
            >
                <div className="section-title">
                    <h2>&gt; system_metrics</h2>
                    <div className="section-line"></div>
                </div>
                <div className="stats-grid">
                    {[
                        { number: '10+', label: 'Projects Completed', icon: 'fas fa-project-diagram' },
                        { number: '500+', label: 'Github Commits', icon: 'fas fa-code-branch' },
                        { number: '300%', label: 'Dev Acceleration (AI)', icon: 'fas fa-rocket' },
                        { number: '24/7', label: 'Active Learning', icon: 'fas fa-brain' }
                    ].map((stat, i) => (
                        <div key={i} className="stat-item">
                            <i className={`${stat.icon} stat-icon`}></i>
                            <span className="stat-number">{stat.number}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== WHAT I DO — Terminal Command Grid ===== */}
            <section
                className={`stacked-section reveal ${revealedIds.has('about-what') ? 'active' : ''}`}
                data-reveal-id="about-what"
            >
                <div className="section-title">
                    <h2>&gt; system_capabilities</h2>
                    <div className="section-line"></div>
                </div>
                <div className="terminal-services-grid">
                    {services.map((item, i) => (
                        <div key={i} className="terminal-service-card" style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="tsc-header">
                                <div className="tsc-dots">
                                    <span className="tsc-dot red"></span>
                                    <span className="tsc-dot yellow"></span>
                                    <span className="tsc-dot green"></span>
                                </div>
                                <span className="tsc-title-bar">module_{i + 1}.sh</span>
                            </div>
                            <div className="tsc-body">
                                <div className="tsc-icon-wrap">
                                    <i className={item.icon}></i>
                                </div>
                                <h3 className="tsc-name">
                                    {typedTexts[i] || item.title}
                                    <span className="tsc-cursor">|</span>
                                </h3>
                                <p className="tsc-desc">{item.desc}</p>
                                <div className="tsc-command">
                                    <span className="tsc-prompt">$</span> {item.cmd}
                                </div>
                            </div>
                            <div className="tsc-glow"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== MISSION OBJECTIVE — Decoded Transmissions ===== */}
            <section
                className={`about-bio-section stacked-section reveal ${revealedIds.has('about-bio') ? 'active' : ''}`}
                data-reveal-id="about-bio"
            >
                <div className="section-title">
                    <h2>&gt; decoded_transmission</h2>
                    <div className="section-line"></div>
                </div>
                <div className="transmission-container">
                    <div className="transmission-block">
                        <div className="tx-header">
                            <span className="tx-label">SIGNAL_01</span>
                            <span className="tx-status">● DECODED</span>
                        </div>
                        <div className="tx-content">
                            <div className="tx-scan-line"></div>
                            <p>
                                My journey in engineering is fueled by a relentless curiosity for how things work under the hood.
                                As a Computer Engineer, I don't just write code — I <strong>architect solutions</strong>. Whether it's optimizing a
                                React component for maximum performance or designing a custom WordPress ecosystem, my focus is
                                always on <strong>scalability, security, and user experience</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="transmission-block">
                        <div className="tx-header">
                            <span className="tx-label">SIGNAL_02</span>
                            <span className="tx-status">● DECODED</span>
                        </div>
                        <div className="tx-content">
                            <div className="tx-scan-line"></div>
                            <p>
                                Currently interning in the tech industry, I'm mastering the art of professional software delivery,
                                agile workflows, and collaborative development. I believe the future of engineering lies in
                                the synergy between <strong>human creativity and AI-powered efficiency</strong>.
                            </p>
                        </div>
                    </div>
                </div>
                <Link to="/contacts" className="btn-premium btn-primary-grad" style={{ display: 'inline-flex', marginTop: '2.5rem', background: 'var(--electric-purple)', color: '#fff', boxShadow: '0 0 25px var(--electric-purple-glow)' }}>
                    <i className="fas fa-satellite-dish"></i> Initiate Connection
                </Link>
            </section>
        </div>
    )
}

export default About;
