import { WallDivideBase } from '../base/wall-divide-base'
import { Pave } from '../pave/model'

export class Wall extends WallDivideBase {
  constructor(id: string, length: number, width: number, thick: number) {
    super(id, length, width, thick)
  }

  isArc: boolean = false

  // Whether a wall has pave depends on
  // the material of the wall
  pave?: Pave
}
