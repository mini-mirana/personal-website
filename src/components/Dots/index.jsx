import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// NON-INTERACTIVE VERSION

// Equation from https://dsp.stackexchange.com/a/56529
// Visualized here https://www.desmos.com/calculator/uakymahh4u
const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export function Dots() {
  const ref = useRef() // Reference to our InstancedMesh
  const { vec, transform, positions, distances } = useMemo(() => {
    // Variables for intermediary calculations
    const v = new THREE.Vector3()
    const t = new THREE.Matrix4()

    // Precompute randomized initial positions (array of Vector3)
    const pos = [...Array(10000)].map((_, i) => {
      const p = new THREE.Vector3()
      // Place in a grid
      p.x = (i % 100) - 50
      p.y = Math.floor(i / 100) - 50
      // Place in a grid
      p.x /= 2
      p.y /= 2

      // Offset every other column (hexagonal pattern)
      // p.y += (i % 2) * 0.5

      // Add some noise
      // p.x += Math.random() * 0.3
      // p.y += Math.random() * 0.3
      return p
    })

    // Precompute initial distances with octagonal offset
    const right = new THREE.Vector3(1, 0, 0)
    const d = pos.map((i) => {
      // See https://www.desmos.com/calculator/4eiqbvjdzm
      return i.length() + Math.cos(i.angleTo(right) * 8) * 0.5
    })
    return { v, t, pos, d }
  }, [])
  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; i += 1) {
      const dist = distances[i]

      // Distance affects the wave phase
      const t = clock.elapsedTime - dist / 25

      // Oscillates between -0.4 and +0.4 with period of 3.8 seconds
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / 3.8)

      // Scale initial position by our oscillator
      vec.copy(positions[i]).multiplyScalar(wave + 1.3)

      // Apply the Vector3 position to the Matrix4
      transform.setPosition(vec)

      // Update Matrix4 for this instance
      ref.current.setMatrixAt(i, transform)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, 20000]}>
      <sphereBufferGeometry args={[0.01]} /> {/* Circle with radius of 0.15 */}
      <meshBasicMaterial /> {/* Default to white color */}
    </instancedMesh>
  )
}

export default Dots
