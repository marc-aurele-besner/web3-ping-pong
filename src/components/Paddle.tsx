import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { proxy, useSnapshot } from 'valtio'
import clamp from 'lodash-es/clamp'

import Counter from './Counter'

const pingSound = '/sounds/ping.mp3'

const ping = new Audio(pingSound)
const state = proxy({
  count: 0,
  api: {
    pong(velocity) {
      ping.currentTime = 0
      ping.volume = clamp(velocity / 20, 0, 1)
      ping.play()
      if (velocity > 4) ++state.count
    },
    reset: () => (state.count = 0)
  }
})

const Paddle: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = useRef<any>()
  const { count } = useSnapshot(state)
  const { nodes, materials } = useGLTF('/pingpong.glb')
  const [ref, api] = useBox(() => ({ type: 'Kinematic', args: [3.4, 1, 3.5], onCollide: (e) => state.api.pong(e.contact.impactVelocity) }))
  useFrame((state) => {
    model.current.rotation.x = THREE.MathUtils.lerp(model.current.rotation.x, 0, 0.2)
    model.current.rotation.y = THREE.MathUtils.lerp(model.current.rotation.y, (state.mouse.x * Math.PI) / 5, 0.2)
    api.position.set(state.mouse.x * 10, state.mouse.y * 5, 0)
    api.rotation.set(0, 0, model.current.rotation.y)
  })
  return (
    <mesh ref={ref} dispose={null}>
      <group ref={model} position={[-0.05, 0.37, 0.3]} scale={0.15}>
        <Counter count={count} />
        <group rotation={[1.88, -0.35, 2.32]} scale={[2.97, 2.97, 2.97]}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone006} />
          <primitive object={nodes.Bone010} />
          <skinnedMesh castShadow receiveShadow material={materials.glove} material-roughness={1} geometry={nodes.arm.geometry} skeleton={nodes.arm.skeleton} />
        </group>
        <group rotation={[0, -0.04, 0]} scale={141.94}>
          <mesh castShadow receiveShadow material={materials.wood} geometry={nodes.mesh.geometry} />
          <mesh castShadow receiveShadow material={materials.side} geometry={nodes.mesh_1.geometry} />
          <mesh castShadow receiveShadow material={materials.foam} geometry={nodes.mesh_2.geometry} />
          <mesh castShadow receiveShadow material={materials.lower} geometry={nodes.mesh_3.geometry} />
          <mesh castShadow receiveShadow material={materials.upper} geometry={nodes.mesh_4.geometry} />
        </group>
      </group>
    </mesh>
  )
}

export default Paddle
