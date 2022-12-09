import { cloneElement, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { connectors } from './utils/connectors'

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false)
  const { active, activate } = useWeb3React()
  return (
    <>
      {cloneElement(children, { ready: clicked })}
      <div className={`fullscreen bg ready"} ${clicked && 'clicked'}`}>
        <div className="stack">
          Play Ping-Pong with the blockchain, <br /><br />Connect on a Blockchain with your MetaMask wallet <br />and a new ball will appear each time your wallet detect a new block. <br /><br />
          <a
            href="#"
            onClick={async () => {
              try {
                await activate(connectors.injected)
              } catch (error) {
                console.log('error', error)
              }
              active ? setClicked(true) : console.log('not active')
            }}
          >
            {'click to connect your wallet'}
          </a>
        </div>
      </div>
    </>
  )
}
