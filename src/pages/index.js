import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useAspect, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Flex, Box } from '@react-three/flex'
import { Text } from '../components/Text'
import { BackGrid } from '../components/BackGrid'
import { Title } from '../components/Title'
import { RotatingObj } from '../components/RotatingObj'
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

function Page({ onChangePages }) {
  const group = useRef()
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  const vec = new THREE.Vector3()
  useFrame(() => group.current.position.lerp(vec.set(0, 0, state.top / 100), 0.1))
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight)
      // console.log({ h, vpHeight, pages: h / vpHeight });
    },
    [onChangePages, vpHeight]
  )

  return (
    <group ref={group}>
      <BackGrid />
      <Flex
        flexDirection='column'
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}>
        {/* <Reflower /> */}

        <Title />

        <group position-z={-0.3}>
          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            width='100%'
            marginTop={0.3}
            marginBottom={0.1}>
            <Box centerAnchor>
              <RotatingObj />
            </Box>
            <Box marginLeft={0.3}>
              <Text fontSize={0.4} maxWidth={1} textAlign='center'>
                Flexing some Layout
                <meshStandardMaterial />
              </Text>
            </Box>
          </Box>
          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            width='100%'
            marginTop={0.1}
            marginBottom={0.5}>
            <Box marginLeft={0.3}>
              <Text fontSize={0.4} maxWidth={vpWidth} textAlign='center'>
                with REACT THREE FLEX
                <meshStandardMaterial />
              </Text>
            </Box>
          </Box>
        </group>

        <Box flexDirection='row' alignItems='center' justifyContent='center' flexWrap='wrap' width='100%'>
          <Box margin={0.05}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeBufferGeometry args={[2.5, 2]} />
              <meshStandardMaterial color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][0 % 4]} />
            </mesh>
            <Box flexDirection='column' padding={0.1}>
              <Box marginBottom={0.1} marginLeft={0.05}>
                <Text fontSize={0.2} letterSpacing={0.1} textAlign='center'>
                  OUR PRODUCTS
                  <meshStandardMaterial />
                </Text>
              </Box>
              <Box flexDirection='row' flexWrap='wrap' width={2} flexGrow={1}>
                {[...Array(8).keys()].map((k) => (
                  <Box margin={0.05} key={k}>
                    <mesh position={[0.3 / 2, -0.3 / 2, 0]}>
                      <planeBufferGeometry args={[0.3, 0.3]} />
                      <meshStandardMaterial />
                    </mesh>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box margin={0.05}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeBufferGeometry args={[2.5, 2]} />
              <meshStandardMaterial color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][1 % 4]} />
            </mesh>
            <Box flexDirection='column' padding={0.1}>
              <Box marginBottom={0.1} marginLeft={0.05}>
                <Text fontSize={0.2} letterSpacing={0.1} textAlign='center'>
                  OUR SERVICES
                  <meshStandardMaterial />
                </Text>
              </Box>
              <Box flexDirection='row' flexWrap='wrap' width={2} flexGrow={1}>
                {[...Array(8).keys()].map((k) => (
                  <Box margin={0.05} key={k}>
                    <mesh position={[0.3 / 2, -0.3 / 2, 0]}>
                      <planeBufferGeometry args={[0.3, 0.3]} />
                      <meshStandardMaterial />
                    </mesh>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <group position-z={0.4}>
          <Box
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width='100%'
            marginTop={0.8}
            marginBottom={1}>
            <Box margin={0.1}>
              <Text fontSize={0.2} letterSpacing={0.1} maxWidth={vpWidth * 0.8} textAlign='center'>
                ORDER WITH CONFIDENCE
                <meshStandardMaterial />
              </Text>
            </Box>
            <Box margin={0.1}>
              <Text fontSize={0.2} letterSpacing={0.1} maxWidth={vpWidth * 0.8} textAlign='center'>
                ONE DAY DELIVERY
                <meshStandardMaterial />
              </Text>
            </Box>
          </Box>
        </group>

        <Box
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'
          width='100%'
          // width="70%"
        >
          {[...Array(8 * 4).keys()].map((k, i) => (
            <Box margin={0.05} key={k}>
              <mesh position={[0.5, -0.5, 0]}>
                <planeBufferGeometry args={[1, 1]} />
                <meshStandardMaterial color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][i % 4]} />
              </mesh>
            </Box>
          ))}
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
  const [pages, setPages] = useState(0)

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name='description' content='Portfolio' />
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
          <Page onChangePages={setPages} />
          {/* <Cube /> */}
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1024} />
        </EffectComposer>
      </Canvas>

      <div className='absolute top-0 left-0 w-screen h-screen overflow-auto' ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  )
}
