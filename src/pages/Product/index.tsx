import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import './styles.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '../../helpers';
import { WebUrl } from '../../constants';
import ModalMain from '../../components/Modal/Modal';
import ImageZoom from '../../components/ZoomImg/ZoomImg';
import { useAuth } from '../../helpers/AuthContext';

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

  const navigate = useNavigate()
  const sizeOrder = ['XS','S', 'M', 'L', 'XL','XXL'];
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
  const [errorMessage, setErrorMessage] = useState<string>('')
  const token = sessionStorage.getItem("token");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [urlImageHover, setUrlImageHover] = useState<string>("")
  const {setCart} = useAuth()

  const handleCloseModalImg = () => {
    setUrlImageHover("");
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseModalCheckout = () => {
    setIsOpenModal(false);
     navigate('/cart')
  };
  
  
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
  const handleBuy = async () => {
    handleAddToCart()
    navigate('/cart')
  }

  const handleAddToCart = async () => {
    if(!selectedColor || !selectedSize || !quantity) {
      setErrorMessage('Vui lòng chọn màu sắc và size cho sản phẩm!')
    } else if(!token) {
      setErrorMessage('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!')
    } else {
      const product = projectVariants.find(x => x.color === selectedColor && x.size === selectedSize)
      try {
        setCart(true)
        await axios.post(`${WebUrl}/api/v1/order-item`, {
          quantity: quantity,
          productVariantId: product?.id,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Authorization': `Bearer ${token}`, 
          }
        });
        setIsOpenModal(true)
        setCart(false)
      } catch (error) {
        console.error("Error post item cart", error)
      }
    }
  }

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/products/${id}`, {
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
        images: result.images.map((e : any) => e.imageURL),
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
      setSelectedSize(size?.[0])
      setSelectedColor(variants?.find((e: any) => e.size === size?.[0])?.color || "")
    } catch (error) {
      console.error("Error get product details", error)
    }
  }

  useEffect(() => {
    getProductDetails()
  },[id]);

  return (
    <div className='container product-container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='product-images'>
              {productDetail?.images.map((img, index) => (
                <div key={index} className='slick-image' onClick={() => setUrlImageHover(img)}>
                  <img src={img}/>
                </div>
              ))}
          
          </div>
        </div>
        <div className='col-md-6'>
          <div className='product-order'>
            <div className='product-name'>
              {productDetail?.name}
            </div>
            <div dangerouslySetInnerHTML={{ __html: productDetail?.description || "" }} className='product-size-title'></div>
            <div className='product-price pb-1'>{productDetail?.price}</div>
            <div className='product-size-title pb-1'>Color</div>
            <div className='product-color  pb-1'>
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
            <div className='product-size-title  pb-1'>Size</div>
            <div className='d-flex product-sizes  pb-1'>
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
            <div className='d-flex pb-1 pt-1 align-items-center'>
              <div className='product-size-title'>Quantity</div>
              <div className="quantity-input-container">
                <button onClick={() => quantity>=2 && setQuantity(prevQuantity => prevQuantity - 1)} className="quantity-btn">-</button>
                <input
                  value={quantity}
                  onChange={(e: any) => {
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setQuantity(onlyNumbers)
                  }}
                  className="product-quantity"
                />
                <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)} className="quantity-btn">+</button>
              </div>
            </div>
            {errorMessage && (
              <div className='error-message'>{errorMessage}</div>
            )}
            {/* <div className='product-description'>
              <div className='product-description-title'>description</div>
              <div className='product-description-content'>
                Phong cách adidas cổ điển thể hiện qua đôi giày phong cách chạy bộ này. Kết hợp những gì tuyệt vời nhất của thiết kế giày chạy bộ classic và đường nét gọn gàng của phong cách streetwear hiện đại, đôi giày này mang hơi hướng kinh điển dễ dàng kết hợp với outfit thường ngày của bạn.
              </div>
            </div> */}
            <div className='product-order-btn'>
              <button className='btn-add-cart' onClick={e => {handleAddToCart()}}>add to bag</button>
              <button className='btn-order' onClick={() => handleBuy()}>check out</button>
              
            </div>
            <div><div className='product-promotion'>
              <h5>MLB Chào bạn mới</h5>
              <p>Nhận ngay ưu đãi 5% khi đăng ký thành viên và mua đơn hàng nguyên giá đầu tiên tại website*</p>
              <p>Nhập mã: MLBWELCOME</p>
            </div></div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <ModalMain title='Notification' content='Item has been added to cart' btn1='Ok' onSave={handleCloseModalCheckout} btn2='Checkout' onClose={handleCloseModal}/>
      )}
      {urlImageHover && (
        <ModalMain title='Image Product' content={<ImageZoom src={urlImageHover}/>} btn2='Ok' onSave={handleCloseModalImg} btn1='Close' onClose={handleCloseModalImg}/>
      )}
    </div>
  );
};

export default Product;