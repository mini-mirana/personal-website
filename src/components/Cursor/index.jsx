import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import UseAnimations from 'react-useanimations'
import { openInNewTab } from '../../utils/utils'

export function Cursor({
  children,
  speed = 0.1,
  eps = 0.001,
  /* col = new THREE.Color(), */ vec = new THREE.Vector2(),
  icons,
  sections,
  p = new THREE.Vector3(),
  dom,
  frustum = new THREE.Frustum(),
  cameraViewProjectionMatrix = new THREE.Matrix4(),
  bbox = new THREE.Box3()
}) {
  const outer = useRef()
  const [hovered, hover] = useState()
  const [pos] = useState(() => new THREE.Vector2())
  const ref = useRef()
  const clicked = useRef()
  const [currentSection, setCurrentSection] = useState(sections[0]?.section)
  const clickSound = new Audio('/sound/type.mp3')
  const color = hovered ? 'rgb(100 116 139)' : '#fff'

  useEffect(() => {
    // Your code here
    window.addEventListener(
      'mousemove',
      (e) => {
        vec.set(e.pageX, e.pageY)
        if (Math.abs(pos.x - vec.x) > eps || Math.abs(pos.y - vec.y) > eps) {
          pos.lerp(vec, speed)
          outer.current.style.transform = `translate3d(${pos.x - 55}px,${pos.y - 55}px,0)`
        }
      },
      false
    )
  }, [])

  // useEffect(() => {
  //   clicked.current = ref.current.getObjectByName(params?.id)
  //   if (clicked.current) {
  //     clicked.current.parent.parent.updateWorldMatrix(true, true)
  //     clicked.current.parent.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
  //     clicked.current.parent.parent.getWorldQuaternion(q)
  //   } else {
  //     p.set(0, 0, 162)
  //     q.identity()
  //   }
  // })

  useFrame((stateFrame) => {
    if (clicked.current) {
      stateFrame.camera.position.lerp(
        p.set(stateFrame.camera.position.x, stateFrame.camera.position.y, clicked.current.position.z + 0.5),
        0.025
      )
    }
  })

  // useCursor(hovered)
  // useFrame((s) => {
  //   vec.set(s.size.width / 2 + (s.mouse.x * s.size.width) / 2, s.size.height / 2 - (s.mouse.y * s.size.height) / 2)
  //   if (Math.abs(pos.x - vec.x) > eps || Math.abs(pos.y - vec.y) > eps) {
  //     pos.lerp(vec, speed)
  //     outer.current.style.transform = `translate3d(${pos.x - 55}px,${pos.y - 55}px,0)`
  //   }
  // })

  return (
    // onPointerOver={(e) => (e.stopPropagation(), hover(e.object))} onPointerOut={(e) => hover(null)}
    <group
      ref={ref}
      onWheel={(e) => {
        clicked.current = null
        sections.map(({ section, objName }) => {
          if (objName) {
            e.camera.updateMatrixWorld() // make sure the camera matrix is updated
            e.camera.matrixWorldInverse.copy(e.camera.matrixWorld).invert()
            cameraViewProjectionMatrix.multiplyMatrices(e.camera.projectionMatrix, e.camera.matrixWorldInverse)
            frustum.setFromProjectionMatrix(cameraViewProjectionMatrix)
            bbox.setFromObject(ref.current.getObjectByName(objName))
            if (frustum.intersectsBox(bbox)) {
              setCurrentSection(section)
            }
          }
          return false
        })
      }}>
      {children}
      {/* Everything we'll put into the tunnels "In" will be projected
          outwards to the tunnels "Out". That means we can write dom nodes
          from within r3f, with full access to canvas state! */}
      <dom.In>
        <div ref={outer} className='pointer-events-none absolute left-0 top-0'>
          <div
            className='w-[120px] h-[120px] border-2 border-solid border-[orange] rounded-[50%]'
            style={{
              transition: `all 350ms cubic-bezier(0, 0.28, 0, 0.77)`,
              transform: `scale(${hovered ? 0.55 : 0.29})`,
              borderWidth: hovered ? '5px' : '10px',
              borderColor: color,
              backgroundColor: hovered ? 'rgb(51 65 85)' : 'transparent'
            }}
          />
          {/* <div class="cursor-text" style={{ background: color, opacity: hovered ? 1 : 0 }}>
            {color}
          </div> */}
        </div>
        <div className='text-[red] absolute right-[1%] bottom-[1%] flex'>
          {icons.map(({ icon, description, fontSize, link }) => (
            <div
              className='relative flex flex-col items-center group ml-3'
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}>
              <div className='hover:stroke-white stroke-zinc-600'>
                <UseAnimations
                  animation={icon}
                  size={fontSize}
                  // strokeColor={hovered ? '#FFF' : '#49505799'}
                  pathCss='stroke: inherit;'
                  wrapperStyle={{ stroke: 'inherit' }}
                  onClick={() => openInNewTab(link)}
                />
              </div>

              <div className='absolute bottom-1 flex flex-col items-center hidden mb-10 group-hover:flex'>
                <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-gray-800 shadow-lg'>
                  {description}
                </span>
                <div className='w-3 h-3 -mt-2 rotate-45 bg-gray-800' />
              </div>
            </div>
          ))}
        </div>
        <div className='text-[red] absolute right-[1%] top-[2%] flex '>
          {sections.map(({ section, objName }) => (
            <div
              role='presentation'
              className='relative flex flex-col items-center mx-3'
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}
              onClick={() => {
                clickSound.play()
                clicked.current = ref.current.getObjectByName(objName)
                setCurrentSection(section)
                // api.refresh(clicked.current).fit()
              }}>
              <div
                className={`font-mono text-base hover:text-white ${
                  currentSection === section ? 'text-red-500' : 'text-zinc-500'
                } hover:underline underline-offset-4 decoration-3`}>
                {section}
              </div>
            </div>
          ))}
        </div>
      </dom.In>
    </group>
  )
}

export default Cursor
