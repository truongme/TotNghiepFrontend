import React, { useEffect, useState } from 'react';
import './styles.scss';
import avatar from '../../../assets/images/avatar.jpg';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { WebUrl } from '../../../constants';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  avatar?: string;
}

const Information = () => {
  const token = sessionStorage.getItem('token');

  const [profileUser, setProfileUser] = useState<User>();
  const { control, handleSubmit, setValue } = useForm<User>();

  const getProfile = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/users/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileUser(response.data);

      const data = response.data;
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
      setValue('phoneNumber', data.phoneNumber);
      setValue('gender', data.gender);
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  const onSubmit = async (data: User) => {
    try {
      await axios.put(
        `${WebUrl}/api/v1/users/update`,
        { ...data },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='user-inforation-container w-100 p-3 mb-3'>
      <div>My Account</div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex'>
          <div className='user-inforation-value'>
            <ul>
              <li className='input-full-name'>
                <div className='label-input'>First Name</div>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='First Name' />}
                />
              </li>
              <li className='input-full-name'>
                 <div className='label-input'>Last Name</div>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='Last Name' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Email</div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='Email' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Phone Number</div>
                <Controller
                  name='phoneNumber'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='Phone Number' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Gender</div>
                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <select className="form-select" {...field}>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                      <option value='OTHER'>Other</option>
                    </select>
                  )}
                />
              </li>
            </ul>
            <button className='primary' type='submit'>
              Save
            </button>
          </div>
          <div className='user-inforation-avatar'>
            <div className='avatar'>
              <img src={profileUser?.avatar || avatar} alt='' />
            </div>
            <button type='button' className='primary'>
              Chọn ảnh
            </button>
            <div>Dụng lượng file tối đa 1 MB</div>
            <div>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Information;
