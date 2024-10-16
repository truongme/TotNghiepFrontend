import React, { useState } from 'react'
import './styles.scss'
import avatar from '../../assets/images/avatar.jpg'
import { FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Adress from './Address/Address';
import Information from './Information/Information';

const User = () => {

    const [itemActive, setItemActive] = useState<string>('infor');

  return (
    <div className='container d-flex justify-content-between pt-3'>
        <div className='user-menu-container'>
            <div className='user'>
              <div className='avatar-user'>
                <img src={avatar} alt="" />
              </div>
              <div>
                <h6>Ngô Quang Trường</h6>
                <p>truongme2k2@gmail.com</p>
              </div>
            </div>
            <hr />
            <div className='user-menu-title '>
                <FaUser className='icon'/>
                <div>Thông tin tài khoản</div>
            </div>
            <div>
                <ul>
                    <li>
                        <a onClick={() => setItemActive('infor')}>Thông tin cá nhân</a>
                    </li>
                    <li>
                        <a onClick={() => setItemActive('address')}>Địa chỉ giao hàng</a>
                    </li>
                </ul>
            </div>
            <div className='user-menu-title' onClick={() => setItemActive('order')}>
                <FaCartShopping className='icon'/>
                <div>Đơn hàng</div>
            </div>
        </div>
        <div className='user-content-container'>
            {itemActive === 'infor' && (
                <>
                <Information/>
                </>
            )}
            {itemActive === 'address' && (
                <Adress/>
            )}
        </div>
    </div>
  )
}

export default User