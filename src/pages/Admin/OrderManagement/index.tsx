import React, { useState } from 'react'
import './styles.scss'

interface OrderTable {
  id: string;
  status: string;
  
}

const OrderManagement = () => {

  const [selectTab, setSelectTab] = useState<string>("all")

  const handleChangeTab = (status: string) => {
    setSelectTab(status)
  }

  return (
    <>
      <div className='order-header mt-3'>
        <div className={`order-header-item ${selectTab === "all" ? 'active' : ''}`} onClick={() => handleChangeTab("all")}>Tất cả</div>
        <div className={`order-header-item ${selectTab === "waiting" ? 'active' : ''}`} onClick={() => handleChangeTab("waiting")}>Chờ xác nhận</div>
        <div className={`order-header-item ${selectTab === "delivery" ? 'active' : ''}`} onClick={() => handleChangeTab("delivery")}>Đang giao hàng</div>
        <div className={`order-header-item ${selectTab === "completed" ? 'active' : ''}`} onClick={() => handleChangeTab("completed")}>Đã hoàn thành</div>
      </div>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Size</th>
            <th scope="col">Màu</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Action</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </>
  )
}

export default OrderManagement