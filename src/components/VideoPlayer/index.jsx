import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { Text } from '../Text'

export function VideoPlayer({ width = 6, height = 4, distance = 8, videoSource = '', title = {} }) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)

  const [clicked, setClicked] = useState(false)
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.src = videoSource
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    return vid
  })
  useEffect(() => {
    if (clicked) {
      video.play()
    } else {
      video.pause()
    }
  }, [video, clicked])

  return (
    <Flex
      size={[vpWidth, vpHeight, 0]}
      position={[-vpWidth / 2, vpHeight / 2, 144]}
      alignItems='center'
      justifyContent='center'>
      <Box
        width={width}
        onClick={(e) => {
          if (e.distance < distance) {
            setClicked(!clicked)
          }
        }}>
        <mesh position={[width / 2, -height / 2, 0]}>
          <planeBufferGeometry args={[width, height]} />
          <meshBasicMaterial>
            <videoTexture attach='map' args={[video]} />
          </meshBasicMaterial>
        </mesh>
        {!clicked && (
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
          font={title.font}
          fontSize={title.fontSize}
          letterSpacing={0.1}
          textAlign='center'
          anchorX='center'
          position-x={width / 2}
          anchorY='middle'
          position-y={-height / 20}>
          {title.content}
          <meshStandardMaterial color='white' />
        </Text>
      </Box>
    </Flex>
  )
}

export default VideoPlayer
