import { Dispatch } from 'redux'
import { IBoxState } from './Box/types'
import { ISphereState } from './Sphere/types'

export type IObjectState = IBoxState | ISphereState

export interface IObjectBasicProps {
  id: string
  isSelected: boolean
  objectType: IObjectType
  currentLocalPosition: THREE.Vector3
  currentWorldPosition: THREE.Vector3
  currentWorldScale: THREE.Vector3
  currentLocalScale: THREE.Vector3
  currentWorldRotation: THREE.Euler
  currentLocalRotation: THREE.Euler
  currentMatrix?: THREE.Matrix4
  currentMatrixWorld?: THREE.Matrix4
  texture?: IObjectTexture
  castShadow?: boolean
  receiveShadow?: boolean
}

export interface IObjectControlProps {
  /**
   * [orbit] need to be passed down because some mouse controls on the object
   * need to pause the orbit control
   */
  orbit: React.MutableRefObject<any>
  /**
   * [dispatch] needs to be passed down because some models are created dynamically,
   * redux context might NOT be available for the hook when the hook gets initialized
   */
  dispatch: Dispatch
  /**
   * [currentTransformControlMode] need to be passed down because the transform control
   * needs to know the current control mode set outside of the object
   */
  transformControlMode: ITransformControlMode
}

export enum IObjectType {
  BOX = 'BOX',
  SPHERE = 'SPHERE',
}

export enum ITransformControlMode {
  TRANSLATE = 'translate',
  ROTATE = 'rotate',
  SCALE = 'scale',
}

export type ITransformValue = THREE.Vector3 | THREE.Euler
export interface IObjectTexture {
  src: string
  name: string
  key: string
}
