export enum EViewMode {
  TWO_D = 'TWO_D',
  THREE_D = 'THREE_D',
}
export enum E3dModeDisplayView {
  FRONT = 'FRONT',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BACK = 'BACK',
  TOP = 'TOP',
  PERSPECTIVE = 'PERSPECTIVE',
}
export enum E3dModeDrawingView {
  MATERIAL_ONLY = 'MATERIAL_ONLY',
  WIREFRAME_ONLY = 'WIREFRAME_ONLY',
  WIREFRAME_AND_MATERIAL = 'WIREFRAME_AND_MATERIAL',
  TRANSPARENT_WIREFRAME_ONLY = 'TRANSPARENT_WIREFRAME_ONLY',
}

export enum EGlobalUnitOfMeasurement {
  MM = 'MM',
  FEET = 'FEET',
  INCH = 'INCH',
}

export interface I2dModeMainViewportHiddenRule {
  roomName: boolean
  area: boolean
  innerRuler: boolean
  outerRuler: boolean
  nextFloor: boolean
}

export interface I3dModeMainViewportHiddenRule {
  outsideWall: boolean
  roomCell: boolean
  wholeHouse: boolean
  gridLine: boolean
}
