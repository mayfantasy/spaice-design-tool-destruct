import { createSlice } from '@reduxjs/toolkit'
import { StateWithHistory } from 'redux-undo'
import { IStoreState } from '../../../../store'
import { FloorPlan } from './model'
import { floorPlanReducer } from './reducer'
import { IFloorPlanState } from './types'

export const SPLICE_NAME = 'floorPlan'

export const floorPlanInitialState: IFloorPlanState = {
  meta: { value: 1, todo: null },
  model: new FloorPlan(),
  loading: false,
  error: null,
}

export const floorPlanSlice = createSlice({
  name: SPLICE_NAME,
  initialState: floorPlanInitialState,
  reducers: floorPlanReducer,
})

export const selectFloorPlanState = (state: IStoreState) => state.floorPlanState
export const floorPlanActionCreators = floorPlanSlice.actions
