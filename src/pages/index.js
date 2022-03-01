import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef, useState /* , useState, useCallback */ } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useAspect, Html, TrackballControls /* useCursor */ } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Flex } from '@react-three/flex'
import tunnel from 'tunnel-rat'
import { BackGrid } from '../components/BackGrid'
import { Title } from '../components/Title'
import { Grid } from '../components/Grid'
import { Stack } from '../components/Stack'
// import { Reflower } from '../components/Reflower'

// Dig a tunnel
const dom = tunnel()

const state = {
  top: 0
}

function Cursor({ children, speed = 0.1, eps = 0.001, /* col = new THREE.Color(), */ vec = new THREE.Vector2() }) {
  const outer = useRef()
  // const [hovered, hover] = useState()
  const [pos] = useState(() => new THREE.Vector2())
  const color = /* hovered ? '#' + col.copy(hovered.material.color).convertLinearToSRGB().getHexString() : */ '#777'

  // useCursor(hovered)
  useFrame((s) => {
    vec.set(s.size.width / 2 + (s.mouse.x * s.size.width) / 2, s.size.height / 2 - (s.mouse.y * s.size.height) / 2)
    if (Math.abs(pos.x - vec.x) > eps || Math.abs(pos.y - vec.y) > eps) {
      pos.lerp(vec, speed)
      outer.current.style.transform = `translate3d(${pos.x - 40}px,${pos.y - 40}px,0)`
    }
  })

  return (
    // onPointerOver={(e) => (e.stopPropagation(), hover(e.object))} onPointerOut={(e) => hover(null)}
    <group>
      {children}
      {/* Everything we'll put into the tunnels "In" will be projected
          outwards to the tunnels "Out". That means we can write dom nodes
          from within r3f, with full access to canvas state! */}
      <dom.In>
        <div ref={outer} className='pointer-events-none absolute left-0 top-0'>
          <div
            className='w-[80px] h-[80px] border-2 border-solid border-[orange] rounded-[50%]'
            style={{
              transition: `all 350ms cubic-bezier(0, 0.28, 0, 0.77)`,
              transform: `scale(${/* hovered ? 1 : */ 0.25})`,
              borderWidth: /* hovered ? '10px' : */ '40px',
              borderColor: color
            }}
          />
          {/* <div class="cursor-text" style={{ background: color, opacity: hovered ? 1 : 0 }}>
            {color}
          </div> */}
        </div>
      </dom.In>
    </group>
  )
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
        position={[-vpWidth / 2, vpHeight / 2, 160]}>
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

        <Cursor speed={0.05}>
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

        <TrackballControls noRotate zoomSpeed={0.2} />
      </Canvas>
      {/* This is the tunnels "Out", contents will appear here (we're in react-dom, not r3f) */}
      <dom.Out />
    </>
  )
}
