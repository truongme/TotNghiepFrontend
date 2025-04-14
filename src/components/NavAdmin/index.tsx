import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import logo from "../../assets/images/logo.png";

const NavAdmin = () => {
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>("dashboard");

  // Update selectedTab based on the current path
  useEffect(() => {
    const pathName = location.pathname.split("/").filter(Boolean).pop();

    if (pathName === "productManagement") {
      setSelectedTab("product");
    } else if (pathName === "orderManagement") {
      setSelectedTab("order");
    } else {
      setSelectedTab("dashboard");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    setRole("");
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ width: "40%" }}>
            <div className="header-nav-container">
              <div className="header-link">
                <div className="header-link-ctn">
                  <div onClick={() => navigate("/")}>Dashboard</div>
                </div>
              </div>
              <div className="header-link">
                <div className="header-link-ctn">
                  <div onClick={() => navigate("/productManagement")}>
                    Product
                  </div>
                </div>
              </div>
              <div className="header-link">
                <div className="header-link-ctn">
                  <div onClick={() => navigate("/orderManagement")}>Order</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link to={"/"}>
              <div>
                <Link to={"/"}>
                  <img src={logo} className="logo-header" />
                </Link>
              </div>
            </Link>
          </div>
          <div style={{ width: "40%" }}>
            <div className="header-nav-container nav-right-header">
              <div className="header-link">
                <div className="header-link-ctn">
                  <div onClick={() => navigate("/import")}>Nhập</div>
                </div>
              </div>
              <div className="header-link">
                <div className="header-link-ctn">
                  <div onClick={() => navigate("/export")}>Xuất</div>
                </div>
              </div>
              <div
                className="header-link"
                onClick={handleLogout}
              >
                <div className="header-link-ctn">LOGOUT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAdmin;
