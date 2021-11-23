import * as THREE from 'three'
import { ITransformControlMode, ITransformValue } from '../components/3d-models/types'

export const getCurrentWorldTransformValue = (object: THREE.Object3D, mode: ITransformControlMode): ITransformValue => {
  let transformTarget
  if (mode === ITransformControlMode.TRANSLATE) {
    transformTarget = new THREE.Vector3()
    transformTarget.setFromMatrixPosition(object.matrixWorld)
  } else if (mode === ITransformControlMode.SCALE) {
    transformTarget = new THREE.Vector3()
    transformTarget.setFromMatrixScale(object.matrixWorld)
  } else {
    transformTarget = new THREE.Euler()
    transformTarget.setFromRotationMatrix(object.matrixWorld)
  }

  return transformTarget
}

export const getCurrentLocalTransformValue = (object: THREE.Object3D, mode: ITransformControlMode): ITransformValue => {
  if (mode === ITransformControlMode.TRANSLATE) {
    return object.position
  } else if (mode === ITransformControlMode.SCALE) {
    return object.scale
  } else {
    return object.rotation
  }
}

// export const getCurrentWorldPosition = (object: THREE.Object3D) => {
//   const position = new THREE.Vector3()
//   position.setFromMatrixPosition(object.matrixWorld)
//   return position
// }

// export const getCurrentWorldScale = (object: THREE.Object3D) => {
//   const scale = new THREE.Vector3()
//   scale.setFromMatrixScale(object.matrixWorld)
//   return scale
// }

// export const getCurrentWorldRotation = (object: THREE.Object3D) => {
//   const rotation = new THREE.Euler()
//   rotation.setFromRotationMatrix(object.matrixWorld)
//   return rotation
// }
