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

    // Magnetic logic re-applied on route change to ensure persistence
    useEffect(() => {
        const magneticElements = document.querySelectorAll('.btn-premium');

        const handleMagneticMove = (e, el) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        };

        const handleMagneticReset = (el) => {
            el.style.transform = `translate(0px, 0px)`;
        };

        const eventCleanups = [];

        magneticElements.forEach(el => {
            const parent = el.parentElement;
            const moveHandler = (e) => handleMagneticMove(e, el);
            const leaveHandler = () => handleMagneticReset(el);

            parent.addEventListener('mousemove', moveHandler);
            parent.addEventListener('mouseleave', leaveHandler);

            eventCleanups.push(() => {
                parent.removeEventListener('mousemove', moveHandler);
                parent.removeEventListener('mouseleave', leaveHandler);
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

    return (
        <div className={`app-container ${splashDone ? 'entrance-ready' : ''}`}>
            {/* Enhanced Background Animations */}
            <div className="animated-bg">
                {/* Wave Animation */}
                <div className="wave-animation"></div>

                {/* Gradient Overlay */}
                <div className="gradient-overlay"></div>

                {/* Floating Particles */}
                <div className="floating-particles">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="float-particle"
                            style={{
                                left: `${5 + Math.random() * 90}%`,
                                top: `${5 + Math.random() * 90}%`,
                                animationDelay: `${Math.random() * 6}s`,
                                animationDuration: `${6 + Math.random() * 8}s`,
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Animated gradient mesh orb */}
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
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

                    <nav className="premium-nav">
                        <div className="nav-wrapper">
                            {[
                                { name: 'home', path: '/' },
                                { name: 'works', path: '/projects' },
                                { name: 'skills', path: '/skills' },
                                { name: 'about', path: '/about' },
                                { name: 'contact', path: '/contacts' }
                            ].map((item) => (
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
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>

                {/* Original Style Footer */}
                <footer>
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                <img src={logoImg} alt="" style={{ height: '14px', filter: 'invert(1)' }} />
                                <span>Bhanusai</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Web designer and front-end developer</p>
                            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-gray)' }}>bhanusaiyarasu@gmail.com</p>
                        </div>

                        <div className="footer-col">
                            <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Navigation</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <Link to="/" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>&gt; home</Link>
                                <Link to="/projects" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>&gt; works</Link>
                                <Link to="/skills" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>&gt; skills</Link>
                                <Link to="/about" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>&gt; about-me</Link>
                                <Link to="/contacts" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>&gt; contacts</Link>
                            </div>
                        </div>

                        <div className="footer-col">
                            <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Technical Stats</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', fontFamily: 'monospace' }}>
                                <p>[ UPTIME: 99.98% ]</p>
                                <p>[ LATENCY: 24ms ]</p>
                                <p>[ LAST_SYNC: {new Date().toLocaleTimeString()} ]</p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><i className="fab fa-github"></i></a>
                                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-gray)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>© Copyright 2026. Made by Bhanusai</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cmd-link" style={{ fontSize: '0.8rem' }}>
                            <span>[</span> run back_to_top <span>]</span>
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
