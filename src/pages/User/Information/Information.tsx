import React, { useEffect, useState } from 'react'
import './styles.scss'
import img from '../../../assets/images/avatar.jpg'
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
    <div className='w-100'>
      <div>Hồ sơ của tôi</div>
      <hr />
      <div className='d-flex'>
        <div className='user-inforation-title'>
          <ul>
            <li>Tên đăng nhập</li>
            <li>Tên</li>
            <li>Email</li>
            <li>Số điện thoại</li>
            <li>Giới tính</li>
            <li>Ngày sinh</li>
          </ul>
        </div>
        <div className='user-inforation-value'>
          <ul>
            <li>truongmedn</li>
            <li>Tên</li>
            <li>{profileUser?.email || ""}</li>
            <li>{profileUser?.phoneNumber || ""}</li>
            <li>{profileUser?.gender || ""}</li>
            <li>**/04/20**</li>
          </ul>
          <button>Lưu</button>
        </div>
        <div className='user-inforation-avatar'>
          <div className='avatar'>
            <img src={img} alt="" />
          </div>
          <button>Chọn ảnh</button>
          <p>Dụng lượng file tối đa 1 MB</p>
          <p>Định dạng:.JPEG, .PNG</p>
        </div>
      </div>
      
    </div>
  )
}

export default Information