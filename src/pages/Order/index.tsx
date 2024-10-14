import React from 'react'
import './styles.scss'
import avatar from '../../assets/images/avatar.jpg'
import { Link } from 'react-router-dom'
import cart from '../../assets/images/card.webp'

const Order = () => {
  return (
    <div className='container mb-5'>
      <div className='order-breadcrumb'>
        <Link to={'/'} className='link-style order-breadcrumb-item'>Trang chủ</Link>
        <div className='order-breadcrumb-item'>/</div>
        <Link to={'cart'} className='link-style order-breadcrumb-item'>Giỏ hàng</Link>
        <div className='order-breadcrumb-item'>/</div>
        <div className='order-breadcrumb-active'>Đơn hàng</div>
      </div> 
      <div className='row' style={{marginTop:"15px"}}>
        <div className='col-7'>
          <div className='order-user'>
            <h6 className='order-user-title'>Thông tin người nhận</h6>
            <div className='order-infor-user'>
              <div className='order-avatar-user'>
                <img src={avatar} alt="" />
              </div>
              <div>
                <h6>Ngô Quang Trường</h6>
                <p>truongme2k2@gmail.com</p>
              </div>
            </div>
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Họ và tên</label>
                <input type="text" />
              </div>
              <div className='col-6'>
                <label>Số điện thoại</label>
                <input type="text" />
              </div>
            </div>
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Địa chỉ</label>
                <input type="text" />
              </div>
              <div className='col-6'>
                <label>Tỉnh / thành</label>
                <input type="text" />
              </div>
            </div>
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Quận / huyện</label>
                <input type="text" />
              </div>
              <div className='col-6'>
                <label>Phường / xã</label>
                <input type="text" />
              </div>
            </div>
             <div className='row order-input-text'>
              <div className='col'>
                <label>Ghi chú</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className='col-5'>
          <h6 className='order-user-title'>Đơn hàng</h6>
          <div className='order-items'>
            <div className='order-cart-item row'>
              <div className='col-4 order-cart-item-img'>
                <img src={cart} alt="" />
              </div>
              <div className='col-8'>
                <h6>Áo thun unisex cổ tròn tay ngắn Checkerboard Big Lux</h6>
                <div className='d-flex justify-content-between'>
                  <p>9,450,000đ</p>
                  <p>Số lượng: 5</p>
                </div>
              </div>
            </div>
            <div className='order-cart-item row'>
              <div className='col-4 order-cart-item-img'>
                <img src={cart} alt="" />
              </div>
              <div className='col-8'>
                <h6>Áo thun unisex cổ tròn tay ngắn Checkerboard Big Lux</h6>
                <div className='d-flex justify-content-between'>
                  <p>9,450,000đ</p>
                  <p>Số lượng: 5</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <div>Thành tiền</div>
              <div>9,450,000đ</div>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <button>Quay lại giỏ hàng</button>
              <button>Hoàn tất đơn hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order