import { useThree } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { animated, useSprings } from '@react-spring/three'
import { useRef } from 'react'
import { Text } from '../Text'

export function Grid({
  text = [],
  columnNumber = 3,
  rowNumber = 3,
  boxWidth = 0.5,
  boxHeight = 0.5,
  boxMargin = 0.05
}) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  const matRef = useRef()
  const [springs, api] = useSprings(rowNumber * columnNumber, () => ({
    scale: [1, 1, 1],
    opacity: 0.2,
    loop: true,
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  // useFrame(({ clock }) => {
  //   // sphereRef.current.rotation.y += -0.01;
  //   matRef.current.emissiveIntensity = Math.abs(Math.sin(clock.elapsedTime * 0.5))
  // })

  return (
    <Flex
      size={[vpWidth, vpHeight, 0]}
      position={[-vpWidth / 2, vpHeight / 2 + 0.3, 152]}
      alignItems='center'
      justifyContent='center'
      name='.Grid'>
      <Box>
        <Box
          flexDirection='row'
          flexWrap='wrap'
          width={columnNumber * boxWidth + columnNumber * (2 * boxMargin)}
          flexGrow={1}>
          {springs.map(({ scale, opacity }, i) => (
            <group
              onPointerOver={() =>
                api.start((index) => {
                  if (index === i) {
                    return { scale: [1.1, 1.1, 1], opacity: 0.5 }
                  }
                  return { scale: [1, 1, 1], opacity: 0.2 }
                })
              }
              onPointerLeave={() => api.start(() => ({ scale: [1, 1, 1], opacity: 0.2 }))}>
              <Box width={boxWidth} margin={boxMargin}>
                <animated.mesh scale={scale} position={[boxWidth / 2, -boxHeight / 2, 0]}>
                  <planeBufferGeometry args={[boxWidth, boxHeight]} />
                  <animated.meshPhysicalMaterial
                    ref={matRef}
                    color='red'
                    roughness={0.5}
                    metalness={1}
                    emissive='blue'
                    emissiveIntensity={0.5}
                    transparent
                    opacity={opacity}
                  />
                  {/* <meshStandardMaterial args={[{ transparent: true, opacity: 0.1 }]} /> */}
                  {/* <shaderMaterial ref={material} attach='material' {...data} /> */}
                </animated.mesh>
                <Text
                  font={text[i].font}
                  fontSize={text[i].fontSize}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={boxWidth / 2}
                  anchorY='middle'
                  position-y={-boxHeight / 2}>
                  {text[i].content}
                  <meshStandardMaterial color='#403d39' />
                </Text>
              </Box>
            </group>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default Grid
