export class FloorPlan {
  // Floor plan image src
  src?: string

  // Dimention in the scene
  width: number = 100
  height: number = 100

  // Whether to hide in the scene
  hidden: boolean = false

  // Floor plan image transparency
  // 0 - 1
  floorPlanImageTransparency: number = 1

  // Wall transparency on floor plan
  // 0 - 1
  wallTransparency: number = 0.8
}
