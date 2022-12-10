import { Suspense } from 'react'
import { providers } from 'ethers'
import ReactDOM from 'react-dom/client'
import { Web3ReactProvider } from '@web3-react/core'

import './styles.css'
import App from './App'
import Intro from './Intro'

const getLibrary = (provider) => {
  const library = new providers.Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

const rootElement = document.getElementById('root') as HTMLDivElement
// @ts-ignore
const root = ReactDOM.createRoot(rootElement)

root.render(
  <Suspense fallback={null}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Intro>
        {/* @ts-ignore */}
        <App />
      </Intro>
    </Web3ReactProvider>
  </Suspense>
)
