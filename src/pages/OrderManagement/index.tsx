import React, { useEffect, useState } from "react";
import "./styles.scss";
import { MdCancel } from "react-icons/md";
import { OrderStatus, WebUrl } from "../../constants";
import axios from "axios";
import { formatDate, formatPrice } from "../../helpers";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface OrderTable {
  orderId: string;
  status: string;
  orderDate: any;
  totalPrice: any;
  userId: any;
  orderItems: any;
}

const OrderManagement = () => {
  const [selectTab, setSelectTab] = useState<string>("");
  const token = sessionStorage.getItem("token");
  const [selectOrder, setSelectOrder] = useState<any>();
  const [status, setStatus] = useState<any>(OrderStatus);
  const [listOrder, setListOrder] = useState<OrderTable[]>([]);
  const [listOrderPrev, setListOrderPrev] = useState<OrderTable[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(totalOrders / limit);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      case "Delivered":
        return "green";
      case "Shipping":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleChangeTab = (status: string) => {
    setSelectTab(status);
    if (status === "") {
      setListOrder(listOrderPrev);
    } else {
      const listOrderFilter = listOrderPrev.filter(
        (x) =>
          x.status === status.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase())
      );
      setListOrder(listOrderFilter);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchListOrder = async (page: number) => {
    try {
      const response = await axios.get(
        `${WebUrl}/api/v1/orders/all?limit=${limit}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.map((e: any) => ({
        orderId: e.orderId,
        status: e.status
          .toLowerCase()
          .replace(/^\w/, (c: string) => c.toUpperCase()),
        userId: e.userId,
        orderDate: formatDate(e.orderDate),
        totalPrice: e.totalPrice,
        orderItems: e.orderItems,
      }));

      console.log(data);

      setTotalOrders(response.data.meta.total);
      setListOrder(data);
      setListOrderPrev(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAcceptOrder = async (id: string) => {
    try {
      await axios.put(
        `${WebUrl}/api/v1/orders/accept-by-admin/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectOrder("");
      fetchListOrder(currentPage);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchListOrder(currentPage);
  }, [currentPage, selectTab]);

  return (
    <div className="container order-admin-container">
      <div className="order-header">
        <div
          className={`order-header-item ${selectTab === "" ? "active" : ""}`}
          onClick={() => handleChangeTab("")}
        >
          All
        </div>
        <div
          className={`order-header-item ${
            selectTab === "PENDING" ? "active" : ""
          }`}
          onClick={() => handleChangeTab("PENDING")}
        >
          Pending
        </div>
        <div
          className={`order-header-item ${
            selectTab === "SHIPPING" ? "active" : ""
          }`}
          onClick={() => handleChangeTab("SHIPPING")}
        >
          On Delivery
        </div>
        <div
          className={`order-header-item ${
            selectTab === "DELIVERED" ? "active" : ""
          }`}
          onClick={() => handleChangeTab("DELIVERED")}
        >
          Delivered
        </div>
        <div
          className={`order-header-item ${
            selectTab === "CANCELLED" ? "active" : ""
          }`}
          onClick={() => handleChangeTab("CANCELLED")}
        >
          Cancelled
        </div>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Id</th>
            <th style={{ width: "20%" }}>User</th>
            <th style={{ width: "20%" }}>Date</th>
            <th style={{ width: "20%" }}>Total</th>
            <th style={{ width: "15%" }}>Status</th>
          </tr>
        </thead>
      </table>
      <table className="order-table">
        <tbody>
          {listOrder.map((order: any, index: number) => (
            <tr key={order.orderId} onClick={() => setSelectOrder(order)}>
              <td style={{ width: "25%" }}>{order.orderId}</td>
              <td style={{ width: "20%" }}>{order.userId}</td>
              <td style={{ width: "20%" }}>{order.orderDate}</td>
              <td style={{ width: "20%" }}>{formatPrice(order.totalPrice)}</td>
              <td style={{ width: "15%", color: getStatusColor(order.status) }}>
                <div className="d-flex align-items-center">
                  <div
                    style={{ backgroundColor: getStatusColor(order.status) }}
                    className="color-status"
                  ></div>
                  {order.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <nav>
          <ul className="pagination-list">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <GrFormPrevious />
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <MdNavigateNext />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {selectOrder && (
        <div className="panel-order-details-container">
          <div className="panel-order-details">
            <div className="panel-order-details-header">
              <div className="panel-order-details-header-title">
                Order details
              </div>
              <MdCancel onClick={() => setSelectOrder("")} />
            </div>
            <div style={{ overflowY: "auto" }}>
              <div className="panel-order-details-row mt-2">
                <div className="panel-order-details-title">Order code</div>
                <input
                  disabled
                  className="form-control"
                  value={selectOrder.orderId}
                />
              </div>
              <div className="panel-order-details-row mt-2">
                <div className="panel-order-details-title">UserId</div>
                <input
                  disabled
                  className="form-control"
                  value={selectOrder.userId}
                />
              </div>
              <div className="panel-order-details-row mt-2">
                <div className="panel-order-details-title">Total Price</div>
                <input
                  disabled
                  className="form-control"
                  placeholder="Payment"
                  value={formatPrice(selectOrder.totalPrice)}
                />
              </div>
              <div className="panel-order-details-row mt-2">
                <div className="panel-order-details-title">Order Date</div>
                <input
                  disabled
                  className="form-control"
                  placeholder="Shipment"
                  value={formatDate(selectOrder.orderDate)}
                />
              </div>
              <div className="panel-order-details-product mt-2">
                <div>Product</div>
                {selectOrder.orderItems?.map((x: any) => (
                  <div className="order-product-details">
                    <img
                      className="img-product-order"
                      src={x.productVariant.product.images[0].imageURL}
                      alt=""
                    />
                    <div className="order-product-details-content">
                      <div className="name-product">
                        {x.productVariant.product.name}
                      </div>
                      <div className="infor-order-product">
                        Color: {x.productVariant.color.name}
                      </div>
                      <div className="infor-order-product">
                        Size: {x.productVariant.color.name}
                      </div>
                      <div className="infor-order-product">
                        Quantity: {x.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="panel-order-details-row mb-3 mt-2">
                <div className="panel-order-details-title">Status</div>
                <input
                  disabled
                  className="form-control"
                  placeholder="Status"
                  value={selectOrder.status}
                />
              </div>
            </div>

            <div className="panel-order-footer">
              <button className="close" onClick={() => setSelectOrder("")}>
                Close
              </button>
              {selectOrder.status === "Pending" ||
                (selectOrder.status === "Shipping" && (
                  <button className="delete" onClick={() => setSelectOrder("")}>
                    Cancel
                  </button>
                ))}
              {selectOrder.status === "Pending" && (
                <button
                  className="primary"
                  onClick={() => handleAcceptOrder(selectOrder.orderId)}
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
