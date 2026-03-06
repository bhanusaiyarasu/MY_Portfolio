import React from 'react'
import { Link } from 'react-router-dom'
import hackerMe from '../assets/hacker-me.png'

const About = () => {
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
        <div className="about-page-wrapper">
            <section
                id="about"
                className={`about-hero-section reveal ${revealedIds.has('about-hero') ? 'active' : ''}`}
                data-reveal-id="about-hero"
            >
                {/* Concentric circle background art */}
                <div className="about-circles-bg">
                    <div className="circle-ring ring-1"></div>
                    <div className="circle-ring ring-2"></div>
                    <div className="circle-ring ring-3"></div>
                    <div className="circle-ring ring-4"></div>
                    <div className="circle-ring ring-5"></div>
                </div>

                <div className="about-hero-layout">
                    {/* Left: Text Content */}
                    <div className="about-hero-text">
                        <h1 className="about-mega-title">ABOUT</h1>
                        <p className="about-hero-desc">
                            Bhanusai, a driven <strong>Computer Engineer & Developer Intern</strong> based in India,
                            crafts immersive digital experiences that blend <strong>React, WordPress, and Android</strong> development.
                            His modern, AI-powered workflow delivers high-performance applications with stunning,
                            professional-grade interfaces.
                        </p>
                    </div>

                    {/* Right: Portrait Image */}
                    <div className="about-hero-portrait">
                        <div className="portrait-frame">
                            <div className="portrait-badge">
                                <div className="badge-dot"></div>
                            </div>
                            <img src={hackerMe} alt="Bhanusai - Developer Portrait" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Milestones Section */}
            <section
                className={`about-stats-section reveal ${revealedIds.has('about-stats') ? 'active' : ''}`}
                data-reveal-id="about-stats"
            >
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-number">10+</span>
                        <span className="stat-label">Projects Completed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Github Commits</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">300%</span>
                        <span className="stat-label">Dev Acceleration (AI)</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Active Learning</span>
                    </div>
                </div>
            </section>

            {/* Detailed Bio Section */}
            <section
                className={`about-bio-section reveal ${revealedIds.has('about-bio') ? 'active' : ''}`}
                data-reveal-id="about-bio"
            >
                <div className="section-title">
                    <h2>&gt; mission_objective</h2>
                    <div className="section-line"></div>
                </div>
                <div className="bio-content">
                    <p>
                        My journey in engineering is fueled by a relentless curiosity for how things work under the hood.
                        As a Computer Engineer, I don't just write code—I architect solutions. Whether it's optimizing a
                        React component for maximum performance or designing a custom WordPress ecosystem, my focus is
                        always on scalability, security, and user experience.
                    </p>
                    <p>
                        Currently interning in the tech industry, I'm mastering the art of professional software delivery,
                        agile workflows, and collaborative development. I believe that the future of engineering lies in
                        the synergy between human creativity and AI-powered efficiency.
                    </p>
                </div>
                <Link to="/contacts" className="btn-premium btn-primary-grad" style={{ display: 'inline-flex', marginTop: '2rem' }}>
                    Initiate Connection
                </Link>
            </section>
        </div>
    )
}

export default About;
