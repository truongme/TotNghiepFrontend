import React, { useEffect, useState } from 'react';
import './styles.scss';
import imageBanner from '../../assets/images/banner.webp';
import imageBanner2 from '../../assets/images/banner2.webp';
import imageBanner3 from '../../assets/images/banner3.webp';
import imgNewArrival from '../../assets/images/new-arrival.jpg';
// import imgBackground from '../../assets/images/bgcollection.jpg'; 
import Card from '../../components/Card';
import Slider from 'react-slick';
import axios from 'axios';
import { formatPrice } from '../../helpers';
import { WebUrl } from '../../constants';

export interface CardProps {
  id: string;
  img: string;
  imgHover?: string;
  name: string;
  price: string;
  rank?: number
}

const Home = () => {

  const [listTopSell, setListTopSell] = useState<CardProps[]>([])

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
      const response = await axios.get(`${WebUrl}/api/v1/products/top-selling?limit=10`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      }) 
      
      const data: CardProps[] = response.data.data.map((e: any, index: number) => ({
        id: e.productId,  
        img: e.images?.[0].imageURL,
        imgHover: e.images?.[1].imageURL,    
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
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={imageBanner} alt="" className="d-block w-100"/>
            </div>
            <div className="carousel-item">
              <img src={imageBanner2} alt="" className="d-block w-100"/>
            </div>
            <div className="carousel-item">
              <img src={imageBanner3} alt="" className="d-block w-100"/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='new-arrival-header'>
          <div className='title-folder-home  mb-3'>HÀNG MỚI VỀ</div>
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
      <div className='container mt-5'>
        <div className='title-folder-home  mb-3'>HÀNG BÁN CHẠY</div>
        <div className='top-sale'>
          <Slider {...settings}>
            {listTopSell.map((e: CardProps) => (
              <Card data={e}/>
            ))}
          </Slider>
        </div>
      </div>

      {/* Phần Bộ Sưu Tập */}
      <div className='container mt-5 mb-5'>
        <div className='title-folder-home  mb-3'>Bộ sưu tập</div>
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

      <div className='container mt-5 mb-5'>
        <div className='title-folder-home mb-3'>Cập nhật thêm từ @mlbkorea_vn</div>
        <div className='social-container'>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
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
