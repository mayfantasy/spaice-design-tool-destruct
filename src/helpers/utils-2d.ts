import { IPoint, I2PointsLine, IIntersection, IWall, IWallIntersection } from '../components/editor-2d/types'
import { IObjectTypes, objectIdGen } from './utils'
import _ from 'lodash'

/**
 * https://www.cnblogs.com/xpvincent/p/5208994.html
 * @param line1
 * @param line2
 * @returns
 */
export const haveIntersection = (line1: I2PointsLine, line2: I2PointsLine): IIntersection | undefined => {
  const {
    def: [ax, ay, bx, by],
  } = line1
  const {
    def: [cx, cy, dx, dy],
  } = line2

  /** 1 解线性方程组, 求线段交点. **/
  // 如果分母为0 则平行或共线, 不相交
  var denominator = (by - ay) * (dx - cx) - (ax - bx) * (cy - dy)
  if (denominator == 0) {
    return
  }

  // 线段所在直线的交点坐标 (x , y)
  var x = ((bx - ax) * (dx - cx) * (cy - ay) + (by - ay) * (dx - cx) * ax - (dy - cy) * (bx - ax) * cx) / denominator
  var y = -((by - ay) * (dy - cy) * (cx - ax) + (bx - ax) * (dy - cy) * ay - (dx - cx) * (by - ay) * cy) / denominator

  /** 2 判断交点是否在两条线段上 **/
  if (
    // 交点在线段1上
    (x - ax) * (x - bx) <= 0 &&
    (y - ay) * (y - by) <= 0 &&
    // 且交点也在线段2上
    (x - cx) * (x - dx) <= 0 &&
    (y - cy) * (y - dy) <= 0
  ) {
    // 返回交点p
    return {
      id: objectIdGen(IObjectTypes.intersection_2d),
      point: { id: objectIdGen(IObjectTypes.point_2d), def: [x, y] } as IPoint,
      line1,
      line2,
    }
  }
  //否则不相交
  return
}

/**
 *
 * @param lines
 * @param intersection
 * @returns
 */
export const splitLinesByIntersection = (lines: I2PointsLine[], intersection: IIntersection): I2PointsLine[] => {
  const { line1, line2 } = intersection

  const [x1, y1, _x1, _y1] = line1.def
  const [x2, y2, _x2, _y2] = line2.def
  const [x0, y0] = intersection.point.def

  let newLines = [...lines]

  if (!((x1 === x2 && y1 === y2) || (x1 === _x2 && y1 === _y2) || (_x1 === x2 && _y1 === y2) || (_x1 === _x2 && _y1 === _y2))) {
    // If the two lines are not start-end connected,
    // remove the two intersected lines
    newLines = newLines.filter((l) => l.id !== line1.id && l.id !== line2.id)
    // And add 4 New lines and return
    newLines = [
      ...newLines,
      { id: objectIdGen(IObjectTypes.line_2d), def: [x0, y0, x1, y1] } as I2PointsLine,
      { id: objectIdGen(IObjectTypes.line_2d), def: [x0, y0, _x1, _y1] } as I2PointsLine,
      { id: objectIdGen(IObjectTypes.line_2d), def: [x0, y0, x2, y2] } as I2PointsLine,
      { id: objectIdGen(IObjectTypes.line_2d), def: [x0, y0, _x2, _y2] } as I2PointsLine,
    ]
  }

  return newLines
}

/**
 *
 * @param line
 * @returns
 */
export const lineToWall = (line: I2PointsLine): IWall => {
  return {
    id: objectIdGen(IObjectTypes.wall_2d),
    line,
  }
}

/**
 *
 * @param intersection
 * @returns
 */
export const intersectionToWallIntersection = (intersection: IIntersection): IWallIntersection => {
  return {
    id: objectIdGen(IObjectTypes.wall_intersection_2d),
    point: intersection.point,
    wall1: lineToWall(intersection.line1),
    wall2: lineToWall(intersection.line2),
  }
}

export const wallToLine = (wall: IWall): I2PointsLine => {
  return wall.line
}

/**
 *
 * @param wallIntersection
 * @returns
 */
export const wallIntersectionToIntersection = (wallIntersection: IWallIntersection): IIntersection => {
  return {
    id: objectIdGen(IObjectTypes.intersection_2d),
    point: wallIntersection.point,
    line1: wallIntersection.wall1.line,
    line2: wallIntersection.wall2.line,
  }
}
