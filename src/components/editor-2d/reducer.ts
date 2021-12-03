import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { lineToWall, splitLinesByIntersection, wallIntersectionToIntersection, wallToLine } from '../../helpers/utils-2d'
import { findObjectById, findObjectByIdAndReplaceProperty, setPropertyForAllObjects } from '../../helpers/utils-3d'
import { IBoxState } from '../3d-models/Box/types'
import { ISphereState } from '../3d-models/Sphere/types'
import { IObjectType, IObjectState, ITransformControlMode, ITransformValue, IObjectTexture } from '../3d-models/types'
import { IEditor2DState, IEditor2DToolType, IWall, IWallIntersection } from './types'

export const editor2DReducer = {
  selectCurrentTool: (state: IEditor2DState, action: PayloadAction<{ toolType: IEditor2DToolType | null }>) => {
    state.currentSelectedTool = action.payload.toolType
  },
  setWalls: (state: IEditor2DState, action: PayloadAction<{ walls: IWall[] }>) => {
    setWalls(state, action.payload)
  },
  splitWallsByWallIntersection: (state: IEditor2DState) => {
    const newWallIntersection = state.wallIntersections[state.wallIntersections.length - 1]
    setWalls(state, {
      walls: splitLinesByIntersection(state.walls.map(wallToLine), wallIntersectionToIntersection(newWallIntersection)).map(lineToWall),
    })
  },
  addNewWallIntersection: (state: IEditor2DState, action: PayloadAction<{ intersection: IWallIntersection }>) => {
    const intersections = state.wallIntersections
    intersections.push(action.payload.intersection)
    state.wallIntersections = intersections
  },
  setWallIntersections: (state: IEditor2DState, action: PayloadAction<{ intersections: IWallIntersection[] }>) => {
    state.wallIntersections = action.payload.intersections
  },
}

// ===========
// Redcuer helpers
const setWalls = (state: IEditor2DState, payload: { walls: IWall[] }) => {
  state.walls = payload.walls
}
