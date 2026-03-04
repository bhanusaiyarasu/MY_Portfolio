import React from 'react'
import { Link } from 'react-router-dom'
import hackerMe from '../assets/hacker-me.png'

const About = () => {
    React.useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about-hero-section">
            {/* Concentric circle background art */}
            <div className="about-circles-bg">
                <div className="circle-ring ring-1"></div>
                <div className="circle-ring ring-2"></div>
                <div className="circle-ring ring-3"></div>
                <div className="circle-ring ring-4"></div>
                <div className="circle-ring ring-5"></div>
            </div>

            <div className="about-hero-layout reveal">
                {/* Left: Text Content */}
                <div className="about-hero-text">
                    <h1 className="about-mega-title">ABOUT</h1>
                    <p className="about-hero-desc">
                        Bhanusai, a driven <strong>Computer Engineer & Developer Intern</strong> based in India,
                        crafts immersive digital experiences that blend <strong>React, WordPress, and Android</strong> development.
                        His modern, AI-powered workflow delivers high-performance applications with stunning,
                        professional-grade interfaces.
                    </p>
                    <Link to="/contacts" className="about-find-more">
                        Find Out More
                    </Link>
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
    )
}

export default About;
