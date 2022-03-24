import Head from 'next/head'
import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useAspect, PerspectiveCamera } from '@react-three/drei'
import tunnel from 'tunnel-rat'
import mail from 'react-useanimations/lib/mail'
import github from 'react-useanimations/lib/github'
import download from 'react-useanimations/lib/download'
import { animated, useSpring, config } from '@react-spring/three'
import { useWindowDimensions } from '../utils/useWindowDimensions'
// import fontUrl from '../assets/NoirPro-Bold.json' /* three/examples/fonts/helvetiker_bold.typeface.json */
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
        <group name='.Title' position={[0, 0, startZ - distance / 2 - 1]}>
          <TextMesh position={[0, 1, 0]} hAlign='right'>
            HELLO
          </TextMesh>
          {/* <TextMesh
            position={[2.1, 1, 0]}
            fontUrl={FontAwesome}
            fontConfig={{
              size: 65,
              height: 0.1,
              curveSegments: 32,
              bevelEnabled: true,
              bevelThickness: 0.15,
              bevelSize: 0.15,
              bevelOffset: 0,
              bevelSegments: 1
            }}>
            ✋
          </TextMesh> */}
          <TextMesh position={[0, 0, 0]} hAlign='right'>
            I'M A
          </TextMesh>
          <TextMesh position={[0, -1, 0]} hAlign='right'>
            DEV
          </TextMesh>
        </group>
        <Title
          name='.Grid'
          reverse
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, startZ - distance - 2]}
          content={['SKILLS']}
        />
        <Grid
          startZ={startZ - 2 * distance - 2}
          distance={distance}
          reverse
          content={[
            {
              config: { columnNumber: 3, rowNumber: 3 },
              title: { content: 'PROGRAMMING LANGUAGES' },
              text: [
                { type: 'textMesh', content: 'PYTHON' },
                { type: 'textMesh', content: 'JAVASCRIPT' },
                { type: 'textMesh', content: 'C' },
                { type: 'textMesh', content: 'CPP' },
                { type: 'textMesh', content: 'JAVA' },
                { type: 'textMesh', content: 'GO' },
                { type: 'textMesh', content: 'PHP' },
                { type: 'textMesh', content: 'ASSEMBLY' },
                { type: 'textMesh', content: 'ELIXIR' }
              ]
            },
            {
              config: { columnNumber: 4, rowNumber: 3 },
              title: { content: 'WEB DEVELOPMENT' },
              text: [
                { type: 'textMesh', content: 'HTML' },
                { type: 'textMesh', content: 'CSS' },
                { type: 'textMesh', content: 'JAVASCRIPT' },
                { type: 'textMesh', content: 'JQUERY' },
                { type: 'textMesh', content: 'REACT' },
                { type: 'textMesh', content: 'NEXTJS' },
                { type: 'textMesh', content: 'REDUX' },
                { type: 'textMesh', content: 'TYPESCRIPT' },
                { type: 'textMesh', content: 'NODEJS' },
                { type: 'textMesh', content: 'EXPRESSJS' },
                { type: 'textMesh', content: 'FLASK' },
                { type: 'textMesh', content: 'DJANGO' }
              ]
            },
            {
              config: { columnNumber: 3, rowNumber: 3 },
              title: { content: 'DEVOPS & COLLABORATION' },
              text: [
                { type: 'textMesh', content: 'DOCKER' },
                { type: 'textMesh', content: 'KUBERNETES' },
                { type: 'textMesh', content: 'ANSIBLE' },
                { type: 'textMesh', content: 'HELM' },
                { type: 'textMesh', content: 'TRRAFORM' },
                { type: 'textMesh', content: 'ARGOCD' },
                { type: 'textMesh', content: 'GIT' },
                { type: 'textMesh', content: 'GITHUB' },
                { type: 'textMesh', content: 'GITLAB' }
              ]
            },
            {
              config: { columnNumber: 4, rowNumber: 3 },
              title: { content: 'OTHERS' },
              text: [
                { type: 'textMesh', content: 'ANDROID' },
                { type: 'textMesh', content: 'FLUTTER' },
                { type: 'textMesh', content: 'REACTNATIVE' },
                { type: 'textMesh', content: 'SOLIDITY' },
                { type: 'textMesh', content: 'WEB3JS' },
                { type: 'textMesh', content: 'ETHERJS' },
                { type: 'textMesh', content: 'ADOBEXD' },
                { type: 'textMesh', content: 'FIGMA' },
                { type: 'textMesh', content: 'SQL' },
                { type: 'textMesh', content: 'MYSQL' },
                { type: 'textMesh', content: 'PQSL' },
                { type: 'textMesh', content: 'MONGODB' }
              ]
            }
          ]}
        />
        <Title
          name='.Stack'
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, 120]}
          content={['EXPERIENCE']}
        />
        <Stack
          dom={tooltip}
          width={height >= width ? 3 : 6}
          height={height >= width ? 3 : 4}
          startZ={112}
          distance={distance}
          reverse
          startReverse
          content={[
            {
              type: 'video',
              source: './videos/school.mp4',
              title: 'ⓘ SCHOOL MANAGEMENT APPLICATION',
              cardTitle: 'SCHOOL MANAGEMENT APPLICATION',
              description: (
                <div>
                  # Designed user experience of the application
                  <br /># Developed the frontend
                </div>
              )
            },
            {
              type: 'video',
              source: './videos/medical.mp4',
              title: 'ⓘ MEDICAL STRUCTURED REPORTING SYSTEM',
              cardTitle: 'MEDICAL STRUCTURED REPORTING SYSTEM',
              description: (
                <div>
                  # Designed user experience of the application
                  <br />
                  # Developed the frontend
                  <br /># Participated in voice assistant development team (for reporting procedure)
                </div>
              )
            },
            {
              type: 'video',
              source: './videos/vpn.mp4',
              title: 'ⓘ ANDROID ACCESSIBILITY APPLICATION',
              cardTitle: 'ANDROID ACCESSIBILITY APPLICATION',
              description: (
                <div>
                  # AUTOMATIC VPN CONNECTION
                  <br /># Developed the frontend
                </div>
              )
            },
            {
              type: 'photo-text',
              source:
                'https://res.cloudinary.com/mirana/image/upload/v1648137447/personal-website/boards-g92417fa21_1920_zaksq6.jpg',
              title: 'Lorem ipsum',
              description:
                '*Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n\n*sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              type: 'video',
              source: './videos/vampire.mp4',
              title: 'ⓘ VAMPIRE FARMS',
              cardTitle: 'VAMPIRE FARMS',
              description: (
                <div>
                  # Designed user experience of the application
                  <br /># Developed the frontend
                </div>
              )
            },
            {
              type: 'video',
              source: './videos/jurassic-farm.mp4',
              title: 'ⓘ JURASSIC FARMS',
              cardTitle: 'JURASSIC FARMS',
              description: (
                <div>
                  # Designed user experience of the application
                  <br /># Developed the frontend
                </div>
              )
            },
            {
              type: 'video',
              source: './videos/timewarp.mp4',
              title: 'ⓘ TIMEWRAP',
              cardTitle: 'TIMEWRAP',
              description: (
                <div>
                  # FARM / P2E / NFT MARKETPLACE
                  <br />
                  # Developed the frontend
                  <br />
                  # Connected the DAPP to multiple providers
                  <br /># Developed smart contracts
                </div>
              )
            }
          ]}
        />
        <Title
          name='.Paper'
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, 56]}
          content={['PAPERS']}
        />
        <Stack
          dom={tooltip}
          width={height >= width ? 3 : 6}
          height={height >= width ? 3 : 4}
          startZ={48}
          distance={distance}
          reverse
          startReverse
          content={[
            {
              type: 'text',
              title:
                'APPLICATION OF DEEP LEARNING IN GENERATING STRUCTURED RADIOLOGY REPORTS: A TRANSFORMER-BASED TECHNIQUE | 11/2021 | UNDER REVIEW',
              description:
                'Author list:\n• Seyed Alireza Moezzi\n• Abdolrahman Ghaedi\n• Mojdeh Rahmanian\n• Seyedeh Zahra Mousavi\n• Ashkan Sami',
              // description: 'Author list: Seyed Alireza Moezzi; Abdolrahman Ghaedi; Mojdeh Rahmanian; Seyedeh Zahra Mousavi; Ashkan Sami',
              descriptionY: '-0.8'
            }
          ]}
        />
      </group>
      <Overlay position={[-size.width / 2 + 90, size.height / 2 - 40, 0]}>
        <TextMesh
          size={30}
          fontConfig={{
            size: 46,
            height: 0.1,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 150,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
          }}
          position={[0, 0, 0]}
          hAlign='right'>
          ABDOLRAHMAN
        </TextMesh>
        <TextMesh
          size={30}
          fontConfig={{
            size: 60,
            height: 0.1,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 150,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
          }}
          position={[0, -30, 0]}
          hAlign='right'>
          GHAEDI
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
        rotation: [cam.current.rotation.x, cam.current.rotation.y, r]
      }))
    } else {
      scrollOutSound.current.play()
      set.start(() => ({
        pos: [0, 0, from + 2],
        rotation: [cam.current.rotation.x, cam.current.rotation.y, r]
      }))
    }
  }
  useEffect(() => {
    scrollInSound.current = new Audio('/sound/object.mp3')
    scrollOutSound.current = new Audio('/sound/toggle.mp3')

    // Your code here
    if (!('ontouchstart' in window)) {
      window.addEventListener('wheel', (e) => {
        handleScroll(e.deltaY, 0)
      })
    }

    if ('ontouchstart' in window) {
      // eslint-disable-next-line no-undef
      const hammertime = new Hammer(canvasRef.current)
      hammertime.get('pinch').set({ enable: true })
      hammertime.get('pan').set({ threshold: 8 })
      hammertime.on('pinchin panup doubletap', () => {
        handleScroll(2, 1)
      })
      hammertime.on('pinchout pandown', () => {
        handleScroll(1, 2)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name='description' content='Portfolio' />
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
          zoom={4}
          far={8}
          fov={150}
        />
        <ambientLight intensity={1} />
        <pointLight intensity={1} />

        <Cursor
          speed={0.2}
          icons={[
            { icon: github, description: 'My GitHub', fontSize: 40, link: 'https://github.com/mini-mirana' },
            { icon: mail, description: 'My Email', fontSize: 40, link: 'mailto:mini_mirana@yahoo.com' },
            {
              icon: download,
              description: 'Download Resume pdf version',
              fontSize: 40,
              link: './pdfs/Abdolrahman_Ghaedi_Resume.pdf'
            }
          ]}
          sections={[
            { section: 'Intro', objName: '.Title' },
            { section: 'Skills', objName: '.Grid' },
            { section: 'Experience', objName: '.Stack' },
            { section: 'Papers', objName: '.Paper' }
          ]}
          dom={dom}
          handleScroll={handleScroll}>
          <Suspense fallback={null}>
            <Page startZ={startZ} distance={distance} />
            {/* <Cube /> */}
          </Suspense>
        </Cursor>

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
      <Loader />
      {/* This is the tunnels "Out", contents will appear here (we're in react-dom, not r3f) */}
      <dom.Out />
      <tooltip.Out />
    </>
  )
}
