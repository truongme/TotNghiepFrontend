import React, { useState } from 'react'
import './styles.scss'

interface OrderTable {
  id: string;
  status: string;
  
}

const OrderManagement = () => {

  const orders: any[] = [
    {
        orderId: "001",
        status: "Shipped",
        products: [
            { image: "/path/to/image1.jpg", name: "Product 1", size: "M", color: "Red", price: 20, quantity: 2 },
            { image: "/path/to/image2.jpg", name: "Product 2", size: "L", color: "Blue", price: 25, quantity: 1 },
        ],
    },
    {
        orderId: "002",
        status: "Processing",
        products: [
            { image: "/path/to/image3.jpg", name: "Product 3", size: "S", color: "Green", price: 15, quantity: 3 },
        ],
    },
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