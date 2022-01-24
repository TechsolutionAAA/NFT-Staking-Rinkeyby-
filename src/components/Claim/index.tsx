import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import web3 from 'web3'
import { Card, Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotificationManager } from 'react-notifications'
import { useCallWithGasPrice } from 'web3/hooks/useCallWithGasPrice'
import { useContract } from 'web3/hooks/useContract'
import { State } from '../../state/types'
import { getContract } from '../../web3/utils/contractHelpers'
import StakingABI from '../../web3/config/abi/BearXStaking.json'
import ContractAddress from '../../web3/constants/contracts'
import './index.css'

const Claim: React.FC = () => {
  const { account, library, chainId, active, activate, error } = useWeb3React()
  const [totalStaked, setTotalStaked] = useState(0)
  const [youStaked, setYouStaked] = useState(0)
  const [claimableROOTx, setClaimableROOTx] = useState(0)
  const [claimableSROOTx, setClaimableSROOTx] = useState(0)
  const [claimableETH, setClaimableETH] = useState(0)
  const [isVested, SetVested] = useState(true)
  const [pending, setPending] = useState(false)
  const [claimROOT, setClaimROOT] = useState(false)
  const [claimSROOT, setClaimSROOT] = useState(false)
  const [claimWETH, setClaimWETH] = useState(false)
  const staked = useSelector((state: State) => state.token.staked)

  const { callWithGasPrice } = useCallWithGasPrice()
  const [countDown, setCountDown] = useState(600000)
  const BearXStakingContract = useContract(ContractAddress.BearXStaking[4], StakingABI)
  const [claimedValue, setClaimedValue] = useState()

  useEffect(() => {
    if (library) {
      getContract(ContractAddress.BearXStaking[4], StakingABI, library)
        .totalStakes()
        .then((r) => {
          setTotalStaked(parseInt(r.toString()))
        })
        .catch((e) => {
          setTotalStaked(0)
          console.log(e)
        })

      getContract(ContractAddress.BearXStaking[4], StakingABI, library)
        .stakeOf(account)
        .then((r) => {
          setYouStaked(r.length)
        })
        .catch((e) => {
          setYouStaked(0)
          console.log(e)
        })

      getContract(ContractAddress.BearXStaking[4], StakingABI, library)
        .claimOf(account)
        .then((r) => {
          setClaimedValue(r)
          console.log(r[0], r[1], r[2])
          setClaimableROOTx(parseInt(r[0].toString()) / 10 ** 18)
          setClaimableSROOTx(parseInt(r[1].toString()) / 10 ** 18)
          setClaimableETH(parseInt(r[2].toString()) / 10 ** 18)
        })
        .catch((e) => {
          setClaimableROOTx(0)
          setClaimableSROOTx(0)
          setClaimableETH(0)
        })

      getContract(ContractAddress.BearXStaking[4], StakingABI, library)
        .isVested(account)
        .then((r) => {
          SetVested(r)
        })
        .catch((e) => {
          console.log('ISVESTED', e)
          SetVested(true)
        })
    }
  }, [account, library, pending, staked, claimableROOTx, claimableSROOTx, claimableETH, claimedValue])

  const claimOfROOTxToken = useCallback(async () => {
    if (account) {
      setClaimROOT(true)
      try {
        console.log('Test ROOTX TOKEN')
        const tx = await callWithGasPrice(BearXStakingContract, 'claimOfROOTxToken', [], {
          from: account,
        })
        const receipt = await tx.wait()
        console.log('ROOTX', receipt)
        if (receipt.status) {
          NotificationManager.success('You claimed Successfully.')
          setClaimROOT(false)
        } else {
          NotificationManager.error('You claimed Failed.')
          setClaimROOT(false)
        }
      } catch (err) {
        setClaimROOT(false)
        NotificationManager.error('You claimed Failed.')
      }
    }
  }, [account, BearXStakingContract, callWithGasPrice])

  const claimOfSROOTxToken = useCallback(async () => {
    if (account) {
      setClaimSROOT(true)
      try {
        console.log('Test SROOTX TOKEN')
        const tx = await callWithGasPrice(BearXStakingContract, 'claimOfSROOTxToken', [], {
          from: account,
        })
        const receipt = await tx.wait()
        console.log(receipt)
        if (receipt.status) {
          NotificationManager.success('You claimed Successfully.')
          setClaimSROOT(false)
        } else {
          NotificationManager.error('You claimed Failed.')
          setClaimSROOT(false)
        }
      } catch (err) {
        setClaimSROOT(false)
        NotificationManager.error('You claimed Failed.')
      }
    }
  }, [account, BearXStakingContract, callWithGasPrice])

  const claimOfWETH = useCallback(async () => {
    if (account) {
      setClaimWETH(true)
      try {
        const tx = await callWithGasPrice(BearXStakingContract, 'claimOfWETH', [], {
          from: account,
        })
        const receipt = await tx.wait()
        if (receipt.status) {
          NotificationManager.success('You claimed Successfully.')
          setClaimWETH(false)
        } else {
          NotificationManager.error('You claimed Failed.')
          setClaimWETH(false)
        }
      } catch (err) {
        setClaimWETH(false)
        NotificationManager.error('You claimed Failed!')
      }
    }
  }, [account, BearXStakingContract, callWithGasPrice])

  return (
    <div className="claim">
      <div className="claim-rootx">
        <div className="claim-rootx-container">
          <div className="claim-rootx-title">CLAIM BEARX</div>
          <div className="claim-rootx-mainboard">
            <div className="claim-rootx-yield">
              {account ? (
                <>
                  <div className="claim-rootx-yield-dashboard">
                    <div className="claim-rootx-yield-staked-subdashboard">
                      <div className="claim-rootx-yield-dashboard-item">
                        <div className="claim-grey-color">Total Staked</div>
                        <div className="status-value">{totalStaked}</div>
                      </div>
                      <div className="claim-rootx-yield-dashboard-item">
                        <div className="claim-grey-color">You Staked</div>
                        <div className="status-value">{youStaked}</div>
                      </div>
                    </div>
                    <div className="claim-rootx-yield-Rewards-subdashboard">
                      <div className="claim-rootx-yield-dashboard-item">
                        <div className="claim-grey-color reward">Claimable ROOTx</div>
                        <div className="status-value reward">{claimableROOTx.toFixed(3)}</div>
                        {!claimROOT ? (
                          <button className="claim-rootx-button" type="button" onClick={() => claimOfROOTxToken()}>
                            CLAIM ROOTx
                          </button>
                        ) : (
                          <button className="claim-rootx-button" type="button">
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                            />
                          </button>
                        )}
                      </div>
                      <div className="claim-rootx-yield-dashboard-item">
                        <div className="claim-grey-color reward">Claimable SROOTx</div>
                        <div className="status-value reward">{claimableSROOTx.toFixed(3)}</div>

                        {isVested ? (
                          <div className="claim-rootx-button">Vested</div>
                        ) : !claimSROOT ? (
                          <button className="claim-rootx-button" type="button" onClick={() => claimOfSROOTxToken()}>
                            claim SROOT
                          </button>
                        ) : (
                          <button className="claim-rootx-button" type="button">
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                            />
                          </button>
                        )}
                      </div>
                      <div className="claim-rootx-yield-dashboard-item">
                        <div className="claim-grey-color reward">Claimable WETH</div>
                        <div className="status-value reward">
                          {claimableETH.toLocaleString('en-US', { maximumFractionDigits: 7 })}
                        </div>

                        {!claimWETH ? (
                          <button className="claim-rootx-button" type="button" onClick={() => claimOfWETH()}>
                            CLAIM WETH
                          </button>
                        ) : (
                          <button className="claim-rootx-button" type="button">
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="claim-warn">Please connect your wallet.</div>
              )}
            </div>
            <div className="claim-rootx-yield-description">
              {account ? (
                <>
                  <div className="claim-grey-color-description">
                    <p className="normal-text">🐻 Earn WETH + SROOT by staking</p>
                    <p className="normal-text">🐻 Stake 5+ Genesis Bears and yield 50% WETH + 50% SROOT rewards</p>
                    <p className="normal-text">
                      🐻 Earn SROOT by providing liquidity to the SROOTx - ETH pair via Uniswap V2 to earn additional
                      rewards on top of Uniswap’s regular liquidity provider rewards.
                    </p>
                  </div>
                </>
              ) : (
                <div className="claim-warn-description">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Claim
