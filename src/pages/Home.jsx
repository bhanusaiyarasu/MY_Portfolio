import React from 'react'
import { Link } from 'react-router-dom'

import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'
import hackerMe from '../assets/hacker-me.png'
import globaliaSoftBlogImg from '../assets/Globaliasoft-Way-to-Become-a-Web-Developer.jpg'


const Home = () => {
    // Add Scroll Reveal effect on mount
    React.useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Horizontal Scroll Logic for Process Section
    const processWrapRef = React.useRef(null);
    const processInnerRef = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (!processWrapRef.current || !processInnerRef.current) return;
            const wrap = processWrapRef.current;
            const inner = processInnerRef.current;

            const rect = wrap.getBoundingClientRect();
            // Scroll progress from 0 to 1 based on section's completely visible track
            const scrollDistance = rect.height - window.innerHeight;
            let progress = -rect.top / scrollDistance;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Calculate max horizontal scroll
            const maxScroll = inner.scrollWidth - window.innerWidth + 100; // 100px padding Right
            inner.style.transform = `translateX(-${progress * maxScroll}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial setup
        setTimeout(handleScroll, 100);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-page-wrap">
            {/* Hero Section */}
            <section id="home" className="hero reveal">
                <div className="hero-text">
                    <div className="badge-premium">UPLINK_ESTABLISHED</div>
                    <h1 className="hero-title">
                        Bhanusai <br />
                        <span>Computer Engineer</span> & <br />
                        <span className="grad-text">Developer Intern</span>
                    </h1>
                    <p className="hero-desc">
                        Passionate developer specializing in <span className="highlight">React, WordPress, and Android</span>.
                        Engineering modern web experiences with AI-driven efficiency and professional grade precision.
                    </p>
                    <div className="hero-actions">
                        <Link to="/contacts" className="btn-premium btn-primary-grad">
                            <i className="fas fa-paper-plane"></i>
                            Hire Me
                        </Link>
                        <a href="#" className="btn-premium btn-secondary-glass">
                            <i className="fas fa-file-download"></i>
                            See My Resume
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-orb-container">
                        <div className="hero-orb"></div>
                        <img src={globaliaSoftBlogImg} alt="Premium hacker illustration" className="hero-img" />
                    </div>
                    <div className="status-box-new">
                        <div className="pulse-dot"></div>
                        <span>Status: <strong style={{ color: '#ff6b6b' }}>Actively Developing</strong></span>
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="reveal">
                <div className="section-title">
                    <h2>&gt; my_journey</h2>
                    <div className="section-line"></div>
                </div>
                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">CURRENT</span>
                            <h3>Developer Intern</h3>
                            <p className="timeline-location">Tech Industry</p>
                            <p>Developing high-performance web applications and mastering modern tech stacks in a professional environment.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">COMPLETED</span>
                            <h3>Diploma in Computer Engineering</h3>
                            <p className="timeline-location">Academic Excellence</p>
                            <p>Deep-diving into fundamental computer science principles, database management (SQL/DBMS), and software architecture.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI & Tech Hub */}
            <section className="reveal">
                <div className="section-title">
                    <h2>&gt; stack_expertise</h2>
                    <div className="section-line"></div>
                </div>
                <div className="expertise-intro">
                    <p>Proficient in building scalable front-ends, custom WordPress solutions, and mobile applications via Android Studio.</p>
                </div>

                <div className="tech-grid">
                    {[
                        { name: 'React', icon: 'fab fa-react' },
                        { name: 'WordPress', icon: 'fab fa-wordpress' },
                        { name: 'JavaScript', icon: 'fab fa-js' },
                        { name: 'HTML5/CSS3', icon: 'fab fa-html5' },
                        { name: 'SQL/DBMS', icon: 'fas fa-database' },
                        { name: 'Git', icon: 'fab fa-git-alt' },
                        { name: 'Android', icon: 'fab fa-android' },
                        { name: 'VS Code', icon: 'fas fa-code' }
                    ].map(tech => (
                        <div key={tech.name} className="tech-card">
                            <i className={`${tech.icon} tech-icon`}></i>
                            <div className="tech-name">{tech.name}</div>
                        </div>
                    ))}
                </div>

                <div className="ai-highlight-card reveal">
                    <div className="ai-icon-group">
                        <i className="fas fa-brain ai-main-icon"></i>
                        <div className="ai-rings">
                            <div className="ai-ring"></div>
                            <div className="ai-ring"></div>
                        </div>
                    </div>
                    <div className="ai-text">
                        <h3>AI & Prompt Engineering Specialist</h3>
                        <p>Leveraging tools like <strong>Antigravity, Cursor, and Windsurf</strong> to accelerate development by 300%. Master of prompt design and AI-assisted workflows.</p>
                    </div>
                </div>
            </section>

            {/* Development Process - Sticky Horizontal Scroll */}
            <section className="process-scroll-wrapper" ref={processWrapRef} style={{ height: '300vh', position: 'relative' }}>
                <div className="process-sticky-container" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div className="process-horizontal-track" ref={processInnerRef} style={{ display: 'flex', alignItems: 'center', gap: '4rem', padding: '0 5vw', width: 'max-content', willChange: 'transform' }}>
                        <div className="section-title" style={{ minWidth: '350px', margin: 0 }}>
                            <h2>&gt; development_process</h2>
                            <div className="section-line"></div>
                        </div>
                        <div className="process-grid-horizontal" style={{ display: 'flex', gap: '3rem' }}>
                            {[
                                { num: '01', title: 'Discovery', icon: 'fas fa-search', desc: 'Analyzing requirements and defining the core architectural vision.' },
                                { num: '02', title: 'Strategy', icon: 'fas fa-drafting-pencil', desc: 'Designing responsive layouts and user-centric interaction flows.' },
                                { num: '03', title: 'Execution', icon: 'fas fa-terminal', desc: 'Rapid development with AI-assisted precision and clean code.' },
                                { num: '04', title: 'Uplink', icon: 'fas fa-rocket', desc: 'Deployment and optimization for maximum performance and impact.' }
                            ].map(step => (
                                <div key={step.num} className="process-step gradient-border-item" style={{ minWidth: '320px', flex: '0 0 auto' }}>
                                    <div className="step-number">{step.num}</div>
                                    <i className={`${step.icon} step-icon`}></i>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects / App Showcase */}
            <section className="reveal">
                <div className="section-title">
                    <h2>&gt; core_projects</h2>
                    <div className="section-line"></div>
                    <Link to="/projects" className="cmd-link">VIEW_ALL ~~&gt;</Link>
                </div>

                <div className="projects-featured">
                    <div className="app-showcase-split">
                        <div className="app-mockup-wrap">
                            <div className="app-mockup">
                                <img src={ribhanceImg} alt="RIBHANCE APP" className="mockup-img" />
                            </div>
                        </div>
                        <div className="app-details">
                            <div className="tag-ai">AI MOBILE APP</div>
                            <h3>RIBHANCE</h3>
                            <p>Developed with Android Studio, this app uses machine learning to transform real-world photos into high-fidelity artistic sketches. A perfect blend of mobile dev and AI.</p>
                            <div className="app-stats">
                                <span><i className="fas fa-bolt"></i> ML Core</span>
                                <span><i className="fas fa-mobile-alt"></i> Native Android</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta reveal">
                <div className="cta-glass-card">
                    <h2>Ready to start a project?</h2>
                    <p>I'm currently available for freelance work and intern opportunities.</p>
                    <div className="cta-btns">
                        <Link to="/contacts" className="btn-premium btn-primary-grad">Let's Connect</Link>
                        <Link to="/about" className="btn-premium btn-secondary-glass">More About Me</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
