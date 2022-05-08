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
import fontUrl from '../assets/Hack Nerd Font_Bold.json' /* three/examples/fonts/helvetiker_bold.typeface.json */
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
        <group name='.Title' position={[0, 0, startZ - 0 * distance - 2]}>
          <TextMesh fontUrl={fontUrl} position={[0, 0, 0]} hAlign='right'>
            HELLO 
          </TextMesh>
        </group>
        <group name='.Title' position={[0, 0, startZ - 1 * distance - 2]}>
          <TextMesh reverse fontUrl={fontUrl} position={[0, 0, 0]} hAlign='right'>
            I'M A
          </TextMesh>
        </group>
        <group name='.Title' position={[0, 0, startZ - 2 * distance - 2]}>
          <TextMesh fontUrl={fontUrl} position={[0, 0, 0]} hAlign='right'>
            {'Software \uf47f'}
          </TextMesh>
          <TextMesh fontUrl={fontUrl} position={[0, -1, 0]} hAlign='right'>
            Engineer
          </TextMesh>
        </group>
        <group name='.Title' position={[0, 0, startZ - 3 * distance - 2]}>
          <TextMesh reverse fontUrl={fontUrl} position={[0, 0, 0]} hAlign='right'>
            {'Always \ue28c'}
          </TextMesh>
          <TextMesh reverse fontUrl={fontUrl} position={[0, -1, 0]} hAlign='right'>
            Thinking
          </TextMesh>
        </group>
        <group name='.Title' position={[0, 0, startZ - 4 * distance - 2]}>
          <TextMesh fontUrl={fontUrl} position={[0, 0, 0]} hAlign='right'>
            Always 
          </TextMesh>
          <TextMesh fontUrl={fontUrl} position={[0, -1, 0]} hAlign='right'>
            Coding
          </TextMesh>
        </group>
        <Title
          name='.Grid'
          reverse
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, startZ - 5 * distance - 2]}
          content={['SKILLS']}
        />
        <Grid
          startZ={startZ - 6 * distance - 2}
          distance={distance}
          reverse
          content={[
            {
              config: { columnNumber: 3, rowNumber: 3 },
              title: { content: 'PROGRAMMING LANGUAGES' },
              text: [
                {
                  type: 'text',
                  content: '',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3
                },
                {
                  type: 'text',
                  content: '/ﯤ',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.15
                },
                {
                  type: 'text',
                  content: 'Solidity',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07
                },
                {
                  type: 'text',
                  content: 'ﭱ/ﭰ',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.15
                },
                {
                  type: 'text',
                  content: '',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.15
                },
                {
                  type: 'text',
                  content: 'ﳑ',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.15
                },
                {
                  type: 'text',
                  content: ' ',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.15
                },
                {
                  type: 'text',
                  content: 'x86 Assembly',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05
                },
                {
                  type: 'text',
                  content: 'Elixir',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07
                }
              ]
            },
            {
              config: { columnNumber: 4, rowNumber: 2 },
              title: { content: 'WEB DEVELOPMENT' },
              text: [
                {
                  type: 'text',
                  content: 'ﰆ',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3
                },
                {
                  type: 'text',
                  content: 'Flask',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12
                },
                {
                  content: 'Django',
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12,
                  content: 'Jest'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Next.js'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12,
                  content: 'Redux'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ''
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Express.js'
                }
              ]
            },
            {
              config: { columnNumber: 4, rowNumber: 2 },
              title: { content: 'Machine learning' },
              text: [
                {
                  type: 'text',
                  content: 'scikit-Learn',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05
                },
                {
                  type: 'text',
                  content: 'TensorFlow',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05
                },
                {
                  content: 'PyTorch',
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05,
                  content: 'Matplotlib'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Pandas'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Numpy'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05,
                  content: 'Hugging Face'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Mlflow'
                }
              ]
            },
            {
              config: { columnNumber: 3, rowNumber: 3 },
              title: { content: 'DEVOPS & COLLABORATION' },
              text: [
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ' '
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12,
                  content: 'k8s'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Ansible'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Helm'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Terraform'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Argo CD'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ' '
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ''
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: ' AWS'
                }
              ]
            },
            {
              config: { columnNumber: 4, rowNumber: 3 },
              title: { content: 'OTHERS' },
              text: [
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12,
                  content: ' '
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Flutter'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.05,
                  content: 'React Native'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ''
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Web3.js'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Ethers.js'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Adobe XD'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'Figma'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'SQL'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.3,
                  content: ''
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.12,
                  content: 'PSQL'
                },
                {
                  type: 'text',
                  font: 'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
                  fontSize: 0.07,
                  content: 'MongoDB'
                }
              ]
            }
          ]}
        />
        <Title
          reverse
          name='.Stack'
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, startZ - 11 * distance - 2]}
          content={['EXPERIENCE']}
        />
        <Stack
          dom={tooltip}
          width={height >= width ? 3 : 6}
          height={height >= width ? 3 : 4}
          startZ={startZ - 12 * distance - 2}
          distance={distance}
          reverse
          startReverse
          content={[
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://res.cloudinary.com/du37hrqiv/image/upload/v1651507612/logo-default-slim-dark_qrxlcz.png',
              title: 'Network Developer SYNEGY.ir | Shiraz, Iran',
              description: ` 2017 \n\n﫟 Deep packet inspection for industrial network
              \n\n﫟 Internal VPN mobile app for Shiraz University of medical Science
              \n\n﫟 Unidirectional network gateway hardware design for industrial network using RPi
              \n\n﫟 Linux server administration`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            },
            {
              type: 'video',
              source: 'https://cdn1.sarme.cyou/cdn/school.mp4',
              title: 'ⓘ School Organization Web App',
              cardTitle: 'Full-Stack Dev. Danial Sch. | Shiraz, Iran | 2019',
              description: (
                <div>
                  <br /># Developed an educational SPA web application
                  <br /># Linux server administration
                  <br /># Developed CI/CD pipeline for dev, stage and production environment
                </div>
              )
            },
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://cdn1.sarme.cyou/cdn/smart-reporting-single.png',
              title: 'Lead Fullstack Developer Ahmadi Roshan \nShiraz, Iran',
              description: ` 2019 \n\n﫟 Deep packet inspection for industrial network
              \n\n﫟 SaaS structured reporting web application
              \n\n﫟 Continuous deployment using Gitlab CI/CD
              \n\n﫟 Linux server administration`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            },
            {
              type: 'video',
              source: 'https://cdn1.sarme.cyou/cdn/vampire_farm.mp4',
              title: 'ⓘ VAMPIRE FARMS',
              cardTitle: 'ETHTARI STUDIOS | Full Stack Solidity Developer | Remote, 2019',
              description: <div># Vampire DeFi Web Application</div>
            },
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://cdn1.sarme.cyou/cdn/manta-logo2.png',
              title: 'Site Reliability Engineer\nManta Trading LLC\nUS, Remote',
              description: ` 2020 \n\n﫟 Optimize web socket response time
              \n\n﫟 CI/CD pipeline development
              \n\n﫟 GKE admin engineer
              \n\n﫟 Payment integration through stripe`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            },
            {
              type: 'video',
              source: 'https://cdn1.sarme.cyou/cdn/jurassic_farm.mp4',
              title: 'ⓘ JURASSIC FARMS',
              cardTitle: 'JURASSIC FARMS | Remote, 2021',
              description: <div># Jurassic DeFi Web Application</div>
            },
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://cdn1.sarme.cyou/cdn/livedocs-logo.png',
              title: 'Site Reliability Engineer\nLivedocs Inc.\nUS, Remote',
              description: ` 2021
              \n\n﫟 GKE admin engineer
              \n\n﫟 Building CI/CD pipeline with focus on GitOps`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            },
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://cdn1.sarme.cyou/cdn/cloudkite-logo.png',
              title: 'Site Reliability Engineer\nLivedocs Inc.\nUS, Remote',
              description: ` 2021
              \n\n﫟 Maintain Kubernetes clusters, Cloud Infrastructure, and application stacks
              \n\n﫟 Build cloud native infrastructure for machine learning application`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            },
            {
              type: 'photo-text',
              photoY: 0,
              source: 'https://cdn1.sarme.cyou/cdn/DS_logo.png',
              title: 'Machine learning Eng.\nDeep Safety GmbH\nGermany',
              description: ` 2022-Current
              \n\n﫟 Designing and developing machine learning and deep learning systems specialized for autonomous systems
              \n\n﫟 Build and maintain various pipeline required for model deployment and continuous operations around models
              \n\n﫟 Ensure algorithms generate trusted and accurate output`,
              descriptionFont:
                'https://res.cloudinary.com/du37hrqiv/raw/upload/v1650574011/Hack_Bold_Nerd_Font_Complete_o4hhif.woff',
              descriptionY: '-0.8',
              descriptionFontSize: 0.07
            }
          ]}
        />
        <Title
          reverse
          name='.Paper'
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, startZ - 21 * distance - 2]}
          content={['PAPERS']}
        />
        <Stack
          dom={tooltip}
          width={height >= width ? 3 : 6}
          height={height >= width ? 3 : 4}
          startZ={startZ - 22 * distance - 2}
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
            size: 50,
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
          Ali
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
          Moezzi
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
            { icon: github, description: 'My GitHub', fontSize: 40, link: 'https://github.com/realsarm' },
            { icon: mail, description: 'My Email', fontSize: 40, link: 'mailto:info@sarme.cyou' },
            {
              icon: download,
              description: 'Download Resume pdf version',
              fontSize: 40,
              link: 'https://cdn1.sarme.cyou/cdn/resume-alimoezzi.pdf'
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
