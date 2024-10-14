import React, { useState } from 'react';
import Slider from "react-slick";
import './styles.scss'; // Import the appropriate CSS file
import imgProduct1 from '../../assets/images/card.webp';
import imgProduct2 from '../../assets/images/card.webp';
import imgProduct3 from '../../assets/images/card.webp';
import imgProduct4 from '../../assets/images/card.webp';
import imgProduct5 from '../../assets/images/card.webp';
import imgProduct6 from '../../assets/images/card.webp';
import imgProduct7 from '../../assets/images/card.webp';
import Card from '../../components/Card';
// Nút Previous
const PrevButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button className='prev-btn custom-arrow' onClick={onClick}>
    ❮
  </button>
);

// Nút Next
const NextButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button className='next-btn custom-arrow' onClick={onClick}>
    ❯
  </button>
);

const Product = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Quản lý chỉ số hình ảnh hiện tại
  const [selectedSize, setSelectedSize] = useState(''); // Quản lý trạng thái size được chọn
  const [activeTab, setActiveTab] = useState('info'); // Quản lý tab đang hoạt động, khởi tạo với tab 'info'
  const productImages = [imgProduct1, imgProduct2, imgProduct3, imgProduct4, imgProduct5, imgProduct6,imgProduct7];
  const cardArray = Array.from({ length: 10 }, (_, i) => <Card key={i} />);

  // Cấu hình slider
  const settings = {
    dots: false, // Ẩn dots mặc định
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Hiển thị nút điều hướng
    nextArrow: <NextButton onClick={() => {}} />,
    prevArrow: <PrevButton onClick={() => {}} />,
    beforeChange: (current: number, next: number) => setSelectedImageIndex(next), // Cập nhật thumbnail được chọn
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: 'ease-in-out',  // Hiệu ứng chuyển đổi mượt mà
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // beforeChange: (current: number, next: number) => setSelectedImageIndex(next), // Cập nhật thumbnail được chọn
  };

  // Danh sách kích thước
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className='container product-container'>
      <div className='row'>
        {/* Left side - Product Images */}
        <div className='col-md-6'>
          <div className='product-images'>
            {/* Slider Component */}
            <Slider {...settings}>
              {productImages.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Product ${index}`} className='slick-image' />
                </div>
              ))}
            </Slider>

            {/* Thumbnail List */}
            <div className='product-thumbnails'>
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)} // Đổi ảnh khi click vào thumbnail
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className='col-md-6'>
          <div className='product-order'>
            <div className='product-name'>
              MLB - Quần jeans nam ống rộng Basic Small Logo
            </div>
            <div className='product-price'>4,290,000đ</div>

            {/* Select Size */}
            <div className='product-size-title'>Chọn kích thước</div>
            <div className='d-flex product-sizes'>
              {sizes.map((size) => (
                <div
                  key={size}
                  className={`product-size ${selectedSize === size ? 'selected' : ''}`} // Áp dụng class 'selected' cho size được chọn
                  onClick={() => setSelectedSize(size)} // Cập nhật size được chọn khi click
                >
                  {size}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className='product-order-btn'>
              <div className='btn-add-cart'>Thêm vào giỏ hàng</div>
              <div className='btn-order'>Mua ngay</div>
            </div>

            {/* Promotion Info */}
            <div className='product-promotion'>
              <h5>MLB Chào bạn mới</h5>
              <p>Nhận ngay ưu đãi 5% khi đăng ký thành viên và mua đơn hàng nguyên giá đầu tiên tại website*</p>
              <p>Nhập mã: MLBWELCOME</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Product Description, Care Instructions, Return Policy, and Store Info */}
      <div className='row product-tabs'>
        <div className='col-3 tab' onClick={() => setActiveTab('info')}>
          <h3 className={activeTab === 'info' ? 'active' : ''}>THÔNG TIN SẢN PHẨM</h3>
        </div>
        <div className='col-3 tab' onClick={() => setActiveTab('care')}>
          <h3 className={activeTab === 'care' ? 'active' : ''}>HƯỚNG DẪN BẢO QUẢN</h3>
        </div>
        <div className='col-3 tab' onClick={() => setActiveTab('return')}>
          <h3 className={activeTab === 'return' ? 'active' : ''}>CHÍNH SÁCH ĐỔI TRẢ</h3>
        </div>
        <div className='col-3 tab' onClick={() => setActiveTab('store')}>
          <h3 className={activeTab === 'store' ? 'active' : ''}>Tìm tại cửa hàng</h3>
        </div>
      </div>

      {/* Tab Content */}
      <div className='tab-content'>
        {activeTab === 'info' && (
          <div className='product-info'>
            <p>
              Bạn đang tìm kiếm một item có thể tạo nên diện mạo cá nhân, đồng thời giúp đa dạng hóa tủ quần áo của mình? 
              Vậy thì chiếc áo thun Vintage Big Logo Graphic chính là sự lựa chọn hoàn hảo dành cho bạn. 
              Với họa tiết in hình đơn giản nhưng vô cùng nổi bật và ấn tượng, item này sẽ trở thành tâm điểm của mọi bộ trang phục. 
              Dù bạn không biết phải diện gì, chỉ cần khoác lên mình chiếc áo này, phong cách thời trang cá nhân của bạn sẽ tỏa sáng rạng rỡ.
            </p>
            <h4>Thông tin sản phẩm</h4>
            <ul>
              <li><strong>Thương hiệu:</strong> MLB</li>
              <li><strong>Xuất xứ:</strong> Hàn Quốc</li>
              <li><strong>Giới tính:</strong> Unisex</li>
              <li><strong>Kiểu dáng:</strong> Áo thun</li>
              <li><strong>Màu sắc:</strong> Pink, Grey, Off White</li>
              <li><strong>Chất liệu:</strong> 80% Cotton, 20% Polyester</li>
              <li><strong>Cổ:</strong> Tròn, tay ngắn</li>
              <li><strong>Hoạ tiết:</strong> Trơn một màu</li>
              <li><strong>Thiết kế:</strong></li>
              <ul>
                <li>Bo viền cổ áo tinh tế</li>
                <li>Thiết kế logo bóng chày in nổi bật ở mặt trước</li>
                <li>Chất vải mềm mịn, đường may tỉ mỉ, chắc chắn</li>
                <li>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</li>
              </ul>
              <li><strong>Logo:</strong> Chi tiết logo bóng chày in ở gấu tay phải</li>
              <li><strong>Phom:</strong> Rộng thoải mái</li>
              <li><strong>Thích hợp mặc trong các dịp:</strong> Đi chơi, đi làm...</li>
              <li><strong>Xu hướng theo mùa:</strong> Sử dụng được tất cả các mùa trong năm</li>
            </ul>
          </div>
        )}
        {activeTab === 'care' && (
          <div className='product-care'>
            <p>Đang cập nhật...</p>
          </div>
        )}
        {activeTab === 'return' && (
          <div className='product-return'>
            <p>
              Áp dụng cho toàn bộ sản phẩm quần áo nguyên giá. Đối tượng khách hàng: Tất cả khách hàng sử dụng dịch vụ tại vn.mlb-korea.com.
              Thời gian đổi/trả hàng:
            </p>
            <ul>
              <li><strong>Đổi hàng:</strong> Trong vòng 7 ngày tính từ thời điểm nhận hàng.</li>
              <li><strong>Trả hàng:</strong> Trong vòng 30 ngày tính từ thời điểm nhận hàng.</li>
            </ul>
            <p>
              Lưu ý: Sản phẩm phải được giữ nguyên tem mác, chưa qua sử dụng và không bị hư hại. Nếu sản phẩm không đạt tiêu chuẩn, 
              khách hàng sẽ không được chấp nhận đổi/trả hàng.
            </p>
          </div>
        )}
        {activeTab === 'store' && (
          <div className='product-store'>
            <p>Đang cập nhật...</p>
          </div>
        )}
      </div>

      {  /* Có thể bạn cũng thích*/}
      <div className='container mt-5'>
        {/* Left side - Product Images */}
        <div className='title-folder-home'>Có thể bạn cũng thích</div>
        <div className='top-sale'>
            {/* Slider Component */}
            <Slider {...settings2}>
            {cardArray}
          </Slider>
        </div>
      </div>

      <div className='container mt-5'>
        {/* Left side - Product Images */}
        <div className='title-folder-home'>Sản phẩm đã xem</div>
        <div className='top-sale'>
            {/* Slider Component */}
            <Slider {...settings2}>
            {cardArray}
          </Slider>
        </div>
      </div>
    </div>
  );
};



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
export default Product;