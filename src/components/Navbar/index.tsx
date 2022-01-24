import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaDiscord } from 'react-icons/fa'
import { BsTwitter, BsMedium } from 'react-icons/bs'
import useAuth from 'web3/hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { WalletStateContext } from 'web3/context/WalletStateContext'
import { ConnectorNames } from '../../web3/types'
import OpenSeaIcon from '../../assets/imgs/opensea.png'
import LogoIcon from '../../assets/imgs/logo.png'
import './index.css'

const Navbar: React.FC = () => {
  const { account, library, chainId, activate, active, error } = useWeb3React()
  const { login, logout } = useAuth()
  const [connected, setConnected] = useState(false)
  // const { walletConnected, setWalletConnected } = useContext(WalletStateContext)
  useEffect(() => {
    // if (account) localStorage.setItem('connected', account)
    // if (localStorage.getItem('connected') !== account) login(ConnectorNames.Injected)
  })

  const launchResponsive = () => {
    document.getElementsByClassName('responsive-menu-bar')[0].setAttribute('style', 'right: 0%')
  }

  const closeResponsive = () => {
    document.getElementsByClassName('responsive-menu-bar')[0].setAttribute('style', 'right: -50%')
  }

  return (
    <div className="my_navbar_container">
      <div className="my_navbar_social">
        <div className="my_navbar_discord">
          <FaDiscord />
          <div className="font_color_white">Discord</div>
        </div>
        <div className="my_navbar_twitter">
          <BsTwitter />
          <div className="font_color_white">Twitter</div>
        </div>
        <div className="my_navbar_medium">
          <BsMedium />
          <div className="font_color_white">Medium</div>
        </div>
        <div className="my_navbar_medium">
          <img width={30} src={OpenSeaIcon} alt="OpenSea" />
          <div className="font_color_white">OpenSea</div>
        </div>
      </div>
      <div className="my_navbar">
        <div className="bearx_logo">
          <img src={LogoIcon} alt="bearx logo" />
        </div>
        <div className="responsive-menu-bar">
          <div className="bearx_logo responsive-logo">
            <img src={LogoIcon} alt="bearx logo" />
          </div>
          <NavLink to="/" onClick={closeResponsive}>
            <div className="nav_btn">Home</div>
          </NavLink>
          <NavLink to="/stake" onClick={closeResponsive}>
            <div className="nav_btn">BearX</div>
          </NavLink>
          <NavLink to="/lands" onClick={closeResponsive}>
            <div className="nav_btn">Lands</div>
          </NavLink>
          <NavLink to="/claim" onClick={closeResponsive}>
            <div className="nav_btn">Claim</div>
          </NavLink>
          <NavLink to="/whitepaper" onClick={closeResponsive}>
            <div className="nav_btn">Whitepaper</div>
          </NavLink>
          <div className="nav_btn">
            {/* <button type="button" onClick={() => setConnected(true)}>
            TEST
          </button>
          <button
            className="nav_connect_btn"
            type="button"
            onClick={() => {
              login(ConnectorNames.Injected)
              // setConnected(true)
            }}
          >
            {account}
          </button> */}
            {!account ? (
              <button
                className="responsive-connect"
                type="button"
                onClick={() => {
                  login(ConnectorNames.Injected)
                  // localStorage.setItem('connected', account)
                  // setConnected(true)
                }}
              >
                Connect
              </button>
            ) : (
              <div className="nav_connect_btn_connected nab-btn">
                <button
                  className="responsive-connect"
                  type="button"
                  onClick={() => {
                    logout()
                  }}
                >
                  Disconnect
                </button>
                <span style={{ marginLeft: '20px', fontSize: '1.5rem' }}>{`${account.substring(
                  0,
                  6,
                )}...${account.substring(account.length - 4)}`}</span>
              </div>
            )}
          </div>
          <div className="nav_btn">
            <button type="button" className="btn-closeResponsive btn-responsive" onClick={closeResponsive}>
              Close
            </button>
          </div>
        </div>
        <div className="menu-bar">
          <NavLink to="/">
            <div className="nav_btn">Home</div>
          </NavLink>
          <NavLink to="/stake">
            <div className="nav_btn">BearX</div>
          </NavLink>
          <NavLink to="/lands">
            <div className="nav_btn">Lands</div>
          </NavLink>
          <NavLink to="/claim">
            <div className="nav_btn">Claim</div>
          </NavLink>
          <NavLink to="/whitepaper">
            <div className="nav_btn">Whitepaper</div>
          </NavLink>
          <div>
            {!account ? (
              <button
                className="nav_connect_btn"
                type="button"
                onClick={() => {
                  login(ConnectorNames.Injected)
                  // localStorage.setItem('connected', account)
                  // setConnected(true)
                }}
              >
                Connect
              </button>
            ) : (
              <div className="nav_connect_btn_connected">
                <button
                  className="nav_connect_btn"
                  type="button"
                  onClick={() => {
                    logout()
                  }}
                >
                  Disconnect
                </button>
                <span style={{ marginLeft: '20px', fontSize: '1.5rem' }}>{`${account.substring(
                  0,
                  6,
                )}...${account.substring(account.length - 4)}`}</span>
              </div>
            )}
          </div>
        </div>
        <div className="responsive-bars">
          <button className="launch-responsiv btn-responsive" onClick={launchResponsive} type="button">
            <svg viewBox="0 0 100 80" width="40" height="40" style={{ color: '#ffffff', backgroundColor: '#ffffff' }}>
              <rect width="100" height="20" />
              <rect y="30" width="100" height="20" />
              <rect y="60" width="100" height="20" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
