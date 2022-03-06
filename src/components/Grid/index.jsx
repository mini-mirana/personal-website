import { useThree } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
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

  return (
    <Flex
      size={[vpWidth, vpHeight, 0]}
      position={[-vpWidth / 2, vpHeight / 2, 152]}
      alignItems='center'
      justifyContent='center'
      name='.Grid'>
      <Box>
        <Box
          flexDirection='row'
          flexWrap='wrap'
          width={columnNumber * boxWidth + columnNumber * (2 * boxMargin)}
          flexGrow={1}>
          {[...Array(rowNumber * columnNumber).keys()].map((k, i) => (
            <Box width={boxWidth} margin={boxMargin} key={k}>
              <mesh position={[boxWidth / 2, -boxHeight / 2, 0]}>
                <planeBufferGeometry args={[boxWidth, boxHeight]} />
                <meshStandardMaterial args={[{ transparent: true, opacity: 0.2 }]} />
              </mesh>
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
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default Grid
