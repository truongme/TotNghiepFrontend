import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Controller, useForm } from "react-hook-form";
import ButtonCustom from "../../components/ButtonCustom";
import ImageLogin from "../../assets/images/image-login.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WebUrl } from "../../constants";
import Modal from "../../components/Modal";
import ModalMain from "../../components/Modal/Modal";

interface newPasswordProps {
  newPassword: string;
  confirmPassword: string;
}

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [resetPasswordFail, setResetPasswordFail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<newPasswordProps>();

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseModalReset = () => {
    setIsReseted(false);
    navigate("/login");
  };

  const handleSendEmail = async () => {
    try {
      await axios.post(`${WebUrl}/api/v1/email/reset-password`, {
        email: email,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });
      setIsOpenModal(true);
    } catch (error) {
      setResetPasswordFail(true);
      console.error("Unexpected Error:", error);
    }
  };

  const resetPasswordPost = async (data: newPasswordProps) => {
    try {
      await axios.post(`${WebUrl}/api/v1/auth/reset-password?token=${token}`, {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmPassword,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });

      setIsReseted(true);
    } catch (error) {
      setResetPasswordFail(true);
      console.error("Unexpected Error:", error);
    }
  };

  const onSubmit = (data: newPasswordProps) => {
    resetPasswordPost(data);
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 login-image">
          <img src={ImageLogin} alt="LoginImage" />
        </div>
        <div className="col-6 d-flex justify-content-center">
          <div className="m-5 container">
            <div className="text-center">
              <h1 className="form-login-title">Đặt lại mật khẩu</h1>
            </div>
            {!token ? (
              <div>
                <label className="form-login-label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-login-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-3 mb-3" onClick={() => handleSendEmail()}>
                  <ButtonCustom label="Gửi Email" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="form-login-label">Mật khẩu mới</label>
                  <Controller
                    name="newPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "* Mật khẩu là bắt buộc",
                      minLength: {
                        value: 6,
                        message: "* Mật khẩu phải có ít nhất 6 ký tự",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          "* Mật khẩu phải bao gồm chữ hoa, chữ thường và số",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        id="newPassword"
                        type="password"
                        placeholder="New Password"
                        className="form-login-input"
                        {...field}
                      />
                    )}
                  />
                  {errors.newPassword && (
                    <div className="error">{errors.newPassword.message}</div>
                  )}
                </div>
                <div>
                  <label className="form-login-label">
                    Confirm New Password
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "* Xác nhận mật khẩu là bắt buộc",
                      validate: (value) =>
                        value === getValues("newPassword") ||
                        "* Xác nhận mật khẩu không khớp",
                    }}
                    render={({ field }) => (
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        className="form-login-input"
                        {...field}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <div className="error">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
                {resetPasswordFail && (
                  <div className="error-login-fail">
                    Tài khoản không đúng hoặc xác nhận mật khẩu!
                  </div>
                )}
                <div className="mt-3 mb-3">
                    <ButtonCustom label="Đặt lại mật khẩu" />
                </div>
              </form>
            )}

            <div className="d-flex justify-content-center form-action">
              <Link to={"/Login"} className="link-style">
                <span
                  style={{
                    paddingRight: "10px",
                    borderRight: "2px black solid",
                  }}
                  className="item-form-action"
                >
                  Đăng nhập
                </span>
              </Link>
              <Link to={"/signup"} className="link-style">
                <span
                  style={{ paddingLeft: "10px" }}
                  className="item-form-action"
                >
                  Tạo tài khoản
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <ModalMain
          title="Notification"
          content="Password reset confirmation email has been sent to your email"
          btn2="Ok"
          onSave={handleCloseModal}
        />
      )}

      {isReseted && (
        <ModalMain
          title="Notification"
          content="Password reset successful, please login"
          btn2="Ok"
          onSave={handleCloseModalReset}
        />
      )}
    </div>
  );
};

export default ForgetPassword;
