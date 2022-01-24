import { ethers } from 'ethers'
import getRpcUrl from './getRpcUrl'

// kovan testnet
const RPC_URL = 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'

// mainnet
// const RPC_URL = 'https://mainnet.infura.io/v3/dd4cac4de4644261800a72aef91d7bce'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
