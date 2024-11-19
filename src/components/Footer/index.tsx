import React, { useState } from 'react';
import './styles.scss';

const Footer = () => {

  return (
    <div className="footer-container">
      <div className="footer-sections">
        <div className="footer-section">
          <h3>TRỢ GIÚP</h3>
          <ul>
            <li><a>Hệ thống cửa hàng</a></li>
            <li><a>Liên hệ</a></li>
            <li><a>Chính sách Loyalty</a></li>
            <li><a>Chính sách bảo mật</a></li>
            <li><a>Điều khoản sử dụng</a></li>
            <li><a>Chính sách vận chuyển, giao hàng</a></li>
            <li><a>Chính sách thanh toán</a></li>
            <li><a>Chính sách đổi trả</a></li>
            <li><a>Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>THANH TOÁN</h3>
          <ul>
            <li><a>Visa / Mastercard / JCB</a></li>
            <li><a>ATM / Internet Banking</a></li>
            <li><a>Quét mã QR</a></li>
            <li><a>Mua trước trả sau</a></li>
            <li><a>Ví điện tử</a></li>
            <li><a>Thanh toán khi nhận hàng (COD)</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>GIAO HÀNG</h3>
          <ul>
            <li><a href="#standard-delivery">Giao hàng tiêu chuẩn</a></li>
            <li><a href="#maison-now">Maison NOW</a></li>
          </ul>
          <img className="verified-icon" src="https://file.hstatic.net/1000284478/file/icon-bct_c5ff22fa4ca24fd58c49573d2114f8b0.svg" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>Bản quyền thuộc về MLB Korea được phân phối độc quyền tại Việt Nam bởi CÔNG TY CỔ PHẦN MAISON RETAIL MANAGEMENT INTERNATIONAL</p>
        <p>Địa chỉ: 189 - 197, Dương Bá Trạc, Phường 1, Quận 8, TP.Hồ Chí Minh | MST: 0313175103</p>
        <p>Hotline: 1900 299268 | Email: customercare@maisonrmi.com</p>
      </div>
    </div>
  );
};

export default Footer;