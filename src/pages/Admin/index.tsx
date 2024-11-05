import React, { useState } from 'react';
import './styles.scss';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import ReportManagement from './ReportManagement';
import { FiLogOut } from "react-icons/fi";

const TABS = [
  { id: 'order', label: 'Quản lý đơn hàng', component: <OrderManagement /> },
  { id: 'product', label: 'Quản lý sản phẩm', component: <ProductManagement /> },
  { id: 'revenue', label: 'Thống kê doanh thu', component: <ReportManagement /> },
];

const Admin = () => {
  const [selectTab, setSelectTab] = useState<string>('order');

  return (
    <div className='admin-container'>
      <div className='admin-header'>
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`admin-header-item ${selectTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className='admin-content'>
        {TABS.find(tab => tab.id === selectTab)?.component}
      </div>
    </div>
  );
}

export default Admin;
