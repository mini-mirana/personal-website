import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'

export function RotatingObj() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime()
    ref.current.rotation.x = ref.current.rotation.y
  })
  return (
    <TorusKnot ref={ref} position={[0, 0, 0]} scale={[0.3, 0.3, 0.3]} args={[1, 0.4, 128, 32]}>
      <meshStandardMaterial />
    </TorusKnot>
  )
}

export default RotatingObj
