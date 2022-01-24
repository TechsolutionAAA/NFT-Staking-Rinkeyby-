import { useCallback, useState, useContext } from 'react'
import { NotificationManager } from 'react-notifications'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { ConnectorNames, connectorLocalStorageKey } from '@pancakeswap/uikit'
import { connectorsByName } from '../utils/web3React'
import { WalletStateContext } from '../context/WalletStateContext'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { walletConnected, setWalletConnected } = useContext(WalletStateContext)

  // const [connected, setConnected] = useState(true)
  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            // connected = false

            setWalletConnected(false)
            NotificationManager.warning('Switch to Rinkeby Test Network')
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError) {
              // connected = false
              setWalletConnected(false)
              NotificationManager.warning('Provider Error, No provider was found')
            } else if (error instanceof UserRejectedRequestErrorInjected) {
              // connected = false
              setWalletConnected(false)
              NotificationManager.warning('Authorization Error, Please authorize to access your account')
            } else {
              // connected = false
              // setWalletConnected(true)
              // NotificationManager.success('Connected Successfully')
            }
          }

          // if (!error) {
          //   setWalletConnected(true)
          //   NotificationManager.success('Connected Successfully')
          // }
        })
        //   .then((value) => {
        //   console.log(value, '===================')
        //   if (walletConnected) {
        //     NotificationManager.success('Connected Successfully')
        //     setWalletConnected(true)
        //     console.log(value, '------------------------------')
        //   }
        // })
      } else {
        NotificationManager.warning('Unable to find connector, The connector config is wrong')
      }
    },
    [activate, setWalletConnected],
  )

  const logout = useCallback(() => {
    // dispatch(profileClear())
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
