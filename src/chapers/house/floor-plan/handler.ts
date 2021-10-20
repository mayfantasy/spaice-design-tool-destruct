import { ISignalHanlder } from '../../../helpers/signal'
import { FloorPlan } from './model'

interface IFloorPlanHandlers {
  uploadFloorPlanHandler: ISignalHanlder<FloorPlan, string>
  setFloorPlanImageTransparencyHandler: ISignalHanlder<FloorPlan, number>
}

const uploadFloorPlanHandler = (floorPlan: FloorPlan, message: string) => {
  console.log('uploadFloorPlan', message)
}
const setFloorPlanImageTransparencyHandler = (floorPlan: FloorPlan, v: number): void => {
  console.log('setFloorPlanImageTransparencyHandler', v)
  floorPlan.setWallTransparency(v)
}

export const floorPlanHandlers: IFloorPlanHandlers = {
  uploadFloorPlanHandler,
  setFloorPlanImageTransparencyHandler,
}
