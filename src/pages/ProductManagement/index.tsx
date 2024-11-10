import React from 'react'
import { formatPrice } from '../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import './styles.scss'

interface TableProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    subCategory: string;
}

const ProductManagement = () => {

    const tableProducts: TableProduct[] = [
        {
            id: "1",
            name: "Basic T-Shirt",
            price: 20,
            quantity: 150,
            category: "Clothing",
            subCategory: "Tops",
        },
        {
            id: "2",
            name: "Jeans",
            price: 45,
            quantity: 80,
            category: "Clothing",
            subCategory: "Bottoms",
        },
        {
            id: "3",
            name: "Hoodie",
            price: 60,
            quantity: 50,
            category: "Clothing",
            subCategory: "Outerwear",
        },
        {
            id: "4",
            name: "Sneakers",
            price: 90,
            quantity: 120,
            category: "Footwear",
            subCategory: "Shoes",
        },
        {
            id: "5",
            name: "Cap",
            price: 15,
            quantity: 200,
            category: "Accessories",
            subCategory: "Headwear",
        },
        {
            id: "6",
            name: "Dress Shirt",
            price: 35,
            quantity: 70,
            category: "Clothing",
            subCategory: "Tops",
        },
        {
            id: "7",
            name: "Jacket",
            price: 75,
            quantity: 40,
            category: "Clothing",
            subCategory: "Outerwear",
        },
        {
            id: "8",
            name: "Socks Pack",
            price: 10,
            quantity: 300,
            category: "Accessories",
            subCategory: "Socks",
        },
        {
            id: "9",
            name: "Shorts",
            price: 2500000,
            quantity: 90,
            category: "Clothing",
            subCategory: "Bottoms",
        },
        {
            id: "10",
            name: "Scarf",
            price: 20,
            quantity: 100,
            category: "Accessories",
            subCategory: "Winter Wear",
        },
    ];

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
                    {tableProducts.map((e: TableProduct, index: number) => (
                        <tr>
                            <th>{index+1}</th>
                            <th>Hình ảnh</th>
                            <td>{e.name}</td>
                            <td>{e.category}</td>
                            <td>{e.subCategory}</td>
                            <td>{formatPrice(e.price)}</td>
                            <td>{e.quantity}</td>
                            <td className='col-1'>
                                <div className='d-flex justify-content-around'>
                                    <Link to={`/product/${e.id}`}>
                                        <div className='icon-product edit' >
                                            <MdModeEdit/>
                                        </div>
                                    </Link>
                                    <div className='icon-product delete'>
                                        <RiDeleteBin2Fill  />
                                    </div>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/product/new'}>
                <button type="button" className="btn btn btn-success w-100">Thêm sản phẩm</button>
            </Link>
            
        </div>
    )
}

export default ProductManagement