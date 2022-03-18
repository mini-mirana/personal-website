import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
// import { Plane } from '@react-three/drei'
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
    <mesh {...props}>
      <cylinderGeometry args={[5, 5, 500, 256, 256, true, 0, 6.283185307179586]} />
      <meshStandardMaterial color='#ea5455' wireframe side={THREE.DoubleSide} />
    </mesh>
  )
}

export default BackGrid
