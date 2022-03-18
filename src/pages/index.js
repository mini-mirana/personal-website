import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef /* , useState, useCallback */, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useAspect, Html, PerspectiveCamera /* useCursor */ } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Flex } from '@react-three/flex'
import tunnel from 'tunnel-rat'
import mail from 'react-useanimations/lib/mail'
import github from 'react-useanimations/lib/github'
import download from 'react-useanimations/lib/download'
import { animated, useSpring, config } from '@react-spring/three'
import fontUrl from '../assets/font.json' /* three/examples/fonts/helvetiker_bold.typeface.json */
// import Dots from '../components/Dots'
// import Effects from '../components/Dots/Effects'

const BackGrid = dynamic(() => import('../components/BackGrid'))
const Title = dynamic(() => import('../components/Title'))
const Grid = dynamic(() => import('../components/Grid'))
const Stack = dynamic(() => import('../components/Stack'))
const Cursor = dynamic(() => import('../components/Cursor'))
const TextMesh = dynamic(() => import('../components/TextMesh'))
const Overlay = dynamic(() => import('../components/Overlay'))
// import UseAnimations from 'react-useanimations';
// import github from 'react-useanimations/lib/github'
// const Reflower = dynamic(() => import('../components/Reflower'),{suspense: true,})

const AnimatedPerspectiveCamera = animated(PerspectiveCamera)
// Dig a tunnel
const dom = tunnel()
const tooltip = tunnel()

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
  const textMesh = useRef()
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  // useFrame(() => group.current.position.lerp(vec.set(0, 0, state.top / 100), 0.1))
  // const handleReflow = useCallback(
  //   (w, h) => {
  //     onChangePages(h / vpHeight)
  //     // console.log({ h, vpHeight, pages: h / vpHeight });
  //   },
  //   [onChangePages, vpHeight]
  // )
  // useFrame(({ clock }) => {
  //   const r = Math.sin(clock.getElapsedTime())
  //   textMesh.current.rotation.x = r * 0.1
  //   textMesh.current.rotation.y = r * 0.1
  //   textMesh.current.rotation.z = r * 0.1
  // })

  return (
    <>
      <BackGrid />
      <group position={[0, -4, 145]} rotation={[Math.PI / 2, 0, 0]}>
        {/* <Dots /> */}
        {/* <Effects /> */}
      </group>
      <group>
        <group ref={textMesh} position={[0, -0.6, 165]} name='.Title'>
          <TextMesh
            fontUrl={fontUrl}
            fontConfig={{
              size: 100,
              height: 0.1,
              curveSegments: 32,
              bevelEnabled: true,
              bevelThickness: 1,
              bevelSize: 1,
              bevelOffset: 0,
              bevelSegments: 2
            }}
            hAlign='right'>
            THREE
          </TextMesh>
        </group>
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
          dom={tooltip}
          width={6}
          height={4}
          distance={8}
          content={[
            {
              type: 'text',
              title: 'MEDICAL',
              titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
              titleFontSize: '0.1',
              description:
                '*Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n\n*sed do eiusmod tempor incididunt ut labore.'
            },
            {
              type: 'photo',
              source: '/1.png',
              title: 'MEDICAL',
              titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
              titleFontSize: '0.1'
            },
            {
              type: 'photo-text',
              source: 'ze2lblmbbo981.jpg',
              title: 'MEDICAL',
              titleFont: 'https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff',
              titleFontSize: '0.1',
              description:
                '*Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n\n*sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              type: 'video',
              source: './a.mp4',
              title: 'ⓘ MEDICAL',
              titleFont:
                'https://fonts.gstatic.com/s/notosanssymbols/v30/rP2up3q65FkAtHfwd-eIS2brbDN6gxP34F9jRRCe4W3gowggaQ.woff',
              titleFontSize: '0.1',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure. Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
              cardTitle: 'MEDICAL'
            }
          ]}
        />
      </group>
      <Overlay position={[-size.width / 2 + 90, size.height / 2 - 40, 0]}>
        <TextMesh
          size={30}
          fontUrl={fontUrl}
          fontConfig={{
            size: 70,
            height: 0.1,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 150,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
          }}
          hAlign='right'>
          THREE
        </TextMesh>
      </Overlay>
    </>
  )
}

export default function Home() {
  // const [pages, setPages] = useState(0)
  const cam = useRef()
  const [{ pos, rotation }, set] = useSpring(() => ({
    pos: [0, 0, 170],
    rotation: [0, 0, 0],
    config: config.slow
  }))
  useEffect(() => {
    // Your code here
    window.addEventListener('wheel', (e) => {
      let r = ((pos.animation.to[2] - 170) * Math.PI) / 8
      if (1 - Math.cos(r) < 0.2) {
        r = Math.round(r / (2 * Math.PI)) * 2 * Math.PI
      } else if (1 + Math.cos(r) < 0.2) {
        r = Math.round(r / Math.PI) * Math.PI
      }
      if (e.deltaY < 0) {
        set.start(() => ({
          pos: [0, 0, cam.current.position.z - 2],
          rotation: [0, 0, r]
        }))
      } else {
        set.start(() => ({
          pos: [0, 0, cam.current.position.z + 2],
          rotation: [0, 0, r]
        }))
      }
    })
  }, [])

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
        mode='concurrent'
        performance={{ max: 0.2, min: 0 }}
        dpr={[1, 2]}
        colorManagement={false} // Disabling colorManagement gives us raw colors (pure whites)
      >
        <AnimatedPerspectiveCamera
          ref={cam}
          makeDefault
          position={pos}
          rotation={rotation}
          zoom={1}
          far={8}
          fov={120}
        />
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
          <Suspense fallback={<Html center>loading..</Html>}>
            <Page /* onChangePages={setPages} */ />
            {/* <Cube /> */}
          </Suspense>
        </Cursor>

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1024} />
        </EffectComposer>

        {/* <TrackballControls onStart={(e)=>{console.log("start"); console.log(e.target)}} onEnd={(e)=>{console.log("END"); console.log(e.target)}} target={[0,0,140]} noPan noRotate ref={controllerRef} zoomSpeed={0.05} onChange={(e) => {
          console.log("UPDATE")
          // console.log(cam.current)
          const r = Math.sin(e.target.object.position.z * Math.PI/4)
          // e.target.up.set([0, 0, 150])
          // e.target.rotateSpeed = 0.0
          e.target.object.rotateZ(r)
          // e.target.angle += Math.PI/4
          // e.target.STATE.ROTATE += Math.PI/4
          // e.target.object.updateProjectionMatrix()
          // e.target.object.enabled = true
          
          // e.target.update()
          // e.camera.position.z = 
          }} /> */}
      </Canvas>
      {/* This is the tunnels "Out", contents will appear here (we're in react-dom, not r3f) */}
      <dom.Out />
      <tooltip.Out />
    </>
  )
}
