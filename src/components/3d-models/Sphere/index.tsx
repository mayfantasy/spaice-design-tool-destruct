import React, { useRef } from 'react'
import * as THREE from 'three'

import { ISphereState } from './types'

import { IObjectControlProps } from '../types'
import { TransformControlWrapper } from '../TransformControlWrapper'
import { loadTextureMap } from '../helpers/texture.helper'

interface IProps {
  state: ISphereState
  objectControlProps: IObjectControlProps
}

export const Sphere = (props: IProps) => {
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
      geometry={(<sphereGeometry ref={geoRef} args={[0.5, 32, 16]} />) as any}
      material={(<meshPhongMaterial map={textureMap} shininess={100} />) as any}
      objectControlProps={objectControlProps}
      object3DBasicProps={state}
    />
  )
}
