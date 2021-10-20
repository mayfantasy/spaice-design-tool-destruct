import {
  IGlobalUnitOfMeasurement,
  I2dModeMainViewportHiddenRule,
  I3dModeMainViewportHiddenRule,
  IViewMode,
  I3dModeDisplayView,
  I3dModeDrawingView,
} from './types'

export class ScreenConfig {
  // The current floor number the viewport
  // is displaying
  currentFloorNumber: number = 1

  // Current main viewport mode
  //
  // Only chaper->house has 2D mode
  mainViewportViewMode: IViewMode = '2D'

  mainViewportZoom: number = 1

  chapterExpandableSectionCollapsed = false
  secondaryViewportSectionCollapsed = false
  propertyBoxSectionCollapsed = false

  // The global length unit
  globalUnitOfMeasurement: IGlobalUnitOfMeasurement = 'mm'

  // The hide / show options when viewport mode is 2D
  mode2dMainViewportHiddenRule: I2dModeMainViewportHiddenRule = {
    roomName: true,
    area: true,
    innerRuler: true,
    outerRuler: true,
    nextFloor: true,
  }

  // The hide / show options when viewport mode is 3D
  mode3dMainViewportHiddenRules: I3dModeMainViewportHiddenRule = {
    outsideWall: true,
    roomCell: true,
    wholeHouse: true,
    gridLine: true,
  }

  // In 3D mode, users can choose from what position
  // to view the scene
  mode3dDisplayView: I3dModeDisplayView = 'perspective'

  mode3dDrawingView: I3dModeDrawingView = 'wireframe_and_material'
  mode3dBirdViewOn = true
  mode3dSpaceSurveyingModeOn = false

  // In full screen mode, every section is hidden
  // except the top sticky toolbar and the bootom
  // sticky toolbar sections
  isFullScreenMode: boolean = false
}
