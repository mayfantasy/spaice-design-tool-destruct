import { useSelector, useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { Canvas } from './components/3d-models/Canvas'
import { Editor } from './components/editor'
import { Toolbar } from './components/editor/ui-components/Toolbar'
import { floorPlanActionCreators, selectFloorPlanState } from './tool-models/chapers/house/floor-plan/store'
import './App.css'
import { Editor2D } from './components/editor-2d/ui-components'

const App = () => {
  // const floorPlanState = useSelector(selectFloorPlanState)
  // const dispatch = useDispatch()

  return (
    <div className="App">
      {/* 3D Editor */}
      {/* <Editor /> */}

      {/* 2D Editor */}
      <Editor2D />
    </div>
  )
}

export default App
