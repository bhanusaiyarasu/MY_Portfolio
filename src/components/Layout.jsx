import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const Layout = ({ splashDone }) => {
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Update CSS custom properties for cursor-based animations
            const root = document.documentElement;
            root.style.setProperty('--mouse-x', `${e.clientX}px`);
            root.style.setProperty('--mouse-y', `${e.clientY}px`);
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update Scroll Progress Bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressBar = document.getElementById("header-progress-bar");
            if (progressBar) {
                progressBar.style.width = scrolled + "%";
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Magnetic logic — subtle effect with bounds to prevent collision
    useEffect(() => {
        const magneticElements = document.querySelectorAll('.btn-premium');
        const MAX_OFFSET = 8; // Max px displacement to prevent collision
        const INTENSITY = 0.1; // Reduced from 0.3

        const handleMagneticMove = (e, el) => {
            const rect = el.getBoundingClientRect();
            let x = (e.clientX - rect.left - rect.width / 2) * INTENSITY;
            let y = (e.clientY - rect.top - rect.height / 2) * INTENSITY;
            // Clamp to max offset
            x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x));
            y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y));
            requestAnimationFrame(() => {
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        const handleMagneticReset = (el) => {
            requestAnimationFrame(() => {
                el.style.transform = `translate(0px, 0px)`;
            });
        };

        const eventCleanups = [];

        magneticElements.forEach(el => {
            const moveHandler = (e) => handleMagneticMove(e, el);
            const leaveHandler = () => handleMagneticReset(el);

            el.addEventListener('mousemove', moveHandler);
            el.addEventListener('mouseleave', leaveHandler);

            eventCleanups.push(() => {
                el.removeEventListener('mousemove', moveHandler);
                el.removeEventListener('mouseleave', leaveHandler);
                handleMagneticReset(el);
            });
        });

        return () => {
            eventCleanups.forEach(cleanup => cleanup());
        };
    }, [location.pathname]);

    const socialLinks = {
        github: "https://github.com/bhanusaiyarasu",
        linkedin: "https://www.linkedin.com/in/bhanu-sai-yarasu-9a8591357"
    };

    // Glow trail logic
    useEffect(() => {
        const trail = document.querySelector('.glow-trail');
        if (!trail) return;

        const handleMouseMove = (e) => {
            requestAnimationFrame(() => {
                trail.style.left = `${e.clientX}px`;
                trail.style.top = `${e.clientY}px`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const navItems = [
        { name: 'home', path: '/' },
        { name: 'works', path: '/projects' },
        { name: 'experience', path: '/experience' },
        { name: 'skills', path: '/skills' },
        { name: 'about', path: '/about' },
        { name: 'contact', path: '/contacts' }
    ];

    return (
        <div className={`app-container ${splashDone ? 'entrance-ready' : ''}`}>
            {/* Custom Cursor Glow Trail */}
            <div className="glow-trail"></div>

            {/* Cosmic Background Animations */}
            <div className="animated-bg">
                {/* Twinkling Stars */}
                <div className="cosmic-stars">
                    {[...Array(50)].map((_, i) => {
                        const isLg = i % 8 === 0;
                        const isAccent = i % 12 === 0;
                        const isTeal = i % 15 === 0;
                        return (
                            <div
                                key={`star-${i}`}
                                className={`cosmic-star${isLg ? ' star-lg' : ''}${isAccent ? ' star-accent' : ''}${isTeal ? ' star-teal' : ''}`}
                                style={{
                                    left: `${2 + Math.random() * 96}%`,
                                    top: `${2 + Math.random() * 96}%`,
                                    '--twinkle-duration': `${2 + Math.random() * 5}s`,
                                    '--twinkle-delay': `${Math.random() * 6}s`,
                                }}
                            ></div>
                        );
                    })}
                </div>

                {/* Nebula Blobs */}
                <div className="nebula-blob nebula-1"></div>
                <div className="nebula-blob nebula-2"></div>
                <div className="nebula-blob nebula-3"></div>

                {/* Shooting Stars */}
                <div className="shooting-star-container">
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                </div>

                {/* Floating Dust Particles */}
                <div className="floating-particles">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="float-particle"
                            style={{
                                left: `${3 + Math.random() * 94}%`,
                                top: `${3 + Math.random() * 94}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                animationDuration: `${6 + Math.random() * 10}s`,
                                width: `${1 + Math.random() * 3}px`,
                                height: `${1 + Math.random() * 3}px`,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Gradient Orbs */}
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>

                {/* Wave Animation */}
                <div className="wave-animation"></div>
            </div>

            {/* Enhanced Sidebar with More Elements */}
            <div className={`sidebar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="sidebar-line"></div>
                <div className="social-indicator">
                    <div className="indicator-dot"></div>
                </div>
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-github"></i>
                    <span className="social-tooltip">GitHub</span>
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-linkedin"></i>
                    <span className="social-tooltip">LinkedIn</span>
                </a>
            </div>

            <div className="portfolio-wrapper">
                <div className="hacker-grid"></div>

                {/* Mobile Navigation Overlay - Placed outside header to escape z-index and overflow clipping trap */}
                <nav className={`premium-nav mobile-only-nav ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                    <div className="nav-wrapper">
                        {navItems.map((item) => (
                            <NavLink
                                key={`mob-${item.name}`}
                                to={item.path}
                                className={({ isActive }) => `premium-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="nav-label">{item.name}</span>
                                <div className="liquid-hover"></div>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Premium Interactive Header */}
                <header className="premium-header">
                    <div className="system-pulse-line"></div>
                    <div className="scroll-progress-container">
                        <div id="header-progress-bar" className="scroll-progress-bar"></div>
                    </div>

                    <div className="header-left">
                        <div className="logo-section">
                            <Link to="/" className="premium-logo">
                                <div className="logo-orb">
                                    <img src={logoImg} alt="Bhanusai" className="logo-img" />
                                    <div className="orb-glow"></div>
                                    <div className="orb-sonar"></div>
                                </div>
                                <span className="logo-main">Bhanusai</span>
                            </Link>
                        </div>

                        <div className="terminal-breadcrumb">
                            <span className="user">bhanusai@uplink</span>
                            <span className="sep">:</span>
                            <span className="path">~{location.pathname === '/' ? '' : location.pathname}</span>
                            <span className="prompt">$</span>
                            <span className="cursor-blink">_</span>
                        </div>
                    </div>

                    <nav className="premium-nav desktop-only-nav">
                        <div className="nav-wrapper">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `premium-nav-item ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <span className="nav-label">{item.name}</span>
                                    <div className="liquid-hover"></div>
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    <div className="premium-actions">
                        <Link to="/contacts" className="premium-cta">
                            Let's Talk
                        </Link>
                        <button
                            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                            onClick={toggleMobileMenu}
                            aria-label="Toggle Menu"
                        >
                            <div className="hamburger-box">
                                <div className="hamburger-inner"></div>
                            </div>
                        </button>
                    </div>
                </header>

                <main className="content-area">
                    <div key={location.pathname} className="page-transition-wrap">
                        <Outlet />
                    </div>
                </main>

                {/* Enhanced Animated Footer */}
                <footer className="cosmic-footer">
                    <div className="footer-glow-line"></div>
                    <div className="footer-grid">
                        <div className="footer-col footer-brand">
                            <div className="footer-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <img src={logoImg} alt="" className="footer-logo-img" style={{ height: '30px' }} />
                                <span className="footer-logo-text" style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '2px' }}>BHANUSAI</span>
                            </div>
                            <p className="footer-tagline" style={{ fontSize: '0.8rem', opacity: '0.6', maxWidth: '200px' }}>Computer Engineer & Developer Intern crafting digital experiences.</p>
                        </div>

                        <div className="footer-col">
                            <div className="footer-col-title">MODULES</div>
                            <div className="footer-nav-links">
                                <Link to="/" className="footer-link">HOME</Link>
                                <Link to="/projects" className="footer-link">WORKS</Link>
                                <Link to="/experience" className="footer-link">EXPERIENCE</Link>
                                <Link to="/skills" className="footer-link">SKILLS</Link>
                            </div>
                        </div>

                        <div className="footer-col">
                            <div className="footer-col-title">SYSTEM_STATUS</div>
                            <div className="footer-stats">
                                <div className="footer-stat-row">
                                    <span className="label">Uptime:</span>
                                    <span className="value">99.9%</span>
                                </div>
                                <div className="footer-stat-row">
                                    <span className="label">Sync:</span>
                                    <span className="value">{currentTime}</span>
                                </div>
                                <div className="footer-stat-row">
                                    <span className="label">Network:</span>
                                    <span className="value">Uplink Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="footer-col">
                            <div className="footer-col-title">SOCIAL_SYNC</div>
                            <div className="footer-socials" style={{ display: 'flex', gap: '10px' }}>
                                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-icon" style={{ width: '40px', height: '40px' }}>
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-icon" style={{ width: '40px', height: '40px' }}>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,107,107,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="footer-copyright" style={{ fontSize: '0.7rem', opacity: '0.4' }}>© 2026 BHANUSAI. ALL RIGHTS RESERVED.</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-back-top" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                            TOP <i className="fas fa-arrow-up"></i>
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
