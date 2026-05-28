import React from 'react'
import Marquee from 'react-fast-marquee'
import { marqueeSkills } from '../../data/skills'

const MarqueeStrip = () => {
  const row1 = marqueeSkills
  const row2 = [...marqueeSkills].reverse()

  return (
    <div className="marquee-strip-container" style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflow: 'hidden' }}>
      {/* Row 1: Leftward, speed 60 */}
      <div className="marquee-row-wrap text-mono" style={{ background: 'var(--lime)', color: '#070707', padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Marquee speed={60} direction="left" gradient={false}>
          {row1.map((skill, index) => (
            <span 
              key={index} 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                letterSpacing: '0.15em',
                marginRight: '2rem',
                display: 'inline-block',
              }}
            >
              {skill} &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </Marquee>
      </div>

      {/* Row 2: Rightward, speed 45 */}
      <div className="marquee-row-wrap text-mono" style={{ background: 'var(--lime)', color: '#070707', padding: '0.6rem 0' }}>
        <Marquee speed={45} direction="right" gradient={false}>
          {row2.map((skill, index) => (
            <span 
              key={index} 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                letterSpacing: '0.15em',
                marginRight: '2rem',
                display: 'inline-block',
              }}
            >
              {skill} &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default MarqueeStrip
