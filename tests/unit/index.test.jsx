import React from 'react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { Title } from '../../src/components/Title'

// eslint-disable-next-line global-require
jest.mock('scheduler', () => require('scheduler/unstable_mock'))

// const findByType = (renderer, type) => {
//   return renderer.toTree()[0].children.find((mesh) => mesh.type === type)
// }

// const findByText = (renderer, text) => {
//   return renderer.toTree()[0].children.find((mesh) => mesh.text === text)
// }

describe('Title', () => {
  it('renders Title component', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Title />)

    // assertions using the TestInstance & Scene Graph
    console.log(renderer.toTree()[0].children)
    expect(renderer.toTree()[0].children.length).toBe(3)
  })
})
