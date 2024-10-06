import React from 'react'
import './styles.scss'
import img from '../../assets/images/card.webp'

const Card = () => {
  return (
    <div className='card-cotainer'>
      <div className='card-img'>
        <img src={img} alt="" />
      </div>
      <div className='card-content'>
        <div className='card-title'>
          MLB - Giày sneakers unisex cổ thấp Chunky Classic Base Heel Monogram
        </div>
      </div>
    </div>
  )
}

export default Card