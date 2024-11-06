import React, { useEffect, useState } from 'react'
import { BiSort } from "react-icons/bi";
import './styles.scss'
import { formatPrice } from '../../../helpers';

interface Table {
    name: string;
    price: number;
    quantity: number;
    revenue: number, 
    category?: string,
    subCategory?: string
}

const ReportManagement = () => {

    const products: Table[] = [
        { name: "Áo phông nam", price: 200000, quantity: 150, revenue: 30000000 },
        { name: "Áo sơ mi nữ", price: 250000, quantity: 120, revenue: 30000000 },
        { name: "Quần jeans nam", price: 350000, quantity: 80, revenue: 28000000 },
        { name: "Váy maxi", price: 400000, quantity: 60, revenue: 24000000 },
        { name: "Áo khoác dạ nữ", price: 500000, quantity: 50, revenue: 25000000 },
        { name: "Áo hoodie nam", price: 300000, quantity: 100, revenue: 30000000 },
        { name: "Quần shorts nữ", price: 150000, quantity: 200, revenue: 30000000 },
        { name: "Đầm dạ hội", price: 600000, quantity: 30, revenue: 18000000 },
        { name: "Chân váy công sở", price: 220000, quantity: 90, revenue: 19800000 },
        { name: "Bộ vest nam", price: 800000, quantity: 20, revenue: 16000000 },
        { name: "Áo len nữ", price: 270000, quantity: 110, revenue: 29700000 },
        { name: "Quần legging", price: 180000, quantity: 130, revenue: 23400000 },
        { name: "Váy công chúa trẻ em", price: 300000, quantity: 75, revenue: 22500000 },
        { name: "Áo ba lỗ nam", price: 100000, quantity: 250, revenue: 25000000 },
        { name: "Áo khoác da nam", price: 750000, quantity: 40, revenue: 30000000 },
    ];

    const [dataTable, setDataTable] = useState<Table[]>(products)
    const [selectedMonth, setSelectedMonth] = useState<string>("");

    const handleSort = (column: string) => {

    }

    useEffect(() => {

    },[])

    return (
        <div className='container pt-3'>
            <div className='title-report-container row'>
                <div className='title-report'>Thống kê doanh thu</div>
            </div>
            <div className='row report-filter'>
                <div className='col'>
                    <label className='label-new-product'>Danh mục</label>
                    <select className='input-new-product form-select'>
                        <option value="">Chọn danh mục</option>
                        <option value="shirt">Áo sơ mi</option>
                        <option value="pants">Quần</option>
                        <option value="jacket">Áo khoác</option>
                        <option value="dress">Váy</option>
                    </select>
                </div>
                <div className='col'>
                    <label className='label-new-product'>Danh mục</label>
                    <select className='input-new-product form-select'>
                        <option value="">Chọn danh mục</option>
                        <option value="shirt">Áo sơ mi</option>
                        <option value="pants">Quần</option>
                        <option value="jacket">Áo khoác</option>
                        <option value="dress">Váy</option>
                    </select>
                </div>
                <div className='col'>
                    <label className='label-new-product'>Chọn tháng</label>
                    <input className="form-control" type="month" value={selectedMonth}/>
                </div>
                <div className='col'>
                    <label className='label-new-product'>Chọn tháng</label>
                    <button className='btn btn-primary w-100'>Filter</button>
                </div>
            </div>
            <div className='row'>
                <table className="table table-bordered table-striped">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">
                                <div className='table-header'>
                                    <div>Giá</div>
                                    <BiSort className='table-icon-sort' onClick={() => handleSort("price")}/>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='table-header'>
                                    <div>Số lượng</div>
                                    <BiSort className='table-icon-sort' onClick={() => handleSort("quantity")} />
                                </div>
                            </th>
                            <th scope="col">
                                <div className='table-header'>
                                    <div>Doanh thu</div>
                                    <BiSort className='table-icon-sort' onClick={() => handleSort("revenue")} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((e: Table, index: number) => (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{e.name}</td>
                                <th>Hình ảnh</th>
                                <td>{formatPrice(e.price)}</td>
                                <td>{e.quantity}</td>
                                <td>{formatPrice(e.revenue)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportManagement