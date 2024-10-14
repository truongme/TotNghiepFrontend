import React from 'react';
import './styles.scss';
import imageBanner from '../../assets/images/banner.webp';
import imgNewArrival from '../../assets/images/new-arrival.jpg';
// import imgBackground from '../../assets/images/bgcollection.jpg'; 
import Card from '../../components/Card';
import Slider from 'react-slick';

const Home = () => {
  const arrCategory = [
    { name: 'Quần áo', link: '/login' },
    { name: 'Giày dép', link: '/' },
    { name: 'Mũ nón', link: '/login' },
    { name: 'Phụ kiện', link: '/login' },
  ];
  
  const cardArray = Array.from({ length: 10 }, (_, i) => <Card key={i} />);
  const collectionCardArray = Array.from({ length: 5 }, (_, i) => <Card key={i} />);

  const settings = {
    dots: false,
    infinite: true,
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
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

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
            <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div>
            <div className='p-2'><Card /></div>
          </div>
        </div>
      </div>

      {/* Phần Hàng Bán Chạy */}
      <div className='container mt-5'>
        <div className='title-folder-home'>HÀNG BÁN CHẠY</div>
        <div className='top-sale'>
          <Slider {...settings}>
            {cardArray}
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
              <Slider {...settings2}>
                {collectionCardArray}
              </Slider>
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
