import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const Layout = () => {
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
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const socialLinks = {
        github: "https://github.com/bhanusaiyarasu",
        linkedin: "https://www.linkedin.com/in/bhanu-sai-yarasu-9a8591357"
    };

    return (
        <div className="app-container">
            {/* Enhanced Background Animations */}
            <div className="animated-bg">
                {/* Interactive Mouse Follower */}
                <div 
                    className="mouse-follower"
                    style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y}px`
                    }}
                />
                
                {/* Enhanced Floating Particles */}
                <div className="floating-particles">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${15 + i * 2}s`
                            }}
                        />
                    ))}
                </div>
                
                {/* Geometric Shapes */}
                <div className="geometric-shapes">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            className="geo-shape"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 20}%`,
                                animationDelay: `${i * 2}s`
                            }}
                        />
                    ))}
                </div>
                
                {/* Wave Animation */}
                <div className="wave-animation"></div>
                
                {/* Gradient Overlay */}
                <div className="gradient-overlay"></div>
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
                <div className="sidebar-stats">
                    <div className="stat-item">
                        <span className="stat-value">99.9%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                </div>
            </div>

            {/* Premium Interactive Header */}
            <header className="premium-header">
                {/* Cursor-Interactive Background */}
                <div className="premium-bg">
                    <div className="cursor-lines">
                        {[...Array(12)].map((_, i) => (
                            <div 
                                key={i} 
                                className="cursor-line" 
                                style={{ 
                                    '--angle': `${i * 30}deg`,
                                    '--delay': `${i * 0.1}s`
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="cursor-center">
                        <div className="center-dot"></div>
                        <div className="center-ring"></div>
                    </div>
                    <div className="orbiting-lines">
                        {[...Array(6)].map((_, i) => (
                            <div 
                                key={i} 
                                className="orbit-line" 
                                style={{ 
                                    '--rotation': `${i * 60}deg`,
                                    '--delay': `${i * 0.2}s`
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="connecting-lines">
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i} 
                                className="connect-line" 
                                style={{ 
                                    '--index': i,
                                    '--delay': `${i * 0.15}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="premium-container">
                    {/* Logo with Advanced Animation */}
                    <div className="logo-section">
                        <Link to="/" className="premium-logo">
                            <div className="logo-orb">
                                <img src={logoImg} alt="Bhanusai" className="logo-img" />
                                <div className="orb-ring ring-1"></div>
                                <div className="orb-ring ring-2"></div>
                                <div className="orb-ring ring-3"></div>
                                <div className="orb-glow"></div>
                            </div>
                            <div className="logo-text-group">
                                <span className="logo-main">Bhanusai</span>
                                <div className="logo-subtitle">Creative Developer</div>
                                <div className="logo-underline"></div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="premium-nav desktop-nav">
                        <div className="nav-wrapper">
                            {[
                                { name: 'home', path: '/', icon: '🏠' },
                                { name: 'projects', path: '/projects', icon: '💼' },
                                { name: 'skills', path: '/skills', icon: '⚡' },
                                { name: 'about', path: '/about', icon: '👤' },
                                { name: 'contact', path: '/contacts', icon: '✉️' }
                            ].map((item, index) => (
                                <NavLink 
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `premium-nav-item ${isActive ? 'active' : ''}`
                                    }
                                    style={{ '--index': index }}
                                >
                                    <div className="nav-icon-wrapper">
                                        <span className="nav-icon">{item.icon}</span>
                                        <div className="icon-ripple"></div>
                                    </div>
                                    <span className="nav-label">{item.name}</span>
                                    <div className="nav-indicator"></div>
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="premium-actions desktop-actions">
                        <div className="status-indicator">
                            <div className="status-core">
                                <div className="core-pulse"></div>
                                <div className="core-ring"></div>
                            </div>
                            <span className="status-text">Online</span>
                        </div>
                        <Link to="/contacts" className="premium-cta">
                            <span>Let's Talk</span>
                            <div className="cta-sparkles">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="sparkle" style={{ '--delay': `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="premium-menu-toggle" 
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <div className="menu-icon">
                            <div className="icon-bar bar-1"></div>
                            <div className="icon-bar bar-2"></div>
                            <div className="icon-bar bar-3"></div>
                        </div>
                        <div className="menu-bg"></div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`premium-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-header">
                        <div className="mobile-logo">
                            <img src={logoImg} alt="Logo" className="mobile-logo-img" />
                            <span>Bhanusai</span>
                        </div>
                        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
                            <div className="close-icon">×</div>
                        </button>
                    </div>
                    
                    <div className="mobile-menu-content">
                        <nav className="mobile-nav">
                            {[
                                { name: 'home', path: '/', icon: '🏠', color: '#ff6b6b' },
                                { name: 'projects', path: '/projects', icon: '💼', color: '#4ecdc4' },
                                { name: 'skills', path: '/skills', icon: '⚡', color: '#45b7d1' },
                                { name: 'about', path: '/about', icon: '👤', color: '#f7b731' },
                                { name: 'contact', path: '/contacts', icon: '✉️', color: '#5f27cd' }
                            ].map((item, index) => (
                                <NavLink 
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `mobile-nav-item ${isActive ? 'active' : ''}`
                                    }
                                    style={{ '--delay': `${index * 0.1}s`, '--color': item.color }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="mobile-nav-icon" style={{ background: item.color }}>
                                        <span>{item.icon}</span>
                                        <div className="icon-glow"></div>
                                    </div>
                                    <div className="mobile-nav-text">
                                        <span className="nav-title">{item.name}</span>
                                        <span className="nav-desc">Explore {item.name}</span>
                                    </div>
                                    <div className="mobile-nav-arrow">→</div>
                                </NavLink>
                            ))}
                        </nav>
                        
                        <div className="mobile-menu-footer">
                            <div className="mobile-status">
                                <div className="mobile-status-indicator"></div>
                                <span>Available for work</span>
                            </div>
                            <Link to="/contacts" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                                <span>Start Conversation</span>
                                <div className="mobile-cta-glow"></div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Overlay */}
                <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
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
    )
}

export default Layout
