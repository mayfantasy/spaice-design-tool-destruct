import { EPavePosition, EPaveStyle } from './type'

export class Pave {
  // Whether floor or wall has pave style depends on the material:
  // Pave style only applies to Wood flooring products
  // and Vinyl flooring products
  paveStyle: EPaveStyle = EPaveStyle.THREE_SIX_NINE_PAVING

  // Whether has pave style depends on the material:
  // Pave style only applies to Wood flooring products
  // and Vinyl flooring products

  gapWidth: number = 0
  gapColor?: string

  paveStarting: EPavePosition = EPavePosition.LOWER_LEFT
  offsetWidth: number = 0
  offsetHeight: number = 0
  paveAngle: number = 0
}
