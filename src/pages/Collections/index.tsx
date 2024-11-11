import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Link, useLocation, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { TiFilter } from "react-icons/ti";
import axios from 'axios';
import { CardProps } from '../Home';
import { WebUrl } from '../../constants';

const Collections = () => {
   const { categoryId } = useParams();
   const [btnSort, setBtnSort] = useState<string>("popularity")

    const [listProduct, setListProduct] = useState<any[]>([])

    const sortProducts = (criteria: string) => {
        const sortedProducts = [...listProduct];
        setBtnSort(criteria)

        if (criteria === 'popularity') {
            sortedProducts.sort((a, b) => b.id - a.id); 
        } else if (criteria === 'ascending') {
            sortedProducts.sort((a, b) => a.price - b.price); 
        } else if (criteria === 'descending') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        setListProduct(sortedProducts); 
    };

    const getProduct = async () => {
        try {
            const response = await axios.get(`${WebUrl}/api/v1/products/all`, {
                params: {
                    categoryId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                },
            });
            const data = response.data.data.map((e: any) => ({
                id: e.productId,
                name: e.name,
                price: e.price,
                img: e.images[0].imageURL,
                imgHover: e.images[1].imageURL
            }));
            setListProduct(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };


    useEffect(() => {
        getProduct();
    }, [categoryId]);


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
                    <button className={`collections-sort-btn ${btnSort === 'popularity' && "active"}  `} onClick={() => sortProducts('popularity')}>Bán chạy</button>
                    <button className={`collections-sort-btn ${btnSort === 'ascending' && "active"}  `} onClick={() => sortProducts('ascending')}>Tăng dần</button>
                    <button className={`collections-sort-btn ${btnSort === 'descending' && "active"}  `} onClick={() => sortProducts('descending')}>Giảm dần</button>   
                </div>
            </div>
            <div className='row mb-3'>
                {/* <div className='col-3'>
                    <div className='filter-container mt-2'>
                        <div className='filter-header'>
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
                                    Kích thước
                                </div>
                                <ul>
                                    <li><input type="checkbox" />Áo thun</li>
                                    <li><input type="checkbox" />Áo Polo</li>
                                    <li><input type="checkbox" />Áo Sweater</li>
                                    <li><input type="checkbox" />Áo khoác</li>
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
                </div> */}
                <div className='col-12 colections-items'>
                    {listProduct.map((e: CardProps) => (
                        <div className='p-2'>
                            <Card data={e}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collections