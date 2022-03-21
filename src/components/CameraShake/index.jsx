import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { SimplexNoise } from 'three-stdlib'

export function CameraShake({
  intensity = 1,
  decay,
  decayRate = 0.65,
  maxYaw = 0.1,
  maxPitch = 0.1,
  yawFrequency = 0.1,
  pitchFrequency = 0.1
}) {
  const camera = useThree((state) => state.camera)
  const intensityRef = React.useRef(intensity)
  const initialRotation = React.useRef(camera.rotation.clone())

  const [yawNoise] = React.useState(() => new SimplexNoise())
  const [pitchNoise] = React.useState(() => new SimplexNoise())

  const constrainIntensity = () => {
    if (intensityRef.current < 0 || intensityRef.current > 1) {
      intensityRef.current = intensityRef.current < 0 ? 0 : 1
    }
  }

  useFrame(({ clock }, delta) => {
    const shake = intensityRef.current ** 2
    const yaw = maxYaw * shake * yawNoise.noise(clock.elapsedTime * yawFrequency, 1)
    const pitch = maxPitch * shake * pitchNoise.noise(clock.elapsedTime * pitchFrequency, 1)

    camera.rotation.set(initialRotation.current.x + pitch, initialRotation.current.y + yaw, camera.rotation.z)

    if (decay && intensityRef.current > 0) {
      intensityRef.current -= decayRate * delta
      constrainIntensity()
    }
  })

  return null
}

export default CameraShake
