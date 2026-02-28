import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const Layout = () => {
    const socialLinks = {
        github: "https://github.com/bhanusaiyarasu",
        linkedin: "https://www.linkedin.com/in/bhanu-sai-yarasu-9a8591357"
    }

    return (
        <div className="app-container">
            {/* Sidebar सोशल लिंक */}
            <div className="sidebar">
                <div className="sidebar-line"></div>
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-github"></i>
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>

            <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={logoImg} alt="" style={{ height: '16px', filter: 'invert(1)' }} />
                        <span>Bhanusai</span>
                    </Link>
                    <div className="system-status">
                        <div className="pulse-dot"></div>
                        <span>SYSTEM_ONLINE</span>
                    </div>
                </div>

                <div className="header-command-bar">
                    <span className="prompt">&gt;</span>
                    <span className="cursor-path">~/portfolio/v2.0.4-hacker</span>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>home</NavLink></li>
                        <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>works</NavLink></li>
                        <li><NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''}>skills</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>about-me</NavLink></li>
                        <li><NavLink to="/contacts" className={({ isActive }) => isActive ? 'active' : ''}>contacts</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

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
