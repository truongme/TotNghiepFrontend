import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import img from '../../assets/images/card.webp'
import { RiDeleteBin2Fill } from "react-icons/ri";
import ButtonCustom from '../../components/ButtonCustom';

const Cart = () => {
  return (
    <div className='container'>
        <div className='cart-breadcrumb'>
            <Link to={'/'} className='link-style cart-breadcrumb-item'>Trang chủ</Link>
            <div className='cart-breadcrumb-item'>/</div>
            <div className='cart-breadcrumb-active'>Giỏ hàng</div>
        </div>    
        <div className='cart-header'>
            <div className='row'>
                <div className='col-2 d-flex align-items-center'>
                    <input type="checkbox"/>Chọn tất cả
                </div>
                <div className='col-5 '>
                    Sản phẩm
                </div>
                <div className='col-2'>
                    Số lượng
                </div>
                <div className='col-3'>
                    Thành tiền
                </div>
            </div>
        </div>        
        <div className='cart-item'>
            <div className='row'>
                <div className='col-2 cart-item-product'>
                    <input type="checkbox"/>
                    <div className='cart-item-img'>
                        <img src={img} alt="" />
                    </div>
                </div>
                
                <div className='col-5 cart-item-content'>
                    <div>
                        MLB - Áo thun unisex cổ tròn tay ngắn Vintage Sports Functional Big Logo
                    </div>
                    <div className='d-flex'>
                        <div>Size: XL</div>
                        <div>Color: Red</div>
                    </div>
                    
                    <div>Price: 1,600,000đ</div>
                </div>
                <div className='col-2 cart-item-action'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-primary">-</button>
                        <button type="button" className="btn btn-primary">1</button>
                        <button type="button" className="btn btn-outline-primary">+</button>
                    </div>
                </div>
                <div className='col-2 cart-item-price'>
                    5,000,000đ
                </div>
                <div className='col-1'>
                    <RiDeleteBin2Fill />
                </div>
            </div>
        </div>
        <div className='cart-pay'>
            <h6>Tổng thanh toán: 2,500,000đ</h6>
            <div>
                <Link to={'/pay'}>
                    <button>Mua ngay</button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Cart