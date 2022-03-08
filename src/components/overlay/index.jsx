import { useFrame, useThree, createPortal } from '@react-three/fiber'
import { OrthographicCamera, useCamera } from '@react-three/drei'
import React, { useMemo, useRef } from 'react'
import { Scene } from 'three'

export function Overlay({ children, position }) {
  const { scene } = useThree()
  const virtualScene = useMemo(() => new Scene())
  const virtualCam = useRef()
  const ref = useRef()

  useFrame(({ gl, camera }) => {
    // ref.current.quaternion.setFromEuler(new THREE.Euler(1, 1, 1))
    // eslint-disable-next-line no-param-reassign
    gl.autoClear = true
    gl.render(scene, camera)
    // eslint-disable-next-line no-param-reassign
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene, virtualCam.current)
  }, 10)

  const textMesh = useRef()
  useFrame(({ clock }) => {
    const r = Math.sin(clock.getElapsedTime())
    textMesh.current.rotation.x = r * 0.2
    textMesh.current.rotation.y = r * 0.2
    textMesh.current.rotation.z = r * 0.2
  })

  return createPortal(
    <>
      <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 170]} rotation={[0, 0, 0]} />
      <mesh ref={ref} raycast={useCamera(virtualCam)} position={position}>
        <group ref={textMesh}>{children}</group>
      </mesh>
    </>,
    virtualScene
  )
}

export default Overlay
