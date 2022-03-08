import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useAspect /* Html */ } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { Text } from '../Text'

export function Stack({ width = 6, height = 4, distance = 8, content = [] }) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)

  const [clicked, setClicked] = useState(Array(content.length).fill(false))
  const [videos] = useState(() => {
    return content.reduce((p, c) => {
      const vid = document.createElement('video')
      vid.src = c.source
      vid.crossOrigin = 'Anonymous'
      vid.loop = true
      return p.concat(vid)
    }, [])
  })
  useEffect(() => {
    clicked.map((c, i) => (c && videos[i].play()) || videos[i].pause())
  }, [videos, clicked])

  return (
    <>
      {content.map((c, i) => (
        <>
          {/* {c.type === 'iframe' &&
            <Html center transform position={[0, 0, 144 - i * distance]}>
              <iframe width={`500vw`} height={`80`} src={'http://www.weather.gov/'} />
            </Html>
          } */}
          {c.type === 'video' && (
            <Flex
              size={[vpWidth, vpHeight, 0]}
              position={[-vpWidth / 2, vpHeight / 2, 144 - i * distance]}
              alignItems='center'
              justifyContent='center'
              name={i === 0 ? '.Stack' : ''}>
              <Box
                key={`${c.title}${c.titleFont}`}
                width={width}
                onClick={(e) => {
                  if (e.distance < distance) {
                    setClicked(clicked.map((click, j) => (i === j ? !click : false)))
                  }
                }}>
                <mesh position={[width / 2, -height / 2, 0]}>
                  <planeBufferGeometry args={[width, height]} />
                  <meshBasicMaterial>
                    <videoTexture attach='map' args={[videos[i]]} />
                  </meshBasicMaterial>
                </mesh>
                {!clicked[i] && (
                  <Text
                    font='https://fonts.gstatic.com/s/materialicons/v125/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff'
                    fontSize={1}
                    letterSpacing={0.01}
                    textAlign='center'
                    anchorX='center'
                    position-x={width / 2}
                    anchorY='middle'
                    position-y={-height / 2}>
                    {'\ue038'}
                    <meshStandardMaterial color='white' />
                  </Text>
                )}
                <Text
                  font={c.titleFont}
                  fontSize={c.titleFontSize}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={width / 2}
                  anchorY='middle'
                  position-y={-height / 20}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </Text>
              </Box>
            </Flex>
          )}
        </>
      ))}
    </>
  )
}

export default Stack
