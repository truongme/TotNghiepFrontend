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
import { useNavigate } from 'react-router-dom';

export interface CardProps {
  id: string;
  img: string;
  imgHover?: string;
  name: string;
  price: string;
  rank?: number;
  hidden?:boolean;
}

const Home = () => {
  const fake ={id: "2",
    img: "https://fearofgod.com/cdn/shop/files/F23FOGA57_PERFORMANCE_JERSEY_ATHLETICS_TANK_SESAME_1_x800.jpg?v=1733450417",
    imgHover: "https://fearofgod.com/cdn/shop/files/F23FOGA57_PERFORMANCE_JERSEY_ATHLETICS_TANK_SESAME_1_x800.jpg?v=1733450417",
    name: "FEAR OF GOD ATHLETICS",
    price: "5000000",
}

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

  const navigate = useNavigate()

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
      const response = await axios.get(`${WebUrl}/api/v1/products/top-selling?limit=10`, {
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
            <div className="carousel-item active banner-img">
              <img src={imageBanner2} alt="" className="d-block w-100"/>
            </div>
            <div className="carousel-item banner-img">
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
        <div className='category-home'>
          <div className='category-home-1' onClick={() => navigate('/collections/tops')}>
            <img src="https://fearofgod.com/cdn/shop/files/Essentials_HO24_NBAHeat01_0061copy2-3-4crop_x1800.jpg?v=1732044175" alt="" />
            <div className='category-home-content'>
              <div className='category-home-content-ctn'>
                <div className='category-name'>ÁO</div>
                <button className='btn-primary-home'>Mua ngay</button>
              </div>
            </div>
          </div>
          <div className='category-home-2'>
            <div className='category-home-3'>
              <div className='category-home-5'>
                <img src="https://hufworldwide.com/cdn/shop/files/06-RIGHT_MIDDLE-SMALL_cf15a7d2-ef3d-4ac0-b9ad-c892b7edee4d_1600x.jpg?v=1732139155" alt="" />
                <div className='category-home-content'>
                  <div className='category-home-content-ctn'>
                    <div className='category-name'>Quần</div>
                    <button>Mua ngay</button>
                  </div>
                </div>
              </div>
              <div className='category-home-6'>
                <img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/files/Stussy-Spring-_24---7_bebea07a-a5f4-4fcd-92ed-343f262e8807.jpg?v=1712878906&width=1920" alt="" />
                <div className='category-home-content'>
                  <div className='category-home-content-ctn'>
                    <div className='category-name'>THỜI TRANG NỮ</div>
                    <button>Mua ngay</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='category-home-4'>
              <img src="https://hufworldwide.com/cdn/shop/files/TRD-RESTOCK-HP_DESKTOP_1600x.jpg?v=1732567328" alt="" />
                <div className='category-home-content'>
                  <div className='category-home-content-ctn'>
                    <div className='category-name'>áO KHOÁC</div>
                    <button>Mua ngay</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='container mt-5'>
        <span className='title-folder-home'>Sản phẩm mới về</span>
        <div className='new-arrival mt-3'>
          <div className='new-arrival-card'>
            {listNewProduct.map((e: CardProps) => (
              <div><Card data={e}/></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className='container mt-5'>
        <span className='title-folder-home'>Sản phẩm bán chạy</span>
        <div className='top-sale mt-3'>
          <Slider {...settings}>
            {listTopSell.map((e: CardProps) => (
              <Card data={e}/>
            ))}
          </Slider>
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
