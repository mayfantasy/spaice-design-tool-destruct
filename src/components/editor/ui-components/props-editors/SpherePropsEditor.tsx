import { IBoxState } from '../../../3d-models/Box/types'
import { Matrix } from '../Matrix'
import { Position } from '../Position'
import { Rotation } from '../Rotation'
import * as THREE from 'three'
import { Scale } from '../Scale'
import { ObjectBasicPropsEditor } from './ObjectBasicPropsEditor'

interface IProps {
  object: IBoxState
}

export const SpherePropsEditor = (props: IProps) => {
  const { object: o } = props
  return (
    <div>
      <ObjectBasicPropsEditor object={o} />
    </div>
  )
}
