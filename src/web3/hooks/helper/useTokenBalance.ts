import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { get } from 'lodash'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../../utils'
import { getRapsContract } from '../../utils/contractHelpers'
import { simpleRpcProvider } from '../../utils/providers'
import { BIG_ZERO } from '../../utils/bigNumber'

import useActiveWeb3React from '../useActiveWeb3React'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

// export const useTotalSupply = (address: string | undefined, ABI: any, withSignerIfPossible = true) => {
//   const [totalSupply, setTotalSupply] = useState<BigNumber>()
//   const { library, account } = useActiveWeb3React()
//
//   useEffect(() => {
//     async function fetchTotalSupply() {
//       try {
//         const contract = getRapsContract(address, library)
//         const ts = await contract.totalSupply()
//         setTotalSupply(ts)
//       } catch (e) {
//         console.log(e)
//       }
//     }
//
//     fetchTotalSupply()
//   }, [ABI, account, address, library, withSignerIfPossible])
//
//   return totalSupply
// }

export const getTotalSupply = async (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  try {
    const contract = getRapsContract(address, signer)
    const ts = await contract.totalSupply()
    return ts
  } catch (e) {
    return null
  }
}

// export const useTokenName = (address: string | undefined, ABI: any, withSignerIfPossible = true) => {
//   const [tokenName, setTokenName] = useState<string>('')
//   const { library, account } = useActiveWeb3React()
//
//   useEffect(() => {
//     async function fetchTotalSupply() {
//       try {
//         const contract = getRapsContract(address, library)
//         const nm = await contract.name()
//         setTokenName(nm)
//       } catch (e) {
//         console.log(e)
//       }
//     }
//
//     fetchTotalSupply()
//   }, [ABI, account, address, library, withSignerIfPossible])
//
//   return tokenName
// }

export const getTokenName = async (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  try {
    const contract = getRapsContract(address, signer)
    const nm = await contract.name()
    return nm
  } catch (e) {
    return null
  }
}

// export const useMaxToken = (address: string | undefined, ABI: any, withSignerIfPossible = true) => {
//   const [maxToken, setMaxToken] = useState<BigNumber>()
//   const { library, account } = useActiveWeb3React()
//
//   useEffect(() => {
//     async function fetchTotalSupply() {
//       try {
//         const contract = getRapsContract(address, library)
//         const mr = await contract.MAX_RAPS()
//         setMaxToken(mr)
//       } catch (e) {
//         console.log(e)
//       }
//     }
//
//     fetchTotalSupply()
//   }, [ABI, account, address, library, withSignerIfPossible])
//
//   return maxToken
// }

export const getMaxToken = async (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  try {
    const contract = getRapsContract(address)
    const mr = await contract.MAX_RAPS()
    return mr
  } catch (e) {
    return null
  }
}

export const getTokenPrice = async (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  try {
    const contract = getRapsContract(address)
    const rp = await contract.rapsPrice()
    return rp
  } catch (e) {
    return null
  }
}
