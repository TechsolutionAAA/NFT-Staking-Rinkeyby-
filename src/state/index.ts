import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import tokenReducer from './token/reducer'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    token: tokenReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => store.dispatch
export default store
