import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./styles.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../helpers";
import { IMG_BB_API_KEY, WebUrl } from "../../constants";
import ModalMain from "../../components/Modal/Modal";
import ImageZoom from "../../components/ZoomImg/ZoomImg";
import { useAuth } from "../../helpers/AuthContext";
import avatar from "../../assets/images/avatar.jpg";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface ProductProps {
  id: string;
  images: string[];
  name: string;
  price: string;
  description: string;
}

interface ProductVariants {
  id: string;
  color: string;
  size: string;
  stock: string;
}

const PrevButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button className="prev-btn custom-arrow" onClick={onClick}>
    ❮
  </button>
);

const NextButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button className="next-btn custom-arrow" onClick={onClick}>
    ❯
  </button>
);

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <div
        className="line-arrow"
        style={{ transform: "translate(-75%, -50%) rotate(-45deg)" }}
      ></div>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <div
        className="line-arrow"
        style={{ transform: "translate(-25%, -50%) rotate(135deg)" }}
      ></div>
    </div>
  );
};

const Product = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextButton onClick={() => {}} />,
    prevArrow: <PrevButton onClick={() => {}} />,
    beforeChange: (current: number, next: number) =>
      setSelectedImageIndex(next),
  };

  const navigate = useNavigate();
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const { id } = useParams<{ id: string }>();
  const [productDetail, setProductDetail] = useState<ProductProps>();
  const [projectVariants, setProjectVariants] = useState<ProductVariants[]>([]);
  const [projectVariantsColor, setProjectVariantsColor] = useState<any[]>([]);
  const [projectVariantsSize, setProjectVariantsSize] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = sessionStorage.getItem("token");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [urlImageHover, setUrlImageHover] = useState<string>("");
  const [arrReview, setArrReview] = useState<any[]>([]);
  const [isOpenModalReview, setIsOpenModalReview] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const { setCart, role } = useAuth();
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [urlUploadedImages, setUrlUploadedImages] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isErrorSendReview, setIsErrorSendReview] = useState<boolean>(false);

  const handleCloseModalImg = () => {
    setUrlImageHover("");
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseModalCheckout = () => {
    setIsOpenModal(false);
    navigate("/cart");
  };

  const getValidColors = (size: string) => {
    return projectVariants
      .filter((item) => item.size === size)
      .map((item) => item.color);
  };

  const getValidSizes = (color: string) => {
    return projectVariants
      .filter((item) => item.color === color)
      .map((item) => item.size);
  };

  const handleColorSelect = (color: string) => {
    selectedColor === color ? setSelectedColor("") : setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    selectedSize === size ? setSelectedSize("") : setSelectedSize(size);
  };
  const handleBuy = async () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize || !quantity) {
      setErrorMessage("Vui lòng chọn màu sắc và size cho sản phẩm!");
    } else if (!token) {
      setErrorMessage("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    } else {
      const product = projectVariants.find(
        (x) => x.color === selectedColor && x.size === selectedSize
      );
      try {
        setCart(true);
        await axios.post(
          `${WebUrl}/api/v1/order-item`,
          {
            quantity: quantity,
            productVariantId: product?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "skip-browser-warning",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsOpenModal(true);
        setCart(false);
      } catch (error) {
        console.error("Error post item cart", error);
      }
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!file) return;

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
      const url = response.data.data.url;
      setUrlUploadedImages((prev) => [...prev, url]);
    } catch (error) {
      console.error("Error uploading avatar to imgBB:", error);
    }
  };

  const renderModalReview = () => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const fileArray = Array.from(files);

        const newImages = fileArray.map((file) => ({
          localUrl: URL.createObjectURL(file),
        }));

        setUploadedImages((prev) => [...prev, ...newImages]);

        fileArray.forEach((file) => {
          handleUploadImage(file);
        });
      }
    };

    return (
      <div className="w-100">
        <div className="form-group">
          <label>Đánh giá</label>
          <div style={{ display: "flex", gap: "5px", marginTop: "8px" }}>
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={
                  selectedRating >= index + 1 ? "icon-star-active" : "icon-star"
                }
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedRating(index + 1)}
              />
            ))}
          </div>
        </div>
        <div
          className="form-group"
          style={{ marginTop: "15px", width: "100%" }}
        >
          <label>Bình luận</label>
          <input
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập bình luận của bạn..."
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "8px",
            }}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="primary"
          style={{ marginTop: "10px", padding: "6px 12px", cursor: "pointer" }}
        >
          Tải ảnh lên
        </button>
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          {uploadedImages.map((img: any) => (
            <div style={{ width: "100px", height: "150px" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={img.localUrl}
              />
            </div>
          ))}
        </div>
        {isErrorSendReview && (
          <div style={{ color: "red", margin: "10px 0px" }}>
            Bạn cần mua sản phẩm này để có thể đánh giá nó!
          </div>
        )}
      </div>
    );
  };

  const handleCloseModalReview = () => {
    setIsOpenModalReview(false);
  };

  const handleSendModalReview = async () => {
    try {
      const res = await axios.post(
        `${WebUrl}/api/v1/reviews/create`,
        {
          rating: selectedRating,
          productId: id,
          comment: comment,
          images: urlUploadedImages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsOpenModalReview(false);
      fetchData();
    } catch (error) {
      console.error("Error post item cart", error);
      setIsErrorSendReview(true);
    }
  };

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });

      const result = response.data;

      const product: ProductProps = {
        id: result.productId,
        name: result.name,
        price: formatPrice(result.price),
        description: result.description,
        images: result.images.map((e: any) => e.imageURL),
      };

      const variants: ProductVariants[] = response.data.productVariants.map(
        (e: any) => ({
          id: e.productVariantId,
          color: e.color.hexCode[0],
          size: e.size.sizeType,
          stock: e.stock,
        })
      );

      const color = Array.from(new Set(variants.map((item) => item.color)));
      const size = Array.from(new Set(variants.map((item) => item.size)));

      const sortedSizes = size.sort((a, b) => {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
      });

      setProjectVariants(variants);
      setProjectVariantsColor(color);
      setProjectVariantsSize(sortedSizes);
      setProductDetail(product);
      setSelectedSize(size?.[0]);
      setSelectedColor(
        variants?.find((e: any) => e.size === size?.[0])?.color || ""
      );
    } catch (error) {
      console.error("Error get product details", error);
    }
  };

  const getProductReview = async () => {
    try {
      const response = await axios.get(
        `${WebUrl}/api/v1/reviews/product/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );

      setArrReview(response.data);
    } catch (error) {
      console.error("Error get product details", error);
    }
  };

  const fetchData = async () => {
    await Promise.all([getProductDetails(), getProductReview()]);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="container product-container">
      <div className="row">
        <div className="col-md-6">
          <div className="product-images">
            {productDetail?.images.map((img, index) => (
              <div
                key={index}
                className="slick-image"
                onClick={() => setUrlImageHover(img)}
              >
                <img src={img} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-6'>
          <div className='product-order'>
            <div className='product-name'>
              {productDetail?.name}
            </div>
            <div dangerouslySetInnerHTML={{ __html: productDetail?.description || "" }} className='product-size-title'></div>
            <div className='product-price pb-1'>{productDetail?.price}</div>
            <div className='product-size-title pb-1'>Màu sắc</div>
            <div className='product-color  pb-1'>
              {projectVariantsColor.map((color: any) =>(
                <div className={`color-option-border ${selectedColor === color ? 'selected' : ''}`}>
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    disabled={
                      selectedSize
                        ? !getValidSizes(color).includes(selectedSize)
                        : false
                    }
                    className={`color-option `}
                    style={{ background: color }}
                  ></button>
                </div>
              ))}
            </div>
            <div className="product-size-title  pb-1">Size</div>
            <div className="d-flex product-sizes  pb-1">
              {projectVariantsSize.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`product-size ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  disabled={
                    selectedColor
                      ? !getValidColors(size).includes(selectedColor)
                      : false
                  }
                >
                  {size}
                </button>
              ))}
            </div>
            <div className='d-flex pb-1 pt-1 align-items-center'>
              <div className='product-size-title'>Giá</div>
              <div className="quantity-input-container">
                <button
                  onClick={() =>
                    quantity >= 2 &&
                    setQuantity((prevQuantity) => prevQuantity - 1)
                  }
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  value={quantity}
                  onChange={(e: any) => {
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                    setQuantity(onlyNumbers);
                  }}
                  className="product-quantity"
                />
                <button
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {/* <div className='product-description'>
              <div className='product-description-title'>description</div>
              <div className='product-description-content'>
                Phong cách adidas cổ điển thể hiện qua đôi giày phong cách chạy bộ này. Kết hợp những gì tuyệt vời nhất của thiết kế giày chạy bộ classic và đường nét gọn gàng của phong cách streetwear hiện đại, đôi giày này mang hơi hướng kinh điển dễ dàng kết hợp với outfit thường ngày của bạn.
              </div>
            </div> */}
            <div className='product-order-btn'>
              <button className='btn-add-cart' onClick={e => {handleAddToCart()}}>thêm vào giỏ hàng</button>
              <button className='btn-order' onClick={() => handleBuy()}>mua ngay</button>
              
            </div>
          </div>
        </div>
      </div>
      <div className="rating-container">
        <h1>Đánh giá sản phẩm</h1>
        {arrReview.map((review) => (
          <div style={{ marginTop: "15px" }}>
            <div className="review-user">
              <img src={review.user.avatar || avatar} alt="" />
              <div style={{ marginLeft: "15px" }}>
                <div>
                  {review.user.firstName} {review.user.lastName}
                </div>
                <div>
                  {Array.from({ length: 5 }, (_, index) => (
                    <>
                      {review.rating >= index + 1 ? (
                        <FaStar key={index} className="icon-star-active" />
                      ) : (
                        <FaStar key={index} className="icon-star" />
                      )}
                    </>
                  ))}
                </div>
                <div>{review.comment}</div>
                <div
                  style={{ marginTop: "15px", display: "flex", gap: "10px" }}
                >
                  {review.images.map((img: any) => (
                    <div style={{ width: "100px", height: "150px" }}>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={img}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {role && (
          <button
            style={{ marginTop: "15px", padding: "6px 8px" }}
            className="primary"
            onClick={() => setIsOpenModalReview(true)}
          >
            Tạo đánh giá
          </button>
        )}
      </div>
      {isOpenModal && (
        <ModalMain
          title="Notification"
          content="Item has been added to cart"
          btn1="Ok"
          onSave={handleCloseModalCheckout}
          btn2="Checkout"
          onClose={handleCloseModal}
        />
      )}
      {urlImageHover && (
        <ModalMain
          title="Image Product"
          content={<ImageZoom src={urlImageHover} />}
          btn2="Ok"
          onSave={handleCloseModalImg}
          btn1="Close"
          onClose={handleCloseModalImg}
        />
      )}

      {isOpenModalReview && (
        <ModalMain
          title="Tạo đánh giá"
          content={renderModalReview()}
          btn1="Hủy"
          onSave={handleSendModalReview}
          btn2="Gửi đánh giá"
          onClose={handleCloseModalReview}
        />
      )}
    </div>
  );
};

export default Product;
