import React from 'react'
import './styles.scss'
import img from '../../assets/images/card.webp'
import { useNavigate } from 'react-router-dom'
import { CardProps } from '../../pages/Home'
import { formatPrice } from '../../helpers'

interface ICardProps{
  data: CardProps
}

const Card: React.FC<ICardProps> = ({data}) => {

  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='card-cotainer'>
      <div className='card-img'>
        <img src={data.img} alt="" onClick={e => handleOnClick(data.id)} className='img-main'/>
        <img src={data.imgHover} alt="" onClick={e => handleOnClick(data.id)} className='img-hover' />
      </div>
      {!data.hidden && (
        <div className='card-content'>
          <div className='card-title' onClick={e => handleOnClick(data.id)}>
            {data.name}
          </div>
          <span className='card-price'>
            {formatPrice(data.price)}
          </span>
        </div>
      )}
      {data.rank&&(
        <div className='card-index-rank'>
          {data.rank}
        </div>
      )}
      
    </div>
  )
}

export default Card