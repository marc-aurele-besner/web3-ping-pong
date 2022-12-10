import { useTexture } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'

const ballImg = '/textures/cross.jpg'

interface BallPros {
  blockNumber: number
}

const Ball: React.FC<BallPros> = ({ blockNumber }) => {
  const map = useTexture(ballImg)
  const randomHeight = Math.floor(Math.random() * 10) + 1
  // eslint-disable-next-line
  const [ref, api] = useSphere(() => ({ mass: 1, args: [0.5], position: [Math.floor(Math.random() * 10) - 5, randomHeight, 0] }))

  return (
    <mesh castShadow ref={ref} key={blockNumber} blockNumber={blockNumber}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  )
}

export default Ball
