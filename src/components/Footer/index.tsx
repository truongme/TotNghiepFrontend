import React, { useState } from 'react';
import './styles.scss';

const Footer = () => {

  return (
    <div className="footer-container">
      <div className="footer-sections">
        <div className="footer-section">
          <h3>HELP</h3>
          <ul>
            <li>Store Locations</li>
            <li>Contact Us</li>
            <li>Loyalty Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Shipping & Delivery Policy</li>
            <li>Payment Policy</li>
            <li>Return & Exchange Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>PAYMENT</h3>
          <ul>
            <li>Visa / Mastercard / JCB</li>
            <li>ATM / Internet Banking</li>
            <li>QR Code Payment</li>
            <li>Buy Now, Pay Later</li>
            <li>E-Wallets</li>
            <li>Cash on Delivery (COD)</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>DELIVERY</h3>
          <ul>
            <li>Standard Delivery</li>
            <li>Maison NOW</li>
          </ul>
          <img className="verified-icon" src="https://file.hstatic.net/1000284478/file/icon-bct_c5ff22fa4ca24fd58c49573d2114f8b0.svg" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright belongs to MLB Korea, exclusively distributed in Vietnam by MAISON RETAIL MANAGEMENT INTERNATIONAL JOINT STOCK COMPANY</p>
        <p>Address: 189 - 197, Dương Bá Trạc, Ward 1, District 8, Ho Chi Minh City | Tax Code: 0313175103</p>
        <p>Hotline: 1900 299268 | Email: customercare@maisonrmi.com</p>
      </div>
    </div>
  );
};

export default Footer;
