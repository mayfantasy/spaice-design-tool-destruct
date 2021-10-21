import { Product } from '../../../product/base/model'
import { Paint } from '../../elements/paint/model'
import { Pave } from '../../elements/pave/model'

export class Floor {
  pave?: Pave

  // A wall can only use either material or paint
  // If a wall uses material, it has a pave
  material?: Product
  paint?: Paint
}
