import { IObjectState, ITransformControlMode } from '../3d-models/types'

export interface IEditorState {
  currentObjects: Array<IObjectState>
  currentSelectedObjectId: string | null
  currentTransformControlMode: ITransformControlMode
}
