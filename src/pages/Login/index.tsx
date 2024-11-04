import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import ButtonCustom from '../../components/ButtonCustom';
import ImageLogin from '../../assets/images/image-login.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WebUrl } from '../../constants';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {

  const navigate = useNavigate()

  const [loginFail, setLoginFail] = useState<boolean>(false)

  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>();

  const postLogin = async (data: LoginForm) => {

    try {
      const response = await axios.post(`${WebUrl}/api/v1/auth/sign-in`, {
        email: data.email,
        password: data.password,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      });

      const { accessToken, role } = response.data;

      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('role', role);
      navigate('/')
      
    } catch (error) {
      setLoginFail(true)
      console.error('Unexpected Error:', error);
    }
  };


  const onSubmit = (data: LoginForm) => {
    postLogin(data); 
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 login-image'>
          <img src={ImageLogin} alt="LoginImage"/>
        </div>
        <div className='col-6 d-flex justify-content-center'>
          <div className='m-5 container'>
            <h1 className='form-login-title'>Đăng nhập</h1>
            <h6 style={{marginTop:"24px"}}>Đăng ký thành viên và nhận ngay ưu đãi 10% cho đơn hàng đầu tiên.</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='form-login-label'>Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* Email is required' }}
                  render={({ field }) => (
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className='form-login-input'
                      {...field}
                    />
                  )}
                />
                {errors.email && <div className="error">{errors.email.message}</div>}
              </div>
              <div>
                <label className='form-login-label'>Password</label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* Password is required' }}
                  render={({ field }) => (
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className='form-login-input'
                      {...field}
                    />
                  )}
                />
                {errors.password && <div className="error">{errors.password.message}</div>}
              </div>
              {loginFail && (
                <div className="error-login-fail">Tài khoản hoặc mật khẩu không chính xác!</div>
              )}
              <div className='mt-3 mb-3'>
                <ButtonCustom label='Đăng nhập'/>
              </div>
            </form>
            <div className='d-flex justify-content-center form-action'>
              <Link to={"/"} className='link-style'>
                <span style={{paddingRight:"10px", borderRight:"2px black solid"}} className='item-form-action'>
                  Quên mật khẩu?
                </span>
              </Link>
              <Link to={"/"} className='link-style'>
                <span style={{paddingLeft:"10px"}} className='item-form-action'>Đăng ký</span>
              </Link>
            </div>
            <div className='mt-3 mb-1'>
              <ButtonCustom label='Đăng nhập Google'/>
            </div>
            <div className='mt-1'>
              <ButtonCustom label='Đăng nhập facebook'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
