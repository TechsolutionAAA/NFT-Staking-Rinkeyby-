import React, { createContext } from 'react'
import { UnityContext } from 'react-unity-webgl'

const _mainGameContext = new UnityContext({
  loaderUrl: 'Game/MainGame/Build/Game.loader.js',
  dataUrl: 'Game/MainGame/Build/Game.data',
  frameworkUrl: 'Game/MainGame/Build/Game.framework.js',
  codeUrl: 'Game/MainGame/Build/Game.wasm',
})

const _mapGameContext = new UnityContext({
  loaderUrl: 'Game/Map/Build/ParcelLand.loader.js',
  dataUrl: 'Game/Map/Build/ParcelLand.data',
  frameworkUrl: 'Game/Map/Build/ParcelLand.framework.js',
  codeUrl: 'Game/Map/Build/ParcelLand.wasm',
})

export interface UnityContextState {
  mainGameContext: UnityContext
  mapGameContext: UnityContext
}

export const UnityGameContext = createContext<UnityContextState>({
  mainGameContext: _mainGameContext,
  mapGameContext: _mainGameContext,
})

const UnityGameContextProvider: React.FC = ({ children }) => {
  return (
    <UnityGameContext.Provider value={{ mainGameContext: _mainGameContext, mapGameContext: _mapGameContext }}>
      {children}
    </UnityGameContext.Provider>
  )
}

export { UnityGameContextProvider }
