import React, { useState } from 'react'
import './styles.scss'
import ProductManagement from './ProductManagement'
import OrderManagement from './OrderManagement'
import ReportManagement from './ReportManagement'
import { FiLogOut } from "react-icons/fi";

const Admin = () => {
  const [selectTab, setSelectTab] = useState<string>("order")

  return (
    <div className='admin-container'>
      <div className='admin-header'>
        <div className={`admin-header-item ${selectTab === "order" ? 'active' : ''}`} onClick={() => setSelectTab("order")}>Quản lý đơn hàng</div>
        <div className={`admin-header-item ${selectTab === "product" ? 'active' : ''}`} onClick={() => setSelectTab("product")}>Quản lý sản phẩm</div>
        <div className={`admin-header-item ${selectTab === "revenue" ? 'active' : ''}`} onClick={() => setSelectTab("revenue")}>Thống kê doanh thu</div>
        <div className={`admin-header-item ${selectTab === "revenue" ? 'active' : ''}`} onClick={() => setSelectTab("revenue")}>
          <FiLogOut />
          <div className='admin-header-item-icon'>Đăng xuất</div>
        </div>
      </div>
      <div className='admin-content'>
        {selectTab === "order" && (
          <OrderManagement/>
        )}
        {selectTab === "product" && (
          <ProductManagement />
        )}
        {selectTab === "revenue" && (
          <ReportManagement />
        )}
      </div>
    </div>
  )
}

export default Admin