import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import img from '../../assets/images/card.webp';
import { RiDeleteBin2Fill } from "react-icons/ri"; // Icon delete (nếu cần dùng)
import ButtonCustom from '../../components/ButtonCustom'; // Nếu bạn có button custom
import { MdDiscount } from "react-icons/md";
import { FaJediOrder } from "react-icons/fa6";
import axios from 'axios';
import { formatPrice, hexToColorName } from '../../helpers';
import { WebUrl } from '../../constants';

interface CartProps{
  id: string,
  name: string,
  img: string,
  color:string,
  size: string,
  price: number,
  quantity: number,
  total: number,
}

const Cart = () => {

  const [orderArr, setOrderArr] = useState<CartProps[]>([])
  const [totalOrder, setTotalOrder] = useState<Number>(0)
  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/orders/in-cart`,{
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        }
      })
      const data: CartProps[] = response.data.orderItems.map((e: any) => ({
        id: e.orderItemId,
        name: e.name,
        img: e.imageURL,
        color: e.color,
        size: e.size,
        price: e.price,
        quantity: e.quantity,
        total: e.total,
      }))

      const totalOrderAmount = data.reduce((sum, item) => sum + item.total, 0);
      setTotalOrder(totalOrderAmount)
      setOrderArr(data)
    } catch (error) {
      console.error("Error get Order item", error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className="cart-container container">
      <div className='cart-breadcrumb mb-3'>
        <Link to={'/'} className='link-style cart-breadcrumb-item'>Trang chủ</Link>
        <div className='cart-breadcrumb-item'>/</div>
        <div className='cart-breadcrumb-active'>Giỏ hàng</div>
      </div>
      <div className="cart-content">
        <div className='cart-table'>
          <div className='cart-header'>
            <div className='row'>
              <div className='col-6'>Sản phẩm</div>
              <div className='col-2'>Giá</div>
              <div className='col-2'>Số lượng</div>
              <div className='col-2'>Tạm tính</div>
            </div>
          </div>
          <>
            {orderArr.map((e: CartProps) => (
              <div className='cart-item'>
                <div className='row align-items-center'>
                  <div className='col-6 cart-item-product d-flex'>
                    <img src={e.img} alt="product" className='cart-item-img' />
                    <div className='cart-item-details'>
                      <div className='cart-item-title'>{e.name}</div>
                      <div className='cart-item-meta'>
                        <span>Màu: {e.color}</span>
                        <span>Size: {e.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-2 cart-item-price'>
                    <span>{formatPrice(e.price)}</span>
                  </div>
                  <div className='col-2 cart-item-quantity'>
                    <div className="quantity-controls">
                      <div className='quantity-input'>{e.quantity}</div>
                    </div>
                  </div>
                  <div className='col-2 cart-item-total'>
                    <span>{formatPrice(e.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h5>              
              Thông tin đơn hàng
            </h5>
            <div className="cart-summary-item">
              <span>Tạm tính</span>
              <span>{formatPrice(totalOrder)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Tổng</span>
              <span>{formatPrice(totalOrder)}</span>
            </div>
            <div className="cart-discount">
              <label htmlFor="discount">
                <MdDiscount />
                Phiếu ưu đãi
              </label>
              <div className="discount-input-group">
                <input type="text" id="discount" placeholder="Mã ưu đãi" />
                <button className="apply-btn">Áp dụng</button>
              </div>
            </div>
            <Link to={'/pay'} className='link-style'>
              <button className='checkout-btn'>Mua ngay</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
