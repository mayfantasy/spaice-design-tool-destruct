import { createSlice } from '@reduxjs/toolkit'
import { IStoreState } from '../../store'
import { editorReducer } from './reducer'
import { IEditorState } from './types'

export const SPLICE_NAME = 'editor'

export const editorInitialState: IEditorState = {
  currentObjects: [],
}

export const editorSlice = createSlice({
  name: SPLICE_NAME,
  initialState: editorInitialState,
  reducers: editorReducer,
})

export const selectEditorState = (state: IStoreState) => state.editorState
export const editorActionCreators = editorSlice.actions
