import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { IFloorPlanState, IToDo } from './types'

export const floorPlanReducer = {
  // Testing
  increment: (state: IFloorPlanState) => {
    state.meta = { ...state.meta, value: state.meta.value + 1 }
  },
  incrementByAmount: (state: IFloorPlanState, action: PayloadAction<number>) => {
    state.meta = { ...state.meta, value: state.meta.value + action.payload }
  },
  todoRequest: (state: IFloorPlanState, action: PayloadAction<number>) => {
    console.log(`requesting todo id: ${action.payload}`)
  },
  todoSucceeded: (state: IFloorPlanState, action: PayloadAction<IToDo>) => {
    console.log(action)
    state.meta = { ...state.meta, todo: action.payload }
  },
  todoFailed: (state: IFloorPlanState, action: PayloadAction<string>) => {
    console.log(action.payload)
  },

  // Action creators
  uploadFloorPlanImage: (state: IFloorPlanState, action: PayloadAction<number>) => {
    state.loading = true
    console.log('Uploading floor plan...')
  },
  uploadFloorPlanImageSucceeded: (state: IFloorPlanState, action: PayloadAction<string>) => {
    state.loading = false
    state.model = { ...state.model, src: action.payload }
  },
  uploadFloorPlanImageFailed: (state: IFloorPlanState, action: PayloadAction<string>) => {
    state.loading = false
    state.error = action.payload
  },
  updateWallTransparency: (state: IFloorPlanState, action: PayloadAction<number>) => {
    state.model = { ...state.model, wallTransparency: action.payload }
  },
  updateFloorPlanImageTransparency: (state: IFloorPlanState, action: PayloadAction<number>) => {
    state.model = { ...state.model, floorPlanImageTransparency: action.payload }
  },
}
