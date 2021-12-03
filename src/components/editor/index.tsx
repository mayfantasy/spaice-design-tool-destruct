import { useSelector } from 'react-redux'
import { findObjectById } from '../../helpers/utils-3d'
import { Canvas } from '../3d-models/Canvas'
import { selectEditorState } from './store'
import { DataInspector } from './ui-components/DataInspector'
import { PropertyBox } from './ui-components/props-editors'
import { Toolbar } from './ui-components/Toolbar'

export const Editor = () => {
  const editorState = useSelector(selectEditorState)
  const currentObjectList = editorState.present.currentObjects
  const currentObjectId = editorState.present.currentSelectedObjectId
  const currentObject = currentObjectId ? findObjectById(currentObjectList, currentObjectId) : null
  return (
    <div>
      <Toolbar />
      <Canvas />
      {currentObject && <PropertyBox object={currentObject} />}
      <DataInspector />
    </div>
  )
}
