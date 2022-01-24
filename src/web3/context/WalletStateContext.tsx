import React, { createContext, useState } from 'react'
import { WalletState } from '../../types'

export const WalletStateContext = createContext<WalletState>({ walletConnected: false })

const WalletStateProvider: React.FC = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false)
  return (
    <WalletStateContext.Provider value={{ walletConnected, setWalletConnected }}>
      {children}
    </WalletStateContext.Provider>
  )
}
export { WalletStateProvider }
