import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { findObjectById, findObjectByIdAndReplaceProperty, setPropertyForAllObjects } from '../../helpers/utils-3d'
import { IBoxState } from '../3d-models/Box/types'
import { ISphereState } from '../3d-models/Sphere/types'
import { IObjectType, IObjectState, ITransformControlMode, ITransformValue, IObjectTexture } from '../3d-models/types'
import { IEditorState } from './types'

export const editorReducer = {
  // ==================
  // Add objects
  addBoxObject: (state: IEditorState, action: PayloadAction<Omit<IBoxState, 'objectType'>>) => {
    const newObject = { ...action.payload, objectType: IObjectType.BOX }

    addNewObject(state, newObject)
    deselectAllObjects(state)
    selectCurrentObject(state, newObject.id)
  },
  addSphereObject: (state: IEditorState, action: PayloadAction<Omit<ISphereState, 'objectType'>>) => {
    const newObject = { ...action.payload, objectType: IObjectType.SPHERE }

    addNewObject(state, newObject)
    deselectAllObjects(state)
    selectCurrentObject(state, newObject.id)
  },
  // ==================
  // Texture
  setTexture: (state: IEditorState, action: PayloadAction<{ id: string; texture: IObjectTexture }>) => {
    setTexture(state, action.payload.id, { texture: action.payload.texture })
  },
  // ==================
  // Shadow
  setCastShadow: (state: IEditorState, action: PayloadAction<{ id: string; castShadow: boolean }>) => {
    state.currentObjects = findObjectByIdAndReplaceProperty(
      state.currentObjects,
      action.payload.id,
      'castShadow',
      action.payload.castShadow,
    )
  },
  setReceiveShadow: (state: IEditorState, action: PayloadAction<{ id: string; receiveShadow: boolean }>) => {
    state.currentObjects = findObjectByIdAndReplaceProperty(
      state.currentObjects,
      action.payload.id,
      'receiveShadow',
      action.payload.receiveShadow,
    )
  },
  // ==================
  // Transform
  setCurrentTransform: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
      mode: ITransformControlMode
      localTransformValue: ITransformValue
      worldTransformValue: ITransformValue
      matrix: THREE.Matrix4
      matrixWorld: THREE.Matrix4
    }>,
  ) => {
    if (action.payload.mode === ITransformControlMode.TRANSLATE) {
      setCurrentLocalPosition(state, action.payload.id, { position: action.payload.localTransformValue as THREE.Vector3 })
      setCurrentWorldPosition(state, action.payload.id, { position: action.payload.worldTransformValue as THREE.Vector3 })
    } else if (action.payload.mode === ITransformControlMode.SCALE) {
      setCurrentLocalScale(state, action.payload.id, { scale: action.payload.localTransformValue as THREE.Vector3 })
      setCurrentWorldScale(state, action.payload.id, { scale: action.payload.worldTransformValue as THREE.Vector3 })
    } else {
      setCurrentLocalRotation(state, action.payload.id, { rotation: action.payload.localTransformValue as THREE.Euler })
      setCurrentWorldRotation(state, action.payload.id, { rotation: action.payload.worldTransformValue as THREE.Euler })
    }
    setCurrentMatrix(state, action.payload.id, { matrix: action.payload.matrix })
    setCurrentMatrixWorld(state, action.payload.id, { matrix: action.payload.matrixWorld })
  },

  // ==================
  // Select
  selectCurrent: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
    }>,
  ) => {
    // Deselect all
    deselectAllObjects(state)
    // Select current
    selectCurrentObject(state, action.payload.id)
  },
  deselectCurrent: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
    }>,
  ) => {
    deselectCurrentObject(state, action.payload.id)
  },
  deselectAllObjects: (state: IEditorState) => {
    deselectAllObjects(state)
  },
  // ==================
  // Update transform control mode
  setTransformControlMode: (
    state: IEditorState,
    action: PayloadAction<{
      mode: ITransformControlMode
    }>,
  ) => {
    state.currentTransformControlMode = action.payload.mode
  },
}

// ==============
// Reducer helpers
const addNewObject = (state: IEditorState, newObject: IObjectState) => {
  state.currentObjects = [...state.currentObjects, newObject]
}
const setTexture = (state: IEditorState, id: string, payload: { texture: IObjectTexture }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'texture', payload.texture)
}
const deselectAllObjects = (state: IEditorState) => {
  state.currentSelectedObjectId = null
  state.currentObjects = setPropertyForAllObjects(state.currentObjects, 'isSelected', false)
}
const selectCurrentObject = (state: IEditorState, id: string) => {
  state.currentSelectedObjectId = id
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'isSelected', true)
}
const deselectCurrentObject = (state: IEditorState, id: string) => {
  state.currentSelectedObjectId = null
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'isSelected', false)
}
const setCurrentMatrix = (state: IEditorState, id: string, payload: { matrix: THREE.Matrix4 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentMatrix', payload.matrix)
}
const setCurrentMatrixWorld = (state: IEditorState, id: string, payload: { matrix: THREE.Matrix4 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentMatrixWorld', payload.matrix)
}
const setCurrentLocalPosition = (state: IEditorState, id: string, payload: { position: THREE.Vector3 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentLocalPosition', payload.position)
}
const setCurrentWorldPosition = (state: IEditorState, id: string, payload: { position: THREE.Vector3 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentWorldPosition', payload.position)
}
const setCurrentLocalScale = (state: IEditorState, id: string, payload: { scale: THREE.Vector3 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentLocalScale', payload.scale)
}
const setCurrentWorldScale = (state: IEditorState, id: string, payload: { scale: THREE.Vector3 }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentWorldScale', payload.scale)
}
const setCurrentLocalRotation = (state: IEditorState, id: string, payload: { rotation: THREE.Euler }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentLocalRotation', payload.rotation)
}
const setCurrentWorldRotation = (state: IEditorState, id: string, payload: { rotation: THREE.Euler }) => {
  state.currentObjects = findObjectByIdAndReplaceProperty(state.currentObjects, id, 'currentWorldRotation', payload.rotation)
}
