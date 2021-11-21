import { Product } from '../../../product/base/model'
import { PaintColor } from './type'

export class Paint {
  color: PaintColor
  material: Product
  constructor(color: PaintColor, material: Product) {
    this.color = color
    this.material = material
  }
}
