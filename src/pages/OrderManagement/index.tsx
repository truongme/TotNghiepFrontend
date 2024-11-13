import React, { useState } from 'react'
import './styles.scss'
import { MdCancel } from "react-icons/md";
import {getSelectColor, OrderStatus } from '../../constants';

interface OrderTable {
  orderId: string;
  status: string;
  payment: any;
  shipment: any;
  user: any;
}

const OrderManagement = () => {

  const orders: OrderTable[] = [
    {
        status: "PENDING",
        orderId: "cm388jg0a00008xkjw8y1hhsy",
        user: {
            lastName: "Cong Van",
            firstName: "Dao"
        },
        payment: {
            paymentMethod: "COD"
        },
        shipment: {
            estimatedDeliveryDate: "2024-11-11T14:10:38.908Z"
        }
    },
    {
      status: "CANCELLED",
        orderId: "cm388jg0a00018xkjrahswpqa",
        user: {
            lastName: "Xuan Dong",
            firstName: "Dao"
        },
        payment: {
            paymentMethod: "COD"
        },
      shipment: {
            estimatedDeliveryDate: "2024-11-10T14:22:38.214Z"
        }
    },
    {
        status: "IN_CART",
        orderId: "cm388jg0a00028xkjvhynz5lk",
        user: {
            lastName: "Quang Truong",
            firstName: "Ngo"
        },
        payment: null,
        shipment: null
    }
];

  const [selectTab, setSelectTab] = useState<string>("all")
  const [selectOrder, setSelectOrder] = useState<string>("")
  const [status, setStatus] = useState(OrderStatus[0].value);

  const handleChangeTab = (status: string) => {
    setSelectTab(status)
  }

  return (
    <div className='conntainer p-3 order-admin-container'>
      <div className='order-header'>
        <div className={`order-header-item ${selectTab === "all" ? 'active' : ''}`} onClick={() => handleChangeTab("all")}>Tất cả</div>
        <div className={`order-header-item ${selectTab === "waiting" ? 'active' : ''}`} onClick={() => handleChangeTab("waiting")}>Chờ xác nhận</div>
        <div className={`order-header-item ${selectTab === "delivery" ? 'active' : ''}`} onClick={() => handleChangeTab("delivery")}>Đang giao hàng</div>
        <div className={`order-header-item ${selectTab === "completed" ? 'active' : ''}`} onClick={() => handleChangeTab("completed")}>Đã hoàn thành</div>
      </div>
      <table className="table table-bordered table-striped mt-3 text-center">
        <thead className="table-primary">
          <tr>
            <th>Index</th>
            <th>Order ID</th>
            <th>Người dùng</th>
            <th>Payment</th>
            <th>Shipment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any, index: number) => (
            <tr key={order.orderId} onClick={() => setSelectOrder(order.orderId)}>
              <th>{index+1}</th>
              <td>{order.orderId}</td>
              <td>{order.user.firstName} {order.user.lastName}</td>
              <td>{order.payment?.paymentMethod}</td>
              <td>{order.shipment?.estimatedDeliveryDate}</td>
              <td>
                <div style={{ backgroundColor: getSelectColor(order.status), borderRadius:"20px", padding:'3px 0px'}}>{order.status}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectOrder && (
        <div className='panel-order-details-container'>
          <div className='panel-order-details'>
            <div className='panel-order-details-header'>
              <div className='panel-order-details-header-title'>Order details</div>
              <MdCancel onClick={() => setSelectOrder("")}/>
            </div>
            <div className='panel-order-details-content'>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Order code</div>
                <input disabled className="form-control" placeholder='OrderID' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Username</div>
                <input disabled className="form-control" placeholder='Username' />
              </div>
              <div className='panel-order-details-product'>
                <div>Product</div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Payment</div>
                <input disabled className="form-control" placeholder='Payment' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Shipment</div>
                <input disabled className="form-control" placeholder='Shipment' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Status</div>
                <select
                  className="form-select"
                  aria-label="Trạng thái đơn hàng"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {OrderStatus.map((e: any) => (
                    <option value={e.value}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className='panel-order-footer'>
              <button className='btn-cancel' onClick={() => setSelectOrder("")}>Cancel</button>
              <button className='btn-save'>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement