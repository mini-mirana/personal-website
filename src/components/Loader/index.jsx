import * as React from 'react'
import { useProgress } from '@react-three/drei'
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

const defaultDataInterpolation = (p) => `Loading ${p.toFixed(2)}%`

export function Loader({
  // containerStyles,
  // innerStyles,
  // barStyles,
  // dataStyles,
  dataInterpolation = defaultDataInterpolation
  // initialState = (active) => active,
}) {
  const { active, progress } = useProgress()
  const progressRef = React.useRef(0)
  const rafRef = React.useRef(0)
  const progressSpanRef = React.useRef(null)
  const [shown, setShown] = React.useState(true)
  const [clicked, setClicked] = React.useState(false)
  const [keepActive, setKeepActive] = React.useState(false)

  React.useEffect(() => {
    let t
    if (clicked === shown)
      t = setTimeout(() => {
        new Audio('/sound/sweetchoff.wav').play()
        setShown(!clicked)
      }, 2000)
    return () => clearTimeout(t)
  }, [shown, clicked])

  React.useEffect(() => {
    setKeepActive(true)
  }, [active])

  const updateProgress = React.useCallback(() => {
    if (!progressSpanRef.current) return
    progressRef.current += (progress - progressRef.current) / 2
    if (progressRef.current > 0.95 * progress || progress === 100) progressRef.current = progress
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current)
    if (progressRef.current < progress) rafRef.current = requestAnimationFrame(updateProgress)
  }, [dataInterpolation, progress])

  React.useEffect(() => {
    updateProgress()
    return () => cancelAnimationFrame(rafRef.current)
  }, [updateProgress])

  return shown && process.env.NEXT_PUBLIC_APP_ENV === undefined ? (
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
        <div
          className='w-screen h-screen bg-black absolute top-0 left-0 z-[1000]'
          role='presentation'
          onClick={() => {
            if (keepActive) {
              setClicked(true)
            }
          }}>
          <div className='w-full h-full flex flex-col	 justify-center items-center'>
            <div className='w-[40%] md:w-[20%]'>
              <Lottie options={defaultOptions} />
            </div>
            {keepActive && (
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
  ) : // <div style={{ ...styles.container, opacity: active ? 1 : 0, ...containerStyles }}>
  //   <div>
  //     <div style={{ ...styles.inner, ...innerStyles }}>
  //       <div style={{ ...styles.bar, transform: `scaleX(${progress / 100})`, ...barStyles }}></div>
  //       <span ref={progressSpanRef} style={{ ...styles.data, ...dataStyles }} />
  //     </div>
  //   </div>
  // </div>
  null
}

// const styles = {
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     background: '#171717',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'opacity 300ms ease',
//     zIndex: 1000,
//   },
//   inner: {
//     width: 100,
//     height: 3,
//     background: '#272727',
//     textAlign: 'center',
//   },
//   bar: {
//     height: 3,
//     width: '100%',
//     background: 'white',
//     transition: 'transform 200ms',
//     transformOrigin: 'left center',
//   },
//   data: {
//     display: 'inline-block',
//     position: 'relative',
//     fontVariantNumeric: 'tabular-nums',
//     marginTop: '0.8em',
//     color: '#f0f0f0',
//     fontSize: '0.6em',
//     fontFamily: `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
//     whiteSpace: 'nowrap',
//   },
// }

export default Loader
