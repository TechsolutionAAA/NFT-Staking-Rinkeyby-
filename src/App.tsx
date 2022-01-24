import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NotificationContainer, NotificationManger } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'components/Navbar'
import Main from 'components/Main'
import Footer from 'components/Footer'

const App: React.FC = () => {
  return (
    <div className="root-container">
      <Router>
        <Navbar />
        <Main />
      </Router>
      <Footer />
      <NotificationContainer />
    </div>
  )
}

export default React.memo(App)
