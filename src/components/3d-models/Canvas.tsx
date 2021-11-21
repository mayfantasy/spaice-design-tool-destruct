import { Canvas as R3FCanvas } from '@react-three/fiber'
import { OrbitControls, Shadow } from '@react-three/drei'
import { useRef } from 'react'

import { Light } from './Lights/Light'
import { Box } from './Box'
import { Grid } from './Grid'
import { Plane } from './Plane'
import { useDispatch, useSelector } from 'react-redux'
import { selectEditorState } from '../editor/store'

export const Canvas = () => {
  // =================
  // Store
  const editorState = useSelector(selectEditorState)
  const dispatch = useDispatch()

  // =================
  // Orbit control ref
  const orbit = useRef<any>()

  // =================
  // Render
  return (
    <R3FCanvas
      camera={{ position: [5, 5, 5] }}
      shadows
      style={{ height: window.innerHeight, width: window.innerWidth, backgroundColor: 'black' }}
    >
      {/* Lights */}
      <Light castShadow />

      {editorState.present.currentObjects.map((o) => (
        <Box key={o.id} state={o} objectControlProps={{ orbit, dispatch }} />
      ))}

      {/* A plane that can receive shadows */}
      <Plane />

      {/* The grid */}
      <Grid />

      {/* Fog */}
      <fog attach="fog" args={['#041830', 5, 10]} />

      {/* Orbit control */}
      <OrbitControls ref={orbit} />

      {/* Shadow */}
      <Shadow
        color="black" // Color (default:black)
        colorStop={0} // First gradient-stop (default:0)
        opacity={0.5} // Alpha (default:0.5)
        fog={false} // Reacts to fog (default=false)
      />
    </R3FCanvas>
  )
}
