import { Vector2d } from 'konva/lib/types'

export enum IEditor2DToolType {
  WALL = 'WALL',
  ROOM = 'ROOM',
}

export interface IWall {
  id: string
  line: I2PointsLine
}

export interface IRoom {}
export interface IEditor2DState {
  currentSelectedTool: IEditor2DToolType | null
  walls: IWall[]
  wallIntersections: IWallIntersection[]
}
export interface I2PointsLine {
  id: string
  def: [number, number, number, number]
}
export type IPoint = { id: string; def: [number, number] }
export type IKonvaPoint = Vector2d
export interface IWallIntersection {
  id: string
  point: IPoint
  wall1: IWall
  wall2: IWall
}
export interface IIntersection {
  id: string
  point: IPoint
  line1: I2PointsLine
  line2: I2PointsLine
}
