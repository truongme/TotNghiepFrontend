import React from 'react'
import './styles.scss'
import imageBanner from '../../assets/images/banner.webp'
import imgNewArrival from '../../assets/images/new-arrival.jpg'
import Card from '../../components/Card'

const Home = () => {
  const arrCategory = [
    {name: 'Quần áo', link:'/login'},
    {name: 'Giày dép', link:'/'},
    {name: 'Mũ nón', link:'/login'},
    {name: 'Phụ kiện', link:'/login'},
  ]
  return (
    <div>
      <div className='banner-container'>
        <img src={imageBanner} alt="image banner" />
      </div>
      <div className='container mt-5'>
        <div className='new-arrival-header mb-3'>
          <div className='title-folder-home'>HÀNG MỚI VỀ</div>
          <div className='d-flex'>
            {arrCategory.map(e => (
              <div key={e.name} className='new-arrival-category'>{e.name}</div>
            ))}
          </div>
        </div>
        <div className='new-arrival'>
          <div className='new-arrival-banner'>
            <img src={imgNewArrival} alt="new-arrival" />
          </div>
          <div className='new-arrival-card'>
              <div className='p-2'>
                <Card/>
              </div>
              <div className='p-2'>
                <Card/>
              </div>
              <div className='p-2'>
                <Card/>
              </div>
              <div className='p-2'>
                <Card/>
              </div>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='title-folder-home'>HÀNG BÁN CHẠY</div>
        <div className='top-sale'>
          <div className='top-sale-card'>
            <Card/>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='title-folder-home'>BỘ SƯU TẬP</div>
        <div className='collection-container'>
          <div className='collection-banner'>
            <img src={imgNewArrival} alt="" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Home