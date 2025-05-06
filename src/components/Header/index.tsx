import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiNike } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import imageTop from "../../assets/images/category-top.jpg";
import imageBottom from "../../assets/images/category-bottom.webp";
import imageWomen from "../../assets/images/category-women.jpg";
import imageCoat from "../../assets/images/category-coat.jpg";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { arrCategory, IMG_BB_API_KEY, WebUrl } from "../../constants";
import { IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { formatPrice } from "../../helpers";
import Card from "../Card";
import { TiCamera } from "react-icons/ti";
import { useAuth } from "../../helpers/AuthContext";
import logo from "../../assets/images/logo.png";

export interface CardProps {
  id: string;
  img: string;
  imgHover?: string;
  name: string;
  price: string;
  rank?: number;
  hidden?: boolean;
}

const Header = () => {
  const role = sessionStorage.getItem("role");
  console.log("role", role);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [hiddenSearch, setHiddenSearch] = useState<Boolean>(true);
  const [itemsOrderCount, setItemsOrderCount] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<any[]>([]);
  const [listTopSell, setListTopSell] = useState<CardProps[]>([]);
  const { cart } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploadFile, setIsUploadFile] = useState<Boolean>(false);

  const handleCloseSearch = () => {
    setHiddenSearch(!hiddenSearch);
    setValue("");
    setImagePreview("");
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      setImagePreview(URL.createObjectURL(file));
      handleUploadFile(file);
    }
  };

  const handleUploadFile = async (file: File) => {
    if (!file) return;
    setIsUploadFile(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // handleSearchImage(response.data.data.url);
      setIsUploadFile(false);
      handleCloseSearch()
      navigate(`/search?url=${response.data.data.url}`);
    } catch (error) {
      console.error("Error uploading avatar to imgBB:", error);
    }
  };

  const handleNavigateToProduct = (productId: string) => {
    setNameProduct([]);
    navigate(`/product/${productId}`);
    handleCloseSearch();
  };

  const getTopSell = async () => {
    try {
      const response = await axios.get(
        `${WebUrl}/api/v1/products/top-selling?limit=4`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );

      const data: CardProps[] = response.data.data.map(
        (e: any, index: number) => ({
          id: e.productId,
          img: e.images?.[0].imageURL,
          imgHover: e.images?.[1].imageURL,
          name: e.name,
          price: formatPrice(e.price),
          hidden: true,
        })
      );

      setListTopSell(data);
    } catch (error) {
      console.error("Error get top sell:", error);
    }
  };

  const filterProduct = async (name: string) => {
    setValue(name);
    if (!!name) {
      try {
        const response = await axios.get(
          `${WebUrl}/api/v1/products/all?search=${name}`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "skip-browser-warning",
            },
          }
        );
        setNameProduct(response.data.data);
      } catch (error) {
        console.error("Error get Order item", error);
      }
    } else {
      setNameProduct([]);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/orders/in-cart`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
          Authorization: `Bearer ${token}`,
        },
      });
      const count = response.data.orderItems.length;
      setItemsOrderCount(count);
    } catch (error) {
      console.error("Error get Order item", error);
    }
  };

  useEffect(() => {
    role === "CUSTOMER" && fetchData();
    getTopSell();
  }, [role, token, cart]);

  return (
    <div className="header-container">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ width: "40%" }}>
            <div className="header-nav-container">
              {arrCategory.map((e) => (
                <>
                  <div key={e.name} className="header-link">
                    <div className="header-link-ctn">
                      <div onClick={() => navigate(`/collections/${e.id}`)}>
                        {e.name}
                      </div>
                    </div>
                  </div>
                  <div className="header-nav-item-hover">
                    <div className="container pt-3 pb-3">
                      <div className="row">
                        <div className="header-category-ctn">
                          {e.list?.map((item) => (
                            <div className="header-category">
                              <div
                                className="header-category-item"
                                onClick={() =>
                                  navigate(`/collections/${item.link}`)
                                }
                              >
                                {item.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div>
            <Link to={"/"}>
              <img src={logo} className="logo-header"/>
            </Link>
          </div>
          <div style={{ width: "40%" }}>
            <div className="header-nav-container nav-right-header">
              <div className="header-link" onClick={() => handleCloseSearch()}>
                <div className="header-link-ctn">Tìm kiếm</div>
              </div>
              <div
                className="header-link "
                onClick={() => navigate(role ? "/cart" : "/login")}
              >
                <div className="header-link-ctn header-cart">
                  Giỏ hàng
                  {role && itemsOrderCount > 0 && (
                    <div className="header-cart-count">{itemsOrderCount}</div>
                  )}
                </div>
              </div>
              <div
                className="header-link"
                onClick={() => navigate(role ? "/user" : "/login")}
              >
                <div className="header-link-ctn">Tài khoản</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!hiddenSearch && (
        <div className="header-search-ctn">
          <div className="container">
            <div className="header-search-header">
              <div className="header-search-title">Tìm kiếm sản phẩm</div>
              <div className="icon-cancel" onClick={() => handleCloseSearch()}>
                <FaXmark />
              </div>
            </div>
            <div className="header-search">
              <div className="icon-search">
                <IoSearch />
              </div>

              <input
                type="text"
                placeholder="Nhập tên sản phẩm..."
                value={value}
                onChange={(e) => filterProduct(e.target.value)}
              />
              {value && (
                <div className="icon-delete">
                  <MdCancel onClick={() => setValue("")} />
                </div>
              )}
              
            </div>
            <div className="header-search-body">
              <div className="header-body-suggested">
                {imagePreview ? (
                  <div className="header-search-body-image-ctn">
                    <div className="header-search-body-image">
                      {isUploadFile && (
                        <div className="loading">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Đang tải...</span>
                          </div>
                        </div>
                      )}
                      <img src={imagePreview} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="header-search-body-suggested">
                    {value != "" ? (
                      <div className="popular-search-terms">
                        <div className="title-body-header">Kết quả tìm kiếm</div>
                        {nameProduct.map((e: any) => (
                          <div
                            className="header-search-body-item"
                            onClick={() => handleNavigateToProduct(e.productId)}
                          >
                            <div className="img-ctn-header">
                              <img src={e.images[0].imageURL} alt="" />
                            </div>
                            <div>{e.name}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="popular-search-terms">
                        <div className="title-body-header">
                          Các danh mục tìm kiếm phổ biến
                        </div>
                        <ul>
                          <li
                            className="title-body-item"
                            onClick={() => handleCloseSearch()}
                          >
                            Quần Jogger
                          </li>
                          <li
                            className="title-body-item"
                            onClick={() => handleCloseSearch()}
                          >
                            Áo thun
                          </li>
                          <li
                            className="title-body-item"
                            onClick={() => handleCloseSearch()}
                          >
                            Giày
                          </li>
                          <li
                            className="title-body-item"
                            onClick={() => handleCloseSearch()}
                          >
                            Áo len
                          </li>
                          <li
                            className="title-body-item"
                            onClick={() => handleCloseSearch()}
                          >
                            Mũ
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <div className="suggested-products">
                  <div className="title-body-header">Bán chạy nhất</div>
                  <div className="suggested-products-content">
                    {listTopSell.map((e: CardProps) => (
                      <div
                        className="suggested-products-card"
                        onClick={() => handleCloseSearch()}
                      >
                        <Card data={e} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Header;
