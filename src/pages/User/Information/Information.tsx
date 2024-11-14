import React, { useEffect, useState } from 'react'
import './styles.scss'
import avatar from '../../../assets/images/avatar.jpg'
import axios from 'axios'
import { User } from '..'
import { WebUrl } from '../../../constants'

const Information = () => {

  const token = sessionStorage.getItem("token");

  const [profileUser, setProfileUser] = useState<User>()

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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='user-inforation-container w-100 p-3'>
      <div>My Account</div>
      <hr />
      <div className='d-flex'>
        <div className='user-inforation-title'>
          <ul>
            <li>Full Name</li>
            <li>Email</li>
            <li>Phone Number</li>
            <li>Gender</li>
          </ul>
        </div>
        <div className='user-inforation-value'>
          <ul>
            <li>{profileUser?.firstName || "Ngo Quang"} {profileUser?.lastName || "Truong"}</li>
            <li>{profileUser?.email || "TruongNgo@gmail.com"}</li>
            <li>{profileUser?.phoneNumber || "0353519243"}</li>
            <li>{profileUser?.gender || "Male"}</li>
          </ul>
          <button className="primary">Lưu</button>
        </div>
        <div className='user-inforation-avatar'>
          <div className='avatar'>
            <img src={profileUser?.avatar || avatar} alt="" />
          </div>
          <button className="primary">Chọn ảnh</button>
          <div>Dụng lượng file tối đa 1 MB</div>
          <div>Định dạng:.JPEG, .PNG</div>
        </div>
      </div>
      
    </div>
  )
}

export default Information