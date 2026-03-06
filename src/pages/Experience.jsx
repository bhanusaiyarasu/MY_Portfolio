import React from 'react';

const Experience = () => {
    const experiences = [
        {
            year: "2024 - Present",
            title: "Development Intern",
            company: "Current Internship",
            description: "Actively developing and maintaining websites using WordPress and React. Focusing on responsive design, performance optimization, and learning professional software delivery workflows.",
            tags: ["React", "WordPress", "Web Development", "UI/UX"]
        },
        {
            year: "2023 - 2026",
            title: "Diploma in Computer Engineering",
            company: "Educational Institution",
            description: "Pursuing a comprehensive diploma focused on core computer engineering principles, programming, and system architecture. Building a strong foundation in software development.",
            tags: ["Computer Engineering", "Programming", "Data Structures"]
        }
    ];

    return (
        <div className="page-container experience-page">
            <div className="section-header">
                <h2 className="glitch-text" data-text="Experience">Experience</h2>
                <div className="header-underline"></div>
                <p className="section-subtitle">A chronological journey through my professional growth and education.</p>
            </div>

            <div className="timeline-container">
                <div className="timeline-line"></div>

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <div className="timeline-dot">
                            <div className="dot-inner"></div>
                            <div className="dot-pulse"></div>
                        </div>

                        <div className="timeline-content card-premium">
                            <div className="timeline-year">{exp.year}</div>
                            <h3 className="timeline-title">{exp.title}</h3>
                            <h4 className="timeline-company">{exp.company}</h4>
                            <p className="timeline-desc">{exp.description}</p>
                            <div className="timeline-tags">
                                {exp.tags.map((tag, i) => (
                                    <span key={i} className="tag-chip">{tag}</span>
                                ))}
                            </div>
                            <div className="card-glass-glow"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
