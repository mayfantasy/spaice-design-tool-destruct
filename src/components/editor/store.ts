import { createSlice } from '@reduxjs/toolkit'
import { IStoreState } from '../../store'
import { ITransformControlMode } from '../3d-models/types'
import { editorReducer } from './reducer'
import { IEditorState } from './types'

export const SPLICE_NAME = 'editor'

export const editorInitialState: IEditorState = {
  currentObjects: [],
  currentSelectedObjectId: null,
  currentTransformControlMode: ITransformControlMode.TRANSLATE,
}

export const editorSlice = createSlice({
  name: SPLICE_NAME,
  initialState: editorInitialState,
  reducers: editorReducer,
})

export const selectEditorState = (state: IStoreState) => state.editorState
export const editorActionCreators = editorSlice.actions
