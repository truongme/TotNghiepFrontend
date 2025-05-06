import React, { useEffect, useState } from "react";
import "./styles.scss";
import { formatDate, formatPrice } from "../../../helpers";
import axios from "axios";
import { WebUrl } from "../../../constants";
import ModalMain from "../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../helpers/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface Order {
  id: string;
  status: string;
  total: number;
  time: any;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  rating?: number;
  reviewText?: string;
  isRating?: boolean;
}

const OrderUser = () => {
  const [statusSelected, setStatusSelected] = useState<string>("");
  const [orderUser, setOrderUser] = useState<Order[]>([]);
  const [orderUserPrev, setOrderUserPrev] = useState<Order[]>([]);
  const token = sessionStorage.getItem("token");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [idOpenAssessModal, setIdOpenAssessModal] = useState<string>("");
  const [idOrderCancel, setIdOrderCancel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>();
  const [selectedOtherReason, setSelectedOtherReason] =
    useState<boolean>(false);
  const [valueOtherReason, setValueOtherReason] = useState<string>("");
  const navigate = useNavigate();

  const reasons = [
    "I don't need this product anymore",
    "I want to change my shipping address",
    "I want to change the delivery method",
    "I want to buy another product",
    "Other reasons",
  ];

  const handleSelectedReason = (reason: string) => {
    setSelectedReason(reason);
    if (reason === "Other reasons") {
      setSelectedOtherReason(true);
    } else {
      setSelectedOtherReason(false);
      setValueOtherReason("");
    }
  };

  const bodyModal = () => {
    return (
      <div style={{ width: "100%" }}>
        {reasons.map((reason) => (
          <div className="form-check" key={reason}>
            <input
              className="form-check-input"
              type="radio"
              name="cancelReason"
              value={reason}
              onChange={() => handleSelectedReason(reason)}
              checked={selectedReason === reason}
            />
            <label className="form-check-label">{reason}</label>
          </div>
        ))}
        {selectedOtherReason && (
          <div className="mt-1">
            <textarea
              className="form-control"
              onChange={(e) => setValueOtherReason(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
    );
  };

  const bodyModalAssess = () => {
    const data = orderUser.find((item: Order) => item.id === idOpenAssessModal);
    const items: any = data?.items;
    return (
      <div
        style={{
          width: "100%",
          height: "600px",
          overflowY: "auto",
          paddingRight: "5px",
        }}
      >
        {items.map((e: any) => (
          <div style={{ width: "100%" }}>
            <div className="modal-assess-header">
              <div className="modal-assess-img">
                <img src={e?.image} alt="" />
              </div>
              <div className="modal-assess-name">
                <div>{e.name}</div>
                <div>Màu: {e.color}</div>
                <div>Size: {e.size}</div>
              </div>
            </div>
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <>
                  {e.rating >= index ? (
                    <FaStar
                      key={index}
                      className="icon-star"
                      onClick={() => onChangeRating(e.id, index)}
                    />
                  ) : (
                    <FaRegStar
                      key={index}
                      className="icon-star"
                      onClick={() => onChangeRating(e.id, index)}
                    />
                  )}
                </>
              ))}
            </div>
            <div className="input-review">
              <textarea
                value={e.reviewText}
                rows={4}
                placeholder="Viết đánh giá của bạn..."
                onChange={(event) =>
                  onChangeReviewText(e.id, event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const onChangeReviewText = (id: string, value: string) => {
    const updatedOrders = orderUser.map((order) => {
      if (order.id === idOpenAssessModal) {
        return {
          ...order,
          items: order.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                reviewText: value,
              };
            }
            return item;
          }),
        };
      }
      return order;
    });

    setOrderUser(updatedOrders);
  };

  const onChangeRating = (id: string, value: number) => {
    const updatedOrders = orderUser.map((order) => {
      if (order.id === idOpenAssessModal) {
        return {
          ...order,
          items: order.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                rating: value,
              };
            }
            return item;
          }),
        };
      }
      return order;
    });

    setOrderUser(updatedOrders);
  };

  const handleOpenModalAssessOrder = (id: string) => {
    setIdOpenAssessModal(id);
  };

  const handleCloseModalAssessOrder = () => {
    setIdOpenAssessModal("");
  };

  const handleAssessOrder = () => {
    setIdOpenAssessModal("");
  };

  const handleOpenModalCancelOrder = (id: string) => {
    setIsOpenModal(true);
    setIdOrderCancel(id);
  };

  const handleCloseModalCancelOrder = () => {
    setIsOpenModal(false);
  };

  const handleCancelOrder = () => {
    setIsOpenModal(false);
    putStatusOrder(idOrderCancel);
    setStatusSelected("");
    fetchOrderUser();
  };

  const handleChangeStatus = (status: string) => {
    setStatusSelected(status);
    const result =
      status !== ""
        ? orderUserPrev?.filter((e: Order) => e.status === status)
        : orderUserPrev;
    setOrderUser(result);
  };

  const putStatusOrder = async (id: string) => {
    try {
      await axios.put(
        `${WebUrl}/api/v1/orders/cancel-by-user/${id}`,
        {
          note: selectedOtherReason ? valueOtherReason : selectedReason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  const fetchOrderUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${WebUrl}/api/v1/orders/user-order`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data
        .map((x: any) => ({
          id: x.orderId,
          status: x.status,
          total: x.totalAmount,
          time: x.orderDate,
          items: x.orderItems.map((e: any) => ({
            id: e.orderItemId,
            name: e.productVariant.product.name,
            image: e.productVariant.product.images[0]?.imageURL || "",
            quantity: e.quantity,
            size: e.productVariant.size.sizeType,
            color: e.productVariant.color.name[0],
            price: e.productVariant.product.price,
          })),
        }))
        .sort(
          (a: any, b: any) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        );

      setOrderUser(data);
      setOrderUserPrev(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Unexpected Error:", error);
    }
  };

  useEffect(() => {
    fetchOrderUser();
  }, []);

  return (
    <div>
      <div className="order-status">
        <ul className="order-status-list">
          <li
            className={`${
              statusSelected === "" ? "active" : ""
            } order-status-item`}
            onClick={() => handleChangeStatus("")}
          >
            Tất cả
          </li>
          <li
            className={`${
              statusSelected === "PENDING" ? "active" : ""
            } order-status-item`}
            onClick={() => handleChangeStatus("PENDING")}
          >
            Chờ giao hàng
          </li>
          <li
            className={`${
              statusSelected === "SHIPPING" ? "active" : ""
            } order-status-item`}
            onClick={() => handleChangeStatus("SHIPPING")}
          >
            Đang giao hàng
          </li>
          <li
            className={`${
              statusSelected === "DELIVERED" ? "active" : ""
            } order-status-item`}
            onClick={() => handleChangeStatus("DELIVERED")}
          >
            Đã hoàn thành
          </li>
          <li
            className={`${
              statusSelected === "CANCELLED" ? "active" : ""
            } order-status-item`}
            onClick={() => handleChangeStatus("CANCELLED")}
          >
            Đơn đã huỷ
          </li>
        </ul>
      </div>
      {isLoading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : (
        <div>
          {orderUser.length > 0 ? (
            <>
              {orderUser.map((e: Order) => (
                <div className="order-item-container">
                  <div className="order-item-header">
                    <div className="order-item-time">
                      Ngày đặt hàng: {formatDate(e.time)}
                    </div>
                    <div className="order-item-status">{e.status}</div>
                  </div>
                  {e?.items.map((x: OrderItem) => (
                    <div className="order-item">
                      <div className="order-item-content">
                        <div className="order-item-img">
                          <img src={x.image} alt="" />
                        </div>
                        <div>
                          <div>{x.name}</div>
                          <div>Màu: {x.color}</div>
                          <div>Size: {x.size}</div>
                          <div>Số lượng: {x.quantity}</div>
                        </div>
                      </div>
                      <div className="total-price">{formatPrice(x.price)}</div>
                    </div>
                  ))}
                  <div className="order-item-footer">
                    <div>
                      {e.status === "PENDING" && (
                        <button
                          className="primary"
                          onClick={() => handleOpenModalAssessOrder(e.id)}
                        >
                          Đánh giá
                        </button>
                      )}
                      {e.status === "PENDING" && (
                        <button
                          className="secondary"
                          onClick={() => handleOpenModalCancelOrder(e.id)}
                        >
                          Huỷ
                        </button>
                      )}
                    </div>
                    <div className="d-flex">
                      <div>Tổng tiền: </div>
                      <div className="total-price">{formatPrice(e.total)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="order-emty">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
                alt=""
              />
              <div>Chưa có đơn hàng nào</div>
            </div>
          )}
        </div>
      )}
      {isOpenModal && (
        <ModalMain
          title="Thông báo"
          content={bodyModal()}
          btn1="Cancel"
          btn2="Yes"
          onClose={handleCloseModalCancelOrder}
          onSave={handleCancelOrder}
        />
      )}
      {idOpenAssessModal && (
        <ModalMain
          title="Đánh giá"
          content={bodyModalAssess()}
          btn1="Đóng"
          btn2="Gửi"
          onClose={handleCloseModalAssessOrder}
          onSave={handleAssessOrder}
        />
      )}
    </div>
  );
};

export default OrderUser;
