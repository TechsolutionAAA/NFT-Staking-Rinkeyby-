import { createAction } from '@reduxjs/toolkit'

export const updateTokenName = createAction<{ tokenName: string }>('token/updateTokenName')
export const updateTokenPrice = createAction<{ tokenPrice: string }>('token/updateTokenPrice')
export const updateTotalSupply = createAction<{ totalSupply: string }>('token/updateTotalSupply')
export const updateMaxToken = createAction<{ maxToken: string }>('token/updateMaxToken')
export const updateStake = createAction<{ staked: boolean }>('stake/updateStake')
