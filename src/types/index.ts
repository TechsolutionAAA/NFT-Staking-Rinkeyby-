export interface Time {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  start?: boolean
}

export interface WalletState {
  walletConnected?: boolean
  setWalletConnected?: (state: boolean) => void
}
