import React, { useState, useEffect } from 'react'

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [revealedIds, setRevealedIds] = useState(new Set());

    useEffect(() => {
        const observerOptions = { threshold: 0.2 };
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

    const skillsData = [
        {
            category: 'Frontend',
            icon: '⚛️',
            skills: [
                { name: 'React', level: 95, color: '#4ecdc4' },
                { name: 'WordPress', level: 90, color: '#ff6b6b' },
                { name: 'HTML/CSS', level: 93, color: '#45b7d1' },
                { name: 'JavaScript', level: 90, color: '#ff6b6b' }
            ]
        },
        {
            category: 'Backend & DB',
            icon: '🗄️',
            skills: [
                { name: 'SQL', level: 85, color: '#4ecdc4' },
                { name: 'DBMS', level: 80, color: '#45b7d1' },
                { name: 'REST API', level: 88, color: '#ff6b6b' }
            ]
        },
        {
            category: 'AI Tools',
            icon: '🤖',
            skills: [
                { name: 'Antigravity', level: 95, color: '#ff6b6b' },
                { name: 'Cursor', level: 95, color: '#4ecdc4' },
                { name: 'Windsurf', level: 92, color: '#45b7d1' },
                { name: 'AI Prompting', level: 98, color: '#ff6b6b' }
            ]
        },
        {
            category: 'Dev Tools',
            icon: '🛠️',
            skills: [
                { name: 'Git', level: 92, color: '#4ecdc4' },
                { name: 'VS Code', level: 95, color: '#45b7d1' },
                { name: 'Android Studio', level: 82, color: '#ff6b6b' }
            ]
        }
    ];

    const filteredSkills = selectedCategory === 'all'
        ? skillsData
        : skillsData.filter(cat => cat.category === selectedCategory);

    return (
        <section
            id="skills"
            className={`reveal ${revealedIds.has('skills-main') ? 'active' : ''}`}
            data-reveal-id="skills-main"
        >
            <div className="section-title">
                <h2>&gt; arsenal_parameters</h2>
                <div className="section-line"></div>
            </div>

            {/* Interactive Category Filter */}
            <div className="skill-filters">
                <button
                    className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    &gt; ALL_MODULES
                </button>
                {skillsData.map((category) => (
                    <button
                        key={category.category}
                        className={`filter-btn ${selectedCategory === category.category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.category)}
                    >
                        {category.icon} {category.category.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* 3D Skills Showcase */}
            <div className="skills-showcase">
                {filteredSkills.map((category, categoryIndex) => (
                    <div
                        key={category.category}
                        className={`skill-category reveal ${revealedIds.has(`skill-cat-${categoryIndex}`) ? 'active' : ''}`}
                        data-reveal-id={`skill-cat-${categoryIndex}`}
                    >
                        <div className="category-header">
                            <span className="category-icon">{category.icon}</span>
                            <h3>{category.category}</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="skills-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                            {category.skills.map((skill, skillIndex) => (
                                <div
                                    key={skill.name}
                                    className={`skill-card ${hoveredSkill === `${categoryIndex}-${skillIndex}` ? 'hovered' : ''}`}
                                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    style={{
                                        animationDelay: `${(categoryIndex * 0.1 + skillIndex * 0.05)}s`
                                    }}
                                >
                                    <div className="skill-gradient-border"></div>
                                    <div className="skill-ring">
                                        <svg className="progress-ring" viewBox="0 0 120 120">
                                            <circle
                                                className="progress-ring-bg"
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.05)"
                                                strokeWidth="4"
                                            />
                                            <circle
                                                className="progress-ring-fill"
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke={skill.color}
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                strokeDasharray={`${2 * Math.PI * 54}`}
                                                style={{
                                                    transform: 'rotate(-90deg)',
                                                    transformOrigin: '60px 60px',
                                                    filter: `drop-shadow(0 0 8px ${skill.color})`,
                                                    strokeDashoffset: `calc(339.292 * (1 - ${skill.level} / 100))`
                                                }}
                                            />
                                        </svg>
                                        <div className="skill-level">
                                            <span>{skill.level}%</span>
                                        </div>
                                    </div>

                                    <div className="skill-info">
                                        <h4>{skill.name}</h4>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{
                                                    '--target-width': `${skill.level}%`,
                                                    width: `${skill.level}%`,
                                                    backgroundColor: skill.color,
                                                    boxShadow: `0 0 15px ${skill.color}44`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Skill Orbs */}
            <div className="floating-skills">
                {['React', 'AI Tools', 'SQL', 'WordPress', 'Git'].map((skill, index) => (
                    <div
                        key={skill}
                        className="floating-skill-orb"
                        style={{
                            left: `${10 + index * 15}%`,
                            animationDelay: `${index * 2}s`,
                            animationDuration: `${15 + index * 3}s`
                        }}
                    >
                        {skill}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills;
