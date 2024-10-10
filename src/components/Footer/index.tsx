import React, { useState } from 'react';
import './styles.scss';

const Footer = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (section: number) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer-container">
      {/* Chỉ hiển thị 3 thẻ h3 trên màn hình nhỏ */}
      <div className="footer-sections">
        <div className="footer-section">
          <h3 onClick={() => toggleSection(1)}>TRỢ GIÚP</h3>
          <ul className={openSection === 1 ? 'active' : ''}>
            <li><a href="#store">Hệ thống cửa hàng</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#loyalty">Chính sách Loyalty</a></li>
            <li><a href="#privacy">Chính sách bảo mật</a></li>
            <li><a href="#terms">Điều khoản sử dụng</a></li>
            <li><a href="#shipping">Chính sách vận chuyển, giao hàng</a></li>
            <li><a href="#payment">Chính sách thanh toán</a></li>
            <li><a href="#returns">Chính sách đổi trả</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 onClick={() => toggleSection(2)}>THANH TOÁN</h3>
          <ul className={openSection === 2 ? 'active' : ''}>
            <li><a href="#visa">Visa / Mastercard / JCB</a></li>
            <li><a href="#atm">ATM / Internet Banking</a></li>
            <li><a href="#qr">Quét mã QR</a></li>
            <li><a href="#buy-now-pay-later">Mua trước trả sau</a></li>
            <li><a href="#e-wallet">Ví điện tử</a></li>
            <li><a href="#cod">Thanh toán khi nhận hàng (COD)</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 onClick={() => toggleSection(3)}>GIAO HÀNG</h3>
          <ul className={openSection === 3 ? 'active' : ''}>
            <li><a href="#standard-delivery">Giao hàng tiêu chuẩn</a></li>
            <li><a href="#maison-now">Maison NOW</a></li>
          </ul>
          <img className="verified-icon" src="link_to_verified_icon" alt="Verified" />
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
