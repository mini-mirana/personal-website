import { useLayoutEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'

extend({ TextGeometry })

export function TextMesh({
  children,
  fontUrl,
  fontConfig = {
    size: 100,
    height: 0.1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 2
  },
  vAlign = 'center',
  hAlign = 'center',
  size = 0.7,
  ...props
}) {
  const font = new FontLoader().parse(fontUrl)

  // const meshGroup = useRef()
  const mesh = useRef()
  // useFrame(({ clock }) => {
  //   const r = Math.sin(clock.getElapsedTime())
  //   meshGroup.current.rotation.x = r * 0.1
  //   meshGroup.current.rotation.y = r * 0.1
  //   meshGroup.current.rotation.z = r * 0.1
  // })

  useLayoutEffect(() => {
    const sizeVector = new Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(sizeVector)
    mesh.current.position.x = (hAlign === 'center' && -sizeVector.x / 2) || hAlign === 'right' ? 0 : -sizeVector.x
    mesh.current.position.y = (vAlign === 'center' && -sizeVector.y / 2) || vAlign === 'top' ? 0 : -sizeVector.y
  }, [children])

  return (
    <group {...props} scale={[0.01 * size, 0.01 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry
          args={[children, { font, ...fontConfig }]}
          onUpdate={(e) => {
            e.center()
          }}
        />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

export default TextMesh
