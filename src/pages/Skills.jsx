import React, { useState, useEffect } from 'react'
import Lightning from '../components/Lightning/Lightning'

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
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

    const allSkills = [
        { name: 'React', level: 95, color: '#4ecdc4', icon: 'fab fa-react', category: 'Frontend', featured: true },
        { name: 'WordPress', level: 90, color: '#ff6b6b', icon: 'fab fa-wordpress', category: 'Frontend', featured: true },
        { name: 'HTML/CSS', level: 93, color: '#45b7d1', icon: 'fab fa-html5', category: 'Frontend' },
        { name: 'JavaScript', level: 90, color: '#f7df1e', icon: 'fab fa-js-square', category: 'Frontend' },
        { name: 'SQL', level: 85, color: '#4ecdc4', icon: 'fas fa-database', category: 'Backend & DB' },
        { name: 'DBMS', level: 80, color: '#45b7d1', icon: 'fas fa-server', category: 'Backend & DB' },
        { name: 'REST API', level: 88, color: '#ff6b6b', icon: 'fas fa-plug', category: 'Backend & DB' },
        { name: 'Antigravity', level: 95, color: '#9333ea', icon: 'fas fa-atom', category: 'AI Tools', featured: true },
        { name: 'Cursor', level: 95, color: '#4ecdc4', icon: 'fas fa-mouse-pointer', category: 'AI Tools' },
        { name: 'Windsurf', level: 92, color: '#45b7d1', icon: 'fas fa-wind', category: 'AI Tools' },
        { name: 'AI Prompting', level: 98, color: '#ff6b6b', icon: 'fas fa-magic', category: 'AI Tools', featured: true },
        { name: 'Git', level: 92, color: '#4ecdc4', icon: 'fab fa-git-alt', category: 'Dev Tools' },
        { name: 'VS Code', level: 95, color: '#45b7d1', icon: 'fas fa-code', category: 'Dev Tools' },
        { name: 'Android Studio', level: 82, color: '#ff6b6b', icon: 'fab fa-android', category: 'Dev Tools' }
    ];

    const categories = ['all', ...new Set(allSkills.map(s => s.category))];

    const filteredSkills = selectedCategory === 'all'
        ? allSkills
        : allSkills.filter(s => s.category === selectedCategory);

    const r = 42;
    const circumference = 2 * Math.PI * r;

    return (
        <div className="skills-page-wrapper">
            {/* ##### SKILLS HERO ##### */}
            <section
                id="skills-hero"
                className={`skills-hero-section reveal ${revealedIds.has('skills-hero') ? 'active' : ''}`}
                data-reveal-id="skills-hero"
            >
                <div className="immersive-bg">
                    <Lightning hue={180} speed={1.2} intensity={2.0} size={1} />
                </div>
                <div className="grain-overlay"></div>

                <div className="hero-edge-ui">
                    <div className="edge-top">
                        <div className="system-status">
                            <div className="status-dot"></div>
                            SYSTEM ACTIVE // SKILLS_MODULE
                        </div>
                        <div className="location-info">
                            <i className="fas fa-map-marker-alt"></i> INDIA // GMT +5:30
                        </div>
                    </div>
                    <div className="edge-right">
                        <div className="rotated-text">TECHNICAL ARSENAL © 2026</div>
                    </div>
                </div>

                <div className="skills-hero-content">
                    <h1 className="skills-mega-title">ARSENAL</h1>
                    <h1 className="skills-mega-title highlight-text">PARAMETERS</h1>
                    
                    <div className="skill-filters-wrap">
                        <div className="skill-filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat === 'all' ? '> ALL_MODULES' : cat.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Bento Grid */}
            <div className="bento-skills-grid">
                {filteredSkills.map((skill, i) => (
                    <div
                        key={skill.name}
                        className={`bento-skill-card ${skill.featured ? 'featured' : ''}`}
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        <div className="bento-icon" style={{ color: skill.color }}>
                            <i className={skill.icon}></i>
                        </div>
                        <div className="bento-skill-name">{skill.name}</div>
                        <div className="bento-ring-wrap">
                            <svg viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r={r}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="4"
                                />
                                <circle
                                    cx="50" cy="50" r={r}
                                    fill="none"
                                    stroke={skill.color}
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - skill.level / 100)}
                                    style={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: '50px 50px',
                                        filter: `drop-shadow(0 0 6px ${skill.color})`,
                                        transition: 'stroke-dashoffset 1s ease-out'
                                    }}
                                />
                            </svg>
                            <div className="bento-level">{skill.level}%</div>
                        </div>
                        <div className="bento-category-tag">{skill.category}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills;
