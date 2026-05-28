import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useTheme } from '../../context/ThemeContext'

const ParticlePoints = () => {
  const pointsRef = useRef(null)
  const { theme } = useTheme()

  // Generate 2000 particles (6000 float values) in a spherical volume
  const sphere = useMemo(() => {
    const p = new Float32Array(6000)
    for (let i = 0; i < 6000; i += 3) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * 1.5

      p[i] = r * Math.sin(phi) * Math.cos(theta)
      p[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i + 2] = r * Math.cos(phi)
    }
    return p
  }, [])

  const particleColor = theme === 'light' ? '#333333' : '#c8ff00'

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    // Very slow drift rotation
    pointsRef.current.rotation.x -= delta * 0.05
    pointsRef.current.rotation.y -= delta * 0.07

    // Parallax mouse follow effect
    const mouseX = state.pointer.x * 0.15
    const mouseY = state.pointer.y * 0.15
    pointsRef.current.position.x += (mouseX - pointsRef.current.position.x) * 0.05
    pointsRef.current.position.y += (mouseY - pointsRef.current.position.y) * 0.05
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const HeroScene = () => {
  return (
    <div className="hero-canvas">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <ParticlePoints />
      </Canvas>
    </div>
  )
}

export default HeroScene
