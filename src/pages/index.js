import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef /* useState, useCallback */ } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useAspect, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Flex, Box } from '@react-three/flex'
import { Text } from '../components/Text'
import { BackGrid } from '../components/BackGrid'
import { Title } from '../components/Title'
// import { Reflower } from '../components/Reflower'

const state = {
  top: 0
}

export function Cube() {
  const mesh = useRef()
  const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(1, 1, 0))
  const quat2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
  const euler = new THREE.Euler(0, 0, 0)
  useFrame(() => {
    euler.set(state.top / 1000, state.top / 1000, 0)
    quat.slerp(quat2.setFromEuler(euler), 0.1)
    mesh.current.rotation.setFromQuaternion(quat)
  })
  return (
    <mesh ref={mesh} position={[0, 0, -1.5]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='#272730' />
    </mesh>
  )
}

function Page(/* { onChangePages } */) {
  const group = useRef()
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  const vec = new THREE.Vector3()
  useFrame(() => group.current.position.lerp(vec.set(0, 0, state.top / 100), 0.1))
  // const handleReflow = useCallback(
  //   (w, h) => {
  //     onChangePages(h / vpHeight)
  //     // console.log({ h, vpHeight, pages: h / vpHeight });
  //   },
  //   [onChangePages, vpHeight]
  // )

  return (
    <group ref={group}>
      <BackGrid />
      <Flex
        size={[vpWidth, vpHeight, 0]}
        // onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}>
        <Title />
      </Flex>
      <Flex
        size={[vpWidth, vpHeight, 0]}
        position={[-vpWidth / 2, vpHeight / 2, -8]}
        alignItems='center'
        justifyContent='center'>
        <Box>
          <Box flexDirection='row' flexWrap='wrap' width={1.8} flexGrow={1}>
            {[...Array(9).keys()].map((k) => (
              <Box width={0.5} margin={0.05} key={k}>
                <mesh position={[0.5 / 2, -0.5 / 2, 0]}>
                  <planeBufferGeometry args={[0.5, 0.5]} />
                  <meshStandardMaterial args={[{ transparent: true, opacity: 0.2 }]} />
                </mesh>
                <Text
                  font='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff'
                  fontSize={0.1}
                  letterSpacing={0.1}
                  textAlign='center'
                  anchorX='center'
                  position-x={0.5 / 2}
                  anchorY='middle'
                  position-y={-0.5 / 2}>
                  {'\uf3b8'}
                  <meshStandardMaterial color='#403d39' />
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </group>
  )
}

export default function Home() {
  const scrollArea = useRef()
  const onScroll = (e) => {
    state.top = e.target.scrollTop
  }
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])
  // const [pages, setPages] = useState(0)

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name='description' content='Portfolio' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Canvas
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <pointLight position={[0, 1, 4]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center>loading..</Html>}>
          <Page /* onChangePages={setPages} */ />
          {/* <Cube /> */}
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1024} />
        </EffectComposer>
      </Canvas>

      <div className='absolute top-0 left-0 w-screen h-screen overflow-auto' ref={scrollArea} onScroll={onScroll}>
        {/* <div style={{ height: `${pages * 100}vh` }} /> */}
        <div className='h-[3000px]' />
      </div>
    </>
  )
}
