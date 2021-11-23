import { TransformControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useControl } from 'react-three-gui'
import { useDispatch, useSelector } from 'react-redux'
import { editorActionCreators, selectEditorState } from '../../editor/store'
import { Dispatch } from 'redux'
import { IObjectBasicProps, IObjectControlProps, ITransformControlMode } from '../types'
import { getCurrentLocalTransformValue, getCurrentWorldTransformValue } from '../../../helpers/transform'
import { deselectCurrentObject, selectCurrentObject, setCurrentTransform } from '../../editor/actions'
import { BoxGeometryProps, BufferGeometryNode, MaterialNode } from '@react-three/fiber'

interface IProps {
  geoRef: React.MutableRefObject<any>
  geometry: BufferGeometryNode<any, any>
  material: MaterialNode<any, any>
  objectControlProps: IObjectControlProps
  object3DBasicProps: IObjectBasicProps
}
export const TransformControlWrapper = (props: IProps) => {
  const {
    geoRef,
    geometry,
    material,
    objectControlProps: { orbit, dispatch, transformControlMode },
    object3DBasicProps: {
      id,
      isSelected,
      currentLocalScale,
      currentWorldScale,
      currentLocalPosition,
      currentWorldPosition,
      currentLocalRotation,
      currentWorldRotation,
      castShadow,
      receiveShadow,
    },
  } = props

  // ====================
  // Object ref
  const meshRef = useRef<any>()

  // ====================
  // Transform control
  const transformControlRef = useRef<any>()

  // ====================
  // Disable Orbit control when transforming object
  useEffect(() => {
    if (transformControlRef.current) {
      const controls = transformControlRef.current
      controls.setMode(transformControlMode)
      const callback = (event: any) => (orbit.current.enabled = !event.value)
      controls.addEventListener('dragging-changed', callback)
      return () => controls.removeEventListener('dragging-changed', callback)
    }
  })
  // ====================
  // Update control mode
  useEffect(() => {
    if (transformControlRef.current) {
      transformControlRef.current.setMode(transformControlMode)
    }
  }, [transformControlMode])

  // ====================
  // Texture loader
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/wood.jpeg')
  texture.repeat.set(1, 3)
  texture.rotation = 0.3

  // ====================
  // Actions
  const onUpdateCurrentTransform = (mode: ITransformControlMode) => {
    const currentWorldTransformValue = getCurrentWorldTransformValue(meshRef.current, mode)
    const currentLocalTransformValue = getCurrentLocalTransformValue(meshRef.current, mode)
    const currentMatrix = meshRef.current.matrix
    const currentWorldMatrix = meshRef.current.matrixWorld
    setCurrentTransform(dispatch, id, {
      mode,
      localTransformValue: currentLocalTransformValue,
      worldTransformValue: currentWorldTransformValue,
      matrix: currentMatrix,
      matrixWorld: currentWorldMatrix,
    })
  }

  const onSelectCurrentSelection = () => {
    if (!isSelected) {
      selectCurrentObject(dispatch, id)
    }
  }

  // ====================
  // Mesh composition
  const mesh = (
    // The mesh is always using local transform (same as rotation)
    // and it's wrapper is always using world scale
    //
    // Wrappers:
    // 1. Selected: transform control
    // 2. Unselected: group
    <mesh
      ref={meshRef}
      scale={currentLocalScale}
      position={currentLocalPosition}
      rotation={currentLocalRotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      dispose={null}
      onClick={onSelectCurrentSelection}
    >
      {geometry}
      {material}
    </mesh>
  )

  // ====================
  // Outline
  const edges = new THREE.EdgesGeometry(geoRef.current)
  const lineSegments = (
    <lineSegments geometry={edges} renderOrder={100}>
      <lineBasicMaterial color="white" />
    </lineSegments>
  )

  // ====================
  // Render
  return (
    <>
      {isSelected ? (
        <TransformControls
          ref={transformControlRef}
          onMouseUp={() => onUpdateCurrentTransform(transformControlMode)}
          position={currentWorldPosition}
          rotation={currentWorldRotation}
          scale={currentWorldScale}
        >
          <>
            {mesh}
            {lineSegments}
          </>
        </TransformControls>
      ) : (
        <group position={currentWorldPosition} rotation={currentWorldRotation} scale={currentWorldScale}>
          {mesh}
        </group>
      )}
    </>
  )
}
