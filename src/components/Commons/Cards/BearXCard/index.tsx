import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import './index.css'
import PlaceHolderImage from 'assets/imgs/avatar.png'
import { useContract } from 'web3/hooks/useContract'
import { useAppDispatch } from 'state'
import { updateStake } from 'state/token/actions'
import { useCallWithGasPrice } from 'web3/hooks/useCallWithGasPrice'
import ContractAddress from '../../../../web3/constants/contracts'
import { getContract } from '../../../../web3/utils/contractHelpers'
import StakingABI from '../../../../web3/config/abi/BearXStaking.json'
import BearXABI from '../../../../web3/config/abi/BearX.json'

export interface BearXProps {
  url?: string
  title?: string
  rarity?: string
  price?: string
  description?: string
  staked?: boolean
  tokenId?: number
  clicked?: () => void
  processed?: () => void
}

const BearXCard = (props: BearXProps) => {
  const { url, title, rarity, price, description, staked, tokenId, processed, clicked } = props
  const { account, library, chainId, active, activate, error } = useWeb3React()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [descript, setDescript] = useState('')
  const dispatch = useAppDispatch()

  const BearXStakingContract = useContract(ContractAddress.BearXStaking[4], StakingABI)
  const BearXNFTContract = useContract(ContractAddress.BearX[4], BearXABI)
  const { callWithGasPrice } = useCallWithGasPrice()
  const isSpecial = (_id) => {
    if (_id >= 1000000000000 && _id <= 1000000000005) return true
    return false
  }

  const [pending, setPending] = useState(false)
  useEffect(() => {
    if (library && tokenId !== undefined) {
      getContract(ContractAddress.BearX[4], BearXABI, library)
        .tokenURI(tokenId)
        .then((r) => {
          axios.get(r.toString()).then((res) => {
            setName(res.data.name)
            setImage(res.data.image)
            setDescript(res.data.description)
          })
        })
    }
  })

  const stake = useCallback(
    async (id) => {
      setPending(true)

      try {
        const tx = await callWithGasPrice(BearXNFTContract, 'approve', [ContractAddress.BearXStaking[4], id], {
          from: account,
        })
        //    clicked()
        const receipt = await tx.wait()
        if (receipt.status) {
          NotificationManager.success('Approved Successfully!')
          const ids = []
          ids.push(id)
          const stakingTx = await callWithGasPrice(BearXStakingContract, 'createStake', [ids], {
            from: account,
          })

          const stakingReceipt = await stakingTx.wait()
          if (stakingReceipt.status) {
            setPending(false)
            NotificationManager.success('Staked Successfully!')
            dispatch(updateStake())
            processed()
          } else {
            setPending(false)
            processed()
            NotificationManager.error('Staking Failed!')
          }
        } else {
          setPending(false)
        }
      } catch (err) {
        setPending(false)
      }
    },
    [BearXStakingContract, callWithGasPrice, BearXNFTContract, account, processed, dispatch],
  )
  const unstake = useCallback(
    async (_ids) => {
      setPending(true)
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
          processed()
        } else {
          setPending(false)
          processed()
          NotificationManager.error('Unstaking Failed!')
        }
      } catch (err) {
        setPending(false)
      }
    },
    [BearXStakingContract, callWithGasPrice, account, processed, dispatch],
  )
  return (
    <Card className="bearx-card" style={{ width: '20%', margin: '5px', display: 'flex', backgroundColor: '#14181d' }}>
      {staked ? (
        <div className="ribbon-wrapper">
          <div className="ribbon">STAKED</div>
        </div>
      ) : isSpecial(tokenId) ? (
        <div className="ribbon-wrapper">
          <div className="ribbon">1/1</div>
        </div>
      ) : (
        <></>
      )}
      <Card.Img variant="top" src={image} onError={() => setImage(PlaceHolderImage)} />
      <Card.Body>
        <Card.Title className="card_font" style={{ color: 'white' }}>
          {name}
        </Card.Title>

        <div className="buttons">
          {staked ? (
            pending ? (
              <button type="button" className="button card_font card_fontsize_smaller" disabled>
                <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border" />
              </button>
            ) : (
              <button
                type="button"
                className="button card_font card_fontsize_smaller"
                onClick={() => {
                  unstake([tokenId])
                  // clicked()
                }}
              >
                Unstake
              </button>
            )
          ) : pending ? (
            <button type="button" className="button card_font card_fontsize_smaller" disabled>
              <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border" />
            </button>
          ) : (
            <button
              type="button"
              className="button card_font card_fontsize_smaller"
              onClick={() => {
                stake(tokenId)
                // clicked()
              }}
            >
              Stake
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default BearXCard
