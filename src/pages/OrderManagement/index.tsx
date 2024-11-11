import React, { useState } from 'react'
import './styles.scss'

interface OrderTable {
  id: string;
  status: string;
  
}

const OrderManagement = () => {

  const orders = [
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
        status: "PENDING",
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

  const handleChangeTab = (status: string) => {
    setSelectTab(status)
  }

  return (
    <div className='conntainer p-3'>
      <div className='order-header'>
        <div className={`order-header-item ${selectTab === "all" ? 'active' : ''}`} onClick={() => handleChangeTab("all")}>Tất cả</div>
        <div className={`order-header-item ${selectTab === "waiting" ? 'active' : ''}`} onClick={() => handleChangeTab("waiting")}>Chờ xác nhận</div>
        <div className={`order-header-item ${selectTab === "delivery" ? 'active' : ''}`} onClick={() => handleChangeTab("delivery")}>Đang giao hàng</div>
        <div className={`order-header-item ${selectTab === "completed" ? 'active' : ''}`} onClick={() => handleChangeTab("completed")}>Đã hoàn thành</div>
      </div>
      <table className="table table-bordered table-striped mt-3 text-center">
        <thead className="table-primary">
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Size</th>
            <th scope="col">Màu</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.products.map((product: any, index: any) => (
              <tr key={`${order.orderId}-${index}`} >
                {index === 0 && (
                  <td rowSpan={order.products.length}>{order.orderId}</td>
                )}
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.size}</td>
                <td>{product.color}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                {index === 0 && (
                  <>
                    <td rowSpan={order.products.length}>{order.status}</td>
                    <td rowSpan={order.products.length}>
                      <button>Cancel</button>
                      <button>View</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderManagement