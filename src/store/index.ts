import { applyMiddleware, combineReducers, compose, createStore, Middleware, StoreEnhancer } from 'redux'
import { FloorPlan } from '../tool-models/chapers/house/floor-plan/model'
import { floorPlanReducer } from '../tool-models/chapers/house/floor-plan/reducer'
import { floorPlanInitialState, floorPlanSlice } from '../tool-models/chapers/house/floor-plan/store'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../tool-models/chapers/house/floor-plan/saga'
import undoable, { ActionCreators, StateWithHistory } from 'redux-undo'
import { IFloorPlanState } from '../tool-models/chapers/house/floor-plan/types'
import { IEditorState } from '../components/editor/types'
import { editorInitialState, editorSlice } from '../components/editor/store'
import { editor2DInitialState, editor2DSlice } from '../components/editor-2d/store'
import { IEditor2DState } from '../components/editor-2d/types'
import { rootSaga } from './saga'

const reducer = combineReducers({
  floorPlanState: undoable(floorPlanSlice.reducer),
  editorState: undoable(editorSlice.reducer),
  editor2DState: undoable(editor2DSlice.reducer),
  // <=== New reducers add to here
})

const initialState = {
  floorPlanState: floorPlanInitialState as any as StateWithHistory<IFloorPlanState>,
  editorState: editorInitialState as any as StateWithHistory<IEditorState>,
  editor2DState: editor2DInitialState as any as StateWithHistory<IEditor2DState>,
  // <=== New slice states add to here
}

export type IStoreState = typeof initialState

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Array<Middleware<any, any, any>> = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, composeWithDevTools()]
  const composedEnhancers: StoreEnhancer<any> = compose(...enhancers)

  const store = createStore(reducer, initialState, composedEnhancers)
  sagaMiddleware.run(rootSaga)
  return store
}

export const store = configureStore()

export const undo = () => ActionCreators.undo()
export const redo = () => ActionCreators.redo()
