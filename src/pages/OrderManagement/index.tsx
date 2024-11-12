import React, { useEffect, useState } from 'react';
import './styles.scss';
import { MdCancel } from "react-icons/md";
import { OrderStatus, WebUrl } from '../../constants';
import axios from 'axios';
import { formatDate, formatPrice } from '../../helpers';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface OrderTable {
  orderId: string;
  status: string;
  payment: any;
  shipment: any;
  user: any;
}

const OrderManagement = () => {
  const [selectTab, setSelectTab] = useState<string>("all");
  const token = sessionStorage.getItem("token");
  const [selectOrder, setSelectOrder] = useState<string>("");
  const [status, setStatus] = useState<any>(OrderStatus);
  const [listOrder, setListOrder] = useState<OrderTable[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const totalPages = Math.ceil(totalOrders / limit);

  const handleChangeTab = (status: string) => {
    setSelectTab(status);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchListOrder = async (page: number) => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/orders/all?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Authorization': `Bearer ${token}`, 
        },
      });

      const data = response.data.data.map((e: OrderTable) => ({
        orderId: e.orderId,  
        status: e.status,
        user: e.user.firstName + " " + e.user.lastName,
        payment: e.payment?.paymentMethod,
        shipment: formatDate(e.shipment?.estimatedDeliveryDate),
      }));

      setTotalOrders(response.data.meta.total);
      setListOrder(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchListOrder(currentPage);
  }, [currentPage]);

  return (
    <div className='container p-3 order-admin-container'>
      <table className="table table-bordered table-striped mt-3 text-center">
        <thead className="table-primary">
          <tr>
            <th>Index</th>
            <th>Order ID</th>
            <th>Người dùng</th>
            <th>Payment</th>
            <th>Shipment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listOrder.map((order: any, index: number) => (
            <tr key={order.orderId} onClick={() => setSelectOrder(order.orderId)}>
              <th>{index + 1 + (currentPage - 1) * limit}</th>
              <td>{order.orderId}</td>
              <td>{order.user}</td>
              <td>{order.payment}</td>
              <td>{order.shipment}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              <GrFormPrevious />
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              <MdNavigateNext />
            </button>
          </li>
        </ul>
      </nav>

       {selectOrder && (
        <div className='panel-order-details-container'>
          <div className='panel-order-details'>
            <div className='panel-order-details-header'>
              <div className='panel-order-details-header-title'>Order details</div>
              <MdCancel onClick={() => setSelectOrder("")}/>
            </div>
            <div style={{overflowY:'auto'}}>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Order code</div>
                <input disabled className="form-control" placeholder='OrderID' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Username</div>
                <input disabled className="form-control" placeholder='Username' />
              </div>
              <div className='panel-order-details-product'>
                <div>Product</div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
                <div className='order-product-details'>
                  <img src="https://product.hstatic.net/200000642007/product/ao_khoac_denim_3adkm0341_dff08e15f3c943e294b8b820a4f4cd7c_master.jpg" alt="" />
                  <div className='order-product-details-content'>
                    <div className='name-product'>MLB - Áo thun unisex cổ tròn tay ngắn hiện đại</div>
                    <div className='infor-order-product'>Color: White</div>
                    <div className='infor-order-product'>Size: XL</div>
                    <div className='infor-order-product'>Quantity: 5</div>
                  </div>
                </div>
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Payment</div>
                <input disabled className="form-control" placeholder='Payment' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Shipment</div>
                <input disabled className="form-control" placeholder='Shipment' />
              </div>
              <div className='panel-order-details-row'>
                <div className='panel-order-details-title'>Status</div>
                <select
                  className="form-select"
                  aria-label="Trạng thái đơn hàng"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {OrderStatus.map((e: any) => (
                    <option value={e.value}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className='panel-order-footer'>
              <button className='btn-cancel' onClick={() => setSelectOrder("")}>Cancel</button>
              <button className='btn-save'>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
