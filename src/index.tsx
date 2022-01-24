import React, { useMemo, ReactNode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import Providers from './Providers'
import 'style/Global.css'

ReactDOM.render(
  <>
    <Providers>
      <App />
    </Providers>
  </>,

  document.getElementById('root'),
)
