import { injected, walletconnect } from '../connectors'

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

export const connectorsByName: {
  [connectorName in ConnectorNames]: any
} = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}
