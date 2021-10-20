import { floorPlanHandlers } from "./handler";
import { FloorPlan } from "./model";

export class FloorPlanEventListener {
  constructor(floorPlan: FloorPlan) {
    floorPlan.uploadFloorPlanEvent.on(floorPlanHandlers.uploadFloorPlanHandler);
    floorPlan.setFloorPlanImageTransparencyEvent.on(
      floorPlanHandlers.setFloorPlanImageTransparencyHandler
    );
  }
}
