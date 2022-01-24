import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import { GrTwitter } from 'react-icons/gr'
import OpenSeaIcon from '../../assets/imgs/opensea.png'
import EtherscanIcon from '../../assets/imgs/etherscan.png'
import './index.css'
import LogoIcon from '../../assets/imgs/logo.png'

const Footer: React.FC = () => {
  return (
    <div className="my_footer">
      <img src={LogoIcon} alt="bearx logo" />
      {/* <div className="my_footer_description">
        *The BEARX Development Team is in no way affiliated with, endorsed by, or a partner of Minecraft, Mojang,
        Microsoft, or any other related parties.
      </div> */}

      <div className="icons">
        <div className="icon" style={{ alignItems: 'center' }}>
          <FaDiscord size={100} />
        </div>
        <div className="icon" style={{ alignItems: 'center', fontSize: '3rem' }}>
          <GrTwitter size={100} />
        </div>

        <div className="icon">
          <img src={OpenSeaIcon} alt="OpenSea" />
        </div>
        <div className="icon">
          <img src={EtherscanIcon} alt="Etherscan" />
        </div>
      </div>
      <div style={{ fontSize: '2rem' }}>@2022 The BEARX Development Team</div>
    </div>
  )
}

export default Footer
