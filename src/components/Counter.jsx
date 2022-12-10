import { Text } from '@react-three/drei'

const Counter = (props) => {
    return (
        <Text anchorX="center" anchorY="middle" rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 0]} fontSize={10} children={props.count} />
    )
}

export default Counter