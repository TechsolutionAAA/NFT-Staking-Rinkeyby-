import React from 'react'
import { Link, Text } from '@pancakeswap/uikit'
// import { getBscScanLink } from 'utils'
import useActiveWeb3React from '../../web3/hooks/useActiveWeb3React'

import truncateHash from '../../web3/utils/truncateHash'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {
  const { chainId } = useActiveWeb3React()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash}
    </>
  )
}

export default DescriptionWithTx
