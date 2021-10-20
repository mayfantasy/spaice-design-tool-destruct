import { useSelector, useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { floorPlanActionCreators, selectFloorPlanState } from './chapers/house/floor-plan/store'

function App() {
  const floorPlanState = useSelector(selectFloorPlanState)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(floorPlanActionCreators.increment())}>Add 1</button>
        <button onClick={() => dispatch(floorPlanActionCreators.incrementByAmount(3))}>Add 3</button>
        <button onClick={() => dispatch(floorPlanActionCreators.updateWallTransparency(0.2))}>updateWallTransparency</button>
        <button onClick={() => dispatch(floorPlanActionCreators.todoRequest(1))}>Add 3</button>
      </div>
      <div>
        <button onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
        <button onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
      </div>
      <pre>{JSON.stringify(floorPlanState, null, 2)}</pre>
      {/* <button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>Add Async</button> */}
    </div>
  )
}

export default App
