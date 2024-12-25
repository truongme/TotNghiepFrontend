import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Controller, useForm } from "react-hook-form";
import ButtonCustom from "../../components/ButtonCustom";
import ImageLogin from "../../assets/images/image-login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { WebUrl } from "../../constants";
import ModalMain from "../../components/Modal/Modal";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [signupFail, setSignupFail] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<SignupForm>();

  const postSignup = async (data: SignupForm) => {
    try {
      await axios.post(`${WebUrl}/api/v1/auth/sign-up`, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      setOpenModal(true);
    } catch (error) {
      setSignupFail(true);
      console.error("Unexpected Error:", error);
    }
  };

  const handleCloseModalCancelOrder = () => {
    setOpenModal(false);
    navigate("/login");
  };

  const handleCancelOrder = () => {
    setOpenModal(false);
  };

  const onSubmit = (data: SignupForm) => {
    postSignup(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 signup-image">
          <img src={ImageLogin} alt="SignupImage" />
        </div>
        <div className="col-6 d-flex justify-content-center">
          <div className="m-5 container">
            <div className="text-center">
              <h1 className="form-signup-title">Sign up for an account</h1>
              <h6 style={{ marginTop: "24px" }} className="">
                Sign up for membership and get 10% off your first order.
              </h6>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="form-signup-label">Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "* Email is required" }}
                  render={({ field }) => (
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="form-signup-input"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <div className="error">{errors.email.message}</div>
                )}
              </div>
              <div>
                <label className="form-signup-label">Password</label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "* Password is required",
                    minLength: {
                      value: 6,
                      message: "* Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "* Password must include uppercase, lowercase letters, and numbers",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="form-signup-input"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <div className="error">{errors.password.message}</div>
                )}
              </div>
              <div>
                <label className="form-signup-label"> Confirm Password</label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "* Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "* Confirm Passwords do not match",
                  }}
                  render={({ field }) => (
                    <input
                      id="password"
                      type="password"
                      placeholder="Confirm Password"
                      className="form-signup-input"
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword.message}</div>
                )}
              </div>
              {signupFail && (
                <div className="error-signup-fail">
                  Account registration failed!
                </div>
              )}
              <div className="mt-3 mb-3">
                <ButtonCustom label="Create Account" />
              </div>
            </form>
            <div className="d-flex justify-content-center form-action">
              <Link to={"/reset-password"} className="link-style">
                <span
                  style={{
                    paddingRight: "10px",
                    borderRight: "2px black solid",
                  }}
                  className="item-form-action"
                >
                  Forgot password?
                </span>
              </Link>
              <Link to={"/login"} className="link-style">
                <span
                  style={{ paddingLeft: "10px" }}
                  className="item-form-action"
                >
                  Already have an account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalMain
          title="Notification"
          content={
            "You have successfully registered an account! Please log in to shop."
          }
          btn1="Cancel"
          btn2="Yes"
          onClose={handleCloseModalCancelOrder}
          onSave={handleCancelOrder}
        />
      )}
    </div>
  );
};

export default Signup;
