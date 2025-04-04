import React from 'react'
import './styles.scss'
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { TiFilter } from "react-icons/ti";

const Collections = () => {
    const { item } = useParams();
    return (
        <div className='container'>
            <div className='text-center'>
                <div className='collections-title'>Quần Áo</div>
                <p>Bộ sưu tập Quần Áo MLB tại MLB Việt Nam - Thời trang thể thao đa dạng. </p>
                <p>MLB Việt Nam tự hào giới thiệu bộ sưu tập Áo MLB với thiết kế đa dạng từ áo phông, áo hoodie đến áo khoác, sử dụng chất liệu thoáng khí và co giãn để mang đến sự thoải mái và linh hoạt khi bạn vận động. Khám phá bộ sưu tập Quần Áo MLB và tạo nên phong cách thể thao đẳng cấp và nổi bật.</p>
            </div>
            <div className='collections-header'>
                <div className='collections-breadcrumb'>
                    <Link to={'/'} className='link-style collections-breadcrumb-item'>Trang chủ</Link>
                    <div className='collections-breadcrumb-item'>/</div>
                    <Link to={'/'} className='link-style collections-breadcrumb-item'>Danh mục</Link>
                    <div className='collections-breadcrumb-item'>/</div>
                    <div className='collections-breadcrumb-active'>Quần Áo</div>
                </div>
                <div className='collections-actions-sort'>
                    <div>Sắp xếp theo</div>
                    <button className='collections-sort-btn'>Bán chạy</button>
                    <button className='collections-sort-btn'>Tăng dần</button>
                    <button className='collections-sort-btn'>Giảm dần</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-3'>
                    <div className='filter-container mt-2'>
                        <div className='filter-header'>
                            <TiFilter className='filter-header-icon'/>
                            <div>Bộ lọc tìm kiếm</div>
                        </div>
                        <div className='filter-cotent'>
                            <div className='filter-item'>
                                <div className='filter-title'>
                                    Loại sản phẩm
                                </div>
                                <ul>
                                    <li><input type="checkbox"/>Áo thun</li>
                                    <li><input type="checkbox"/>Áo Polo</li>
                                    <li><input type="checkbox"/>Áo Sweater</li>
                                    <li><input type="checkbox"/>Áo khoác</li>
                                </ul>
                            </div>
                            <div className='filter-item'>
                                <div className='filter-title'>
                                    Giá
                                </div>
                                <ul>
                                    <li><input type="checkbox"/>Dưới 1,000,000đ</li>
                                    <li><input type="checkbox"/>1,000,000đ - 2,000,000đ</li>
                                    <li><input type="checkbox"/>2,000,000đ - 3,000,000đ</li>
                                    <li><input type="checkbox"/>Trên 3,000,000đ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-9 colections-items'>
                    <div className='p-2'>
                        <Card/>
                    </div>
                    <div className='p-2'>
                        <Card/>
                    </div>
                    <div className='p-2'>
                        <Card/>
                    </div>
                    <div className='p-2'>
                        <Card/>
                    </div>
                    <div className='p-2'>
                        <Card/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections