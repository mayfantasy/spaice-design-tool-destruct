import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { StrictEffect } from '@redux-saga/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { editor2DActionCreators, editor2DSlice } from './store'
import { IStoreState } from '../../store'
import { IEditor2DState } from './types'
import {
  haveIntersection,
  intersectionToWallIntersection,
  lineToWall,
  splitLinesByIntersection,
  wallIntersectionToIntersection,
  wallToLine,
} from '../../helpers/utils-2d'
import { Dispatch } from 'redux'

function* detectAndSetWallIntersections(): Generator<StrictEffect, void> {
  const state = (yield select((state: IStoreState) => state.editor2DState.present)) as IEditor2DState
  const walls = state.walls
  const wallIntersections = state.wallIntersections

  const oldWalls = walls.slice(0, walls.length - 1)
  const newWall = walls[walls.length - 1]

  // console.log(oldWalls, newWall)

  for (const wall of oldWalls) {
    const newIntersection = haveIntersection(wall.line, newWall.line)

    if (newIntersection) {
      // Add wall intersection
      yield put(
        editor2DActionCreators.addNewWallIntersection({
          intersection: intersectionToWallIntersection(newIntersection),
        }),
      )
    }
  }
}

function* detectAndSplitWallsByIntersections(): Generator<StrictEffect, void> {
  yield put(editor2DActionCreators.splitWallsByWallIntersection())
}

export function* editor2DSaga() {
  yield takeEvery(editor2DSlice.actions.setWalls.type, detectAndSetWallIntersections)
  yield takeEvery(editor2DSlice.actions.addNewWallIntersection.type, detectAndSplitWallsByIntersections)
}
