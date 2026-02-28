import React from 'react'
import { Link } from 'react-router-dom'
import premiumHero from '../assets/premium_hero.png'
import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'
import hackerMe from '../assets/hacker-me.png'

const Home = () => {
    return (
        <>
            {/* Quote Section */}
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '100px 0', position: 'relative' }}>
                <div style={{ border: '1px solid var(--border-gray)', padding: '2rem', display: 'inline-block', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-15px', left: '20px', background: 'var(--bg-dark)', padding: '0 10px', fontSize: '2rem', color: 'var(--text-gray)' }}>"</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>In a world of variables, be the constant that breaks the loop.--X</p>
                    <span style={{ position: 'absolute', bottom: '-25px', right: '20px', background: 'var(--bg-dark)', padding: '0 10px', fontSize: '2rem', color: 'var(--text-gray)' }}>"</span>
                </div>
                <div style={{ position: 'relative', textAlign: 'right', marginTop: '-1px' }}>
                    <div style={{ border: '1px solid var(--border-gray)', display: 'inline-block', padding: '10px 20px', borderTop: '0' }}>
                        - Mr. Who
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section id="home" className="hero animate-fade-in delay-1">
                <div className="hero-text">
                    <div className="typing-text-1">
                        <h1>Bhanusai is a <span>web designer</span></h1>
                    </div>
                    <div className="typing-text-2">
                        <h1 style={{ lineHeight: '1' }}>and <span>front-end developer</span></h1>
                    </div>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem', maxWidth: '480px', fontSize: '1.1rem' }}>
                        He crafts responsive websites where technologies meet creativity.
                        Specializing in modern architectures, interactive UIs, and robust backends.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-white)' }}>15+</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', margin: 0 }}>Projects Built</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-white)' }}>1+</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', margin: 0 }}>Years Exp.</p>
                        </div>
                    </div>
                    <Link to="/contacts" className="btn-outline">Contact me!!</Link>
                </div>
                <div className="hero-image">
                    <img src={premiumHero} alt="Premium hacker illustration" />
                    <div className="dot-pattern" style={{ position: 'absolute', top: '10%', right: '-10%', zIndex: 1 }}>
                        {[...Array(25)].map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                    <div className="status-box">
                        <div className="status-dot"></div>
                        <span>Currently working on <strong style={{ color: 'var(--text-white)' }}>Portfolio</strong></span>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="animate-fade-in delay-2" style={{ marginTop: '5rem' }}>
                <div className="section-title">
                    <h2>projects</h2>
                    <div className="section-line"></div>
                    <Link to="/projects" className="cmd-link" style={{ fontSize: '1rem' }}>View all ~~&gt;</Link>
                </div>
                <div className="projects-grid">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <span>[ _ □ X ]</span>
                        </div>
                        <div className="project-img-container">
                            <img src={ribhanceImg} alt="RIBHANCE project" className="project-img" />
                        </div>
                        <div className="project-tech">&gt; stack: React Native, AI, ML</div>
                        <div className="project-info">
                            <h3>RIBHANCE</h3>
                            <p>An innovative application leveraging AI to transform photos into artistic sketches...</p>
                        </div>
                    </div>

                    <div className="terminal-window">
                        <div className="terminal-header">
                            <span>[ _ □ X ]</span>
                        </div>
                        <div className="project-img-container">
                            <img src={portfolioImg} alt="Portfolio project" className="project-img" />
                        </div>
                        <div className="project-tech">&gt; stack: Vite, React, CSS3</div>
                        <div className="project-info">
                            <h3>Personal Portfolio</h3>
                            <p>My custom developer space built with modern aesthetics and performance...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Snippet */}
            <section className="animate-fade-in delay-3" style={{ marginTop: '5rem' }}>
                <div className="section-title">
                    <h2>skills</h2>
                    <div className="section-line"></div>
                </div>
                <div className="skills-wrapper" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div className="skills-abstract" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                        <div className="dot-pattern">
                            {[...Array(20)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                        <div style={{ border: '2px solid var(--border-gray)', width: '80px', height: '80px' }}></div>
                        <div style={{ border: '2px solid var(--accent-purple)', width: '60px', height: '60px', marginLeft: 'auto' }}></div>
                        <div className="dot-pattern">
                            {[...Array(20)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                    </div>
                    <div className="skills-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'flex-start' }}>
                        <div className="skill-box" style={{ flex: '1 1 150px' }}>
                            <div className="skill-header">Languages</div>
                            <div className="skill-list">JS TS Python</div>
                        </div>
                        <div className="skill-box" style={{ flex: '1 1 150px' }}>
                            <div className="skill-header">Frameworks</div>
                            <div className="skill-list">React Native Express</div>
                        </div>
                        <div className="skill-box" style={{ flex: '1 1 150px' }}>
                            <div className="skill-header">Tools</div>
                            <div className="skill-list">Git Linux VSCode</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Snippet */}
            <section className="animate-fade-in delay-1" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                <div className="section-title">
                    <h2>about-me</h2>
                    <div className="section-line"></div>
                </div>
                <div className="about-content">
                    <div style={{ flex: 1.2 }}>
                        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>Hello, i'm Bhanusai!</p>
                        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                            I'm a self-taught front-end developer based in India. I can develop responsive
                            websites from scratch and raise them into modern user-friendly web experiences.
                        </p>
                        <Link to="/about" className="btn-outline">Read more -&gt;</Link>
                    </div>
                    <div style={{ position: 'relative', flex: 0.8 }}>
                        <img src={hackerMe} alt="Bhanusai" style={{ width: '100%', zIndex: 2, position: 'relative' }} />
                        <div className="dot-pattern" style={{ position: 'absolute', top: '10%', left: '-20px', zIndex: 1 }}>
                            {[...Array(25)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                        <div className="dot-pattern" style={{ position: 'absolute', bottom: '10%', right: '10px', zIndex: 1 }}>
                            {[...Array(25)].map((_, i) => <div key={i} className="dot"></div>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
