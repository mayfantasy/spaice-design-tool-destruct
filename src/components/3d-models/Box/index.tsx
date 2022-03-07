import React, { useRef } from 'react'
import * as THREE from 'three'

import { IBoxState } from './types'

import { IObjectControlProps } from '../types'
import { TransformControlWrapper } from '../TransformControlWrapper'
import { loadTextureMap } from '../helpers/texture.helper'

interface IProps {
  state: IBoxState
  objectControlProps: IObjectControlProps
}

export const Box = (props: IProps) => {
  const { state, objectControlProps } = props

  // ====================
  // Object ref
  const geoRef = useRef<any>()

  // ====================
  // Texture loader
  const textureMap = loadTextureMap(state.texture)

  // ====================
  // Render
  return (
    <TransformControlWrapper
      geoRef={geoRef}
      geometry={(<boxGeometry ref={geoRef} args={[1, 1, 1]} />) as any}
      material={(<meshPhongMaterial map={textureMap} shininess={100} />) as any}
      objectControlProps={objectControlProps}
      object3DBasicProps={state}
    />
  )
}
