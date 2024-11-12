import React, { useEffect, useState } from 'react'
import { formatPrice } from '../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import './styles.scss'
import axios from 'axios';
import { WebUrl } from '../../constants';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface TableProduct {
    id: string;
    name: string;
    img: string;
    price: number;
    quantity: number;
    category: string;
    subCategory: string;
}

const ProductManagement = () => {
    const [listProduct, setListProduct] = useState<TableProduct[]>([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3; 
    const totalPages = Math.ceil(totalProduct / limit);
    const navigate = useNavigate()

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const fetchListProduct = async (page: number) => {
        try {
            const response = await axios.get(`${WebUrl}/api/v1/products/all?limit=${limit}&page=${page}`, {
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
                category: e.categoryId,
                subCategory: e.subCategoryId,
                quantity: e.quantity,
            }));
            setTotalProduct(response.data.meta.total);
            setListProduct(data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    useEffect(() => {
        fetchListProduct(currentPage);
    }, [currentPage]);


    return (
        <div className='w-100 p-3'>
            <h4>Danh sách sản phẩm</h4>
            <table className="table table-bordered table-striped w-100 text-center">
                <thead className="table-primary">
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct.map((e: TableProduct, index: number) => (
                        <tr key={e.id} onClick={() => navigate(`/product/${e.id}`)}>
                            <th>{index + 1 + (currentPage - 1) * limit}</th>
                            <td className='product-img'>
                                <img src={e.img} alt="" />
                            </td>
                            <td>{e.name}</td>
                            <td>{e.category}</td>
                            <td>{e.subCategory}</td>
                            <td>{formatPrice(e.price)}</td>
                            <td>{e.quantity}</td>
                            <td>
                                <div className='d-flex justify-content-around'>
                                    <Link to={`/product/${e.id}`}>
                                        <div className='icon-product edit'>
                                            <MdModeEdit />
                                        </div>
                                    </Link>
                                    <div className='icon-product delete'>
                                        <RiDeleteBin2Fill />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pagination */}
            <nav aria-label="Page navigation" className="mt-4 mb-4">
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

            <Link to={'/product/new'}>
                <button type="button" className="btn btn-success w-100">Thêm sản phẩm</button>
            </Link>
        </div>
    )
}

export default ProductManagement;
