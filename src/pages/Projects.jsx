import React from 'react'
import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'

const Projects = () => {
    return (
        <section id="projects">
            <div className="section-title">
                <h2>projects</h2>
                <div className="section-line"></div>
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
                        <p>An innovative application leveraging AI to transform photos into artistic sketches.</p>
                        <div className="project-links">
                            <a href="#" className="cmd-link"><span>[</span> VISIT_LIVE <span>]</span></a>
                        </div>
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
                        <p>My custom developer space built with modern aesthetics and performance.</p>
                        <div className="project-links">
                            <a href="#" className="cmd-link"><span>[</span> VIEW_CACHE <span>]</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects
