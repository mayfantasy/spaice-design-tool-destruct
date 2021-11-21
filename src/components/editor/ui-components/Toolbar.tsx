import { useDispatch, useSelector } from 'react-redux'
import { editorActionCreators, selectEditorState } from '../store'
import randomstring from 'randomstring'
import { Dropdown, Menu, Row, Col, Button, Space } from 'antd'
import { idGen } from '../../../helpers/utils'
import { ActionCreators } from 'redux-undo'
import { redo, undo } from '../../../store'
import * as THREE from 'three'
const { Item } = Menu

export const Toolbar = () => {
  // ==================
  // Store
  const dispatch = useDispatch()
  const editorState = useSelector(selectEditorState)

  // ==================
  // Local state
  const onAddBox = () => {
    dispatch(
      editorActionCreators.addBoxObject({
        id: idGen(),
        currentPosition: new THREE.Vector3(0, 0, 0),
      }),
    )
  }

  // ==================
  // Render
  return (
    <div className="fixed w-full top-0 left-0 bg-white z-10 px-4 py-1">
      <Row justify="space-between" align="middle">
        <Col>
          {/* Models */}
          <Dropdown
            overlay={
              <Menu>
                <Item key="box" onClick={onAddBox}>
                  Box
                </Item>
              </Menu>
            }
          >
            <span className="cursor-pointer">Add</span>
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
    </div>
  )
}
