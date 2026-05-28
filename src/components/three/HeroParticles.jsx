import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

const ParticlePoints = () => {
  const pointsRef = useRef(null)
  const matRef = useRef(null)
  const { theme } = useTheme()

  const count = 1500

  // Keep track of original positions to drift around them and apply repulsion
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)
    const vels = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      // Distribute in a flat box matching screen coordinates
      const x = (Math.random() - 0.5) * 3
      const y = (Math.random() - 0.5) * 2
      const z = (Math.random() - 0.5) * 0.5

      pos[idx] = x
      pos[idx + 1] = y
      pos[idx + 2] = z

      orig[idx] = x
      orig[idx + 1] = y
      orig[idx + 2] = z

      vels[idx] = 0
      vels[idx + 1] = 0
      vels[idx + 2] = 0
    }
    return [pos, orig, vels]
  }, [])

  const particleColor = theme === 'light' ? '#1a1a1a' : '#c8ff00'

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const pointsGeometry = pointsRef.current.geometry
    const posAttr = pointsGeometry.attributes.position

    // Unproject the 2D pointer coordinates (-1 to 1) to the z=0 plane in 3D
    const mouse3D = new THREE.Vector3(state.pointer.x, state.pointer.y, 0).unproject(state.camera)
    // Adjust mouse vector depth to match particle z-center (approx 0)
    mouse3D.z = 0

    const repulsionRadius = 0.4
    const repulsionStrength = 0.2
    const returnSpeed = 0.08
    const driftSpeed = 0.05

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      let px = posAttr.array[idx]
      let py = posAttr.array[idx + 1]
      let pz = posAttr.array[idx + 2]

      const ox = originalPositions[idx]
      const oy = originalPositions[idx + 1]
      const oz = originalPositions[idx + 2]

      // 1. Slowly drift using combination of trig functions (simulating Perlin noise)
      const driftX = Math.sin(time * 0.2 + idx) * driftSpeed
      const driftY = Math.cos(time * 0.3 + idx) * driftSpeed
      
      const targetX = ox + driftX
      const targetY = oy + driftY
      const targetZ = oz

      // 2. Proximity repulsion from mouse
      const dx = px - mouse3D.x
      const dy = py - mouse3D.y
      const dz = pz - mouse3D.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (dist < repulsionRadius && dist > 0.01) {
        // Push vector direction
        const force = (repulsionRadius - dist) / repulsionRadius
        const pushX = (dx / dist) * force * repulsionStrength
        const pushY = (dy / dist) * force * repulsionStrength

        velocities[idx] += pushX
        velocities[idx + 1] += pushY
      }

      // Apply drag / friction to velocities
      velocities[idx] *= 0.85
      velocities[idx + 1] *= 0.85

      // Move particle by velocity
      px += velocities[idx]
      py += velocities[idx + 1]

      // 3. Return slowly to original/drift position
      px += (targetX - px) * returnSpeed
      py += (targetY - py) * returnSpeed
      pz += (targetZ - pz) * returnSpeed

      posAttr.array[idx] = px
      posAttr.array[idx + 1] = py
      posAttr.array[idx + 2] = pz
    }

    posAttr.needsUpdate = true

    // 4. Scroll fade out: fade out by 80% as user scrolls to about section
    if (matRef.current) {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
      const fadeEnd = typeof window !== 'undefined' ? window.innerHeight : 800
      const scrollRatio = Math.min(scrollY / fadeEnd, 1)
      // Fade from 0.6 opacity to 0.12 (80% decrease)
      const baseOpacity = theme === 'light' ? 0.4 : 0.6
      matRef.current.opacity = baseOpacity * (1 - scrollRatio * 0.8)
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={matRef}
        transparent
        color={particleColor}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={theme === 'light' ? 0.4 : 0.6}
      />
    </Points>
  )
}

const HeroParticles = () => {
  return (
    <div className="hero-canvas" style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 1.5], fov: 75 }} 
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ParticlePoints />
      </Canvas>
    </div>
  )
}

export default HeroParticles
