import { useFrame } from '@react-three/fiber'
import { useReflow } from '@react-three/flex'

export function Reflower() {
  const reflow = useReflow()
  useFrame(reflow)
  return null
}

export default Reflower
