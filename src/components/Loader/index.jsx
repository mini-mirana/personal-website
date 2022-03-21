import React from 'react'
import Lottie from 'react-lottie'
import { ArwesThemeProvider, StylesBaseline, Text as ArwesText } from '@arwes/core'
import { BleepsProvider } from '@arwes/sounds'
import { AnimatorGeneralProvider, Animator } from '@arwes/animation'
import animationData from '../../../public/lotties/vortex-loader.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export function Loader({ startText = false, ...props }) {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <BleepsProvider
        audioSettings={{
          common: { volume: 0.25 }
        }}
        playersSettings={{
          object: { src: ['/sound/object.mp3'] },
          assemble: { src: ['/sound/assemble.mp3'], loop: true },
          type: { src: ['/sound/type.mp3'], loop: true },
          click: { src: ['/sound/click.mp3'] }
        }}
        bleepsSettings={{
          object: { player: 'object' },
          assemble: { player: 'assemble' },
          type: { player: 'type' },
          click: { player: 'click' }
        }}>
        <div className='w-screen h-screen bg-black' role='presentation' {...props}>
          <div className='w-full h-full flex flex-col	 justify-center items-center'>
            <div className='w-[40%] md:w-[20%]'>
              <Lottie options={defaultOptions} />
            </div>
            {startText && (
              <AnimatorGeneralProvider animator={{ duration: { enter: 2500, exit: 100 } }}>
                <Animator animator={{ animation: true, manager: 'stagger' }}>
                  <ArwesText className='ml-[1%]'>Tap anywhere to start</ArwesText>
                </Animator>
              </AnimatorGeneralProvider>
            )}
          </div>
        </div>
      </BleepsProvider>
    </ArwesThemeProvider>
  )
}

export default Loader
