import Claim from 'components/Claim'
import Home from 'components/Home'
import StakeBearX from 'components/StakeBearX'
import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'

const Main: React.FC = () => {
  return (
    <div className="main">
      <Switch>
        {/* <Route path="/" component={Home} exact /> */}
        <Route path="/" component={StakeBearX} exact />
        {/* <Route path="/claim" component={Claim} exact /> */}
      </Switch>
    </div>
  )
}

export default Main
