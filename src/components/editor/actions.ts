import { Dispatch } from 'redux'
import { idGen } from '../../helpers/utils'
import { editorActionCreators } from './store'
import * as THREE from 'three'
import { ITransformControlMode, ITransformValue } from '../3d-models/types'

// =======================
// Add box object
export const onAddBox = (dispatch: Dispatch) => {
  const id = idGen()
  dispatch(
    editorActionCreators.addBoxObject({
      id,
      currentLocalPosition: new THREE.Vector3(0, 0, 0),
      currentWorldPosition: new THREE.Vector3(0, 0, 0),
      currentWorldScale: new THREE.Vector3(1, 1, 1),
      currentLocalScale: new THREE.Vector3(1, 1, 1),
      currentLocalRotation: new THREE.Euler(0, 0, 0, 'XYZ'),
      currentWorldRotation: new THREE.Euler(),
      isSelected: true,
    }),
  )
}
export const onAddSphere = (dispatch: Dispatch) => {
  const id = idGen()
  dispatch(
    editorActionCreators.addSphereObject({
      id,
      currentLocalPosition: new THREE.Vector3(0, 0, 0),
      currentWorldPosition: new THREE.Vector3(0, 0, 0),
      currentWorldScale: new THREE.Vector3(1, 1, 1),
      currentLocalScale: new THREE.Vector3(1, 1, 1),
      currentLocalRotation: new THREE.Euler(0, 0, 0, 'XYZ'),
      currentWorldRotation: new THREE.Euler(),
      isSelected: true,
    }),
  )
}

// =======================
// Select current object
export const selectCurrentObject = (dispatch: Dispatch, id: string) => {
  dispatch(editorActionCreators.selectCurrent({ id }))
}

// =======================
// Set current transform
export const setCurrentTransform = (
  dispatch: Dispatch,
  id: string,
  payload: {
    mode: ITransformControlMode
    localTransformValue: ITransformValue
    worldTransformValue: ITransformValue
    matrix: THREE.Matrix4
    matrixWorld: THREE.Matrix4
  },
) => {
  dispatch(editorActionCreators.setCurrentTransform({ id, ...payload }))
}

// =======================
// Deselect current object
export const deselectCurrentObject = (dispatch: Dispatch, id: string) => {
  dispatch(editorActionCreators.deselectCurrent({ id }))
}

// =======================
// Set transform control mode
export const setTransformControlMode = (dispatch: Dispatch, mode: ITransformControlMode) => {
  dispatch(editorActionCreators.setTransformControlMode({ mode }))
}
