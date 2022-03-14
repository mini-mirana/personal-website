import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from '@react-three/fiber'
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

  const newContent = content.map((c) => {
    if (c.type.includes('photo')) {
      return { ...c, source: useLoader(THREE.TextureLoader, c.source) }
    }
    return c
  })

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
      {newContent.map((c, i) => (
        <group>
          <Flex
            key={`${c.title}${c.titleFont}`}
            size={[vpWidth, vpHeight, 0]}
            position={[-vpWidth / 2, vpHeight / 2, 144 - i * distance]}
            alignItems='center'
            justifyContent='center'
            name={i === 0 ? '.Stack' : ''}>
            {c.type === 'text' && (
              <Box width={width}>
                <mesh position={[0.5 * width, -0.5 * height, 0]}>
                  <planeBufferGeometry args={[width, height]} />
                  <meshBasicMaterial color='#161a1d' />
                </mesh>
                <Text
                  font={c.titleFont}
                  fontSize={c.titleFontSize}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.5 * width}
                  anchorY='top'
                  position-y={-0.2}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </Text>
                <Text
                  font='https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff'
                  fontSize={0.12}
                  maxWidth={width - 0.6}
                  letterSpacing={0.1}
                  textAlign='left'
                  anchorX='left'
                  position-x={0.3}
                  anchorY='top'
                  position-y={-0.5}>
                  {c.description}
                  <meshStandardMaterial color='white' />
                </Text>
              </Box>
            )}
            {
              c.type === 'photo' && (
                <Box width={width}>
                  <mesh position={[0.5 * width, -0.5 * height, 0]}>
                    <planeBufferGeometry args={[width, height]} />
                    <meshBasicMaterial color='#161a1d' />
                  </mesh>
                  <Text
                    font={c.titleFont}
                    fontSize={c.titleFontSize}
                    letterSpacing={0.1}
                    textAlign='center'
                    anchorX='center'
                    position-x={0.5 * width}
                    anchorY='top'
                    position-y={-0.1}>
                    {c.title}
                    <meshStandardMaterial color='white' />
                  </Text>
                  <mesh
                    position={[0.5 * width, -0.5 * height - 0.15, 0]}
                    onUpdate={(mesh) => {
                      const imageWidth = mesh.material.map.image.width
                      const imageHeight = mesh.material.map.image.height
                      const ratio = width / height
                      const adaptedWidth =
                        imageWidth * (ratio < imageWidth / imageHeight ? width / imageWidth : height / imageHeight)
                      const adaptedHeight =
                        imageHeight * (ratio < imageWidth / imageHeight ? width / imageWidth : height / imageHeight)
                      mesh.scale.set(adaptedWidth, adaptedHeight, 1)
                    }}>
                    <planeBufferGeometry attach='geometry' />
                    <meshBasicMaterial attach='material' map={c.source} toneMapped={false} />
                  </mesh>
                </Box>
              )
              // <Box width={width}>
              //   <mesh position={[0.5 * width, -0.5 * height, 0]}>
              //     <planeBufferGeometry args={[width, height]} />
              //     <meshBasicMaterial color='#161a1d' />
              //   </mesh>
              //   <Text
              //     font={c.titleFont}
              //     fontSize={c.titleFontSize}
              //     letterSpacing={0.1}
              //     textAlign='center'
              //     anchorX='center'
              //     position-x={0.5 * width}
              //     anchorY='top'
              //     position-y={-0.1}>
              //     {c.title}
              //     <meshStandardMaterial color='white' />
              //   </Text>
              //   <mesh position={[0.5 * width, (-0.5 * height) -0.15, 0]} onUpdate={(mesh)=>{
              //     console.log(mesh)
              //     const imageWidth = mesh.material.map.image.width
              //     const imageHeight = mesh.material.map.image.height
              //     const ratio = mesh.parent.children[0].geometry.boundingSphere?.radius / mesh.geometry.boundingSphere?.radius
              //     imageWidth > imageHeight ?
              //     mesh.scale.set(
              //       ratio,
              //       ratio * mesh.material.map.image.height / mesh.material.map.image.width,
              //       1
              //     ) :
              //     mesh.scale.set(
              //       Math.sqrt(ratio),
              //       Math.sqrt(ratio * mesh.material.map.image.height / mesh.material.map.image.width),
              //       1
              //     )
              //     // mesh.geometry.scale(1,mesh.material.map.image.height / mesh.material.map.image.width,1)
              //   }
              //     }>
              //     <planeBufferGeometry attach="geometry" />
              //     <meshBasicMaterial attach="material" map={} toneMapped={false} />
              //   </mesh>
              // </Box>
            }
            {c.type === 'photo-text' && (
              <Box width={width}>
                <mesh position={[0.5 * width, -0.5 * height, 0]}>
                  <planeBufferGeometry args={[width, height]} />
                  <meshBasicMaterial color='#161a1d' />
                </mesh>
                <Text
                  font={c.titleFont}
                  fontSize={c.titleFontSize}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.75 * width}
                  anchorY='top'
                  position-y={-0.2}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </Text>
                <mesh
                  position={[0.25 * width, -0.5 * height, 0]}
                  onUpdate={(mesh) => {
                    const imageWidth = mesh.material.map.image.width
                    const imageHeight = mesh.material.map.image.height
                    const w = 0.5 * width
                    const h = 0.5 * height
                    const ratio = w / h
                    const adaptedWidth =
                      imageWidth * (ratio < imageWidth / imageHeight ? w / imageWidth : h / imageHeight)
                    const adaptedHeight =
                      imageHeight * (ratio < imageWidth / imageHeight ? w / imageWidth : h / imageHeight)
                    mesh.scale.set(adaptedWidth, adaptedHeight, 1)
                  }}>
                  <planeBufferGeometry attach='geometry' />
                  <meshBasicMaterial attach='material' map={c.source} toneMapped={false} />
                </mesh>
                <Text
                  font='https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff'
                  fontSize={0.12}
                  maxWidth={0.5 * width - 0.5}
                  letterSpacing={0.1}
                  textAlign='left'
                  anchorX='left'
                  position-x={0.5 * width + 0.3}
                  anchorY='top'
                  position-y={-0.5}>
                  {c.description}
                  <meshStandardMaterial color='white' />
                </Text>
              </Box>
            )}
            {c.type === 'video' && (
              <Box
                width={width}
                onClick={(e) => {
                  if (e.distance < distance) {
                    setClicked(clicked.map((click, j) => (i === j ? !click : false)))
                  }
                }}>
                <mesh position={[0.5 * width, -0.5 * height, 0]}>
                  <planeBufferGeometry args={[width, height]} />
                  {!clicked[i] && <meshBasicMaterial color='#161a1d' />}
                  {clicked[i] && (
                    <meshBasicMaterial>
                      <videoTexture attach='map' args={[videos[i]]} />
                    </meshBasicMaterial>
                  )}
                </mesh>
                {!clicked[i] && (
                  <Text
                    font='https://fonts.gstatic.com/s/materialicons/v125/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff'
                    fontSize={1}
                    letterSpacing={0.01}
                    textAlign='center'
                    anchorX='center'
                    position-x={0.5 * width}
                    anchorY='middle'
                    position-y={-0.5 * height}>
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
                  position-x={0.5 * width}
                  anchorY='middle'
                  position-y={-0.2}>
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
            )}
          </Flex>
        </group>
      ))}
    </>
  )
}

export default Stack
