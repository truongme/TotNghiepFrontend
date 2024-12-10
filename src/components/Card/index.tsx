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
        <div className='card-price-img'>{formatPrice(data.price)}</div>
      </div>
      {!data.hidden && (
        <div className='card-content'>
          <div className='card-title' onClick={e => handleOnClick(data.id)}>
            {data.name}
          </div>
        </div>
      )}
      {data.rank&&(
        <div className='card-index-rank'>
          <img src="https://file.hstatic.net/200000642007/file/bg_rank_c21e90ddb3c74242970a777d424a1ae5.png"/>
          <div className='rank-count'>{data.rank}</div>
        </div>
      )}
      
    </div>
  )
}

export default Card