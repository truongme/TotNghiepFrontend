import React, { useState } from 'react';
import './styles.scss';
import avatar from '../../assets/images/avatar.jpg';
import { Link } from 'react-router-dom';
import cart from '../../assets/images/card.webp';
import { CiMoneyBill } from "react-icons/ci";
import { HiIdentification } from "react-icons/hi2";
import { FaJediOrder } from "react-icons/fa6";

// Define types for Province, District, and Ward
type Province = {
  id: number;
  name: string;
};

type District = {
  id: number;
  name: string;
};

type Ward = {
  id: number;
  name: string;
};

// Define type for Cart Item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Dữ liệu giả cho tỉnh/thành, quận/huyện, phường/xã
const provinces: Province[] = [
  { id: 1, name: 'Hà Nội' },
  { id: 2, name: 'Hồ Chí Minh' }
];

const districts: Record<number, District[]> = {
  1: [
    { id: 1, name: 'Ba Đình' },
    { id: 2, name: 'Hoàn Kiếm' }
  ],
  2: [
    { id: 1, name: 'Quận 1' },
    { id: 2, name: 'Quận 3' }
  ]
};

const wards: Record<number, Ward[]> = {
  1: [
    { id: 1, name: 'Phường 1' },
    { id: 2, name: 'Phường 2' }
  ],
  2: [
    { id: 1, name: 'Phường 3' },
    { id: 2, name: 'Phường 4' }
  ]
};

// Dữ liệu giả cho sản phẩm trong giỏ hàng
const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Áo thun unisex cổ tròn tay ngắn Checkerboard Big Lux',
    price: 189000,
    quantity: 3,
    image: cart
  },
  {
    id: 2,
    name: 'Áo thun unisex cổ tròn tay ngắn Checkerboard Big Lux',
    price: 189000,
    quantity: 5,
    image: cart
  },
  {
    id: 3,
    name: 'Áo thun unisex cổ tròn tay ngắn Checkerboard Big Lux',
    price: 189000,
    quantity: 5,
    image: cart
  }
];

const Order = () => {
  // State để lưu tỉnh/thành, quận/huyện, phường/xã được chọn
  const [selectedProvince, setSelectedProvince] = useState<number | ''>('');
  const [selectedDistrict, setSelectedDistrict] = useState<number | ''>('');
  const [selectedWard, setSelectedWard] = useState<number | ''>('');
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [availableWards, setAvailableWards] = useState<Ward[]>([]);

  // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành
  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = parseInt(event.target.value, 10);
    setSelectedProvince(provinceId);
    setAvailableDistricts(districts[provinceId] || []);
    setSelectedDistrict(''); // Reset quận/huyện khi thay đổi tỉnh/thành
    setAvailableWards([]); // Reset phường/xã khi thay đổi tỉnh/thành
  };

  // Cập nhật danh sách phường/xã khi chọn quận/huyện
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = parseInt(event.target.value, 10);
    setSelectedDistrict(districtId);
    setAvailableWards(wards[districtId] || []);
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const wardId = parseInt(event.target.value, 10);
    setSelectedWard(wardId);
  };

  // Tính tổng số tiền từ các sản phẩm trong giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='container mb-5'>
      {/* Breadcrumb navigation */}
      <div className='order-breadcrumb'>
        <Link to={'/'} className='link-style order-breadcrumb-item'>Trang chủ</Link>
        <div className='order-breadcrumb-item'>/</div>
        <Link to={'/cart'} className='link-style order-breadcrumb-item'>Giỏ hàng</Link>
        <div className='order-breadcrumb-item'>/</div>
        <div className='order-breadcrumb-active'>Đơn hàng</div>
      </div>

      {/* Main content */}
      <div className='row' style={{ marginTop: '15px' }}>
        {/* Left side - user information */}
        <div className='col-7'>
          <div className='order-user'>

            <h6 className='order-user-title'>
              <label>
                <HiIdentification />
                Thông tin người nhận
              </label>
              
            </h6>
            <div className='order-infor-user'>
              <div className='order-avatar-user'>
                <img src={avatar} alt="User Avatar" />
              </div>
              <div>
                <h6>Ngô Quang Trường</h6>
                <p>truongme2k2@gmail.com</p>
              </div>
            </div>

            {/* Input fields for user information */}
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Họ và tên</label>
                <input type="text" placeholder="Nhập họ và tên" />
              </div>
              <div className='col-6'>
                <label>Số điện thoại</label>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
            </div>

            {/* Dropdown for province */}
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Tỉnh / thành</label>
                <select className={selectedProvince ? 'selected' : ''}
                        onChange={handleProvinceChange}
                >
                  <option value=''>Chọn tỉnh/thành</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown for district */}
              <div className='col-6'>
                <label>Quận / huyện</label>
                <select 
                  className={selectedDistrict ? 'selected' : ''} 
                  onChange={handleDistrictChange} 
                  disabled={!selectedProvince}
                >
                  <option value=''>Chọn quận/huyện</option>
                  {availableDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown for ward */}
            <div className='row order-input-text'>
              <div className='col-6'>
                <label>Phường / xã</label>
                <select 
                  className={selectedWard ? 'selected' : ''} 
                  onChange={handleWardChange} 
                  disabled={!selectedDistrict}
                >
                  <option value=''>Chọn phường/xã</option>
                  {availableWards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label>Địa chỉ</label>
                <input type="text" placeholder="Nhập địa chỉ" />
              </div>
            </div>

            <div className='row order-input-text'>
              <div className='col'>
                <label>Ghi chú</label>
                <input type="text" placeholder="Nhập ghi chú nếu có" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - order summary */}
        <div className='col-5'>
          <h6 className='order-user-title'>
            <label htmlFor="">
              <FaJediOrder />
              Đơn hàng
            </label>
            
          </h6>
          <div className='order-items'>
            {/* Loop through each item in the cart */}
            {cartItems.map((item) => (
              <div className='order-cart-item row' key={item.id}>
                <div className='col-4 order-cart-item-img'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='col-8'>
                  <h6>{item.name}</h6>
                  <div className='d-flex justify-content-between'>
                    <p>{item.price.toLocaleString('vi-VN')}đ</p>
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}

            <hr />
            {/* Display total amount */}
            <div className='d-flex justify-content-between'>
              <label htmlFor="total-amount">
                <CiMoneyBill />
                Thành tiền
                
              </label>
              <label htmlFor="total-amount1">
                <div>{totalAmount.toLocaleString('vi-VN')}đ</div>

              </label>
            </div>
            <hr />

            {/* Action buttons */}
            <div className='d-flex justify-content-between order-checkout'>
              <Link to='/cart' style={{ textDecoration: 'none' }}>
                <button className='back-btn'>Quay lại giỏ hàng</button>
              </Link>
              <button className='checkout-btn'>Xác nhận đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
