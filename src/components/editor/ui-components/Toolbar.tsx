import { useDispatch, useSelector } from 'react-redux'
import { editorActionCreators, selectEditorState } from '../store'
import randomstring from 'randomstring'
import { Dropdown, Menu, Row, Col, Button, Space } from 'antd'
import { idGen } from '../../../helpers/utils'
import { ActionCreators } from 'redux-undo'
import { redo, undo } from '../../../store'
import * as THREE from 'three'
import { onAddBox, setTransformControlMode, onAddSphere } from '../actions'
import { ITransformControlMode } from '../../3d-models/types'
import _ from 'lodash'
const { Item } = Menu

export const Toolbar = () => {
  // ==================
  // Store
  const dispatch = useDispatch()
  const editorState = useSelector(selectEditorState)

  // ==================
  // Render
  return (
    <Row className="fixed w-full h-12 top-0 left-0 bg-white z-10 px-4 py-1" justify="space-between" align="middle">
      <Col>
        {/* Models */}
        <Dropdown
          className="mr-8"
          overlay={
            <Menu>
              <Item key="box" onClick={() => onAddBox(dispatch)}>
                Box
              </Item>
              <Item key="sphere" onClick={() => onAddSphere(dispatch)}>
                Sphere
              </Item>
            </Menu>
          }
        >
          <span className="cursor-pointer">Add</span>
        </Dropdown>
        <Dropdown
          overlay={
            <Menu>
              <Item
                key={ITransformControlMode.TRANSLATE}
                onClick={() => setTransformControlMode(dispatch, ITransformControlMode.TRANSLATE)}
              >
                Translate
              </Item>
              <Item key={ITransformControlMode.ROTATE} onClick={() => setTransformControlMode(dispatch, ITransformControlMode.ROTATE)}>
                Rotate
              </Item>
              <Item key={ITransformControlMode.SCALE} onClick={() => setTransformControlMode(dispatch, ITransformControlMode.SCALE)}>
                Scale
              </Item>
            </Menu>
          }
        >
          <span className="cursor-pointer">
            Mode: <strong>{_.startCase(editorState.present.currentTransformControlMode)}</strong>
          </span>
        </Dropdown>
      </Col>
      <Col>
        <Space>
          <Button onClick={() => dispatch(undo())} disabled={!editorState.past.length}>
            Undo
          </Button>
          <Button onClick={() => dispatch(redo())} disabled={!editorState.future.length}>
            Redo
          </Button>
        </Space>
      </Col>
    </Row>
  )
}
