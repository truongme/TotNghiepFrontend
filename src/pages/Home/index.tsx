import React, { useEffect, useState } from 'react';
import './styles.scss';
import imageBanner from '../../assets/images/banner.webp';
import imgNewArrival from '../../assets/images/new-arrival.jpg';
// import imgBackground from '../../assets/images/bgcollection.jpg'; 
import Card from '../../components/Card';
import Slider from 'react-slick';
import axios from 'axios';
import { formatPrice } from '../../helpers';

export interface CardProps {
  id: string;
  img: string;
  name: string;
  price: string;
  rank: number
}

const Home = () => {

  const [listTopSell, setListTopSell] = useState<CardProps[]>([])
  const arrCategory = [
    { name: 'Quần áo', link: '/login' },
    { name: 'Giày dép', link: '/' },
    { name: 'Mũ nón', link: '/login' },
    { name: 'Phụ kiện', link: '/login' },
  ];
  

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    cssEase: 'ease-in-out',
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: 'ease-in-out',
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const getTopSell = async () => {
    try{
      const response = await axios.get(`https://2564-14-191-163-70.ngrok-free.app/api/v1/products/top-selling?limit=10`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      }) 
      
      const data: CardProps[] = response.data.data.map((e: any, index: number) => ({
        id: e.productId,  
        img: e.images?.[0],  
        name: e.name,
        price: formatPrice(e.price),
        rank: index+1,
      }));

      setListTopSell(data)

    } catch (error) {
      console.error('Error get top sell:', error);
    }
  }

  useEffect(() => {
    getTopSell()
  },[])

  return (
    <div>
      <div className='banner-container'>
        <img src={imageBanner} alt="image banner" />
      </div>

      {/* Phần Hàng Mới Về */}
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
            {/* <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div> */}
          </div>
        </div>
      </div>

      {/* Phần Hàng Bán Chạy */}
      <div className='container mt-5'>
        <div className='title-folder-home'>HÀNG BÁN CHẠY</div>
        <div className='top-sale'>
          <Slider {...settings}>
            {listTopSell.map((e: CardProps) => (
              <Card data={e}/>
            ))}
          </Slider>
        </div>
      </div>

      {/* Phần Bộ Sưu Tập */}
      <div className='container mt-5'>
        <div className='collection-container'>
          <div className='collection-background'></div>
          <div className='collection-content'>
            <div className='collection-text'>
              <h1>YOUNG & HIP</h1>
              <h2>#Varsity Collection</h2>
            </div>
            <div className='collection-slider'>
              {/* <Slider {...settings2}>
                {collectionCardArray}
              </Slider> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Nút "Next"
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <div className="line-arrow-next"></div>
    </div>
  );
};

// Nút "Previous"
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <div className="line-arrow-prev"></div>
    </div>
  );
};

export default Home;
