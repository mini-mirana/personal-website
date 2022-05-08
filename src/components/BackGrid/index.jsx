import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
// import { Plane } from '@react-three/drei'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function BackGrid({ ...props }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0, 0.05)
  }, [scene])

  return (
    // <Plane args={[80, 80, 128, 128]} {...props}>
    //   <meshStandardMaterial color='#ea5455' wireframe side={THREE.DoubleSide} />
    // </Plane>
    <Float scale={0.75} rotationIntensity={0.01} floatIntensity={1} speed={3}>
      <mesh {...props}>
        <cylinderGeometry args={[5, 5, 500, 54, 64, true, 0, 6.283185307179586]} />
        <meshStandardMaterial color='#2ec4b6' wireframe side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

export default BackGrid
