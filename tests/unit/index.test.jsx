import React from 'react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { Title } from '../../src/components/Title'

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
