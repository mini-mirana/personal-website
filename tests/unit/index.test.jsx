import React from 'react'
import tunnel from 'tunnel-rat'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { Title } from '../../src/components/Title'
import { Grid } from '../../src/components/Grid'
import { Stack } from '../../src/components/Stack'

// eslint-disable-next-line global-require
jest.mock('scheduler', () => require('scheduler/unstable_mock'))

// const findByType = async (renderer, type) => {
//   return renderer.toTree()[0].children.find(async (mesh) => (await mesh.type) === type)
// }

// const findByText = async (renderer, text) => {
//   return renderer.toTree()[0].children.find(async (mesh) => {
//     console.log(mesh)
//     return (await mesh?.props.text) === text
//   })
// }

const height = 1024
const width = 2048
const distance = 8
const startZ = 170

describe('Title', () => {
  it('renders Title component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Title
        size={[width, height, 0]}
        position={[-width / 2, height / 2, startZ - distance - 2]}
        content={['PAPERS']}
      />
    )

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toTree()).toMatchSnapshot()
  })
})

describe('Grid', () => {
  it('renders Grid component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
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
    )

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toTree()).toMatchSnapshot()
  })
})

describe('Stack', () => {
  it('renders Stack component', async () => {
    const tooltip = tunnel()
    const renderer = await ReactThreeTestRenderer.create(
      <Stack
        dom={tooltip}
        width={height >= width ? 3 : 6}
        height={height >= width ? 3 : 4}
        distance={distance}
        reverse
        startReverse
        content={[
          {
            type: 'text',
            title: 'Lorem ipsum',
            description:
              '*Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n\n*sed do eiusmod tempor incididunt ut labore.'
          },
          {
            type: 'photo',
            source:
              'https://res.cloudinary.com/mirana/image/upload/v1648136791/personal-website/photo-manipulation-gfff20f04a_1920_q8suzr.jpg',
            title: 'Lorem ipsum'
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
            source:
              'https://res.cloudinary.com/mirana/video/upload/v1601138124/personal-website/SampleVideo_1280x720_30mb_ecblgp.mp4',
            title: 'ⓘ Lorem ipsum',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure. Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            cardTitle: 'Lorem ipsum'
          }
        ]}
      />
    )

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toGraph()).toMatchSnapshot()
  })
})
