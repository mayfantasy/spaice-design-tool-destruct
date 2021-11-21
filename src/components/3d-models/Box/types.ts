import { Matrix4, Vector3 } from '@react-three/fiber'

export interface IBoxState {
  id: string
  currentPosition: Vector3
  currentMatrix?: Matrix4
  currentMatrixWorld?: Matrix4
}
