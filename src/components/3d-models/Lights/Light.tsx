import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'

interface IProps {
  castShadow?: boolean
}

export const Light = (props: IProps) => {
  const { castShadow } = props
  const directionalLightMesh = useRef()
  useHelper(directionalLightMesh, DirectionalLightHelper, 1)
  return (
    <>
      {/* <ambientLight intensity={1} color="green" /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <hemisphereLight color="red" groundColor={new Color(24, 65, 0)} /> */}
      <directionalLight
        castShadow={castShadow}
        position={[0, 3, 3]}
        ref={directionalLightMesh}
        intensity={0.6}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
    </>
  )
}
