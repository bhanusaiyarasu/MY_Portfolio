import React, { useState, useEffect } from 'react'
import ribhanceImg from '../assets/ribhance_showcase.png'
import portfolioImg from '../assets/portfolio_showcase.png'

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const projectsData = [
        {
            id: 1,
            title: "RIBHANCE",
            cat: "AI_MOBILE_APP",
            filterTag: "mobile",
            tech: ["Android Studio", "ML Kit", "Java"],
            desc: "An innovative application leveraging AI and machine learning to transform real-world photos into high-fidelity artistic sketches. Built natively on Android with advanced image processing pipelines.",
            stats: { lines: "8K+", commits: "120+", status: "Active" },
            img: ribhanceImg,
            color: "#ff6b6b"
        },
        {
            id: 2,
            title: "Portfolio V2",
            cat: "WEB_ECOSYSTEM",
            filterTag: "web",
            tech: ["React", "Vite", "CSS3"],
            desc: "A high-performance developer showcase featuring magnetic interactions, holographic depth effects, cinematic splash screen, and responsive glassmorphism design throughout.",
            stats: { lines: "6K+", commits: "80+", status: "Live" },
            img: portfolioImg,
            color: "#4ecdc4"
        }
    ];

    const filters = [
        { label: 'All Projects', value: 'all' },
        { label: 'Web', value: 'web' },
        { label: 'Mobile', value: 'mobile' }
    ];

    const filtered = activeFilter === 'all'
        ? projectsData
        : projectsData.filter(p => p.filterTag === activeFilter);

    return (
        <section id="projects" className="projects-section-wrap">
            {/* Section Header */}
            <div className="section-title reveal">
                <h2>&gt; project_vault</h2>
                <div className="section-line"></div>
            </div>

            {/* Filter Pills */}
            <div className="proj-filters reveal">
                {filters.map(f => (
                    <button
                        key={f.value}
                        className={`proj-filter-pill ${activeFilter === f.value ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid — Interactive Cards */}
            <div className="proj-showcase-grid">
                {filtered.map((proj, idx) => (
                    <div
                        key={proj.id}
                        className={`proj-showcase-card reveal ${hoveredId === proj.id ? 'is-hovered' : ''}`}
                        style={{ animationDelay: `${idx * 0.15}s`, '--card-accent': proj.color }}
                        onMouseEnter={() => setHoveredId(proj.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedProject(proj)}
                    >
                        {/* Image Section */}
                        <div className="proj-card-image">
                            <img src={proj.img} alt={proj.title} />
                            <div className="proj-card-scanline"></div>
                            <div className="proj-card-overlay">
                                <span className="proj-click-hint">
                                    <i className="fas fa-expand-arrows-alt"></i>
                                    VIEW DETAILS
                                </span>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="proj-card-info">
                            <div className="proj-card-cat">&gt; {proj.cat}</div>
                            <h3 className="proj-card-title">{proj.title}</h3>
                            <p className="proj-card-desc">{proj.desc}</p>

                            {/* Tech Stack Chips */}
                            <div className="proj-tech-chips">
                                {proj.tech.map(t => (
                                    <span key={t} className="tech-chip">{t}</span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="proj-card-stats">
                                <div className="proj-stat">
                                    <span className="stat-val">{proj.stats.lines}</span>
                                    <span className="stat-label">Lines</span>
                                </div>
                                <div className="proj-stat">
                                    <span className="stat-val">{proj.stats.commits}</span>
                                    <span className="stat-label">Commits</span>
                                </div>
                                <div className="proj-stat">
                                    <span className="stat-val status-live">{proj.stats.status}</span>
                                    <span className="stat-label">Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="modal-inner">
                            <div className="modal-image">
                                <img src={selectedProject.img} alt={selectedProject.title} />
                            </div>
                            <div className="modal-details">
                                <div className="modal-header">
                                    <span className="project-cat">{selectedProject.cat}</span>
                                    <h2>{selectedProject.title}</h2>
                                    <div className="proj-tech-chips" style={{ marginTop: '1rem' }}>
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="tech-chip">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <p>{selectedProject.desc}</p>
                                </div>
                                <div className="modal-actions">
                                    <a href="#" className="btn-premium btn-primary-grad">
                                        <i className="fas fa-play"></i> Live Demo
                                    </a>
                                    <a href="#" className="btn-premium btn-secondary-glass">
                                        <i className="fas fa-code"></i> Source
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Projects;
