import React from 'react'
import './styles.scss'
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card';

const Collections = () => {
    const { item } = useParams();
    return (
        <div className='container text-center'>
            <div className='collections-title'>Quần Áo</div>
            <p>Bộ sưu tập Quần Áo MLB tại MLB Việt Nam - Thời trang thể thao đa dạng. </p>
            <p>MLB Việt Nam tự hào giới thiệu bộ sưu tập Áo MLB với thiết kế đa dạng từ áo phông, áo hoodie đến áo khoác, sử dụng chất liệu thoáng khí và co giãn để mang đến sự thoải mái và linh hoạt khi bạn vận động. Khám phá bộ sưu tập Quần Áo MLB và tạo nên phong cách thể thao đẳng cấp và nổi bật.</p>
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
            <div>
                <Card/>
            </div>
        </div>
    )
}

export default Collections