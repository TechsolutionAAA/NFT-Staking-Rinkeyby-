import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './index.css'

export interface AXEProps {
  url?: string
  title?: string
  rarity?: string
  price?: string
  description?: string
  staked?: boolean
  callback?: () => void
}

const AXECard = (props: AXEProps) => {
  const { url, title, rarity, price, description, callback, staked } = props
  return (
    <Card style={{ width: '20%', margin: '5px', display: 'flex' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <div className="item">
          <span>Rarity</span>
          <span>{rarity}</span>
        </div>

        <div className="item">
          <span>Price</span>
          <span>{price}</span>
        </div>

        <div className="description">
          <span>Description</span>
          <p className="description-content">{description}</p>
        </div>

        <button type="button" className="button">
          SELL
        </button>
      </Card.Body>
    </Card>
  )
}

export default AXECard
