import { useSelector } from 'react-redux'
import { findObjectById } from '../../../../helpers/utils'
import { IObjectType, IObjectState } from '../../../3d-models/types'
import { selectEditorState } from '../../store'
import { BoxPropsEditor } from './BoxPropsEditor'
import { SpherePropsEditor } from './SpherePropsEditor'

interface IProps {
  object: IObjectState
}

export const PropertyBox = (props: IProps) => {
  const { object } = props

  let editor

  switch (object.objectType) {
    case IObjectType.BOX:
      editor = <BoxPropsEditor object={object} />
      break
    case IObjectType.SPHERE:
      editor = <SpherePropsEditor object={object} />
      break

    default:
      editor = <></>
      break
  }
  return (
    <div style={{ width: 350 }} className="fixed h-5/6 top-16 right-0 bg-white z-10 p-2">
      {editor}
    </div>
  )
}
