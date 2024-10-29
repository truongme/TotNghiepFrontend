import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import './styles.scss';
import Card from '../../components/Card';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '../../helpers';
import { error } from 'console';

interface ProductProps {
  id: string;
  images: string[];
  name: string;
  price: string;
  description:string;
}

interface ProductVariants {
  id:string;
  color: string;
  size: string;
  stock: string;
}

const PrevButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button className='prev-btn custom-arrow' onClick={onClick}>
    ❮
  </button>
);

const NextButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button className='next-btn custom-arrow' onClick={onClick}>
    ❯
  </button>
);

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <div className="line-arrow" style={{ transform: 'translate(-75%, -50%) rotate(-45deg)' }}></div>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <div className="line-arrow" style={{ transform: 'translate(-25%, -50%) rotate(135deg)' }}></div>
    </div>
  );
};

const Product = () => {

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    nextArrow: <NextButton onClick={() => {}} />,
    prevArrow: <PrevButton onClick={() => {}} />,
    beforeChange: (current: number, next: number) => setSelectedImageIndex(next), 
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: 'ease-in-out',  
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const navigate = useNavigate()
  const sizeOrder = ['S', 'M', 'L', 'XL'];
  const { id } = useParams<{ id: string }>();
  const [productDetail, setProductDetail] = useState<ProductProps>()
  const [projectVariants, setProjectVariants] = useState<ProductVariants[]>([])
  const [projectVariantsColor, setProjectVariantsColor] = useState<any[]>([])
  const [projectVariantsSize, setProjectVariantsSize] = useState<any[]>([])
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); 
  const [activeTab, setActiveTab] = useState('info');
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  
  const getValidColors = (size: string) => {
    return projectVariants.filter(item => item.size === size).map(item => item.color);
  };

  const getValidSizes = (color: string) => {
    return projectVariants.filter(item => item.color === color).map(item => item.size);
  };

  const handleColorSelect = (color: string) => {
    selectedColor === color ? setSelectedColor('') : setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    selectedSize === size ? setSelectedSize('') : setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if(!selectedColor || !selectedSize) {
      setErrorMessage(true)
    } else {
      const product = projectVariants.find(x => x.color === selectedColor && x.size === selectedSize)
      try {
        await axios.post(`https://f6c4-14-191-163-38.ngrok-free.app/order-item`,{
          quantity : quantity,
          productVariantId: product?.id,
          orderId: "cm2j3ulc80003149t44ho5fbv",
          userId: "cm2j3ulbc0001149t20ex8xiq",
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning'
          }
        })
        alert("Thêm giỏ hàng thành công")
        navigate('/cart')
      } catch (error) {
        console.error("Error post item cart", error)
      }
    }
  }

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`https://f6c4-14-191-163-38.ngrok-free.app/api/v1/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      })

      const result = response.data

      const product: ProductProps = {
        id: result.productId,
        name: result.name,
        price: formatPrice(result.price),
        description: result.description,
        images: result.images,
      };

      const variants: ProductVariants[] = response.data.productVariants.map((e: any) => ({
        id: e.productVariantId,
        color:e.color.hexCode[0],
        size: e.size.sizeType,
        stock: e.stock
      }))

      const color = Array.from(new Set(variants.map(item => item.color)));
      const size = Array.from(new Set(variants.map(item => item.size)));
      
      const sortedSizes = size.sort((a, b) => {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
      });

      setProjectVariants(variants)
      setProjectVariantsColor(color)
      setProjectVariantsSize(sortedSizes)
      setProductDetail(product)
    } catch (error) {
      console.error("Error get product details", error)
    }
  }

  useEffect(() => {
    getProductDetails()
  },[]);

  return (
    <div className='container product-container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='product-images'>
            <Slider {...settings}>
              {productDetail?.images.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Product ${index}`} className='slick-image' />
                </div>
              ))}
            </Slider>
            <div className='product-thumbnails'>
              {productDetail?.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)} 
                />
              ))}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='product-order'>
            <div className='product-name'>
              {productDetail?.name}
            </div>
            <div className='product-size-title'>{productDetail?.description}</div>
            <div className='product-price'>{productDetail?.price}</div>
            <div className='product-size-title'>Chọn màu sắc</div>
            <div className='product-color'>
              {projectVariantsColor.map((color: any) =>(
                <div className={`color-option-border ${selectedColor === color ? 'selected' : ''}`}>
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    disabled={selectedSize ? !getValidSizes(color).includes(selectedSize):false}
                    className={`color-option `} 
                    style={{background:color}}
                  >
                  </button>
                </div>
              ))}
            </div>
            <div className='product-size-title'>Chọn kích thước</div>
            <div className='d-flex product-sizes'>
              {projectVariantsSize.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`product-size ${selectedSize === size ? 'selected' : ''}`} 
                  disabled={selectedColor ? !getValidColors(size).includes(selectedColor) : false}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className='product-size-title'>Số lượng</div>
            <input
              type='number'
              value={quantity}
              min='1'
              onChange={(e) => setQuantity(Number(e.target.value))}
              className='quantity-input'
            />
            {errorMessage && (
              <div className='error-message'>Vui lòng chọn màu sắc và size cho sản phẩm!</div>
            )}
            <div className='product-order-btn'>
              <button className='btn-add-cart' onClick={e => handleAddToCart()}>Thêm vào giỏ hàng</button>
              <div className='btn-order'>Mua ngay</div>
            </div>
            <div className='product-promotion'>
              <h5>MLB Chào bạn mới</h5>
              <p>Nhận ngay ưu đãi 5% khi đăng ký thành viên và mua đơn hàng nguyên giá đầu tiên tại website*</p>
              <p>Nhập mã: MLBWELCOME</p>
            </div>
          </div>
        </div>
      </div>
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
      <div className='container mt-5'>
        <div className='title-folder-home'>Có thể bạn cũng thích</div>
        <div className='top-sale'>
          <Slider {...settings2}>
          </Slider>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='title-folder-home'>Sản phẩm đã xem</div>
        <div className='top-sale'>
          <Slider {...settings2}>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Product;