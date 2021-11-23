import { IBoxState } from '../../../3d-models/Box/types'
import { Matrix } from '../Matrix'
import { Position } from '../Position'
import { Rotation } from '../Rotation'
import * as THREE from 'three'
import { Scale } from '../Scale'
import { Select, Checkbox } from 'antd'
import { IObjectTexture } from '../../../3d-models/types'
import { useDispatch, useSelector } from 'react-redux'
import { editorActionCreators, selectEditorState } from '../../store'
import { getTextureByKey, textures } from '../../../3d-models/helpers/texture.helper'
const { Option } = Select

interface IProps {
  object: IBoxState
}

export const ObjectBasicPropsEditor = (props: IProps) => {
  const { object: o } = props

  const dispatch = useDispatch()

  return (
    <div>
      <div className="mb-2">
        <span>Type: </span>
        <strong>{o.objectType}</strong>
      </div>

      <div className="mb-2">
        <span>ID: </span>
        <strong>{o.id}</strong>
      </div>

      <div className="mb-2">
        <Checkbox
          onChange={(e) => dispatch(editorActionCreators.setCastShadow({ id: o.id, castShadow: e.target.checked }))}
          checked={!!o.castShadow}
        >
          Cast Shadow?
        </Checkbox>
      </div>
      <div className="mb-2">
        <Checkbox
          onChange={(e) => dispatch(editorActionCreators.setReceiveShadow({ id: o.id, receiveShadow: e.target.checked }))}
          checked={!!o.receiveShadow}
        >
          Receive Shadow?
        </Checkbox>
      </div>

      <div className="mb-2">
        <span>Texture: </span>
        <Select
          value={o.texture?.key || ''}
          onChange={(v: string) => {
            const foundTexture = getTextureByKey(v)
            if (foundTexture) {
              dispatch(editorActionCreators.setTexture({ id: o.id, texture: foundTexture }))
            }
          }}
        >
          <Option value="">Select</Option>
          {textures.map((t) => (
            <Option key={t.key} value={t.key}>
              {t.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-2">
        <span>Global Position: </span>
        <strong>
          <Position position={o.currentWorldPosition} />
        </strong>
      </div>

      <div className="mb-2">
        <span>Global Rotation: </span>
        <strong>
          <Rotation rotation={o.currentWorldRotation} />
        </strong>
      </div>

      <div className="mb-2">
        <span>Global Scale: </span>
        <strong>
          <Scale scale={o.currentWorldScale} />
        </strong>
      </div>

      {o.currentMatrixWorld && (
        <div className="mb-2">
          <span>Matrix World: </span>
          <strong>
            <Matrix matrix={o.currentMatrixWorld} />
          </strong>
        </div>
      )}
    </div>
  )
}
