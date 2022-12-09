import { InjectedConnector } from '@web3-react/injected-connector/dist'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector/dist'
import { WalletLinkConnector } from '@web3-react/walletlink-connector/dist'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 100, 137, 80001]
})

const walletconnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'web3-react-demo'
})

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
}
