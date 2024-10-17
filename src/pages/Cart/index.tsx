import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'; // Import file CSS
import img from '../../assets/images/card.webp'; // Import ảnh mẫu
import { RiDeleteBin2Fill } from "react-icons/ri"; // Icon delete (nếu cần dùng)
import ButtonCustom from '../../components/ButtonCustom'; // Nếu bạn có button custom
import { MdDiscount } from "react-icons/md";
import { FaJediOrder } from "react-icons/fa6";

const Cart = () => {
  // State quản lý số lượng và giá cho từng sản phẩm
  const [quantity1, setQuantity1] = useState(1); // Sản phẩm 1
  const [quantity2, setQuantity2] = useState(3); // Sản phẩm 2

  // Giá của mỗi sản phẩm
  const price1 = 189000;
  const price2 = 189000;

  // Tính tổng giá tạm tính cho mỗi sản phẩm dựa trên số lượng
  const total1 = quantity1 * price1;
  const total2 = quantity2 * price2;
  const totalPrice = total1 + total2; // Tổng giá tạm tính cho tất cả sản phẩm

  // Hàm tăng/giảm số lượng
  const increaseQuantity = (quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>) => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>) => {
    if (quantity > 1) setQuantity(quantity - 1); // Số lượng không được nhỏ hơn 1
  };

  return (
    <div className="cart-container container">
      {/* Breadcrumb */}
      <div className='cart-breadcrumb'>
        <Link to={'/'} className='link-style cart-breadcrumb-item'>Trang chủ</Link>
        <div className='cart-breadcrumb-item'>/</div>
        <div className='cart-breadcrumb-active'>Giỏ hàng</div>
      </div>

      {/* Container chung chứa 2 phần */}
      <div className="cart-content">
        {/* Phần Sản phẩm */}
        <div className='cart-table'>
          <div className='cart-header'>
            <div className='row'>
              <div className='col-6'>Sản phẩm</div>
              <div className='col-2'>Giá</div>
              <div className='col-2'>Số lượng</div>
              <div className='col-2'>Tạm tính</div>
            </div>
          </div>

          {/* Cart Item 1 */}
          <div className='cart-item'>
            <div className='row align-items-center'>
              <div className='col-6 cart-item-product d-flex'>
                <img src={img} alt="product" className='cart-item-img' />
                <div className='cart-item-details'>
                  <div className='cart-item-title'>T-Shirt Retro Vibes AT.129</div>
                  <div className='cart-item-meta'>
                    <span>Màu: Xanh Dương</span>
                    <span>Size: L</span>
                  </div>
                </div>
              </div>
              <div className='col-2 cart-item-price'>
                <span>{price1.toLocaleString()}₫</span>
              </div>
              <div className='col-2 cart-item-quantity'>
                <div className="quantity-controls">
                  <button className='quantity-btn' onClick={() => decreaseQuantity(quantity1, setQuantity1)}>-</button>
                  <input type='number' className='quantity-input' value={quantity1} readOnly />
                  <button className='quantity-btn' onClick={() => increaseQuantity(quantity1, setQuantity1)}>+</button>
                </div>
              </div>
              <div className='col-2 cart-item-total'>
                <span>{total1.toLocaleString()}₫</span>
              </div>
            </div>
          </div>

          {/* Cart Item 2 */}
          <div className='cart-item'>
            <div className='row align-items-center'>
              <div className='col-6 cart-item-product d-flex'>
                <img src={img} alt="product" className='cart-item-img' />
                <div className='cart-item-details'>
                  <div className='cart-item-title'>T-Shirt Retro Vibes AT.129</div>
                  <div className='cart-item-meta'>
                    <span>Màu: Tím</span>
                    <span>Size: M</span>
                  </div>
                </div>
              </div>
              <div className='col-2 cart-item-price'>
                <span>{price2.toLocaleString()}₫</span>
              </div>
              <div className='col-2 cart-item-quantity'>
                <div className="quantity-controls">
                  <button className='quantity-btn' onClick={() => decreaseQuantity(quantity2, setQuantity2)}>-</button>
                  <input type='number' className='quantity-input' value={quantity2} readOnly />
                  <button className='quantity-btn' onClick={() => increaseQuantity(quantity2, setQuantity2)}>+</button>
                </div>
              </div>
              <div className='col-2 cart-item-total'>
                <span>{total2.toLocaleString()}₫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Thông tin đơn hàng */}
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h5>
              <FaJediOrder />
              Thông tin đơn hàng
            </h5>
            <div className="cart-summary-item">
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString()}₫</span>
            </div>
            <div className="cart-summary-item">
              <span>Giao hàng</span>
              <span>Giao hàng miễn phí</span>
            </div>
            <div className="cart-summary-item">
              <span>Tổng</span>
              <span>{totalPrice.toLocaleString()}₫</span>
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
