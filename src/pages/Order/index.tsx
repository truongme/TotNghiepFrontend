import React, { useEffect, useState } from 'react';
import './styles.scss';
import avatar from '../../assets/images/avatar.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { WebUrl } from '../../constants';
import { formatPrice } from '../../helpers';
import { Controller, useForm } from 'react-hook-form';

export interface User {
  avatar: string | null;
  email: string | null;
  firstName: string | null;
  gender: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}
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
interface OrderForm {
  addressDetail: string;
  city: string;
  district: string;
  ward: string;
  shipmentMethod: string;
  paymentId: string;
}

const Order = () => {

  const token = sessionStorage.getItem("token");
  const [profileUser, setProfileUser] = useState<User>()
  const [orderArr, setOrderArr] = useState<CartProps[]>([])
  const [totalOrder, setTotalOrder] = useState<number>(0)
  const [arrCity, setArrCity] = useState<any>([])
  const [arrDistricts, setArrDistricts] = useState<any>([])
  const [arrWard, setArrWard] = useState<any>([])
  const [shippingCost, setShippingCost] = useState<number>(0)
  const { handleSubmit, control, watch } = useForm<OrderForm>();

  const onSubmit = async (data: OrderForm) => {
    console.log('111',data )
    try {
      await axios.put(`${WebUrl}/api/v1/orders/complete-order`, {
        addressDetail: data.addressDetail,
        city: data.city,
        district: data.district,
        ward: data.ward,
        shipmentMethod:  'EXPRESS',
        paymentId: "1",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        }
      });
      
      alert("Mua hàng thành công")
      
    } catch (error) {
      console.error("Error post item cart", error)
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/users/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        }
      });
      setProfileUser(response.data)
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  }

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

  const fetchAddress = async () => {
    try {
      const response = await axios.get('https://open.oapi.vn/location/provinces?size=1000')
      setArrCity(response.data.data)
    } catch (error) {
      console.error("Error fecth adress", error)
    }
  }

  const fetchDistricts = async (id: number) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/districts/${id}?size=1000`)
      setArrDistricts(response.data.data)
    } catch (error) {
      console.error("Error fecth adress", error)
    }
  }

  const fetchWard = async (id: number) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/wards/${id}?size=1000`)
      setArrWard(response.data.data)
    } catch (error) {
      console.error("Error fecth adress", error)
    }
  }

  useEffect(() => {
    getProfile();
    fetchData();
    fetchAddress()
  }, []);

  return (
    <div className='container mb-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='order-breadcrumb'>
          <Link to={'/'} className='link-style order-breadcrumb-item'>Trang chủ</Link>
          <div className='order-breadcrumb-item'>/</div>
          <Link to={'/cart'} className='link-style order-breadcrumb-item'>Giỏ hàng</Link>
          <div className='order-breadcrumb-item'>/</div>
          <div className='order-breadcrumb-active'>Đơn hàng</div>
        </div>
        <div className='row' style={{ marginTop: '15px' }}>
          <div className='col-7'>
            <div className='order-user'>
              <div className='order-user-title'>
                {/* <HiIdentification /> */}
                Thông tin người nhận
              </div>
              <div className='order-infor-user'>
                <div className='order-avatar-user'>
                  <img src={profileUser?.avatar || avatar} alt="User Avatar" />
                </div>
                <div>
                  <h6>{profileUser?.firstName} {profileUser?.lastName}</h6>
                  <p>{profileUser?.email}</p>
                </div>
              </div>
              <div className='row'>
                <div className="mb-3 col-6">
                  <label className="form-label">Địa chỉ</label>
                  <Controller
                    name="addressDetail"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input {...field} className="form-control" placeholder="Nhập địa chỉ cụ thể" />
                    )}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Thành phố / Tỉnh</label>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select 
                        {...field} 
                        className="form-select" 
                        aria-label="Chọn thành phố / tỉnh"
                        onChange={(e) => {
                          field.onChange(e);
                          if(Number(e.target.value)) {
                            if(Number(e.target.value) === 1) {
                              setShippingCost(15000)
                            } else{
                              setShippingCost(30000)
                            }
                          } else {
                            setShippingCost(0)
                          }
                          fetchDistricts(Number(e.target.value));
                        }}
                      >
                        <option selected>Chọn thành phố / tỉnh</option>
                        {arrCity?.map((item: any) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Quận / Huyện</label>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select 
                        {...field} 
                        className="form-select" 
                        aria-label="Chọn quận / huyện" 
                        onChange={(e) => {
                          field.onChange(e);
                          fetchWard(Number(e.target.value));
                        }}
                      >
                        <option selected>Chọn quận / huyện</option>
                        {arrDistricts?.map((item: any) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Phường / Xã</label>
                  <Controller
                    name="ward"
                    control={control} 
                    defaultValue=""
                    render={({ field }) => (
                      <select 
                        {...field} 
                        className="form-select" 
                        aria-label="Chọn tên phường / xã" 
                      >
                        <option selected>Chọn tên phường / xã</option>
                        {arrWard?.map((item: any) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Shipment</label>
                  <Controller
                    name="shipmentMethod"
                    control={control}
                    defaultValue="EXPRESS"
                    render={({ field }) => (
                      <select {...field} className="form-select">
                        <option value="EXPRESS">Express</option>
                        <option value="STANDARD">Standard</option>
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Payment</label>
                  <Controller
                    name="paymentId"
                    control={control}
                    defaultValue={'1'}
                    disabled
                    render={({ field }) => (
                      <input {...field} className="form-control" placeholder="Payment ID" type="number" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-5'>
            <h6 className='order-user-title'>Đơn hàng</h6>
            <div className='order-items'>
              {orderArr.map((item) => (
                <div className='order-cart-item row' key={item.id}>
                  <div className='col-4 order-cart-item-img'>
                    <img src={item.img} alt={item.name} />
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
              <div className='d-flex justify-content-between mb-2'>
                <span>Giao hàng</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className='d-flex justify-content-between'>
                <div >
                  Thành tiền
                </div>
                <p className='m-0 p-0'>{formatPrice(totalOrder + shippingCost)}</p>
              </div>
              <hr />
              <div className='d-flex justify-content-between order-checkout'>
                <Link to='/cart' style={{ textDecoration: 'none' }}>
                  <div className='back-btn'>Quay lại giỏ hàng</div>
                </Link>
                <button type="submit" className='checkout-btn'>Xác nhận đặt hàng</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
