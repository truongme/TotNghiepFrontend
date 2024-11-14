import React, { useEffect, useState } from 'react'
import './styles.scss'
import { formatPrice } from '../../../helpers'
import axios from 'axios'
import { WebUrl } from '../../../constants'

const OrderUser = () => {
    const [statusSelected, setStatusSelected] = useState<string>("")
    const [orderUser, setOrderUser] = useState<any>()
    const [orderUserPrev, setOrderUserPrev] = useState<any>()
    const token = sessionStorage.getItem("token");

    const handleChangeStatus = (status: string) => {
        setStatusSelected(status)
        const result = orderUserPrev?.filter((e: any) => e.status === status)
        setOrderUser(result)
    }

    const fetchOrderUser = async () => {
        try {
            const response = await axios.get(`${WebUrl}/api/v1/users/order`, {
                headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Authorization': `Bearer ${token}`, 
                }
            });

            setOrderUser(response.data)
            setOrderUserPrev(response.data)
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
                    <li className={`${statusSelected === 'ship' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("ship")}>To Ship</li>
                    <li className={`${statusSelected === 'deliver' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("deliver")}>Delivered</li>
                    <li className={`${statusSelected === 'cancel' ? "active" : ""} order-status-item`} onClick={() => handleChangeStatus("cancel")}>Cancelled</li>
                </ul>
            </div>
            {orderUser?.map((e: any) => (
                <div className='order-item-container'>
                    <div className='order-item-status'>{e.status}</div>
                    {e?.item?.map((x: any) => {
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
                    })}
                    <div className='order-item-footer'>
                        <div>
                            <button className='primary'>Buy Again</button>
                            <button className='secondary'>Contact Seller</button>
                        </div>
                        <div className='d-flex'>
                            <div >Order Total: </div>
                            <div className='total-price'>{formatPrice(1500000)}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='order-item-container'>
                <div className='order-item-status'>Cancelled</div>
                <div className='order-item'>
                    <div className='order-item-content'>
                        <div className='order-item-img'>
                            <img src="https://product.hstatic.net/200000642007/product/43crs_3fmth1144_1_15de8306ab8947d2a316cfcffe37e755_5410a48120194ab9a1d58d597ef9073c_master.jpg" alt="" />
                        </div>
                        <div>
                            <div>MLB - Áo thun unisex cổ tròn tay ngắn Vintage Sports Functional Big Logo</div>
                            <div>Color: </div>
                            <div>Size: </div>
                            <div>Quantity: </div>
                        </div>
                    </div>
                    <div>
                        40.0000đ
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-content'>
                        <div className='order-item-img'>
                            <img src="https://product.hstatic.net/200000642007/product/43crs_3fmth1144_1_15de8306ab8947d2a316cfcffe37e755_5410a48120194ab9a1d58d597ef9073c_master.jpg" alt="" />
                        </div>
                        <div>
                            <div>MLB - Áo thun unisex cổ tròn tay ngắn Vintage Sports Functional Big Logo</div>
                            <div>Color: </div>
                            <div>Size: </div>
                            <div>Quantity: </div>
                        </div>
                    </div>
                    <div>
                        40.0000đ
                    </div>
                </div>
                <div className='order-item-footer'>
                    <div>
                        <button className='primary'>Buy Again</button>
                        <button className='secondary'>Contact Seller</button>
                    </div>
                    <div className='d-flex'>
                        <div >Order Total: </div>
                        <div className='total-price'>{formatPrice(1500000)}</div>
                    </div>
                </div>
            </div>
            <div className='order-item-container'>
                <div className='order-item-status'>Cancelled</div>
                <div className='order-item'>
                    <div className='order-item-content'>
                        <div className='order-item-img'>
                            <img src="https://product.hstatic.net/200000642007/product/43crs_3fmth1144_1_15de8306ab8947d2a316cfcffe37e755_5410a48120194ab9a1d58d597ef9073c_master.jpg" alt="" />
                        </div>
                        <div>
                            <div>MLB - Áo thun unisex cổ tròn tay ngắn Vintage Sports Functional Big Logo</div>
                            <div>Color: </div>
                            <div>Size: </div>
                            <div>Quantity: </div>
                        </div>
                    </div>
                    <div className='total-price'>
                        {formatPrice(750000)}
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-content'>
                        <div className='order-item-img'>
                            <img src="https://product.hstatic.net/200000642007/product/43crs_3fmth1144_1_15de8306ab8947d2a316cfcffe37e755_5410a48120194ab9a1d58d597ef9073c_master.jpg" alt="" />
                        </div>
                        <div>
                            <div>MLB - Áo thun unisex cổ tròn tay ngắn Vintage Sports Functional Big Logo</div>
                            <div>Color: </div>
                            <div>Size: </div>
                            <div>Quantity: </div>
                        </div>
                    </div>
                    <div className='total-price'>
                        {formatPrice(750000)}
                    </div>
                </div>
                <div className='order-item-footer'>
                    <div>
                        <button className='primary'>Buy Again</button>
                        <button className='secondary'>Contact Seller</button>
                    </div>
                    <div className='d-flex'>
                        <div >Order Total: </div>
                        <div className='total-price'>{formatPrice(1500000)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderUser