import { ISignalHanlder } from '../signal'
import { FloorPlan } from './model'

interface IFloorPlanHandlers {
  uploadFloorPlanHandler: ISignalHanlder<FloorPlan, string>
  setFloorPlanImageTransparencyHandler: ISignalHanlder<FloorPlan, number>
}
export const floorPlanHandlers: IFloorPlanHandlers = {
  uploadFloorPlanHandler: (floorPlan: FloorPlan, message: string) => {
    console.log('uploadFloorPlan', message)
  },
  setFloorPlanImageTransparencyHandler: (floorPlan: FloorPlan, v: number): void => {
    console.log('setFloorPlanImageTransparencyHandler', v)
    floorPlan.setWallTransparency(v)
  },
}
