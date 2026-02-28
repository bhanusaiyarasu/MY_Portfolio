import React from 'react'

const Skills = () => {
    return (
        <section id="skills">
            <div className="section-title">
                <h2>skills</h2>
                <div className="section-line" style={{ maxWidth: '600px' }}></div>
            </div>
            <div className="skills-wrapper" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4rem', alignItems: 'center' }}>
                <div className="skills-abstract" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                    <div className="dot-pattern floating-shape">
                        {[...Array(20)].map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                    <div className="floating-shape" style={{ border: '2px solid var(--border-gray)', width: '80px', height: '80px', animationDelay: '1s' }}></div>
                    <div className="floating-shape" style={{ border: '2px solid var(--accent-purple)', width: '60px', height: '60px', marginLeft: 'auto', animationDelay: '2s' }}></div>
                    <div className="dot-pattern floating-shape" style={{ animationDelay: '3s' }}>
                        {[...Array(20)].map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                </div>
                <div className="skills-page-grid">
                    <div className="skill-box">
                        <div className="skill-header">Languages</div>
                        <div className="skill-list">JavaScript TypeScript Python</div>
                    </div>
                    <div className="skill-box">
                        <div className="skill-header">Databases</div>
                        <div className="skill-list">SQLite PostgreSQL MongoDB</div>
                    </div>
                    <div className="skill-box">
                        <div className="skill-header">Frameworks</div>
                        <div className="skill-list">React React Native Express Vite</div>
                    </div>
                    <div className="skill-box">
                        <div className="skill-header">Tools</div>
                        <div className="skill-list">VS Code Git GitHub Postman Linux</div>
                    </div>
                    <div className="skill-box">
                        <div className="skill-header">Other</div>
                        <div className="skill-list">HTML CSS SCSS REST API</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
