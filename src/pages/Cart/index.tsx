import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'; // Import file CSS
import img from '../../assets/images/card.webp'; // Import ảnh mẫu
// import { RiDeleteBin2Fill } from "react-icons/ri"; // Icon delete (nếu cần dùng)
import { MdDiscount } from "react-icons/md";
import { FaJediOrder } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  // State quản lý danh sách sản phẩm
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-Shirt Retro Vibes AT.129', color: 'Xanh Dương', size: 'L', price: 189000, quantity: 1, image: img },
    { id: 2, name: 'T-Shirt Retro Vibes AT.129', color: 'Tím', size: 'M', price: 189000, quantity: 3, image: img }
  ]);

  // Hàm tăng/giảm số lượng sản phẩm
  const increaseQuantity = (itemId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Tính tổng giá tạm tính cho tất cả sản phẩm
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
              <div className='col-5'>Sản phẩm</div>
              <div className='col-2'>Giá</div>
              <div className='col-2'>Số lượng</div>
              <div className='col-2'>Tạm tính</div>
              <div className='col-1'></div> {/* Thêm khoảng trống cho nút Xóa */}
            </div>
          </div>

          {/* Hiển thị danh sách sản phẩm */}
          {cartItems.map(item => (
            <div className='cart-item' key={item.id}>
              <div className='row align-items-center'>
                <div className='col-5 cart-item-product d-flex'>
                  <img src={item.image} alt="product" className='cart-item-img' />
                  <div className='cart-item-details'>
                    <div className='cart-item-title'>{item.name}</div>
                    <div className='cart-item-meta'>
                      <span>Màu: {item.color}</span>
                      <span>Size: {item.size}</span>
                    </div>
                  </div>
                </div>
                <div className='col-2 cart-item-price'>
                  <span>{item.price.toLocaleString()}₫</span>
                </div>
                <div className='col-2 cart-item-quantity'>
                  <div className="quantity-controls">
                    <button className='quantity-btn' onClick={() => decreaseQuantity(item.id)}>-</button>
                    <input type='number' className='quantity-input' value={item.quantity} readOnly />
                    <button className='quantity-btn' onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <div className='col-2 cart-item-total'>
                  <span>{(item.price * item.quantity).toLocaleString()}₫</span>
                </div>
                {/* Nút Xóa sản phẩm */}
                <div className='col-1'>
                  <button className='delete-btn' onClick={() => removeItem(item.id)}>
                    {/* <RiDeleteBin2Fill /> */}
                    <MdDeleteOutline />

                  </button>
                </div>
              </div>
            </div>
          ))}
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
