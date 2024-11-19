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
  const [listNewProduct, setNewProduct] = useState<CardProps[]>([])
  const [listCollection, setcollection] = useState<CardProps[]>([])

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

  const getNewProduct = async () => {
    try{
      const response = await axios.get(`${WebUrl}/api/v1/products/top-selling?limit=4`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      }) 
      
      const data: CardProps[] = response.data.data.map((e: any) => ({
        id: e.productId,  
        img: e.images?.[0].imageURL,
        imgHover: e.images?.[1].imageURL,    
        name: e.name,
        price: formatPrice(e.price),
      }));

      setNewProduct(data)

    } catch (error) {
      console.error('Error get top sell:', error);
    }
  }

  const getCollection = async () => {
    try{
      const response = await axios.get(`${WebUrl}/api/v1/products/top-selling?limit=4`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      }) 
      
      const data: CardProps[] = response.data.data.map((e: any) => ({
        id: e.productId,  
        img: e.images?.[0].imageURL,
        imgHover: e.images?.[1].imageURL,    
        name: e.name,
        price: formatPrice(e.price),
      }));

      setcollection(data)

    } catch (error) {
      console.error('Error get top sell:', error);
    }
  }

  useEffect(() => {
    getTopSell();
    getNewProduct();
    getCollection();
  }, []);


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
            {listNewProduct.map((e: CardProps) => (
               <div className='p-2'><Card data={e}/></div>
            ))}
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
              <Slider {...settings2}>
                {listCollection.map((e: CardProps) => (
                  <Card data={e}/>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-5 mb-5'>
        <div className='title-folder-home mb-3'>Cập nhật thêm từ @mlbkorea_vn</div>
        <div className='social-container'>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-ber1-1.cdninstagram.com%2Fv%2Ft39.30808-6%2F465844360_536355899029535_8835073787455627808_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-ber1-1.cdninstagram.com%26_nc_cat%3D111%26_nc_ohc%3DXy109OWHelYQ7kNvgEwZBBy%26_nc_gid%3D94aa11ac208d4888aa901cdbb284e2e8%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYBAqJCf3f8zeFK_69KxB40J7qxj6zQbKMz1JTETI9GYlg%26oe%3D673CF9AE%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.fbog4-2.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F465839273_535018695829922_6848564851369589967_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dinstagram.fbog4-2.fna.fbcdn.net%26_nc_cat%3D102%26_nc_ohc%3DSf3XGZPl-BUQ7kNvgHqIaf_%26_nc_gid%3D1524b20aeb9f4d88b8ddb7625bf7965b%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDvpg8qQUbjXc8uxo4V9weeynDJfaw5YjKDw6bmoRSCRA%26oe%3D67353C3A%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-ber1-1.cdninstagram.com%2Fv%2Ft39.30808-6%2F465764020_537053228959802_3022008780394203162_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-ber1-1.cdninstagram.com%26_nc_cat%3D102%26_nc_ohc%3DHckNYiX2qIQQ7kNvgH6OtLT%26_nc_gid%3D94aa11ac208d4888aa901cdbb284e2e8%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYC7k0LDso8kRwQrvYrevpvRV4tvnVsAt74Vtd9Kp6Wl4Q%26oe%3D673CD06F%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-atl3-2.cdninstagram.com%2Fv%2Ft39.30808-6%2F464273751_527047259960399_2186555186434779944_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-atl3-2.cdninstagram.com%26_nc_cat%3D111%26_nc_ohc%3D-F4x013bEA8Q7kNvgHBzDcS%26_nc_gid%3D398beb798597473ca96b13c1e0dc1f29%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYCxRLFkkSPve_7PROK2M-a2FDAM_CVNmtcJsuSMlRaYQA%26oe%3D673D06D0%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-lim1-1.cdninstagram.com%2Fv%2Ft39.30808-6%2F461959885_511929031472222_1251614908919681346_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzMTkuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-lim1-1.cdninstagram.com%26_nc_cat%3D102%26_nc_ohc%3DY6xhByoDmqkQ7kNvgF4LWfZ%26_nc_gid%3D02cbbdfb711e428fb72364cca873ea90%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDUAmtrfsHmmV-1-piKAej2di6kA7uUuzMvbTWRgN7ZWg%26oe%3D673D00D2%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-lim1-1.cdninstagram.com%2Fv%2Ft39.30808-6%2F461843598_510454348286357_133897979932546382_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDE3MDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-lim1-1.cdninstagram.com%26_nc_cat%3D105%26_nc_ohc%3DZZ2zFDEOWQ8Q7kNvgHaLtrv%26_nc_gid%3D02cbbdfb711e428fb72364cca873ea90%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDpIUI9RCEOUmVpuMB6yEpMw83HUeEyr_lawB2TJU4aOA%26oe%3D673CE15C%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-lim1-1.cdninstagram.com%2Fv%2Ft51.29350-15%2F460722828_850660227192602_5227891797914191123_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTYuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-lim1-1.cdninstagram.com%26_nc_cat%3D102%26_nc_ohc%3DAG46bLYgqXgQ7kNvgEDte10%26_nc_gid%3D02cbbdfb711e428fb72364cca873ea90%26edm%3DAPU89FABAAAA%26ccb%3D7-5%26oh%3D00_AYDZ5ng2renHgYWQQSlJIMG6fbQG1n0nqJfc6cpdI8Em4A%26oe%3D673CCFFF%26_nc_sid%3Dbc0c2c" alt="" />
          </div>
          <div className='social-container-item'>
            <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-lim1-1.cdninstagram.com%2Fv%2Ft39.30808-6%2F461519821_507422501922875_7530108277539126156_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080%26efg%3DeyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEyOTguc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0%26_nc_ht%3Dscontent-lim1-1.cdninstagram.com%26_nc_cat%3D111%26_nc_ohc%3DmCBThNbk1a8Q7kNvgF4iacV%26_nc_gid%3D02cbbdfb711e428fb72364cca873ea90%26edm%3DAPU89FAAAAAA%26ccb%3D7-5%26oh%3D00_AYDFFHwUjlvhhI4gL_oZaW7GySyN41OIPUJ2S9H4BBvVaw%26oe%3D673CDF69%26_nc_sid%3Dbc0c2c" alt="" />
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
