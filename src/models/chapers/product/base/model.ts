export class Product {
  id: string
  sku: string
  width: number
  height: number
  depth: number

  // IPosition = (x, y, z)
  position: any
  roomId?: string

  constructor(id: string, sku: string, width: number, height: number, depth: number, position: any, roomId: string) {
    this.id = id
    this.sku = sku
    this.width = width
    this.height = height
    this.depth = depth
    this.position = position
    this.roomId = roomId
  }
}
