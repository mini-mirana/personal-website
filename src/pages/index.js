import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef /* , useState, useCallback */ } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useAspect, Html, TrackballControls /* useCursor */ } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Flex } from '@react-three/flex'
import tunnel from 'tunnel-rat'
import mail from 'react-useanimations/lib/mail'
import github from 'react-useanimations/lib/github'
import download from 'react-useanimations/lib/download'
import { BackGrid } from '../components/BackGrid'
import { Title } from '../components/Title'
import { Grid } from '../components/Grid'
import { Stack } from '../components/Stack'
import { Cursor } from '../components/Cursor'
// import UseAnimations from 'react-useanimations';
// import github from 'react-useanimations/lib/github'
// import { Reflower } from '../components/Reflower'

// Dig a tunnel
const dom = tunnel()

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
        position={[-vpWidth / 2, vpHeight / 2, 160]}
        name='.Title'>
        <Title />
      </Flex>
      <Grid
        text={[
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          },
          {
            content: '\uf3b8',
            font: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff',
            fontSize: '0.14'
          }
        ]}
        columnNumber={3}
        rowNumber={3}
        boxWidth={0.5}
        boxHeight={0.5}
        boxMargin={0.05}
      />
      <Stack
        width={6}
        height={4}
        distance={8}
        content={[
          {
            source: './a.mp4',
            type: 'video',
            title: 'MEDICAL',
            titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
            titleFontSize: '0.1'
          },
          {
            source: './a.mp4',
            type: 'video',
            title: 'MEDICAL STRUCTURED',
            titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
            titleFontSize: '0.1'
          },
          {
            source: './a.mp4',
            type: 'video',
            title: 'MEDICAL STRUCTURED REPORTING',
            titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
            titleFontSize: '0.1'
          }
        ]}
      />
    </group>
  )
}

export default function Home() {
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
        camera={{ position: [0, 0, 162], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <pointLight position={[0, 1, 164]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 0, 161]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Cursor
          speed={0.2}
          icons={[
            { icon: github, description: 'My GitHub', fontSize: 40, link: 'https://github.com/' },
            { icon: mail, description: 'My Email', fontSize: 40, link: 'mailto:info@example.com' },
            {
              icon: download,
              description: 'Resume pdf',
              fontSize: 40,
              link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
          ]}
          sections={[
            { section: 'Intro', objName: '.Title' },
            { section: 'skills', objName: '.Grid' },
            { section: 'Experience', objName: '.Stack' },
            { section: 'Papers', objName: '' },
            { section: 'Hobbys', objName: '' }
          ]}
          dom={dom}>
          {/* <Sphere color="orange" position={[-1, 0, 0]} scale={0.25} />
          <Sphere color="aquamarine" position={[0, 0, 0]} scale={0.25} />
          <Sphere color="tomato" position={[1, 0, 0]} scale={0.25} /> */}
          <Suspense fallback={<Html center>loading..</Html>}>
            <Page /* onChangePages={setPages} */ />
            {/* <Cube /> */}
          </Suspense>
        </Cursor>

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1024} />
        </EffectComposer>

        <TrackballControls noPan noRotate zoomSpeed={0.2} />
      </Canvas>
      {/* This is the tunnels "Out", contents will appear here (we're in react-dom, not r3f) */}
      <dom.Out />
    </>
  )
}
