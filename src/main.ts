import { FloorPlanEventListener } from './chapers/house/floor-plan/listener'
import { FloorPlan } from './chapers/house/floor-plan/model'
import { SignalQueue } from './helpers/signal'

export const run = () => {
  const f = new FloorPlan()
  const signalQueue = new SignalQueue()
  new FloorPlanEventListener(f)

  f.action1('New floor plan image uploaded!', 0.4, signalQueue)
}
