import { Flex, Box } from '@react-three/flex'
import { Text } from '../Text'

export function Title({ content = [], ...props }) {
  return (
    <group rotation={[0, 0, Math.PI]}>
      <Flex {...props}>
        <Box flexDirection='column' alignItems='center' justifyContent='center' width='100%' height='100%'>
          {content.map((c) => (
            <Box margin={0.05}>
              <Text fontSize={0.5} letterSpacing={0.1} textAlign='center'>
                {c}
                <meshStandardMaterial />
              </Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </group>
  )
}

export default Title
