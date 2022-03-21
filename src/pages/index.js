import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useAspect, Html, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import tunnel from 'tunnel-rat'
import mail from 'react-useanimations/lib/mail'
import github from 'react-useanimations/lib/github'
import download from 'react-useanimations/lib/download'
import { animated, useSpring, config } from '@react-spring/three'
import { useWindowDimensions } from '../utils/useWindowDimensions'
import fontUrl from '../assets/font.json' /* three/examples/fonts/helvetiker_bold.typeface.json */
import { Loader } from '../components/Loader'

// const Effects = dynamic(() => import('../components/Effects'), { suspense: true })
// const Dots = dynamic(() => import('../components/Dots'), { suspense: true })
const BackGrid = dynamic(() => import('../components/BackGrid'), { suspense: true })
const Title = dynamic(() => import('../components/Title'), { suspense: true })
const Grid = dynamic(() => import('../components/Grid'), { suspense: true })
const Stack = dynamic(() => import('../components/Stack'), { suspense: true })
const Cursor = dynamic(() => import('../components/Cursor'), { suspense: true })
const TextMesh = dynamic(() => import('../components/TextMesh'), { suspense: true })
const Overlay = dynamic(() => import('../components/Overlay'), { suspense: true })
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

function Page({ startZ, distance }) {
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  const { height, width } = useWindowDimensions()
  // useFrame(() => group.current.position.lerp(vec.set(0, 0, state.top / 100), 0.1))
  // useFrame(({ clock }) => {
  //   const r = Math.sin(clock.getElapsedTime())
  //   textMesh.current.rotation.x = r * 0.1
  //   textMesh.current.rotation.y = r * 0.1
  //   textMesh.current.rotation.z = r * 0.1
  // })

  return (
    <>
      {/* <Effects /> */}
      {/* <Dots position={[0, -4, startZ]} rotation={[Math.PI / 2, 0, 0]} /> */}
      <BackGrid position={[0, 0, startZ]} rotation={[Math.PI / 2, 0, 0]} /* position={[0, -1, startZ]} */ />
      <group>
        <TextMesh
          name='.Title'
          position={[0, 0, startZ - distance / 2 - 1]}
          hAlign='right'
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
          }}>
          THREE
        </TextMesh>
        <Title size={[vpWidth, vpHeight, 0]} position={[-vpWidth / 2, vpHeight / 2, startZ - distance - 2]} />
        <Grid
          name='.Grid'
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, startZ - 2 * distance - 2]}
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
          reverse
          width={height >= width ? 3 : 6}
          height={height >= width ? 3 : 4}
          distance={distance}
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
  const startZ = 170
  const distance = 8

  const cam = useRef()
  const canvasRef = useRef()
  const [{ pos, rotation }, set] = useSpring(() => ({
    pos: [0, 0, startZ],
    rotation: [0, 0, 0],
    config: config.slow
  }))

  const [startApp, setStartApp] = useState(false)

  const scrollOutSound = useRef()
  const scrollInSound = useRef()

  const handleScroll = (measure, thr, to = pos.animation.to[2], from = cam.current.position.z) => {
    let r = ((to - startZ) * Math.PI) / 8
    if (1 - Math.cos(r) < 0.3) {
      r = Math.round(r / (2 * Math.PI)) * 2 * Math.PI
    } else if (1 + Math.cos(r) < 0.3) {
      r = Math.round(r / Math.PI) * Math.PI
    }

    if (measure < thr) {
      scrollInSound.current.play()
      set.start(() => ({
        pos: [0, 0, from - 2],
        rotation: [0, 0, r]
      }))
    } else {
      if (!('ontouchstart' in window)) {
        scrollOutSound.current.play()
      } else {
        scrollInSound.current.play()
      }
      set.start(() => ({
        pos: [0, 0, from + 2],
        rotation: [0, 0, r]
      }))
    }
  }
  useEffect(() => {
    scrollInSound.current = new Audio('/sound/spaceship-passing.mp3')
    scrollOutSound.current = new Audio('/sound/sfx.wav')

    // Your code here
    if (!('ontouchstart' in window)) {
      window.addEventListener('wheel', (e) => {
        handleScroll(e.deltaY, 0)
      })
    }

    if ('ontouchstart' in window) {
      window.addEventListener(
        'touchmove',
        async (ev) => {
          ev.preventDefault()
          const Hammer = (await import('hammerjs')).default
          const hammertime = new Hammer(canvasRef.current)
          hammertime.get('pinch').set({ enable: true })
          hammertime.on('pinch', (e) => {
            handleScroll(e.scale, 1)
          })
        },
        false
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name='description' content='Portfolio' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, height=device-height, initial-scale:1, user-scalable=no' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Canvas
        gl={{ alpha: false }}
        mode='concurrent'
        performance={{ max: 0.2, min: 0 }}
        dpr={[1, 2]}
        colorManagement={false} // Disabling colorManagement gives us raw colors (pure whites)
        ref={canvasRef}>
        <AnimatedPerspectiveCamera
          ref={cam}
          makeDefault
          position={pos}
          rotation={rotation}
          zoom={1}
          far={8}
          fov={120}
        />
        <pointLight position={[0, 1, startZ - 6]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 0, startZ - 9]}
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
          dom={dom}
          handleScroll={handleScroll}>
          <Suspense
            fallback={
              <Html center wrapperClass='z-50'>
                <Loader />
              </Html>
            }>
            <Page startZ={startZ} distance={distance} />
            {!startApp && (
              <Html center wrapperClass='z-50'>
                <Loader
                  startText
                  onClick={() => {
                    setStartApp(true)
                  }}
                />
              </Html>
            )}
            <Html>
              {startApp && (
                /* eslint-disable-next-line jsx-a11y/media-has-caption */
                <audio autoPlay>
                  <source src='/sound/sweetchoff.wav' type='audio/wav' />
                </audio>
              )}
            </Html>
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
