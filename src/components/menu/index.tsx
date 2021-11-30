import { useDispatch, useSelector } from 'react-redux'
import { editor2DActionCreators, selectEditor2DState } from '../editor-2d/store'
import { IEditor2DToolType } from '../editor-2d/types'

export const SideMenu = () => {
  const editor2DState = useSelector(selectEditor2DState)
  const dispatch = useDispatch()
  return (
    <div className="w-48 h-full bg-gray-200 fixed top-0 left-0 z-30">
      <div
        className="p-4 cursor-pointer border-black border-b-2"
        style={{
          backgroundColor: editor2DState.present.currentSelectedTool === IEditor2DToolType.WALL ? '#888' : 'transparent',
        }}
        onClick={() => dispatch(editor2DActionCreators.selectCurrentTool({ toolType: IEditor2DToolType.WALL }))}
      >
        Wall
      </div>

      <div
        className="p-4 cursor-pointer border-black border-b-2"
        style={{
          backgroundColor: editor2DState.present.currentSelectedTool === IEditor2DToolType.ROOM ? '#888' : 'transparent',
        }}
        onClick={() => dispatch(editor2DActionCreators.selectCurrentTool({ toolType: IEditor2DToolType.ROOM }))}
      >
        Room
      </div>
    </div>
  )
}
