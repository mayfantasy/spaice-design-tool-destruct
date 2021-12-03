import { put, takeEvery, all } from 'redux-saga/effects'
import { editor2DSaga } from '../components/editor-2d/saga'
import mySaga from '../tool-models/chapers/house/floor-plan/saga'

export function* rootSaga() {
  yield all([mySaga(), editor2DSaga()])
}
