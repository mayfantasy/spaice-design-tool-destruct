import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { findObjectById, findObjectByIdAndReplaceProperty, setPropertyForAllObjects } from '../../helpers/utils'
import { IBoxState } from '../3d-models/Box/types'
import { ISphereState } from '../3d-models/Sphere/types'
import { IObjectType, IObjectState, ITransformControlMode, ITransformValue, IObjectTexture } from '../3d-models/types'
import { IEditor2DState, IEditor2DToolType } from './types'

export const editor2DReducer = {
  selectCurrentTool: (state: IEditor2DState, action: PayloadAction<{ toolType: IEditor2DToolType | null }>) => {
    state.currentSelectedTool = action.payload.toolType
  },
}
