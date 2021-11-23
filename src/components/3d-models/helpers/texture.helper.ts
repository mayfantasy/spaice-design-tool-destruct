import * as THREE from 'three'
import { IObjectTexture } from '../types'

export const textures: IObjectTexture[] = [
  {
    key: 'brick',
    name: 'Brick',
    src: '/textures/brick.jpg',
  },
  {
    key: 'dry',
    name: 'Dry',
    src: '/textures/dry.jpg',
  },
  {
    key: 'fabric',
    name: 'Fabric',
    src: '/textures/fabric.jpg',
  },
  {
    key: 'fur',
    name: 'Fur',
    src: '/textures/fur.jpg',
  },
  {
    key: 'lava',
    name: 'Lava',
    src: '/textures/lava.jpg',
  },
  {
    key: 'trunk',
    name: 'Trunk',
    src: '/textures/trunk.jpg',
  },
  {
    key: 'water',
    name: 'Water',
    src: '/textures/water.jpg',
  },
  {
    key: 'wood',
    name: 'Wood',
    src: '/textures/wood.jpeg',
  },
]

export const getTextureByKey = (key: string) => {
  return textures.find((t) => t.key === key)
}
export const loadTextureMap = (texture?: IObjectTexture) => {
  let textureMap

  if (texture) {
    const textureLoader = new THREE.TextureLoader()
    textureMap = textureLoader.load(texture.src)
    // textureMap.repeat.set(1, 3)
    // textureMap.rotation = 0.3
  }
  return textureMap
}
