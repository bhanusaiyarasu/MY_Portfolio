import React from 'react'
import hackerMe from '../assets/hacker-me.png'

const About = () => {
    return (
        <section id="about">
            <div className="section-title">
                <h2>about-me</h2>
                <div className="section-line"></div>
            </div>
            <div className="about-content">
                <div className="about-text-content" style={{ flex: 1.2 }}>
                    <div style={{ fontFamily: 'Fira Code, monospace', color: 'var(--accent-purple)', marginBottom: '1rem' }}>
                        &gt; cat about_me.txt
                    </div>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>Hello, i'm Bhanusai!</p>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                        I'm a self-taught front-end developer based in India. I can develop responsive
                        websites from scratch and raise them into modern user-friendly web experiences.
                    </p>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                        Transforming my creativity and knowledge into websites has been my passion for over a year.
                        I always strive to learn about the newest technologies and frameworks.
                    </p>
                </div>
                <div style={{ position: 'relative', flex: 0.8 }}>
                    <img src={hackerMe} alt="Bhanusai" style={{ width: '100%', zIndex: 2, position: 'relative' }} />
                    <div className="dot-pattern" style={{ position: 'absolute', top: '10%', left: '-20px', zIndex: 1 }}>
                        {[...Array(25)].map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                    <div className="dot-pattern" style={{ position: 'absolute', bottom: '10%', right: '10px', zIndex: 1 }}>
                        {[...Array(25)].map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                    <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '1px', background: 'var(--accent-purple)' }}></div>
                </div>
            </div>
        </section>
    )
}

export default About
