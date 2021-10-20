export type IViewMode = '2D' | '3D'
export type I3dModeDisplayView = 'front' | 'left' | 'right' | 'back' | 'top' | 'perspective'
export type I3dModeDrawingView = 'material_only' | 'wireframe_only' | 'wireframe_and_material' | 'transparent_wireframe_only'

export type IGlobalUnitOfMeasurement = 'mm' | 'feet' | 'inch'

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
