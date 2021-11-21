import { DoubleSide } from 'three'

export const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[20, 20]} />
    <meshPhongMaterial attach="material" color="white" side={DoubleSide} />
  </mesh>
)
