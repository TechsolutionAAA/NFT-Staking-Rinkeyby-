import React, { createContext, useState } from 'react'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'web3/utils/web3React'
import { UnityGameContextProvider } from 'web3/context/UnityGameContextProvider'
import { ToastsProvider } from './web3/context/ToastContext'
import { Time } from './types'
import { WalletStateProvider } from './web3/context/WalletStateContext'
import store from './state'

interface ContextProps {
  ttime?: Time
  started?: boolean
  setStarted?: (state: boolean) => void
}

export const TimeContext = createContext<ContextProps>({})
const endTime: Time = {
  days: 11,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

const TimeProvider: React.FC = ({ children }) => {
  const [started, setStarted] = useState(false)

  const cd = convertTZ(new Date(), 'America/New_York')

  // You can set the starting time here
  const ed = new Date(2021, 8, 11, 0, 0, 0, 0)

  const bd = new Date(ed.getTime() - cd.getTime())
  const [ttime, setTtime] = useState({
    days: bd.getDate(),
    hours: bd.getHours(),
    minutes: bd.getMinutes(),
    seconds: bd.getSeconds(),
  })

  return <TimeContext.Provider value={{ ttime, started, setStarted }}>{children}</TimeContext.Provider>
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <WalletStateProvider>
            <UnityGameContextProvider>
              <TimeProvider>{children}</TimeProvider>
            </UnityGameContextProvider>
          </WalletStateProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}
export default Providers
