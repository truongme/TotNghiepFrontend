import React from 'react'
import { formatPrice } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
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
            price: 25,
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

    const navigate = useNavigate()

    return (
        <div className='text-center mt-3 mb-3'>
            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Category</th>
                        <th scope="col">Sub Category</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableProducts.map((e: TableProduct, index: number) => (
                        <tr>
                            <th>{index+1}</th>
                            <td>{e.name}</td>
                            <th>Hình ảnh</th>
                            <td>{e.category}</td>
                            <td>{e.subCategory}</td>
                            <td>{formatPrice(e.price)}</td>
                            <td>{e.quantity}</td>
                            <td className='col-1'>
                                <div className='d-flex justify-content-around'>
                                    <div className='icon-product edit'>
                                        <MdModeEdit/>
                                    </div>
                                    <div className='icon-product delete'>
                                        <RiDeleteBin2Fill  />
                                    </div>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="btn btn btn-success w-100">Thêm sản phẩm</button>
        </div>
    )
}

export default ProductManagement