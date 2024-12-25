import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';
import axios from 'axios';
import { formatPrice, hexToColorName } from '../../helpers';
import { WebUrl } from '../../constants';
import Modal from '../../components/Modal';
import imgCartEmpry from '../../assets/images/empty-cart.png'
import { useAuth } from '../../helpers/AuthContext';

interface CartProps{
  id: string,
  name: string,
  img: string,
  color:string,
  size: string,
  price: number,
  quantity: number,
  total: number,
  productId: string
}

const Cart = () => {

  const [orderArr, setOrderArr] = useState<CartProps[]>([])
  const [totalOrder, setTotalOrder] = useState<Number>(0)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<string>("")
  const token = sessionStorage.getItem("token");
  const [propsModal , setPropsModal] = useState<any>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {setCart} = useAuth()

  const handleOpenModal = (obj: any) => {
    setIsOpenModalEdit(obj.productId)
    const data = {
      orderId: obj.id,
      id: obj.productId,
      quantity: obj.quantity,
      size: obj.size,
      color: obj.color,
      img: obj.img
    }
    setPropsModal(data)
  } 
  
  const handleCloseModal = (isUpdate: boolean) => {
    setIsOpenModalEdit("");
    if (isUpdate) {
      fetchData(); 
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      setCart(true)
      await axios.delete(`${WebUrl}/api/v1/order-item/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`,
        },
      });
      setOrderArr((prevOrderArr) => prevOrderArr.filter((item) => item.id !== id));
      const newTotalOrder = orderArr
        .filter((item) => item.id !== id)
        .reduce((sum, item) => sum + item.total, 0);
      setTotalOrder(newTotalOrder);
      setCart(false)
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchData = async () => {
    try {
      setIsLoading(true)
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
        productId: e.productId
      }))

      const totalOrderAmount = data.reduce((sum, item) => sum + item.total, 0);
      setTotalOrder(totalOrderAmount)
      setOrderArr(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error get Order item", error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className="cart-container container">
      <div className='cart-breadcrumb mb-3'>
        <Link to={'/'} className='link-style cart-breadcrumb-item'>home</Link>
        <div className='cart-breadcrumb-item'>/</div>
        <div className='cart-breadcrumb-active'>CART</div>
      </div>
      <div className="cart-content">
        <div className='cart-table'>
          <div className='cart-header'>
            <div className='row'>
              <div className='col-4'>Product</div>
              <div className='col-2'>price</div>
              <div className='col-2'>quantity</div>
              <div className='col-2'>Provisional</div>
              <div className='col-2'>Action</div>
            </div>
          </div>
          {isLoading ? (
            <div className='text-center mt-3'>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {!orderArr || orderArr.length === 0 ? (
                <div className='cart-empty'>
                  <img src={imgCartEmpry} alt="" className='img-cart-item'/>
                  <div className='mb-2'>Your shopping cart is empty</div>
                  <Link to={'/'}><button className='btn-primary'>Go Shopping Now</button></Link>
                </div>
              ) : (
                <div>
                  {orderArr.map((e: CartProps) => (
                    <div className='cart-item'>
                      <div className='row align-items-center'>
                        <div className='col-4 cart-item-product d-flex'  onClick={() => navigate(`/product/${e.productId}`)}>
                          <img src={e.img} alt="product" className='cart-item-img' />
                          <div className='cart-item-details'>
                            <div className='cart-item-title'>{e.name}</div>
                            <div className='cart-item-meta'>
                              <div>Màu: {e.color}</div>
                              <div>Size: {e.size}</div>
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
                        <div className='col-2 cart-item-action'>
                          <button className='btn-secondary' onClick={() => handleOpenModal(e)}>Edit</button>
                          <button className='btn-primary' onClick={() => handleDeleteItem(e.id)}>Delete</button>
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
         
        </div>
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h5>              
              Order information
            </h5>
            <div className="cart-summary-item">
              <span>Provisional</span>
              <span>{formatPrice(totalOrder)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Total</span>
              <span>{formatPrice(totalOrder)}</span>
            </div>
            <div className='cart-btn'>
              <button className='btn-secondary' onClick={() => navigate("/")}>Continue Shopping</button>
              <button className='btn-primary' disabled={totalOrder === 0} onClick={() => navigate("/pay")}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      {isOpenModalEdit && (
        <Modal orderId={propsModal.orderId} id={propsModal.id} quantity={propsModal.quantity} sizeProps={propsModal.size} colorProps={propsModal.color} imgProps={propsModal.img} onClose={handleCloseModal}/>
      )}
    </div>
  );
};

export default Cart;
