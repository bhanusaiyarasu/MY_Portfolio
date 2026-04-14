import React from 'react'
import { Link } from 'react-router-dom'

import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'
import Lightning from '../components/Lightning/Lightning'


const Home = () => {
    const [revealedIds, setRevealedIds] = React.useState(new Set());
    const fullTitle = 'Computer Engineer & Developer Intern';

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

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="home-page-wrap">
            {/* Hero Section */}
            <section
                id="home"
                className={`hero-immersive-wrap sticky-hero reveal ${revealedIds.has('hero') ? 'active' : ''}`}
                data-reveal-id="hero"
            >
                <div className="immersive-bg">
                    <Lightning hue={270} speed={1.2} intensity={2.0} size={1} />
                </div>
                <div className="grain-overlay"></div>

                <div className="hero-edge-ui hue-blue">
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
                                SYSTEM ACTIVE // BHANUSAI_PORTFOLIO
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

                <div className="hero-center-voltage">
                    <h1 className="hero-title">
                        <span className="name-highlight">Bhanusai</span>
                        <span>Computer Engineer &</span>
                        <span className="role-highlight">Developer Intern</span>
                    </h1>

                    <div className="glass-desc-container-new">
                        <p className="hero-desc">
                            Passionate developer specializing in <span className="highlight">React, WordPress, and Android</span>.
                            Engineering modern web experiences with <span style={{ color: 'var(--electric-purple)' }}>AI-driven efficiency</span>.
                        </p>
                    </div>

                    <div className="hero-actions">
                        <Link to="/contacts" className="btn-premium btn-primary-grad" style={{ background: 'var(--electric-purple)', color: '#fff', boxShadow: '0 0 25px var(--electric-purple-glow)' }}>
                            <i className="fas fa-bolt"></i> GET IN TOUCH
                        </Link>
                        <Link to="/projects" className="btn-premium btn-secondary-glass">
                            <i className="fas fa-folder-open"></i> VIEW WORKS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section
                className={`stacked-section reveal ${revealedIds.has('journey') ? 'active' : ''}`}
                data-reveal-id="journey"
            >
                <div className="section-title">
                    <h2>&gt; my_journey</h2>
                    <div className="section-line"></div>
                </div>
                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">2024 — PRESENT</span>
                            <h3>Developer Intern</h3>
                            <p className="timeline-location">Tech Industry — Hyderabad, India</p>
                            <p>Building and maintaining production-grade web applications using React and WordPress. Focused on responsive design, performance optimization, and professional agile workflows.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">2023 — 2026</span>
                            <h3>Diploma in Computer Engineering</h3>
                            <p className="timeline-location">Academic Excellence — India</p>
                            <p>Mastering core computer science principles including data structures, algorithms, SQL/DBMS, and software architecture. Building a rock-solid engineering foundation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI & Tech Hub */}
            <section
                className={`stacked-section reveal ${revealedIds.has('stack') ? 'active' : ''}`}
                data-reveal-id="stack"
            >
                <div className="section-title">
                    <h2>&gt; stack_expertise</h2>
                    <div className="section-line"></div>
                </div>
                <div className="expertise-intro">
                    <p>Proficient in building scalable front-ends, custom WordPress ecosystems, and native mobile applications. Every project is engineered for performance and visual impact.</p>
                </div>

                <div className="tech-grid">
                    {[
                        { name: 'React', icon: 'fab fa-react', desc: 'Component Architecture' },
                        { name: 'WordPress', icon: 'fab fa-wordpress', desc: 'CMS Ecosystems' },
                        { name: 'JavaScript', icon: 'fab fa-js', desc: 'ES6+ Modern JS' },
                        { name: 'HTML5/CSS3', icon: 'fab fa-html5', desc: 'Semantic Markup' },
                        { name: 'SQL/DBMS', icon: 'fas fa-database', desc: 'Data Architecture' },
                        { name: 'Git', icon: 'fab fa-git-alt', desc: 'Version Control' },
                        { name: 'Android', icon: 'fab fa-android', desc: 'Native Mobile' },
                        { name: 'VS Code', icon: 'fas fa-code', desc: 'Dev Environment' }
                    ].map(tech => (
                        <div key={tech.name} className="tech-card">
                            <i className={`${tech.icon} tech-icon`}></i>
                            <div className="tech-name">{tech.name}</div>
                            <div className="tech-desc">{tech.desc}</div>
                        </div>
                    ))}
                </div>

                <div
                    className={`ai-highlight-card reveal ${revealedIds.has('ai-card') ? 'active' : ''}`}
                    data-reveal-id="ai-card"
                >
                    <div className="ai-icon-group">
                        <i className="fas fa-brain ai-main-icon"></i>
                        <div className="ai-rings">
                            <div className="ai-ring"></div>
                            <div className="ai-ring"></div>
                        </div>
                    </div>
                    <div className="ai-text">
                        <h3>AI & Prompt Engineering Specialist</h3>
                        <p>Leveraging tools like <strong>Antigravity, Cursor, and Windsurf</strong> to accelerate development by 300%. Master of prompt design, AI-assisted code generation, and intelligent workflow automation.</p>
                    </div>
                </div>
            </section>

            {/* Development Process */}
            <section
                className={`stacked-section reveal ${revealedIds.has('process') ? 'active' : ''}`}
                data-reveal-id="process"
            >
                <div className="section-title">
                    <h2>&gt; development_process</h2>
                    <div className="section-line"></div>
                </div>
                <div className="process-grid">
                    {[
                        { num: '01', title: 'Discovery', icon: 'fas fa-search', desc: 'Deep-diving into requirements to define the core architectural vision and project scope.' },
                        { num: '02', title: 'Strategy', icon: 'fas fa-drafting-compass', desc: 'Designing responsive layouts and user-centric interaction flows with pixel-perfect precision.' },
                        { num: '03', title: 'Execution', icon: 'fas fa-terminal', desc: 'Rapid development with AI-assisted precision, clean code architecture, and rigorous testing.' },
                        { num: '04', title: 'Uplink', icon: 'fas fa-rocket', desc: 'Deployment, performance optimization, and continuous monitoring for maximum impact.' }
                    ].map(step => (
                        <div key={step.num} className="process-step">
                            <div className="step-number">{step.num}</div>
                            <i className={`${step.icon} step-icon`}></i>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Projects / App Showcase */}
            <section
                className={`stacked-section reveal ${revealedIds.has('featured') ? 'active' : ''}`}
                data-reveal-id="featured"
            >
                <div className="section-title">
                    <h2>&gt; core_projects</h2>
                    <div className="section-line"></div>
                    <Link to="/projects" className="cmd-link">VIEW_ALL ~~&gt;</Link>
                </div>

                <div className="projects-featured">
                    {/* Project 1 */}
                    <div className="app-showcase-split">
                        <div className="app-mockup-wrap">
                            <div className="app-mockup">
                                <img src={ribhanceImg} alt="RIBHANCE APP" className="mockup-img" />
                            </div>
                        </div>
                        <div className="app-details">
                            <div className="tag-ai">AI MOBILE APP</div>
                            <h3>RIBHANCE</h3>
                            <p>An innovative Android application leveraging machine learning to transform real-world photos into high-fidelity artistic sketches. Built with advanced image processing pipelines and a sleek native UI.</p>
                            <div className="app-stats">
                                <span><i className="fas fa-bolt"></i> ML Core</span>
                                <span><i className="fas fa-mobile-alt"></i> Native Android</span>
                                <span><i className="fas fa-code-branch"></i> 120+ Commits</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="app-showcase-split" style={{ marginTop: '2rem' }}>
                        <div className="app-details">
                            <div className="tag-ai" style={{ borderColor: 'rgba(78, 205, 196, 0.3)', color: 'var(--accent-secondary)', background: 'rgba(78, 205, 196, 0.1)' }}>WEB ECOSYSTEM</div>
                            <h3>Portfolio V2</h3>
                            <p>This very portfolio — a high-performance developer showcase featuring WebGL lightning effects, magnetic interactions, cinematic splash screens, and immersive glassmorphism design throughout.</p>
                            <div className="app-stats">
                                <span><i className="fab fa-react"></i> React + Vite</span>
                                <span><i className="fas fa-bolt"></i> WebGL Effects</span>
                                <span><i className="fas fa-paint-brush"></i> Custom CSS</span>
                            </div>
                        </div>
                        <div className="app-mockup-wrap">
                            <div className="app-mockup">
                                <img src={portfolioImg} alt="Portfolio V2" className="mockup-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Signal Transmission CTA */}
            <section
                className={`signal-cta stacked-section reveal ${revealedIds.has('cta') ? 'active' : ''}`}
                data-reveal-id="cta"
            >
                <div className="signal-rings">
                    <div className="signal-ring"></div>
                    <div className="signal-ring"></div>
                    <div className="signal-ring"></div>
                    <div className="signal-ring"></div>
                </div>
                <div className="signal-cta-content">
                    <div className="signal-icon"><i className="fas fa-broadcast-tower"></i></div>
                    <div className="signal-status">
                        <span className="pulse-dot"></span>
                        TRANSMISSION CHANNEL OPEN
                    </div>
                    <h2>Ready to Build Something Exceptional?</h2>
                    <p className="signal-subtitle">
                        I'm currently available for freelance work, collaboration, and intern opportunities. 
                        Let's create something that pushes the boundaries of what's possible.
                    </p>
                    <div className="signal-btns">
                        <Link to="/contacts" className="btn-neon btn-neon-primary">
                            <i className="fas fa-satellite-dish"></i> Initiate Contact
                        </Link>
                        <Link to="/about" className="btn-neon btn-neon-secondary">
                            <i className="fas fa-user-astronaut"></i> Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
