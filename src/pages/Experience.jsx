import React from 'react';

const Experience = () => {
    const [revealedIds, setRevealedIds] = React.useState(new Set());

    React.useEffect(() => {
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

    const experiences = [
        {
            year: "2024 — Present",
            title: "Development Intern",
            company: "Tech Industry — Hyderabad",
            description: "Actively developing and maintaining production websites using WordPress and React. Focused on responsive design, SEO optimization, performance tuning, and learning professional software delivery in agile sprints.",
            tags: ["React", "WordPress", "Web Development", "UI/UX", "SEO"],
            icon: "fas fa-laptop-code",
            status: "ACTIVE",
            stampClass: "active-stamp"
        },
        {
            year: "2023 — 2026",
            title: "Diploma in Computer Engineering",
            company: "Educational Institution — India",
            description: "Pursuing a comprehensive diploma focused on core computer engineering principles, programming, data structures, algorithms, and system architecture. Building a strong foundation in software development.",
            tags: ["Computer Engineering", "Programming", "Data Structures", "SQL/DBMS"],
            icon: "fas fa-graduation-cap",
            status: "IN PROGRESS",
            stampClass: "completed-stamp"
        }
    ];

    return (
        <div className="page-container experience-page">
            <div
                className={`section-title reveal ${revealedIds.has('exp-title') ? 'active' : ''}`}
                data-reveal-id="exp-title"
            >
                <h2>&gt; mission_logs</h2>
                <div className="section-line"></div>
            </div>

            <p className="exp-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.8 }}>
                Classified records of professional deployments and educational missions. Each entry represents a milestone in the engineering journey.
            </p>

            <div className="mission-log-container">
                <div className="mission-path"></div>

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`mission-log-card reveal ${revealedIds.has(`exp-${index}`) ? 'active' : ''}`}
                        data-reveal-id={`exp-${index}`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <div className="mission-dot"></div>

                        <div className="mlc-header">
                            <div className="mlc-icon-wrap">
                                <i className={exp.icon}></i>
                            </div>
                            <div className="mlc-meta">
                                <div className="mlc-year">{exp.year}</div>
                                <h3 className="mlc-title">{exp.title}</h3>
                                <h4 className="mlc-company">{exp.company}</h4>
                            </div>
                            <div className={`mlc-stamp ${exp.stampClass}`}>
                                {exp.status}
                            </div>
                        </div>

                        <div className="mlc-body">
                            <p className="mlc-desc">{exp.description}</p>
                            <div className="mlc-tags">
                                {exp.tags.map((tag, i) => (
                                    <span key={i} className="mlc-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mlc-glow"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
