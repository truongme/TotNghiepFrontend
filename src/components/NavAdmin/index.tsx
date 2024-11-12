import React, { useEffect, useState } from 'react';
import './styles.scss';
import { SiNike } from "react-icons/si";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { RiTShirtFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>("dashboard");

  // Update selectedTab based on the current path
  useEffect(() => {
    const pathName = location.pathname.split("/").filter(Boolean).pop();

    if (pathName === "productManagement") {
      setSelectedTab("product");
    } else if (pathName === "orderManagement") {
      setSelectedTab("order");
    } else {
      setSelectedTab("dashboard");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className='nav-container'>
      <div>
        <SiNike className='nav-logo'/>
        <Link to={'/'}>
          <div className={`nav-item ${selectedTab === "dashboard" ? 'active' : ''}`} onClick={() => setSelectedTab("dashboard")}>
            <MdDashboard />
            <div className='nav-item-content'>Dashboard</div>
          </div>
        </Link>
        <Link to={'/productManagement'}>
          <div className={`nav-item ${selectedTab === "product" ? 'active' : ''}`} onClick={() => setSelectedTab("product")}>
            <RiTShirtFill />
            <div className='nav-item-content'>Product</div>
          </div>
        </Link>
        <Link to={'/orderManagement'}>
          <div className={`nav-item ${selectedTab === "order" ? 'active' : ''}`} onClick={() => setSelectedTab("order")}>
            <FaShoppingCart />
            <div className='nav-item-content'>Order</div>
          </div>
        </Link>
      </div>
      <div className='nav-item mb-3 item-logout' onClick={handleLogout}>
        <MdLogout/>
        <div className='nav-item-content'>Logout</div>
      </div>
    </div>
  );
};

export default NavAdmin;
