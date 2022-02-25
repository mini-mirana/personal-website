import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'

export function BackGrid() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0, 0.05)
  }, [scene])

  return (
    <Plane position={[0, -1, -8]} rotation={[Math.PI / 2, 0, 0]} args={[80, 80, 128, 128]}>
      <meshStandardMaterial color='#ea5455' wireframe side={THREE.DoubleSide} />
    </Plane>
  )
}

export default BackGrid
