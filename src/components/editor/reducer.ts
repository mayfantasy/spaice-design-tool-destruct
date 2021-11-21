import { Matrix4, Vector3 } from '@react-three/fiber'
import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { findByIdAndReplaceProperty } from '../../helpers/utils'
import { IBoxState } from '../3d-models/Box/types'
import { IEditorState } from './types'

export const editorReducer = {
  addBoxObject: (state: IEditorState, action: PayloadAction<IBoxState>) => {
    state.currentObjects = [...state.currentObjects, action.payload]
  },
  setCurrentPosition: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
      position: Vector3
    }>,
  ) => {
    state.currentObjects = findByIdAndReplaceProperty(state.currentObjects, action.payload.id, 'currentPosition', action.payload.position)
  },
  setCurrentMatrix: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
      matrix: Matrix4
    }>,
  ) => {
    state.currentObjects = findByIdAndReplaceProperty(state.currentObjects, action.payload.id, 'currentMatrix', action.payload.matrix)
  },
  setCurrentMatrixWorld: (
    state: IEditorState,
    action: PayloadAction<{
      id: string
      matrix: Matrix4
    }>,
  ) => {
    state.currentObjects = findByIdAndReplaceProperty(state.currentObjects, action.payload.id, 'currentMatrixWorld', action.payload.matrix)
  },
}
