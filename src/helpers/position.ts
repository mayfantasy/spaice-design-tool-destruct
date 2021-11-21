import * as THREE from 'three'

export const getCurrentPosition = (object: THREE.Object3D) => {
  const position = new THREE.Vector3()
  position.setFromMatrixPosition(object.matrixWorld)
  return position
}
