import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import Arwes from 'arwes/lib/Arwes'
import Project from 'arwes/lib/Project'
import ThemeProvider from 'arwes/lib/ThemeProvider'
import createTheme from 'arwes/lib/tools/createTheme'
import SoundsProvider from 'arwes/lib/SoundsProvider'
import createSounds from 'arwes/lib/tools/createSounds'
import Words from 'arwes/lib/Words'
import { Text } from '../Text'

export function Stack({ dom = null, width = 6, height = 4, distance = 8, content = [] }) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)

  const [hovered, setHovered] = useState(false)

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
        <group>
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
                  onPointerEnter={() => setHovered(true)}
                  onPointerLeave={() => setHovered(false)}
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
                <dom.In>
                  <ThemeProvider theme={createTheme()}>
                    <SoundsProvider
                      sounds={createSounds({
                        shared: { volume: 1, disabled: false }, // Shared sound settings
                        players: {
                          // The player settings
                          click: {
                            // With the name the player is created
                            sound: { src: ['/sound/click.mp3'] } // The settings to pass to Howler
                          },
                          typing: {
                            sound: { src: ['/sound/type.mp3'] },
                            settings: { oneAtATime: true } // The custom app settings
                          },
                          deploy: {
                            sound: { src: ['/sound/assemble.mp3'] },
                            settings: { oneAtATime: true }
                          }
                        }
                      })}>
                      {hovered && (
                        <Arwes className='h-fit w-[20%] !left-[60%] !top-[25%]'>
                          <Project animate header={c.cardTitle} headerSize='h6' className='p-[10px]'>
                            {(anim) => (
                              <p>
                                <Words animate show={anim.entered} className='text-xs'>
                                  {c.description}
                                </Words>
                              </p>
                            )}
                          </Project>
                        </Arwes>
                      )}
                    </SoundsProvider>
                  </ThemeProvider>
                </dom.In>
              </Box>
            </Flex>
          )}
        </group>
      ))}
    </>
  )
}

export default Stack
