export class WallDivideBase {
  private id: string
  private length: number
  private width: number
  thick: number
  constructor(id: string, length: number, width: number, thick: number) {
    this.id = id
    this.length = length
    this.width = width
    this.thick = thick
  }
}
