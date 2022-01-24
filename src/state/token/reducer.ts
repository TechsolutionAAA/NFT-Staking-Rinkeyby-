import { createReducer } from '@reduxjs/toolkit'
import { updateMaxToken, updateTokenName, updateTokenPrice, updateTotalSupply, updateStake } from './actions'

export interface TokenState {
  tokenName?: string
  tokenPrice?: string
  totalSupply?: string
  maxToken?: string
  staked?: boolean
}

export const initialState: TokenState = {
  tokenName: 'raps',
  tokenPrice: '0',
  totalSupply: '0',
  maxToken: '0',
  staked: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTokenName, (state, action) => {
      return {
        ...state,
        tokenName: action.payload?.toString() ?? 'Raps',
      }
    })
    .addCase(updateTokenPrice, (state, action) => {
      // state.tokenPrice = action.payload.tokenPrice

      return {
        ...state,
        tokenPrice: action.payload?.toString() ?? '0',
      }
    })
    .addCase(updateTotalSupply, (state, action) => {
      // state.totalSupply = action.payload.totalSupply

      return {
        ...state,
        totalSupply: action.payload?.toString() ?? '0',
      }
    })
    .addCase(updateMaxToken, (state, action) => {
      // state.maxToken = action.payload.maxToken

      return {
        ...state,
        maxToken: action.payload?.toString() ?? '0',
      }
    })
    .addCase(updateStake, (state, action) => {
      return {
        ...state,
        staked: !state.staked,
      }
    }),
)
