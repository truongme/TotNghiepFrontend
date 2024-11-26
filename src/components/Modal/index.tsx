import React, { useEffect, useState } from 'react'
import './styles.scss'
import { FaXmark } from "react-icons/fa6";
import axios from 'axios';
import { WebUrl } from '../../constants';
import { formatPrice } from '../../helpers';

interface ModalProps {
    id: string,
    quantity: number,
    colorProps: string,
    sizeProps: string,
    imgProps:string,
    onClose: () => void;
}

interface ProductProps {
  id: string;
  images: string;
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

const Modal: React.FC<ModalProps> = ({ id, quantity, colorProps, sizeProps,imgProps, onClose }) => {

  const sizeOrder = ['XS','S', 'M', 'L', 'XL','XXL'];
  const [productDetail, setProductDetail] = useState<ProductProps>()
  const [projectVariants, setProjectVariants] = useState<ProductVariants[]>([])
  const [projectVariantsColor, setProjectVariantsColor] = useState<any[]>([])
  const [projectVariantsSize, setProjectVariantsSize] = useState<any[]>([])
  const [selectedSize, setSelectedSize] = useState<string>(sizeProps);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantityItem, setQuantityItem] = useState<number>(quantity);
  const token = sessionStorage.getItem("token");
  
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
        images: result.images[0].imageURL,
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

      const colorFilter = response.data.productVariants.find((e: any)=> e.color.name[0] === colorProps)
      console.log(colorFilter)

      setProjectVariants(variants)
      setProjectVariantsColor(color)
      setProjectVariantsSize(sortedSizes)
      setProductDetail(product)
      setSelectedSize(sizeProps)
      setSelectedColor(colorFilter.color.hexCode[0])
    } catch (error) {
      console.error("Error get product details", error)
    }
  }

    useEffect(() => {
      getProductDetails()
    },[id]);

    return (
        <div className='modal-container'>
            <div className='modal-box'>
                <div className='modal-header'>
                    <div className='modal-title'>change option</div>
                    <div onClick={onClose}><FaXmark /></div>
                </div>
                <div className='modal-body'>
                    <div className='modal-body-img'>
                        <img src={imgProps} alt="" />
                    </div>
                    <div className='modal-body-content'>
                        <div className='modal-body-name'>{productDetail?.name}</div>
                        <div className='product-color-modal'>
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
                        <div className='modal-body-size'>
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
                        <div className="quantity-input-modal-container">
                            <button onClick={() => quantityItem>=2 && setQuantityItem(prevQuantity => prevQuantity - 1)} className="quantity-btn-modal">-</button>
                            <input
                            value={quantityItem}
                            onChange={(e: any) => {
                                const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                setQuantityItem(onlyNumbers)
                            }}
                            className="product-quantity-modal"
                            />
                            <button onClick={() => setQuantityItem(prevQuantity => prevQuantity + 1)} className="quantity-btn-modal">+</button>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button className='delete' onClick={onClose}>Cancel</button>
                <button className='edit'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Modal