export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export type Login = (connectorId: ConnectorNames) => void
