import { FloorPlanEventListener } from "./floor-plan/listener";
import { FloorPlan } from "./floor-plan/model";

export const run = () => {
  const f = new FloorPlan();
  new FloorPlanEventListener(f);

  f.action1("New floor plan image uploaded!", 0.4);
};
