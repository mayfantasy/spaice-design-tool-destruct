import { createSlice } from '@reduxjs/toolkit'
import { IStoreState } from '../../store'
import { editor2DReducer } from './reducer'
import { IEditor2DState, IEditor2DToolType } from './types'

export const SPLICE_NAME = 'editor-2d'

export const editor2DInitialState: IEditor2DState = {
  currentSelectedTool: null,
}

export const editor2DSlice = createSlice({
  name: SPLICE_NAME,
  initialState: editor2DInitialState,
  reducers: editor2DReducer,
})

export const selectEditor2DState = (state: IStoreState) => state.editor2DState
export const editor2DActionCreators = editor2DSlice.actions
