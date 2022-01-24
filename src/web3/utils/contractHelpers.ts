import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'
import rapsAbi from '../config/abi/BearX.json'

const getContract_ = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}
export const getContract = (address: string, abi: any, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract_(abi, address, signer)
}

export const getRapsContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract_(rapsAbi, address, signer)
}
