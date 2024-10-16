import React from 'react'
import './styles.scss'
import img from '../../../assets/images/avatar.jpg'

const Information = () => {
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
            <li>tr*********@gmail.com</li>
            <li>*********43</li>
            <li>Giới tính</li>
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