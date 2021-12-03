import randomstring from 'randomstring'

/**
 *
 * @returns A random string ID
 */
export const idGen = () => {
  return randomstring.generate()
}

export const objectIdGen = (type: IObjectTypes) => {
  return `${type}_${randomstring.generate()}`
}

export enum IObjectTypes {
  point_2d = 'point_2d',
  line_2d = 'line_2d',
  intersection_2d = 'intersection_2d',
  // ==================
  wall_2d = 'wall_2d',
  room_2d = 'room_2d',
  wall_intersection_2d = 'wall_intersection_2d',
}
