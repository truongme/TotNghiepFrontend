import React from 'react';
import './styles.scss';
import imageBanner from '../../assets/images/banner.webp';
import imgNewArrival from '../../assets/images/new-arrival.jpg';
import imgBackground from '../../assets/images/bgcollection.jpg'; 
import Card from '../../components/Card';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    cssEase: 'ease-in-out',  // Hiệu ứng chuyển đổi mượt mà
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const settings2 = {
      dots: false,
      infinite: true,
      speed: 500,
      cssEase: 'ease-in-out',  // Hiệu ứng chuyển đổi mượt mà
      slidesToShow: 2.5, // Hiển thị 2 thẻ và một nửa thẻ tiếp theo
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <div className='banner-container'>
        <img src={imageBanner} alt="image banner" style={{ width: '100%', objectFit: 'cover' }} />
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
            <img src={imgNewArrival} alt="new-arrival" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className='new-arrival-card' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '15px' }}>
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
        <div className='collection-container' 
             style={{ 
               backgroundImage: `url(${imgBackground})`, 
               backgroundSize: 'cover', 
               backgroundPosition: 'center', 
               height: '700px', 
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
             }}>
          {/* Chia ảnh nền thành 40% bên trái và 60% bên phải */}
          <div style={{ width: '40%' }}></div> {/* Phần ảnh nền trống 40% bên trái */}

          <div style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Nội dung text */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1>YOUNG & HIP</h1>
              <h2>#Varsity Collection</h2>
            </div>

            {/* Slider cho phần Bộ Sưu Tập */}
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
      <div className="line-arrow" style={{ transform: 'translate(-75%, -50%) rotate(-45deg)' }}></div>
    </div>
  );
};

// Nút "Previous"
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <div className="line-arrow" style={{ transform: 'translate(-25%, -50%) rotate(135deg)' }}></div>
    </div>
  );
};

export default Home;
