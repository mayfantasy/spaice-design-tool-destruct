import { AnyAction } from 'redux'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { floorPlanRequests } from './requests'
import { StrictEffect } from '@redux-saga/types'
import { floorPlanActionCreators, floorPlanSlice } from './store'
import { IToDo } from './types'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodo(action: AnyAction): Generator<StrictEffect, void> {
  try {
    const todo = yield call(floorPlanRequests.fetchTodoRequest, action.payload as number)
    yield put(floorPlanActionCreators.todoSucceeded(todo as IToDo))
  } catch (e) {
    yield put(floorPlanActionCreators.todoFailed('Error eeeee ee e e e eee '))
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery(floorPlanSlice.actions.todoRequest.type, fetchTodo)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga(): Generator<StrictEffect, void> {
//   yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
// }

export default mySaga
