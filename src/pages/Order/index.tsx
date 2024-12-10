import React, { useEffect, useState } from 'react';
import './styles.scss';
import avatar from '../../assets/images/avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WebUrl } from '../../constants';
import { formatPrice } from '../../helpers';
import { Controller, useForm } from 'react-hook-form';
import ModalMain from '../../components/Modal/Modal';
import { FaCheck } from "react-icons/fa6";

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
  addressId: string;
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
  const { handleSubmit, control,setValue, watch, formState: { errors } } = useForm<OrderForm>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalExit, setIsOpenModalExit] = useState<boolean>(false)
  const navigate = useNavigate()
  const [arrMyAddresses, setArrMyAddresses] = useState<any[]>([])
  const [addressIdSelect, setAddressIdSelect] = useState<any>()

  const handleCloseModal = () => {
    setIsOpenModal(false)
    navigate('/')
  }

  const handleCloseModalExit = () => {
    setIsOpenModalExit(false)
    navigate('/cart')
  }

  const handleCancelCloseModalExit = () => {
    setIsOpenModalExit(false)
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId === 'new') {
      setValue('addressDetail', '');
      setValue('city', '');
      setValue('district','');
      setValue('ward', '');
    } else {
      const address : any = arrMyAddresses?.find((addr : any) => addr.addressId == selectedId);
      if (address) {
        setAddressIdSelect(selectedId)
        setValue('addressDetail', address.addressDetail || '');
        setValue('city', address.city || '');
        fetchDistricts(address.city)
        fetchWard(address.district)
        setValue('district', address.district || '');
        setValue('ward', address.ward || '');
      }
    }
  };

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

  const onSubmit = async (data: OrderForm) => {
    try {
      console.log(addressIdSelect)
      await axios.put(`${WebUrl}/api/v1/orders/complete-order`, {
        addressId: addressIdSelect,
        addressDetail: data.addressDetail,
        city: data.city,
        district: data.district,
        ward: data.ward,
        shipmentMethod:  data.shipmentMethod,
        paymentId: "1",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        }
      });
      setIsOpenModal(true)
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

  const fetchMyAddress = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/addresses/all`, {
        headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Authorization': `Bearer ${token}`, 
        }
      });
      setArrMyAddresses(response.data)
    } catch (error) {
      console.error("Error fetching address details", error);
    }
  };

  useEffect(() => {
    getProfile();
    fetchData();
    fetchAddress()
    fetchMyAddress();
  }, []);

  return (
    <div className='container mb-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='order-breadcrumb' style={{ paddingTop: '20px' }}>
          <Link to={'/'} className='link-style order-breadcrumb-item'>Home</Link>
          <div className='order-breadcrumb-item'>/</div>
          <Link to={'/cart'} className='link-style order-breadcrumb-item'>BAG</Link>
          <div className='order-breadcrumb-item'>/</div>
          <div className='order-breadcrumb-active'>ORDER</div>
        </div>
        <div className='row' style={{ marginTop: '20px' }}>
          <div className='col-7'>
            <div className='order-user'>
              <div className='order-user-title'>
                Recipient information
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
                <div className="mb-3 col-12">
                  <label className="form-label">Your shipping address</label>
                  <select className="form-select" onChange={handleAddressChange}>
                    {arrMyAddresses?.map((address: any) => (
                      <option key={address.addressId} value={address.addressId}>{address.fullAddress}</option>
                    ))}
                    <option value="new">Create shipping address</option>
                  </select>
                </div>
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

               <div className="mb-3 col-12">
                  <label className="form-label">Shipping method</label>
                  <Controller
                    name="shipmentMethod"
                    defaultValue=""
                    control={control}
                    render={({ field }) => {
                      const { value } = field;
                      const city = watch("city")
                      return (
                        <div>
                          <div
                            className={`form-check-ship ${value === 'SHIPMENT' ? 'selected' : ''}`}
                            onClick={() => {setValue('shipmentMethod', 'SHIPMENT'); setShippingCost(city === "1" ? 15000 : 30000)}}
                          >
                            <div className='ship-method-header'>
                              <div>Standard</div>
                              <div>{formatPrice(city === "1" ? 15000 : 30000)}</div>
                            </div>
                            <div className='ship-method-detail'>Guaranteed delivery within 2 to 3 days</div>
                          </div>
                          <div
                            className={`form-check-ship ${value === 'EXPRESS' ? 'selected' : ''}`}
                            onClick={() => {setValue('shipmentMethod', 'EXPRESS'); setShippingCost(50000)}}
                          >
                            <div className='ship-method-header'>
                              <div>Express</div>
                              <div>{formatPrice(50000)}</div>
                            </div>
                            <div className='ship-method-detail'>Guaranteed delivery tomorrow</div>
                          </div>
                          
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="mb-3 col-12">
                  <label className="form-label">Payment method</label>
                  <Controller
                    name="paymentId"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <div>
                        <div className="form-check">
                          <input
                            {...field}
                            id="paymentOnline"
                            type="radio"
                            className="form-check-input"
                            value="online"
                            checked={field.value === 'online'}
                          />
                          <label htmlFor="paymentOnline" className="form-check-label">
                            Online Payment
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            {...field}
                            id="paymentCOD"
                            type="radio"
                            className="form-check-input"
                            value="cod"
                            checked={field.value === 'cod'}
                          />
                          <label htmlFor="paymentCOD" className="form-check-label">
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
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
                <div className='order-cart-item' key={item.id}>
                  <div className='order-cart-item-img'>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div>
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
                <div className='back-btn' onClick={() => setIsOpenModalExit(true)}>Back to cart</div>
                <button type="submit" className='checkout-btn'>Order Confirmation</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {isOpenModal && (
        <ModalMain title='Notification' content='You have successfully placed your order.' btn2='OK' onSave={handleCloseModal}/>
      )}
      {isOpenModalExit && (
        <ModalMain title='Notification' content='Do you want to exit the order checkout page?' btn1='No' btn2='Yes' onClose={handleCancelCloseModalExit} onSave={handleCloseModalExit}/>
      )}
    </div>
  );
};

export default Order;
