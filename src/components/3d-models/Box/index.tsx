import { Vector3 } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'
import { useDispatch } from 'react-redux'
import { editorActionCreators } from '../../editor/store'
import { IBoxState } from './types'
import { Dispatch } from 'redux'
import { IObjectControlProps } from '../types'
import { getCurrentPosition } from '../../../helpers/position'
import { Object3D } from 'three'

interface IProps {
  state: IBoxState
  objectControlProps: IObjectControlProps
}

export const Box = (props: IProps) => {
  const {
    state: boxState,
    objectControlProps: { orbit, dispatch },
  } = props

  // ====================
  // Object ref
  const meshRef = useRef<any>()

  // ====================
  // Transform control
  const transformControlRef = useRef<any>()
  const mode = useControl('mode', { type: 'select', items: ['translate'] })

  // ====================
  // Disable Orbit control when transforming object
  useEffect(() => {
    if (transformControlRef.current) {
      const controls = transformControlRef.current
      controls.setMode(mode)
      const callback = (event: any) => (orbit.current.enabled = !event.value)
      controls.addEventListener('dragging-changed', callback)
      return () => controls.removeEventListener('dragging-changed', callback)
    }
  })

  // ====================
  // Texture loader
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/wood.jpeg')
  texture.repeat.set(1, 3)
  texture.rotation = 0.3

  // ====================
  // Actions
  const onUpdateCurrentPosition = () => {
    console.log(meshRef.current.matrix, meshRef.current.matrixWorld)
    const currentPosition = getCurrentPosition(meshRef.current)
    dispatch(
      editorActionCreators.setCurrentPosition({
        id: boxState.id,
        position: currentPosition,
      }),
    )
  }

  // ====================
  // Render
  return (
    <>
      <TransformControls ref={transformControlRef} onMouseUp={() => onUpdateCurrentPosition()} position={boxState.currentPosition}>
        <mesh ref={meshRef} scale={1} castShadow rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial map={texture} shininess={100} />
        </mesh>
      </TransformControls>
    </>
  )
}
