import { useSelector } from 'react-redux'
import { selectEditorState } from '../store'

export const DataInspector = () => {
  const editorState = useSelector(selectEditorState)
  return (
    <div className="fixed w-full bottom-0 left-0 bg-white z-10 px-4 py-1">
      <pre>{JSON.stringify(editorState.present.currentObjects?.[0]?.currentMatrix)}</pre>
    </div>
  )
}
