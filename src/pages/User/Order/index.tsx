import React, { useEffect, useState } from 'react'
import './styles.scss'
import { formatPrice } from '../../../helpers'
import axios from 'axios'
import { WebUrl } from '../../../constants'

interface Order{
    id: string,
    status: string,
    total: number,
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

    const handleChangeStatus = (status: string) => {
        setStatusSelected(status)
        const result = status !== "" ? orderUserPrev?.filter((e: Order) => e.status === status) : orderUserPrev
        setOrderUser(result)
    }

    const fetchOrderUser = async () => {

        try {
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
                total: x.totalPrice,
                items: x.orderItems.map((e: any) => ({
                    id: e.orderItemId,
                    name: e.productVariant.product.name,
                    image: e.productVariant.product.images[0]?.imageURL || '', 
                    quantity: e.quantity,
                    size: e.productVariant.size.sizeType,
                    color: e.productVariant.color.name[0],
                    price: 1000
                }))
            }));

            setOrderUser(data)
            setOrderUserPrev(data)
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
            {orderUser.map((e: Order) => (
                <div className='order-item-container'>
                    <div className='order-item-header'>
                        {e.status === 'PENDING' ? (
                            <div>
                                <button className='button-cancel'>Cancel Order</button>
                            </div>
                        ) : (
                            <div></div>
                        )}
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
                            <button className='primary'>Buy Again</button>
                            <button className='secondary'>Contact Seller</button>
                        </div>
                        <div className='d-flex'>
                            <div >Order Total: </div>
                            <div className='total-price'>{formatPrice(e.total)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderUser