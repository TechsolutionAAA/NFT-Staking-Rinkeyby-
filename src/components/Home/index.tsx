import React from 'react'
import './index.css'

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* <div className="intro_section">
        <div className="intro_section_content">
          <div className="main_title">BEARX</div>
          <div className="sub_title">GENESIS COLLECTION</div>
          <div className="main_description">
            The fully on-chain NFT on the Ethereum blockchain to enable P2E on Minecraft, Stake to generate $SROOTs
            in-game and own lands in the metaverse.
          </div>
          <div className="sub-description">Minecraft Server: bearx.mc.gg</div>
        </div>
      </div> */}
      <div className="buy_bearx">
        <div className="buy_bearx_main_title">BUY BEARX</div>
        <div className="buy_bearx_description">
          Buy and stake Genesis BEARX to gain access to a P2E Minecraft world and start generating $SROOT while playing.
        </div>
        <div>
          <button type="button" className="btn_goto_opensea">
            Buy on OpeanSea
          </button>
        </div>
      </div>

      <div className="stake_bearx">
        <div className="stake_bearx_main_title">STAKE BEARX</div>
        <div className="stake_bearx_description">
          Stake your Genesis Bears to access BEARWORLD alongside a range of tools including land plots, $SROOT
          generation, and renting assets.
        </div>
        <div>
          <button type="button" className="btn_goto_dapp">
            Launch dApp
          </button>
        </div>
      </div>

      <div className="learn_bearx">
        <div className="learn_bearx_main_title">JUMP INTO BEARWORLD</div>
        <div className="learn_bearx_description">
          Go into the world and take part in the daily challenges, harvest your land, use the bank, work your way up and
          connect with other bears. The world awaits.
        </div>
        <div>
          <button type="button" className="btn_goto_learn">
            Whitepaper
          </button>
          <button type="button" className="btn_goto_learn">
            Project Disclaimer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
