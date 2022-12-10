import { Text } from '@react-three/drei'

const Board = (props) => {
    return (
        <>
            <Text anchorX="center" anchorY="middle" rotation={[0, 0, 0]} position={[-6, 4, 3]} fontSize={0.5} children={'active balls ' + props.blocksActive + ''} />
            <Text anchorX="center" anchorY="middle" rotation={[0, 0, 0]} position={[6, 4, 3]} fontSize={0.4} children={props.ballsList} />
        </>
    )
}

export default Board