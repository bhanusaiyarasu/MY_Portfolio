import React, { useState } from 'react'

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const skillsData = [
        {
            category: 'Languages',
            icon: '💻',
            skills: [
                { name: 'JavaScript', level: 90, color: '#ff6b6b' },
                { name: 'TypeScript', level: 85, color: '#4ecdc4' },
                { name: 'Python', level: 75, color: '#45b7d1' }
            ]
        },
        {
            category: 'Frameworks',
            icon: '⚛️',
            skills: [
                { name: 'React', level: 95, color: '#ff6b6b' },
                { name: 'React Native', level: 80, color: '#4ecdc4' },
                { name: 'Express', level: 85, color: '#45b7d1' },
                { name: 'Vite', level: 88, color: '#ff6b6b' }
            ]
        },
        {
            category: 'Databases',
            icon: '🗄️',
            skills: [
                { name: 'MongoDB', level: 82, color: '#4ecdc4' },
                { name: 'PostgreSQL', level: 78, color: '#45b7d1' },
                { name: 'SQLite', level: 85, color: '#ff6b6b' }
            ]
        },
        {
            category: 'Tools & Others',
            icon: '🛠️',
            skills: [
                { name: 'Git/GitHub', level: 92, color: '#ff6b6b' },
                { name: 'VS Code', level: 95, color: '#4ecdc4' },
                { name: 'HTML/CSS', level: 93, color: '#45b7d1' },
                { name: 'REST API', level: 88, color: '#ff6b6b' }
            ]
        }
    ];

    const filteredSkills = selectedCategory === 'all' 
        ? skillsData 
        : skillsData.filter(cat => cat.category === selectedCategory);

    return (
        <section id="skills">
            <div className="section-title">
                <h2>technical <span>skills</span></h2>
                <div className="section-line"></div>
            </div>

            {/* Interactive Category Filter */}
            <div className="skill-filters">
                <button 
                    className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All Skills
                </button>
                {skillsData.map((category) => (
                    <button 
                        key={category.category}
                        className={`filter-btn ${selectedCategory === category.category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.category)}
                    >
                        {category.icon} {category.category}
                    </button>
                ))}
            </div>

            {/* 3D Skills Showcase */}
            <div className="skills-showcase">
                {filteredSkills.map((category, categoryIndex) => (
                    <div key={category.category} className="skill-category">
                        <div className="category-header">
                            <span className="category-icon">{category.icon}</span>
                            <h3>{category.category}</h3>
                        </div>
                        
                        <div className="skills-grid">
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
                                    <div className="skill-ring">
                                        <svg className="progress-ring" viewBox="0 0 120 120">
                                            <circle
                                                className="progress-ring-bg"
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.1)"
                                                strokeWidth="8"
                                            />
                                            <circle
                                                className="progress-ring-fill"
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke={skill.color}
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={`${2 * Math.PI * 54}`}
                                                strokeDashoffset={`${2 * Math.PI * 54 * (1 - skill.level / 100)}`}
                                                style={{
                                                    transform: 'rotate(-90deg)',
                                                    transformOrigin: '60px 60px'
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
                                                    width: `${skill.level}%`,
                                                    backgroundColor: skill.color 
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
                {['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript'].map((skill, index) => (
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

export default Skills
