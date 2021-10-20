import { Signal } from '../signal'
import { floorPlanHandlers } from './handler'

export class FloorPlan {
  // ====================
  // Properties

  // Floor plan image src
  private _src?: string

  // Dimention in the scene
  private _width: number = 100
  private _height: number = 100

  // Whether to hide in the scene
  private _hidden: boolean = false

  // Floor plan image transparency
  // 0 - 1
  private _floorPlanImageTransparency: number = 1

  // Wall transparency on floor plan
  // 0 - 1
  private _wallTransparency: number = 0.8

  // ====================
  // Getters & Setters

  public getSrc(): string | undefined {
    return this._src
  }

  public setSrc(src: string): void {
    this._src = src
  }

  public getHidden(): boolean {
    return this._hidden
  }

  public setHidden(hidden: boolean) {
    this._hidden = hidden
  }
  public getWidth(): number {
    return this._width
  }

  public getHeight(): number {
    return this._height
  }

  public setDimention(width: number, height: number) {
    this._width = width
    this._height = height
  }
  public getFloorPlanImageTransparency(): boolean {
    return this._hidden
  }

  public setFloorPlanImageTransparency(opacity: number) {
    this._floorPlanImageTransparency = opacity
  }

  public getWallTransparency(): number {
    return this._wallTransparency
  }

  public setWallTransparency(opacity: number) {
    this._wallTransparency = opacity
  }

  // ====================
  // Events
  public uploadFloorPlanEvent: Signal<FloorPlan, string> = new Signal<FloorPlan, string>()
  public setFloorPlanImageTransparencyEvent: Signal<FloorPlan, number> = new Signal<FloorPlan, number>()

  // ====================
  // Actions
  public action1(data1: string, data2: number): void {
    this.uploadFloorPlanEvent.trigger(this, data1)
    this.setFloorPlanImageTransparencyEvent.trigger(this, data2)
  }
}
