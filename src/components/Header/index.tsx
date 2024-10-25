import React from 'react'
import './styles.scss';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiNike } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const role = localStorage.getItem("role");

  const arrNavBar = [
    {name: 'Quần áo', link:'/collections/ao-polo'},
    {name: 'Giày dép', link:'/'},
    {name: 'Mũ nón', link:'/login'},
    {name: 'Phụ kiện', link:'/login'},
  ]

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className='header-container'>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <Link to={"/"}>
              <SiNike className='header-logo'/>
            </Link>
            <div className='header-nav-container'>
              {arrNavBar.map(e => (
                <>
                  <>
                    <Link key={e.name} to={e.link} className='link-style header-link'>
                      <div>{e.name}</div>
                    </Link>
                  </>
                  <div className="header-nav-item-hover">
                    <div className='container pt-3 pb-3'>
                      <div className='row'>
                        <div className='col-8'>{e.name}</div>
                        <div className='col-4'>{e.name}</div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="d-flex">
            <div className='header-icon-cotainer'>
              <Link to={"/login"} className='link-style'>
                <FaMagnifyingGlass className='header-icon'/>
              </Link>
            </div>
            <div className='header-icon-cotainer'>
              <Link to={"/cart"} className='link-style'>
                <FaShoppingCart className='header-icon'/>
              </Link>
            </div>
            <div className='header-icon-cotainer'>
              <Link to={role ? "/user" : "/login"} className='link-style'>
                <FaUser className='header-icon'/>
              </Link>      
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header