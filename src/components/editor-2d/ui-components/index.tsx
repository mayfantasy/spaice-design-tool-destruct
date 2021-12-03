import { Stage, Layer, Line, Text } from 'react-konva'
import React, { useEffect, useState } from 'react'
import { SideMenu } from '../../menu'
import { useDispatch, useSelector } from 'react-redux'
import { editor2DActionCreators, selectEditor2DState } from '../store'
import { IEditor2DToolType, IKonvaPoint, I2PointsLine, IPoint } from '../types'
import { Grid } from '../../2d-models/Grid'
import { haveIntersection, intersectionToWallIntersection, lineToWall, splitLinesByIntersection } from '../../../helpers/utils-2d'
import { idGen, IObjectTypes, objectIdGen } from '../../../helpers/utils'

const SCALE_STEP = 0.01
const ACTIVE_COLOR = 'red'
const DEFAULT_COLOR = 'black'

export const Editor2D = () => {
  const [isDrawing, setIsDrawing] = useState(false)

  // =================
  // Store State
  const editor2DState = useSelector(selectEditor2DState)
  const walls = editor2DState.present.walls
  const wallIntersections = editor2DState.present.wallIntersections
  const currentSelectedTool = editor2DState.present.currentSelectedTool

  const dispatch = useDispatch()

  // =================
  // Wall State
  const [wallStartPoint, setWallStartPoint] = useState<IPoint | null>(null)
  const [wallEndPoint, setWallEndPoint] = useState<IPoint | null>(null)

  // =================
  // Scale
  const [scale, setScale] = useState(1)

  // =================
  // Position
  const [currentMousePosition, setCurrentMousePosition] = useState<IKonvaPoint>()

  // =================
  // Handlers
  const handleMouseMove = (e: any) => {
    {
      const pos = e.target.getStage().getRelativePointerPosition()
      setCurrentMousePosition(pos)
    }
    if (!isDrawing) {
      return
    }
    if (currentSelectedTool) {
      const stage = e.target.getStage()
      const pos = stage.getRelativePointerPosition()
      setWallEndPoint({ id: objectIdGen(IObjectTypes.point_2d), def: [pos.x, pos.y] })
    }
  }

  // e.evt.button === 0 <-- Left click
  // e.evt.button === 2 <-- Right click
  const handleClick = (e: any) => {
    if (e.evt.button === 0 && currentSelectedTool) {
      const pos = e.target.getStage().getRelativePointerPosition()
      if (currentSelectedTool === IEditor2DToolType.WALL) {
        // Wall
        if (!isDrawing) {
          setIsDrawing(true)
          setWallStartPoint({ id: objectIdGen(IObjectTypes.point_2d), def: [pos.x, pos.y] })
        } else {
          if (wallStartPoint && wallEndPoint) {
            const newLine: I2PointsLine = { id: objectIdGen(IObjectTypes.line_2d), def: [...wallStartPoint.def, ...wallEndPoint.def] }
            dispatch(editor2DActionCreators.setWalls({ walls: [...walls, lineToWall(newLine)] }))
          }

          // Continue drawing from endpoint
          setWallStartPoint(wallEndPoint)
        }
      } else if (currentSelectedTool === IEditor2DToolType.ROOM) {
        // Room
        if (!isDrawing) {
          setIsDrawing(true)
          setWallStartPoint({ id: objectIdGen(IObjectTypes.point_2d), def: [pos.x, pos.y] })
        } else {
          if (wallStartPoint && wallEndPoint) {
            const x1y1x2y1: I2PointsLine = {
              id: objectIdGen(IObjectTypes.line_2d),
              def: [...wallStartPoint.def, wallEndPoint.def[0], wallStartPoint.def[1]],
            } as I2PointsLine
            const x2y1x2y2: I2PointsLine = {
              id: objectIdGen(IObjectTypes.line_2d),
              def: [wallEndPoint.def[0], wallStartPoint.def[1], ...wallEndPoint.def],
            } as I2PointsLine
            const x2y2x1y2: I2PointsLine = {
              id: objectIdGen(IObjectTypes.line_2d),
              def: [...wallEndPoint.def, wallStartPoint.def[0], wallEndPoint.def[1]],
            } as I2PointsLine
            const x1y2x1y1: I2PointsLine = {
              id: objectIdGen(IObjectTypes.line_2d),
              def: [wallStartPoint.def[0], wallEndPoint.def[1], ...wallStartPoint.def],
            } as I2PointsLine
            dispatch(
              editor2DActionCreators.setWalls({
                walls: [...walls, lineToWall(x1y1x2y1), lineToWall(x2y1x2y2), lineToWall(x2y2x1y2), lineToWall(x1y2x1y1)],
              }),
            )
          }

          setIsDrawing(false)
          setWallStartPoint(null)
          setWallEndPoint(null)
        }
      }
    }
  }

  const handleRightClick = (e: any) => {
    e.evt.preventDefault()
    if (e.evt.button === 2) {
      if (isDrawing) {
        setIsDrawing(false)
        setWallStartPoint(null)
        setWallEndPoint(null)
      } else {
        dispatch(editor2DActionCreators.selectCurrentTool({ toolType: null }))
      }
    }
  }

  const handleWheel = (e: any) => {
    e.evt.preventDefault()

    let delta = 0

    if (e.evt.deltaY < 0 && scale < 2.99) {
      delta = SCALE_STEP
    } else if (e.evt.deltaY > 0 && scale > 0.05) {
      delta = -SCALE_STEP
    }
    const currentScale = scale + delta
    setScale(currentScale)

    const stage = e.target.getStage()
    const oldScale = stage.scaleX()

    // Need to use getRelativePointerPosition otherwise
    // the position will be scaled
    const pos = stage.getRelativePointerPosition()

    const mousePointTo = {
      x: (pos.x - stage.x()) / oldScale,
      y: (pos.y - stage.y()) / oldScale,
    }

    // const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy
    const newScale = currentScale

    stage.scale({ x: newScale, y: newScale })

    const newPos = {
      x: pos.x - mousePointTo.x * newScale,
      y: pos.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
  }

  // =================
  // Render
  return (
    <div>
      <SideMenu />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        offset={{ x: -window.innerWidth / 2, y: -window.innerHeight / 2 }}
        onMousemove={handleMouseMove}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onWheel={handleWheel}
        draggable={true}
      >
        <Grid />
        <Layer>
          {currentMousePosition && (
            <Text text={JSON.stringify(currentMousePosition)} x={currentMousePosition.x + 10} y={currentMousePosition.y + 10} />
          )}
          {wallIntersections.map((wallIntersection) => (
            <Text
              key={wallIntersection.id}
              text={`[${wallIntersection.point.def[0].toFixed(4)}, ${wallIntersection.point.def[1].toFixed(4)}]`}
              x={wallIntersection.point.def[0]}
              y={wallIntersection.point.def[1]}
            />
          ))}
          <Text text="[0, 0]" x={0} y={0} />
          {/* <Text text="Just start drawing" x={window.innerWidth/2} y={window.innerHeight/2} /> */}
          {currentSelectedTool === IEditor2DToolType.WALL && wallStartPoint && wallEndPoint && (
            <Line
              points={[...wallStartPoint.def, ...wallEndPoint.def]}
              stroke={ACTIVE_COLOR}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              globalCompositeOperation="source-over"
            />
          )}
          {currentSelectedTool === IEditor2DToolType.ROOM && wallStartPoint && wallEndPoint && (
            <>
              <Line
                points={[...wallStartPoint.def, wallEndPoint.def[0], wallStartPoint.def[1]]}
                stroke={ACTIVE_COLOR}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[wallEndPoint.def[0], wallStartPoint.def[1], ...wallEndPoint.def]}
                stroke={ACTIVE_COLOR}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[...wallEndPoint.def, wallStartPoint.def[0], wallEndPoint.def[1]]}
                stroke={ACTIVE_COLOR}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[wallStartPoint.def[0], wallEndPoint.def[1], ...wallStartPoint.def]}
                stroke={ACTIVE_COLOR}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
            </>
          )}
          <Text text={wallIntersections.length.toFixed(1)} x={50} y={50} />
          {/* Walls */}
          {walls.map((l) => (
            <Line
              onMouseEnter={(e) => {
                e.target.attrs.stroke = ACTIVE_COLOR
              }}
              onMouseLeave={(e) => (e.target.attrs.stroke = DEFAULT_COLOR)}
              key={l.id}
              points={l.line.def}
              stroke={DEFAULT_COLOR}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
