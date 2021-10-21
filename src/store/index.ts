import { applyMiddleware, combineReducers, compose, createStore, Middleware, StoreEnhancer } from 'redux'
import { FloorPlan } from '../models/chapers/house/floor-plan/model'
import { floorPlanReducer } from '../models/chapers/house/floor-plan/reducer'
import { floorPlanInitialState, floorPlanSlice } from '../models/chapers/house/floor-plan/store'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../models/chapers/house/floor-plan/saga'
import undoable, { StateWithHistory } from 'redux-undo'
import { IFloorPlanState } from '../models/chapers/house/floor-plan/types'

const reducer = combineReducers({
  floorPlanState: undoable(floorPlanSlice.reducer),
})

const initialState = {
  floorPlanState: floorPlanInitialState as any as StateWithHistory<IFloorPlanState>,
}

export type IStoreState = typeof initialState

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Array<Middleware<any, any, any>> = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, composeWithDevTools()]
  const composedEnhancers: StoreEnhancer<any> = compose(...enhancers)

  const store = createStore(reducer, initialState, composedEnhancers)
  sagaMiddleware.run(mySaga)
  return store
}

export const store = configureStore()
