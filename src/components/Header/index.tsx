import React from 'react'
import './styles.scss';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiNike } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/images/image-login.png'

const Header = () => {

  const role = localStorage.getItem("role");

  const arrNavBar = [
    {
      name: 'Áo', 
      id:'tops001',
      img:'',
      list: [
        {
          title: 'áo thun', 
          item: [
            {name: 'Áo thun', link:'sub-tops-001'},
            {name: 'Áo polo', link:'sub-tops-002'},
            {name: 'Áo sơ mi', link:''},
            {name: 'Áo Hoodie', link:''},
          ]
        },
        {
          title: 'áo khoác', 
          item: [
            {name: 'Áo khoác phao', link:''},
            {name: 'Áo khoác cardigan', link:''},
            {name: 'Áo khoác lông', link:''},
          ]
        },
      ]
    },
    {
      name: 'Quần', 
      id:'bottoms001',
      list: [
        {
          title: 'Quần dài', 
          item: [
            {name: 'Quần jeans', link:'sub-tops-001'},
            {name: 'Quần kaki', link:'sub-tops-002'},
            {name: 'Quần tây', link:'sub-tops-003'},
          ]
        },
        {
          title: 'Quần ngắn', 
          item: [
            {name: 'Quần short', link:''},
            {name: 'Quần đùi thể thao', link:''},
            {name: 'Quần lửng', link:''},
          ]
        },
      ]
    },
    {
      name: 'Giày dép', 
      id:'accessories001',
      list: [
        {
          title: 'Giày', 
          item: [
            {name: 'Giày thể thao', link:''},
            {name: 'Giày da', link:''},
            {name: 'Giày lười', link:''},
            {name: 'Giày cao gót', link:''},
          ]
        },
        {
          title: 'Dép', 
          item: [
            {name: 'Dép lê', link:''},
            {name: 'Dép sandal', link:''},
            {name: 'Dép xỏ ngón', link:''},
          ]
        },
      ]
    },
    {
      name: 'Mũ nón', 
      id:'bags001',
      list: [
        {
          title: 'Nón thời trang', 
          item: [
            {name: 'Nón lưỡi trai', link:''},
            {name: 'Nón snapback', link:''},
            {name: 'Nón fedora', link:''},
          ]
        },
        {
          title: 'Mũ mùa đông', 
          item: [
            {name: 'Mũ len', link:''},
            {name: 'Mũ beanie', link:''},
            {name: 'Mũ tai bèo', link:''},
          ]
        },
      ]
    },
    {
      name: 'Phụ kiện', 
      id:'womenswear001',
      list: [
        {
          title: 'Phụ kiện thời trang', 
          item: [
            {name: 'Thắt lưng', link:''},
            {name: 'Kính mắt', link:''},
            {name: 'Vòng tay', link:''},
          ]
        },
        {
          title: 'Phụ kiện công nghệ', 
          item: [
            {name: 'Ốp lưng điện thoại', link:''},
            {name: 'Tai nghe', link:''},
            {name: 'Sạc dự phòng', link:''},
          ]
        },
      ]
    },
  ];

  const navigate = useNavigate();

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
                  <div key={e.name} className='link-style header-link'>
                    <div onClick={() => navigate(`/collections/${e.id}`)}>{e.name}</div>
                  </div>
                  <div className="header-nav-item-hover">
                    <div className='container pt-3 pb-3'>
                      <div className='row'>
                        <div className='col-8 header-category-ctn'>
                          {e.list?.map(x => (
                            <div className='header-category'>
                              <div className='header-category-title'>{x.title}</div>
                              {x.item.map(item => (
                                <div className='header-category-item' onClick={() => navigate(`/collections/${item.link}`)}>{item.name}</div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className='col-4'>
                          <div className='header-category-img'>
                            <img src={image} alt="" />
                          </div>
                        </div>
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