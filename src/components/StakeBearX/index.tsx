import BearXCard from 'components/Commons/Cards/BearXCard'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Bear1 from 'assets/imgs/nfts/bearx/bear1.jpg'
import GifIcon from 'assets/imgs/mint.a0a2fe97.gif'
import './index.css'
import { Card, Button, Spinner } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'
import Claim from 'components/Claim'
import { updateStake } from 'state/token/actions'
import { useAppDispatch } from 'state'

import { useContract } from 'web3/hooks/useContract'
import { useCallWithGasPrice } from 'web3/hooks/useCallWithGasPrice'
import { getContract } from '../../web3/utils/contractHelpers'
import BearXABI from '../../web3/config/abi/BearX.json'
import StakingABI from '../../web3/config/abi/BearXStaking.json'
import ContractAddress from '../../web3/constants/contracts'

const StakeBearX: React.FC = () => {
  const { account, library, chainId, active, activate, error } = useWeb3React()
  const [bearxBalance, setBearxBalance] = useState(0)
  const [bearxTokenIds, setBearxTokenIds] = useState([])
  const _bearxTokenIds = useRef([])
  const dispatch = useAppDispatch()

  const [bearxTokenIdsStaked, setBearxTokenIdsStaked] = useState([])
  const _bearxTokenIdsStaked = useRef([])

  const BearXStakingContract = useContract(ContractAddress.BearXStaking[4], StakingABI)
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pending, setPending] = useState(false)
  const [unstakepending, setunstakepending] = useState(false)
  const BearXNFTContract = useContract(ContractAddress.BearX[4], BearXABI)
  const [SROOTxTokenAPR, setSROOTxTokenAPR] = useState(0)

  useEffect(() => {
    if (library) {
      getContract(ContractAddress.BearX[4], BearXABI, library)
        .balanceOf(account)
        .then((r) => {
          setBearxBalance(parseInt(r.toString()))
          _bearxTokenIds.current = []
          setBearxTokenIds((b) => [])
          console.log('balance', bearxBalance)
          const tempB = bearxBalance
          const tempBs = []
          for (let i = 0; i < bearxBalance; i++) {
            getContract(ContractAddress.BearX[4], BearXABI, library)
              .tokenOfOwnerByIndex(account, i)
              .then((rid) => {
                // setBearxTokenIds((b) => [...b, parseInt(rid.toString())])
                tempBs.push(parseInt(rid.toString()))
                if (tempBs.length === tempB) {
                  setBearxTokenIds(tempBs)
                }
                // _bearxTokenIds.current = [..._bearxTokenIds.current, parseInt(rid.toString())]
                // if (_bearxTokenIds.current.length === tempB) {
                //   setBearxTokenIds(_bearxTokenIds.current)
                // }
                console.log('_bearxTokenIds', _bearxTokenIds)
              })
              .catch((err) => {
                console.log(err)
              })
          }
          // if (_bearxTokenIds.current.length === bearxBalance) {
          //   setBearxTokenIds(_bearxTokenIds.current)
          // }
        })
        .catch((err) => {
          console.log(err)
        })

      getContract(ContractAddress.BearXStaking[4], StakingABI, library)
        .stakeOf(account)
        .then((r) => {
          console.log('stakeof', r.length)
          setBearxTokenIdsStaked((b) => r)
          // console.log(parseInt(r[0]))
        })
        .catch((err) => {
          //  console.log(err)
        })
    }
    getContract(ContractAddress.BearXStaking[4], StakingABI, library)
      .getAPR()
      .then((r) => {
        console.log('APR oF', r)
        setSROOTxTokenAPR(Number(r) / 10 ** 18)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [library, account, bearxBalance, pending])

  const unstake = useCallback(
    async (_ids) => {
      setunstakepending(true)
      const ids = [..._ids]
      //  ids.push(id)

      try {
        const tx = await callWithGasPrice(BearXStakingContract, 'unStake', [ids], {
          from: account,
        })
        //   clicked()
        const receipt = await tx.wait()

        if (receipt.status) {
          setPending(false)
          NotificationManager.success('Untaked Successfully!')
          dispatch(updateStake())
        } else {
          setPending(false)
          NotificationManager.error('Unstaking Failed!')
        }
      } catch (err) {
        console.log(err)
        setPending(false)
      }
    },
    [BearXStakingContract, callWithGasPrice, account, dispatch],
  )
  return (
    <>
      <div className="staking_bearx">
        <div className="staking_bearx_body">
          <div className="staking_bearx_body_left">
            <img src={GifIcon} alt="gif" style={{ width: '90%' }} />
          </div>
          <div className="staking_bearx_body_right">
            <div className="staking_intro">
              <div className="staking_intro_title">BEARXWORLD</div>
              <div className="staking_intro_description">
                <p className="normal-text">
                  🐻 Connect and stake your Genesis Bears to continue to generate 10 $ROOT per Bear, per day.
                </p>
                <p className="normal-text">
                  🐻 Connect and stake 5+ Genesis Bears to also generate 50 $SROOT per Bear, per day.
                </p>
                <p className="normal-text">🐻 Stake $SROOT and earn $SROOT and $WETH rewards.</p>
                <p className="normal-text">
                  🐻 Stake your MiniBearX before February 1st, 2022 @ 4 PM EST and gain beta access to BEAR WORLD and
                  qualify for BearX raffles.
                </p>
              </div>
              <div className="staking_intro_apr">
                {SROOTxTokenAPR.toLocaleString('en-US', { maximumFractionDigits: 3 })}% APR
              </div>
            </div>
          </div>
        </div>

        <div className="unstaked_bearx">
          <div className="unstaked_bearx_container">
            <div className="unstaked_bearx_title sub-title">YOUR UNSTAKED BEARX</div>
          </div>

          <div className="unstaked_bearx_description full-width normal-text">
            Click to select a Genesis BearX. Stake your BearX to yield ROOTx, SROOTx and rewards in BEARWORLD
          </div>
          <div className="unstaked_bearx_section flex-wrap">
            <>
              {library ? (
                bearxTokenIds.length !== 0 ? (
                  bearxTokenIds.map(
                    (_id) => (
                      <BearXCard
                        url={Bear1}
                        title="BearX1"
                        rarity="Common"
                        price="1.5ETH"
                        description="BearX description"
                        processed={() => {
                          setPending(!pending)

                          console.log('processed')
                        }}
                        clicked={() => setPending(true)}
                        // stake={() => console.log('stake')}
                        tokenId={_id}
                        key={_id}
                      />
                    ),
                    // console.log(_id)
                    // return _id
                  )
                ) : (
                  <div>You do not have items.</div>
                )
              ) : (
                <div className="align-center">Please connect your wallet.</div>
              )}
            </>
          </div>
        </div>

        <div className="staked_bearx">
          <div className="unstaked_bearx_container">
            <div className="staked_bearx_title sub-title">YOUR STAKED BEARX</div>
            {account ? (
              <div className="buttons">
                {bearxTokenIdsStaked.length === 0 ? (
                  <></>
                ) : unstakepending ? (
                  <button type="button" className="button card_font card_fontsize_smaller allbutton" disabled>
                    <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button card_font card_fontsize_smaller allbutton"
                    onClick={() => {
                      unstake(bearxTokenIdsStaked)
                      // clicked()
                    }}
                  >
                    Unstake ALL
                  </button>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="staked_bearx_description normal-text full-width">
            Use multiple BearX to generate more $ROOTx.
          </div>
          <div className="staked_bearx_section flex-wrap">
            <>
              {library ? (
                bearxTokenIdsStaked.length !== 0 ? (
                  bearxTokenIdsStaked.map(
                    (_id) => (
                      <BearXCard
                        url={Bear1}
                        title="BearX1"
                        rarity="Common"
                        price="1.5ETH"
                        description="BearX asg asg as ga sgagasdgasgasgasgasg"
                        staked
                        processed={() => {
                          setPending(!pending)
                          setBearxBalance(0)
                        }}
                        clicked={() => setPending(true)}
                        // unstake={() => console.log('unstake')}
                        tokenId={_id}
                        key={_id}
                      />
                    ),
                    // console.log(_id)
                    // return _id
                  )
                ) : (
                  <div className="normal-text full-width">You do not have items.</div>
                )
              ) : (
                <div className="align-center">Please connect your wallet.</div>
              )}
            </>
          </div>
        </div>
      </div>
      <Claim />
    </>
  )
}

export default StakeBearX
