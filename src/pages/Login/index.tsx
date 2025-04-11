import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import ButtonCustom from '../../components/ButtonCustom';
import ImageLogin from '../../assets/images/image-login.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WebUrl } from '../../constants';
import { useAuth } from '../../helpers/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { setRole } = useAuth();

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
      setRole(role); 
      navigate('/');
      
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
            <div className='text-center'> 
              <h1 className='form-login-title'>Đăng nhập</h1>
              <h6 style={{ marginTop: "24px" }}>Đăng ký làm thành viên và được giảm giá 10% cho đơn hàng đầu tiên của bạn.</h6>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='form-login-label'>Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* Email là bắt buộc' }}
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
                <label className='form-login-label'>Mật khẩu</label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* Mật khẩu là bắt buộc' }}
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
                <div className="error-login-fail">Tài khoản hoặc mật khẩu không đúng!</div>
              )}
              <div className='mt-3 mb-3'>
                <ButtonCustom label='Đăng nhập'/>
              </div>
            </form>
            <div className='d-flex justify-content-center form-action'>
              <Link to={"/reset-password"} className='link-style'>
                <span style={{paddingRight:"10px", borderRight:"2px black solid"}} className='item-form-action'>
                  Quên mật khẩu?
                </span>
              </Link>
              <Link to={"/signup"} className='link-style'>
                <span style={{paddingLeft:"10px"}} className='item-form-action'>Tạo tài khoản</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
