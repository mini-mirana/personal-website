import React from 'react'
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

describe('Title', () => {
  it('renders Title component', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Title />)

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toTree()).toMatchSnapshot()
  })
})

describe('Grid', () => {
  it('renders Grid component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
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
    )

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toTree()).toMatchSnapshot()
  })
})

describe('Stack', () => {
  it('renders Stack component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
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
    )

    // assertions using the TestInstance & Scene Graph
    expect(renderer.toGraph()).toMatchSnapshot()
  })
})
