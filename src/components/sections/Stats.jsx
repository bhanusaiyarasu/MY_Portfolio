import React from 'react'
import CountUp from '../ui/CountUp'

const statsData = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years' },
  { value: 100, suffix: '%', label: 'Satisfaction' },
  { value: 15, suffix: '+', label: 'Technologies' },
]

const Stats = () => {
  return (
    <section 
      className="section stats"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        padding: '6rem 0',
      }}
    >
      {/* Subtle dot-grid background pattern */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-item" data-cursor="text" style={{ textAlign: 'center' }}>
              <div 
                className="stat-number"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(4rem, 8vw, 10rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                <CountUp end={stat.value} duration={2} />
                <span style={{ color: 'var(--accent-primary)' }}>{stat.suffix}</span>
              </div>
              <div 
                className="stat-label"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
