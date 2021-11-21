import { Canvas } from '../3d-models/Canvas'
import { DataInspector } from './ui-components/DataInspector'
import { Toolbar } from './ui-components/Toolbar'

export const Editor = () => {
  return (
    <div>
      <Toolbar />
      <Canvas />
      <DataInspector />
    </div>
  )
}
