import React from 'react'
import './styles.scss'
import img from '../../assets/images/card.webp'
import { useNavigate } from 'react-router-dom'

const Card = () => {

  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='card-cotainer'>
      <div className='card-img'>
        <img src={img} alt="" onClick={e => handleOnClick('ao-polo')}/>
      </div>
      <div className='card-content'>
        <div className='card-title' onClick={e => handleOnClick('ao-polo')}>
          MLB - Giày sneakers unisex cổ thấp Chunky Classic Base Heel Monogram
        </div>
        <span className='card-price'>
          1,690,000 đ
        </span>
      </div>
    </div>
  )
}

export default Card