import React, { useEffect, useState } from 'react'
import './styles.scss'
import avatar from '../../assets/images/avatar.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Adress from './Address/Address';
import Information from './Information/Information';
import axios from 'axios';
import { WebUrl } from '../../constants';
import OrderUser from './Order';
import { FaUserAlt } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export interface User {
  avatar: string | null;
  email: string | null;
  firstName: string | null;
  gender: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

const User = () => {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate()
    const [itemActive, setItemActive] = useState<string>('infor');
    const [profileUser, setProfileUser] = useState<User>()


    const handleLogout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("role")
        navigate('/login')
    }

    const getProfile = async () => {
        try {

        const response = await axios.get(`${WebUrl}/api/v1/users/profile`, {
            headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Authorization': `Bearer ${token}`, 
            }
        });

        setProfileUser(response.data)

        } catch (error) {
        console.error('Unexpected Error:', error);
        }
    }

    const handleSaveComplete = () => {
        getProfile();
    };

    useEffect(() => {
        getProfile();
    }, []);

  return (
    <div className='container d-flex justify-content-between align-items-start'>
        <div className='user-menu-container mb-3'>
            <div className='user'>
              <div className='avatar-user'>
                <img src={profileUser?.avatar || avatar} alt="" />
              </div>
              <div>
                <h6>{profileUser?.firstName} {profileUser?.lastName}</h6>
                <div>{profileUser?.email}</div>
              </div>
            </div>
            <hr />
            <div>
                <ul>
                    <li className={`${itemActive === 'infor' ? "active" : ""} item-user`}>
                        <FaUserAlt />
                        <a onClick={() => setItemActive('infor')}>Tài khoản</a>
                    </li>
                    <li className={`${itemActive === 'address' ? "active" : ""} item-user`}>
                        <FaLocationDot />
                        <a onClick={() => setItemActive('address')}>Địa chỉ</a>
                    </li>
                    <li className={`${itemActive === 'order' ? "active" : ""} item-user`}>
                        <FaBoxOpen />
                        <a onClick={() => setItemActive('order')}>Đơn hàng</a>
                    </li>
                    <li className='item-user'>
                        <MdOutlineLogout />
                        <a onClick={() => handleLogout()}>Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className='user-content-container'>
            {itemActive === 'infor' && (
                <>
                <Information onSaveComplete={handleSaveComplete}/>
                </>
            )}
            {itemActive === 'address' && (
                <Adress/>
            )}
            {itemActive === 'order' && (
                <OrderUser/>
            )}
        </div>
    </div>
  )
}

export default User