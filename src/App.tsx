import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useWeb3React } from '@web3-react/core'

import { Ball, Board, Paddle, Plane } from 'components'
import useBalls from 'states/balls'

interface AppProps {
  ready: boolean
}

const App: React.FC<AppProps> = ({ ready }) => {
  const { active, account, library } = useWeb3React()
  const balls = useBalls((state) => state.balls)
  const addBall = useBalls((state) => state.addBall)

  // Detect metamask
  try {
    const provider = library.getSigner(account).provider
    provider.on('block', (blockNumber) => {
      console.log('Block Number: ', blockNumber)
      // wait 1 second to add ball
      addBall(blockNumber)
    })
  } catch (error) {
    console.log('Metamask not detected')
  }

  const blocksActive = balls.filter((ball) => ball.blockNumber !== '0').length

  let ballsList = ''
  balls.map((ball) => (ballsList += 'BlockNumber: ' + ball.blockNumber + '\n'))

  // if (pendingBalls.length > 0 && balls.length < 2) addBallFromPending(pendingBalls[0].blockNumber)

  return (
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 75 }}>
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <spotLight position={[10, 10, 10]} angle={0.4} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />

      <Board
        blocksActive={blocksActive}
        ballsList={ballsList}
      />
      <Physics
        iterations={20}
        tolerance={0.0001}
        gravity={[0, -40, 0]}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: 0.7,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2
        }}
      >
        <mesh position={[0, 0, -10]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshPhongMaterial color="#374037" />
        </mesh>
        {ready && active && balls.length > 0 && balls.map((ball) => <Ball key={ball.blockNumber} blockNumber={ball.blockNumber} />)}
        <Plane />
        <Paddle />
      </Physics>
      <OrbitControls enableRotate={false} />
    </Canvas>
  )
}

export default App