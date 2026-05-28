import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { skillCategories, marqueeSkills } from '../../data/skills'
import BentoCard from '../ui/BentoCard'
import Marquee from '../ui/Marquee'
import { Code, Server, Sparkles, Wrench, BookOpen } from 'lucide-react'

const getIcon = (id) => {
  switch (id) {
    case 'frontend':
      return <Code />
    case 'backend':
      return <Server />
    case 'creative':
      return <Sparkles />
    case 'tools':
      return <Wrench />
    case 'learning':
      return <BookOpen />
    default:
      return <Code />
  }
}

const getBentoSize = (id) => {
  switch (id) {
    case 'frontend':
      return 'bento-lg'
    case 'creative':
      return 'bento-md'
    case 'backend':
      return 'bento-wide'
    case 'tools':
      return 'bento-sm'
    case 'learning':
      return 'bento-sm'
    default:
      return 'bento-sm'
  }
}

const Skills = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.bento-card')

    const ctx = gsap.context(() => {
      // GSAP staggered card entrance
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="skills" className="section skills" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-label">
          <span>02 · </span>Skills & Technologies
        </div>

        <div className="bento-grid">
          {skillCategories.map((category) => (
            <BentoCard
              key={category.id}
              size={getBentoSize(category.id)}
            >
              <div className="bento-card-header">
                <h3 className="bento-card-title">{category.title}</h3>
                <div className="bento-card-icon">
                  {getIcon(category.id)}
                </div>
              </div>

              <div className="bento-card-body" style={{ padding: 0 }}>
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item" data-cursor="text">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-wrap">
                      <div
                        className="skill-bar"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Infinite scrolling marquee at the bottom of the section */}
      <Marquee items={marqueeSkills} speedClass="marquee-track" />
    </section>
  )
}

export default Skills
