import { useSelector, useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { Canvas } from './components/3d-models/Canvas'
import { Editor } from './components/editor'
import { Toolbar } from './components/editor/ui-components/Toolbar'
import { floorPlanActionCreators, selectFloorPlanState } from './tool-models/chapers/house/floor-plan/store'
import './App.css'

const App = () => {
  // const floorPlanState = useSelector(selectFloorPlanState)
  // const dispatch = useDispatch()

  return (
    <div className="App">
      <Editor />
    </div>
  )
}

export default App
