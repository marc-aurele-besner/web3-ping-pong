import { usePlane } from '@react-three/cannon'

import useBalls from 'states/balls'

const Plane: React.FC = () => {
  const removeBall = useBalls((state) => state.removeBall)
  usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    onCollide: (e) => {
      console.log('Ball ', e.contact.bi.blockNumber, ' has touched the ground')
      removeBall(e.contact.bi.blockNumber)
    }
  }))

  return null
}

export default Plane
