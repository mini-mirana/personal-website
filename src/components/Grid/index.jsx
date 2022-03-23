import { useThree } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { animated, useSprings } from '@react-spring/three'
import { Text } from '../Text'
import { TextMesh } from '../TextMesh'

export function Grid({ startZ = undefined, distance = 8, reverse = false, startReverse = false, content = [] }) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)

  const springs = []
  const apis = []
  content.forEach((c) => {
    const us = useSprings(c.config.rowNumber * c.config.columnNumber, () => ({
      scale: [1, 1, 1],
      opacity: 0.2,
      loop: true,
      config: { mass: 5, tension: 350, friction: 40 }
    }))
    springs.push(us[0])
    apis.push(us[1])
  })

  // useFrame(({ clock }) => {
  //   // sphereRef.current.rotation.y += -0.01;
  //   matRef.current.emissiveIntensity = Math.abs(Math.sin(clock.elapsedTime * 0.5))
  // })

  return (
    <>
      {content.map((c, i) => (
        <group
          position={[0, 0, startZ - i * distance]}
          rotation={(reverse && ((startReverse && [0, 0, (i + 1) * Math.PI]) || [0, 0, i * Math.PI])) || [0, 0, 0]}>
          <Flex
            key={`${c.title.content}${c.title.font}`}
            size={[vpWidth, vpHeight, 0]}
            position={[-vpWidth / 2, vpHeight / 2, 0]}
            alignItems='center'
            justifyContent='center'>
            <Text
              font={c.title.font}
              fontSize={c.title.fontSize}
              letterSpacing={0.1}
              textAlign='center'
              anchorX='center'
              position-x={vpWidth / 2}
              anchorY='center'
              position-y={
                -vpHeight / 2 +
                (c.config.rowNumber * c.config.boxHeight + c.config.rowNumber * (2 * c.config.boxMargin)) / 2 +
                parseFloat(c.title.fontSize) +
                0.06
              }>
              {c.title.content}
              <meshStandardMaterial color={c.title.color} />
            </Text>
            {/* {c.text.map((t, j) => ( */}
            <Box>
              <Box
                flexDirection='row'
                flexWrap='wrap'
                width={c.config.columnNumber * c.config.boxWidth + c.config.columnNumber * (2 * c.config.boxMargin)}
                flexGrow={1}>
                {springs[i].map(({ scale, opacity }, j) => (
                  <group
                    onPointerOver={() =>
                      apis[i].start((index) => {
                        if (index === j) {
                          return { scale: [1.1, 1.1, 1], opacity: 0.5 }
                        }
                        return { scale: [1, 1, 1], opacity: 0.2 }
                      })
                    }
                    onClick={() => {
                      apis[i].start((index) => {
                        if (index === j) {
                          if (opacity.animation.to === 0.2) {
                            return { scale: [1.1, 1.1, 1], opacity: 0.5 }
                          }
                        }
                        return { scale: [1, 1, 1], opacity: 0.2 }
                      })
                    }}
                    onPointerLeave={() => apis[i].start(() => ({ scale: [1, 1, 1], opacity: 0.2 }))}>
                    <Box width={c.config.boxWidth} margin={c.config.boxMargin}>
                      <animated.mesh scale={scale} position={[c.config.boxWidth / 2, -c.config.boxHeight / 2, 0]}>
                        <planeBufferGeometry args={[c.config.boxWidth, c.config.boxHeight]} />
                        <animated.meshPhysicalMaterial
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
                      {c.text[j].type === 'text' && (
                        <Text
                          font={c.text[j].font}
                          fontSize={c.text[j].fontSize}
                          letterSpacing={0.1}
                          textAlign='center'
                          anchorX='center'
                          position-x={c.config.boxWidth / 2}
                          anchorY='middle'
                          position-y={-c.config.boxHeight / 2}>
                          {c.text[j].content}
                          <meshStandardMaterial color={c.text[j].color} />
                        </Text>
                      )}
                      {c.text[j].type === 'textMesh' && (
                        <TextMesh
                          position-x={c.config.boxWidth / 2}
                          position-y={-c.config.boxHeight / 2}
                          hAlign='right'
                          fontUrl={c.text[j].font}
                          fontConfig={{
                            size: c.text[j].size,
                            height: c.text[j].height,
                            curveSegments: c.text[j].curveSegments,
                            bevelEnabled: true,
                            bevelThickness: c.text[j].bevelThickness,
                            bevelSize: c.text[j].bevelSize,
                            bevelOffset: c.text[j].bevelOffset,
                            bevelSegments: c.text[j].bevelSegments
                          }}>
                          {c.text[j].content}
                        </TextMesh>
                      )}
                    </Box>
                  </group>
                ))}
              </Box>
            </Box>
            {/* ))} */}
          </Flex>
        </group>
      ))}
    </>
  )
}

export default Grid
