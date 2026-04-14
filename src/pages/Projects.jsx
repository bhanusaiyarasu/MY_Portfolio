import React, { useState, useEffect } from 'react'
import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'
import huskImg from '../assets/husk_harbour.png'
import voxalisImg from '../assets/voxalis_3d.png'

const Projects = () => {
    const [revealedIds, setRevealedIds] = useState(new Set());

    useEffect(() => {
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

    const projectsData = [
        {
            id: 1,
            title: "HUSK HARBOUR",
            tag: "WEB_ECOSYSTEM",
            desc: "Smart delivery ecosystem and dashboard concept for optimized logistics.",
            img: huskImg,
            span: "lg",
            theme: "theme-neon",
            github: "https://github.com/bhanusaiyarasu/husk-harbour"
        },
        {
            id: 2,
            title: "VOXALIS 3D",
            tag: "WEBGL_EXP",
            desc: "Immersive 3D environment built with WebGL and Three.js.",
            img: voxalisImg,
            span: "md",
            theme: "theme-void",
            github: "https://github.com/bhanusaiyarasu/voxalis-3d"
        },
        {
            id: 3,
            title: "RIBHANCE",
            tag: "MOBILE_AI",
            desc: "AI-driven image processing for native Android applications.",
            img: ribhanceImg,
            span: "wide",
            theme: "theme-sakura",
            github: "https://github.com/bhanusaiyarasu/RIBHANCE"
        },
        {
            id: 4,
            title: "Portfolio V2",
            tag: "FULL_LAYOUT",
            desc: "High-performance developer showcase with magnetic UI.",
            img: portfolioImg,
            span: "sm",
            theme: "theme-pulse",
            github: "https://github.com/bhanusaiyarasu/MY_Portfolio"
        }
    ];

    return (
        <section id="projects" className="projects-section-wrap stacked-section">
            <div className="hero-edge-ui">
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
                            SYSTEM ACTIVE // VAULT_MODULE
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`section-title reveal ${revealedIds.has('proj-title') ? 'active' : ''}`}
                data-reveal-id="proj-title"
            >
                <h2>&gt; project_vault</h2>
                <div className="section-line"></div>
            </div>

            <div className="bento-grid-container">
                {projectsData.map((proj, idx) => (
                    <div
                        key={proj.id}
                        className={`bento-card ${proj.span} ${proj.theme} reveal ${revealedIds.has(`proj-${proj.id}`) ? 'active' : ''}`}
                        data-reveal-id={`proj-${proj.id}`}
                        style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                        <div 
                            className="bento-card-bg" 
                            style={{ backgroundImage: `url(${proj.img})` }}
                        ></div>
                        <div className="bento-card-content">
                            <span className="bento-tag">{proj.tag}</span>
                            <h3 className="bento-title">{proj.title}</h3>
                            <p className="bento-desc">{proj.desc}</p>
                            <div className="bento-links">
                                <a href={proj.github} target="_blank" rel="noreferrer" className="bento-link">
                                    <i className="fab fa-github"></i> GITHUB
                                </a>
                                <a href="#" className="bento-link">
                                    <i className="fas fa-external-link-alt"></i> LIVE DEMO
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects;
