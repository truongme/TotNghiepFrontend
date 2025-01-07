import React, { useEffect, useState } from 'react'
import './styles.scss'
import { formatDate, formatPrice } from '../../../helpers'
import axios from 'axios'
import { WebUrl } from '../../../constants'
import ModalMain from '../../../components/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../helpers/AuthContext'

interface Order{
    id: string,
    status: string,
    total: number,
    time: any,
    items: OrderItem[],
}

interface OrderItem{
    id: string,
    name: string,
    image: string,
    quantity: number,
    price: number,
    color: string,
    size: string,
}

const OrderUser = () => {
    
    const [statusSelected, setStatusSelected] = useState<string>("")
    const [orderUser, setOrderUser] = useState<Order[]>([])
    const [orderUserPrev, setOrderUserPrev] = useState<Order[]>([])
    const token = sessionStorage.getItem("token");
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [idOrderCancel, setIdOrderCancel] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedReason, setSelectedReason] = useState<string>();
    const [selectedOtherReason, setSelectedOtherReason] = useState<boolean>(false);
    const [valueOtherReason, setValueOtherReason] = useState<string>("");
    const navigate = useNavigate()

    const reasons = [
       "I don't need this product anymore",
       "I want to change my shipping address",
       "I want to change the delivery method",
       "I want to buy another product",
       "Other reasons"
    ];

    const handleSelectedReason = (reason: string) => {
        setSelectedReason(reason)
        if(reason === "Other reasons"){
            setSelectedOtherReason(true)
        } else{
            setSelectedOtherReason(false)
            setValueOtherReason("")
        }
    }

    const bodyModal = () => {
        return (
            <div style={{width: '100%'}}>
                {reasons.map((reason) => (
                    <div className="form-check" key={reason}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="cancelReason"
                            value={reason}
                            onChange={() => handleSelectedReason(reason)}
                            checked={selectedReason === reason}
                        />
                        <label className="form-check-label">
                            {reason}
                        </label>
                    </div>
                ))}
                {selectedOtherReason && (
                    <div className='mt-1'>
                        <textarea className="form-control" onChange={(e) => setValueOtherReason(e.target.value)}></textarea>
                    </div>
                )}
            </div>
        );
    };

    const handleOpenModalCancelOrder = (id: string) => {
        setIsOpenModal(true)
        setIdOrderCancel(id)
    }

    const handleCloseModalCancelOrder = () => {
        setIsOpenModal(false)
    }

    const handleCancelOrder = () => {
        setIsOpenModal(false)
        putStatusOrder(idOrderCancel)
        setStatusSelected("")
        fetchOrderUser()
    }

    const handleChangeStatus = (status: string) => {
        setStatusSelected(status)
        const result = status !== "" ? orderUserPrev?.filter((e: Order) => e.status === status) : orderUserPrev
        setOrderUser(result)
    }

    const putStatusOrder = async (id: string) => {
        console.log(selectedOtherReason ? valueOtherReason : selectedReason)
        try {
            await axios.put(`${WebUrl}/api/v1/orders/cancel-by-user/${id}`, {
                note: selectedOtherReason ? valueOtherReason : selectedReason
            }, 
            {
                headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Authorization': `Bearer ${token}`,
                }
            }
            )
        } catch (error) {
            console.error('Unexpected Error:', error);
        }
    }

    const fetchOrderUser = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${WebUrl}/api/v1/orders/user-order`, {
                headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Authorization': `Bearer ${token}`, 
                }
            });
            const data = response.data.map((x: any) => ({
                id: x.orderId,
                status: x.status,
                total: x.totalAmount,
                time: x.orderDate,
                items: x.orderItems.map((e: any) => ({
                    id: e.orderItemId,
                    name: e.productVariant.product.name,
                    image: e.productVariant.product.images[0]?.imageURL || '',
                    quantity: e.quantity,
                    size: e.productVariant.size.sizeType,
                    color: e.productVariant.color.name[0],
                    price:  e.productVariant.product.price
                }))
            })).sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());


            setOrderUser(data)
            setOrderUserPrev(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Unexpected Error:', error);
        }
    }

    useEffect(() => {
        fetchOrderUser();
    }, []);

    return (
        <div>
            <div className='order-status'>
                <ul className='order-status-list'> 
                    <li className={`${statusSelected === '' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("")}>All</li>
                    <li className={`${statusSelected === 'PENDING' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("PENDING")}>Pending</li>
                    <li className={`${statusSelected === 'SHIPPING' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("SHIPPING")}>To Ship</li>
                    <li className={`${statusSelected === 'DELIVERED' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("DELIVERED")}>Delivered</li>
                    <li className={`${statusSelected === 'CANCELLED' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("CANCELLED")}>Cancelled</li>
                </ul>
            </div>
            {isLoading ? (
                <div className='text-center mt-3'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div> 
                    {orderUser.length>0 ? (
                        <>
                             {orderUser.map((e: Order) => (
                                <div className='order-item-container'>
                                    <div className='order-item-header'>
                                        <div className='order-item-time'>Order Date: {formatDate(e.time)}</div>
                                        <div className='order-item-status'>{e.status}</div>
                                    </div>
                                    {e?.items.map((x: OrderItem) => (
                                        <div className='order-item'>
                                            <div className='order-item-content'>
                                                <div className='order-item-img'>
                                                    <img src={x.image} alt="" />
                                                </div>
                                                <div>
                                                    <div>{x.name}</div>
                                                    <div>Color: {x.color}</div>
                                                    <div>Size: {x.size}</div>
                                                    <div>Quantity: {x.quantity}</div>
                                                </div>
                                            </div>
                                            <div className='total-price'>
                                                {formatPrice(x.price)}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='order-item-footer'>
                                        <div>
                                            {/* <button className='primary' onClick={() => navigate('/product/')}>Buy Again</button> */}
                                            {/* <button className='secondary'>Contact Seller</button> */}
                                            {e.status === 'PENDING' && (
                                                <button className='cancel' onClick={() => handleOpenModalCancelOrder(e.id)}>Cancel</button>
                                            )}
                                        </div>
                                        <div className='d-flex'>
                                            <div >Order Total: </div>
                                            <div className='total-price'>{formatPrice(e.total)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='order-emty'>
                           
                            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png" alt="" />
                            <div>No orders yet</div>
                        </div>
                    )}
                </div>
            )}
            {isOpenModal && (
                <ModalMain title='Notification' content={bodyModal()}  btn1='Cancel' btn2='Yes' onClose={handleCloseModalCancelOrder} onSave={handleCancelOrder}/>
            )}
        </div>
    )
}

export default OrderUser