import React, { useEffect, useState } from 'react'
import './styles.scss';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiNike } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import imageTop from '../../assets/images/category-top.jpg'
import imageBottom from '../../assets/images/category-bottom.webp'
import imageWomen from '../../assets/images/category-women.jpg'
import imageCoat from '../../assets/images/category-coat.jpg'
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { WebUrl } from '../../constants';

const Header = () => {

  const arrNavBar = [
    {
      name: 'Áo', 
      id:'tops',
      img:imageTop,
      list: [
        {
          title: 'áo', 
          item: [
            {name: 'Áo T-shirts', link:'tops-t-shirts'},
            {name: 'Áo Polo', link:'tops-polo-shirts'},
            {name: 'Áo Shirts', link:'tops-shirts'},
            {name: 'Áo Sweatshirts', link:'tops-sweatshirts'},
            {name: 'Áo Hoodies', link:'tops-hoodies'},
          ]
        },
      ]
    },
    {
      name: 'Quần', 
      id:'bottoms001',
      img: imageBottom,
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
      name: 'Áo khoác', 
      id:'accessories001',
      img: imageCoat,
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
      name: 'Thời trang nữ', 
      id:'womenswear001',
      img:imageWomen,
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

  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [hiddenSeacrh , setHiddenSearch] = useState<Boolean>(false)
  const [itemsOrderCount , setItemsOrderCount] = useState<number>(0)

    const fetchData = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/orders/in-cart`,{
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        }
      })
      const count = response.data.orderItems.lenght
      setItemsOrderCount(count)
    } catch (error) {
      console.error("Error get Order item", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [role, token]);

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
                            <img src={e.img} alt="" />
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
                <FaMagnifyingGlass className='header-icon' onClick={() => setHiddenSearch(!hiddenSeacrh)}/>
            </div>
            <div className='header-icon-cotainer header-cart'>
              <Link to={"/cart"} className='link-style'>
                <FaShoppingCart className='header-icon'/>
              </Link>
              {role && itemsOrderCount>0 && 
                <div className='header-cart-count'>{itemsOrderCount}</div>
              }
            </div>
            <div className='header-icon-cotainer'>
              <Link to={role ? "/user" : "/login"} className='link-style'>
                <FaUser className='header-icon'/>
              </Link>      
            </div>
          </div>
        </div>
      </div>
      {hiddenSeacrh && (
        <div className='header-search-ctn'>
          <div className='container'>
            <div className='header-search'>
              <input type="text" /> 
              <button>tim kiem</button>
              <MdCancel onClick={() => setHiddenSearch(!hiddenSeacrh)}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header