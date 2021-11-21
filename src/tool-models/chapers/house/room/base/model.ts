import { Pave } from '../../elements/pave/model'
import { Ceiling } from '../ceiling/model'
import { Floor } from '../floor/model'
import { ERoomTypes } from './type'

export class Room {
  id: string

  constructor(id: string) {
    this.id = id
  }
  roomType: ERoomTypes = ERoomTypes.DEFAULT
  isUnavailable: boolean = false
  floor?: Floor
  ceiling?: Ceiling
}
