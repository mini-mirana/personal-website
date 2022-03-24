import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { ArwesThemeProvider, StylesBaseline, Text as ArwesText, Card } from '@arwes/core'
import { BleepsProvider } from '@arwes/sounds'
import { AnimatorGeneralProvider } from '@arwes/animation'
import { animated, useSprings } from '@react-spring/three'
import { Text } from '../Text'

const AnimatedText = animated(Text)

export function Stack({
  dom = null,
  width = 6,
  height = 4,
  startZ = undefined,
  distance = 8,
  reverse = false,
  startReverse = false,
  content = []
}) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)

  const [hovered, setHovered] = useState(Array(content.length).fill(false))

  const newContent = content.map((c) => {
    if (c.type.includes('photo')) {
      return { ...c, source: useLoader(THREE.TextureLoader, c.source) }
    }
    return c
  })

  const [springs, api] = useSprings(newContent.length, () => ({
    opacity: 0,
    config: { mass: 5, tension: 350, friction: 40 }
  }))

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

  const addGlow = (index) => {
    api.start((i) => {
      if (index === i) {
        return { opacity: 0.15 }
      }
      return { opacity: 0 }
    })
  }

  return (
    <>
      {newContent.map((c, i) => (
        <group
          position={[0, 0, startZ - i * distance]}
          rotation={(reverse && ((startReverse && [0, 0, (i + 1) * Math.PI]) || [0, 0, i * Math.PI])) || [0, 0, 0]}>
          <Flex
            key={`${c.title}${c?.titleFont}`}
            size={[vpWidth, vpHeight, 0]}
            position={[-vpWidth / 2, vpHeight / 2, 0]}
            alignItems='center'
            justifyContent='center'>
            {c.type === 'text' && (
              <Box width={width}>
                <mesh position={[0.5 * width, -0.5 * height, 0]}>
                  <planeBufferGeometry args={[width, height]} />
                  <meshBasicMaterial color='#161a1d' />
                </mesh>
                <AnimatedText
                  maxWidth={width - 0.6}
                  font={
                    c?.titleFont ||
                    'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                  }
                  fontSize={c?.titleFontSize || 0.1}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.5 * width}
                  anchorY='top'
                  outlineColor='gold'
                  outlineWidth={0.05}
                  outlineBlur={0.4}
                  outlineOpacity={springs[i].opacity}
                  onPointerOver={() => addGlow(i)}
                  onPointerLeave={() => api.start(() => ({ opacity: 0 }))}
                  position-y={-0.2}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </AnimatedText>
                <Text
                  font={
                    c?.descriptionFont ||
                    'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                  }
                  fontSize={c?.descriptionFontSize || 0.09}
                  maxWidth={width - 0.6}
                  letterSpacing={0.1}
                  textAlign='left'
                  anchorX='left'
                  position-x={0.3}
                  anchorY='top'
                  position-y={c?.descriptionY || -0.5}>
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
                  <AnimatedText
                    maxWidth={width - 0.6}
                    font={
                      c?.titleFont ||
                      'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                    }
                    fontSize={c?.titleFontSize || 0.1}
                    letterSpacing={0.1}
                    textAlign='center'
                    anchorX='center'
                    position-x={0.5 * width}
                    anchorY='top'
                    outlineColor='gold'
                    outlineWidth={0.05}
                    outlineBlur={0.4}
                    outlineOpacity={springs[i].opacity}
                    onPointerOver={() => addGlow(i)}
                    onPointerLeave={() => api.start(() => ({ opacity: 0 }))}
                    position-y={-0.1}>
                    {c.title}
                    <meshStandardMaterial color='white' />
                  </AnimatedText>
                  <mesh
                    position={[0.5 * width, -0.5 * height + (c?.photoY || -0.15), 0]}
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
                <AnimatedText
                  maxWidth={width - 0.6}
                  font={
                    c?.titleFont ||
                    'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                  }
                  fontSize={c?.titleFontSize || 0.1}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.75 * width}
                  anchorY='top'
                  outlineColor='gold'
                  outlineWidth={0.05}
                  outlineBlur={0.4}
                  outlineOpacity={springs[i].opacity}
                  onPointerOver={() => addGlow(i)}
                  onPointerLeave={() => api.start(() => ({ opacity: 0 }))}
                  position-y={-0.2}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </AnimatedText>
                <mesh
                  position={[0.25 * width, -0.5 * height + (c?.photoY || 0), 0]}
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
                  font={
                    c?.descriptionFont ||
                    'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                  }
                  fontSize={c?.descriptionFontSize || 0.09}
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
                <mesh
                  position={[0.5 * width, -0.5 * height + (c?.videoY || 0), 0]}
                  // onUpdate={(mesh) => {
                  //   const imageWidth = mesh.material.map.image.width
                  //   const imageHeight = mesh.material.map.image.height
                  //   const w = 0.5 * width
                  //   const h = 0.5 * height
                  //   const ratio = w / h
                  //   const adaptedWidth = imageWidth * (ratio < imageWidth / imageHeight ? w / imageWidth : h / imageHeight)
                  //   const adaptedHeight = imageHeight * (ratio < imageWidth / imageHeight ? w / imageWidth : h / imageHeight)
                  //   mesh.scale.set(adaptedWidth, adaptedHeight, 1)
                  // }}
                >
                  <planeBufferGeometry args={[width, height]} />
                  {!clicked[i] && <meshBasicMaterial color='#161a1d' />}
                  {clicked[i] && (
                    <meshBasicMaterial attach='material'>
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
                <AnimatedText
                  onClick={() => {
                    const newHovered = Array(content.length).fill(false)
                    newHovered[i] = !newHovered[i]
                    setHovered(newHovered)
                    if (springs[i].opacity.animation.to === 0) {
                      addGlow(i)
                    } else {
                      api.start(() => ({ opacity: 0 }))
                    }
                  }}
                  onPointerOver={() => {
                    if (!('ontouchstart' in window)) {
                      addGlow(i)
                      const newHovered = Array(content.length).fill(false)
                      newHovered[i] = true
                      setHovered(newHovered)
                    }
                  }}
                  onPointerLeave={() => {
                    if (!('ontouchstart' in window)) {
                      api.start(() => ({ opacity: 0 }))
                    }
                  }}
                  maxWidth={width - 0.6}
                  font={
                    c?.titleFont ||
                    'https://res.cloudinary.com/mirana/raw/upload/v1648124858/personal-website/NotoSansMerged-Regular_my0irf.ttf'
                  }
                  fontSize={c?.titleFontSize || 0.1}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.5 * width}
                  anchorY='middle'
                  outlineColor='gold'
                  outlineWidth={0.05}
                  outlineBlur={0.4}
                  outlineOpacity={springs[i].opacity}
                  position-y={-0.2}>
                  {c.title}
                  <meshStandardMaterial color='white' />
                </AnimatedText>
                <dom.In>
                  {hovered[i] && (
                    <ArwesThemeProvider>
                      <StylesBaseline />
                      <BleepsProvider
                        audioSettings={{
                          common: { volume: 0.25 }
                        }}
                        playersSettings={{
                          object: { src: ['/sound/object.mp3'] },
                          assemble: { src: ['/sound/assemble.mp3'], loop: true },
                          type: { src: ['/sound/type.mp3'], loop: true },
                          click: { src: ['/sound/click.mp3'] }
                        }}
                        bleepsSettings={{
                          object: { player: 'object' },
                          assemble: { player: 'assemble' },
                          type: { player: 'type' },
                          click: { player: 'click' }
                        }}>
                        <AnimatorGeneralProvider animator={{ duration: { enter: 200, exit: 200, stagger: 30 } }}>
                          <div
                            className='w-screen sm:w-[auto] flex sm:block justify-center'
                            onWheel={(e) => {
                              e.stopPropagation()
                            }}>
                            <Card
                              animator={{ animate: true }}
                              title={c.cardTitle}
                              className='absolute sm:right-[10%] top-[30%] max-w-[300px] sm:max-w-[400px] max-h-[200px] overflow-y-auto font-["Titillium_Web"] text-base'>
                              <div
                                className='absolute top-[3%] right-[4%]'
                                role='presentation'
                                onClick={() => {
                                  setHovered(Array(content.length).fill(false))
                                  api.start(() => ({ opacity: 0 }))
                                }}>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 stroke-[#3A918D] hover:stroke-[#7efcf6]'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth='2'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                </svg>
                              </div>
                              <ArwesText>{c.description}</ArwesText>
                            </Card>
                          </div>
                        </AnimatorGeneralProvider>
                      </BleepsProvider>
                    </ArwesThemeProvider>
                  )}
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
