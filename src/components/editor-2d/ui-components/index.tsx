import { Stage, Layer, Line, Text } from 'react-konva'
import React, { useState } from 'react'
import { SideMenu } from '../../menu'
import { useDispatch, useSelector } from 'react-redux'
import { editor2DActionCreators, selectEditor2DState } from '../store'
import { IEditor2DToolType } from '../types'
import { Grid } from '../../2d-models/Grid'

const SCALE_STEP = 0.01
const GRID_SIZE = 20

export const Editor2D = () => {
  const [isDrawing, setIsDrawing] = useState(false)

  // =================
  // Wall State
  const [wallStartPoint, setWallStartPoint] = useState<[number, number] | null>(null)
  const [wallEndPoint, setWallEndPoint] = useState<[number, number] | null>(null)
  const [walls, setWalls] = useState<Array<[number, number, number, number]> | []>([])

  // =================
  // Scale
  const [scale, setScale] = useState(1)

  // =================
  // Position
  const [currentMousePosition, setCurrentMousePosition] = useState<{ x: number; y: number }>()

  // =================
  // Store State
  const editor2DState = useSelector(selectEditor2DState)
  const currentSelectedTool = editor2DState.present.currentSelectedTool

  const dispatch = useDispatch()

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
      setWallEndPoint([pos.x, pos.y])
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
          setWallStartPoint([pos.x, pos.y])
        } else {
          if (wallStartPoint && wallEndPoint) {
            const newLine = [...wallStartPoint, ...wallEndPoint] as [number, number, number, number]
            setWalls([...walls, newLine])
          }

          // Continue drawing from endpoint
          setWallStartPoint(wallEndPoint)
        }
      } else if (currentSelectedTool === IEditor2DToolType.ROOM) {
        // Room
        if (!isDrawing) {
          setIsDrawing(true)
          setWallStartPoint([pos.x, pos.y])
        } else {
          if (wallStartPoint && wallEndPoint) {
            const x1y1x2y1 = [...wallStartPoint, wallEndPoint[0], wallStartPoint[1]] as [number, number, number, number]
            const x2y1x2y2 = [wallEndPoint[0], wallStartPoint[1], ...wallEndPoint] as [number, number, number, number]
            const x2y2x1y2 = [...wallEndPoint, wallStartPoint[0], wallEndPoint[1]] as [number, number, number, number]
            const x1y2x1y1 = [wallStartPoint[0], wallEndPoint[1], ...wallStartPoint] as [number, number, number, number]

            setWalls([...walls, x1y1x2y1, x2y1x2y2, x2y2x1y2, x1y2x1y1])
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
          <Text text="[0, 0]" x={0} y={0} />
          {/* <Text text="Just start drawing" x={window.innerWidth/2} y={window.innerHeight/2} /> */}
          {currentSelectedTool === IEditor2DToolType.WALL && wallStartPoint && wallEndPoint && (
            <Line
              points={[...wallStartPoint, ...wallEndPoint]}
              stroke="#df4b26"
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
                points={[...wallStartPoint, wallEndPoint[0], wallStartPoint[1]]}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[wallEndPoint[0], wallStartPoint[1], ...wallEndPoint]}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[...wallEndPoint, wallStartPoint[0], wallEndPoint[1]]}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
              <Line
                points={[wallStartPoint[0], wallEndPoint[1], ...wallStartPoint]}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                // globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                globalCompositeOperation="source-over"
              />
            </>
          )}
          {walls.map((l, i) => (
            <Line
              key={i}
              points={l}
              stroke="black"
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
