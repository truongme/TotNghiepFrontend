import React, { useEffect, useState } from 'react'
import './styles.scss'
import { FaBoxOpen } from "react-icons/fa6";
import { RiTShirtFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { CardProps } from '../Home';
import axios from 'axios';
import { WebUrl } from '../../constants';
import { formatPrice } from '../../helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
    const data: ChartData<'bar' | 'line'> = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
        {
            type: 'line' as const,
            label: 'Số lượng Order',
            data: [50, 65, 70, 60, 75, 80, 85, 90, 95, 100, 105, 20],
            borderColor: '#FFF27A',
            backgroundColor: '#FFF27A',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1', 
        },
        {
            type: 'line' as const,
            label: 'Sản phẩm bán ra',
            data: [30, 45, 55, 50, 60, 65, 75, 70, 85, 90, 95, 40],
            borderColor: '#E16449',
            backgroundColor: '#E16449',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1', 
        },
        {
            type: 'bar' as const,
            label: 'Doanh thu',
            data: [11500000, 10700000, 12500000, 10000000, 13500000, 14000000, 17000000, 19050000, 21200000, 22500000, 21500000, 13500000],
            backgroundColor: '#A5A7FE',
            borderColor: '#5351FA',
            borderWidth: 1,
            yAxisID: 'y',
            barThickness: 30,
        },
        ],
    };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
        plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        },
    scales: {
        y: {
            beginAtZero: true,
        },
        y1: {
            beginAtZero: true,
            position: 'right', 
        },
        x: {
            title: {
                display: true, 
            },
        },
    },
  };

    const [listTopSell, setListTopSell] = useState<any>([])

  const getTopSell = async () => {
    try{
      const response = await axios.get(`${WebUrl}/api/v1/products/top-selling?limit=4`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning'
        }
      }) 
      
      const data = response.data.data.map((e: any, index: number) => ({
        id: e.productId,  
        img: e.images?.[0].imageURL,
        name: e.name,
        price: formatPrice(e.price),
      }));

      setListTopSell(data)

    } catch (error) {
      console.error('Error get top sell:', error);
    }
  }

  useEffect(() => {
    getTopSell()
  },[])

    return (
        <div className='container dashboard-container pt-3 pb-3'>
            <div className='dashboard-main p-3 mb-3'>
                <div className='dashboard-main-title'>Sales Distribution</div>
                <div className='dashboard-main-content'>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <FaBoxOpen />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Sales</div>
                            <p>{formatPrice(13500000)}</p>
                        </div>
                    </div>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <FaChartLine />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Order</div>
                            <p>20</p>
                        </div>
                    </div>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <RiTShirtFill />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Product</div>
                            <p>40</p>
                        </div>
                    </div>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <FaUser />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Client</div>
                            <p>10</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='dashboard-main-chart-container'>
                <div className='dashboard-main-chart'>
                    <div className='mb-2 dashboard-main-chart-title'>Thống kê doanh thu trong 12 tháng</div>
                    <Chart type='bar' data={data} options={options} />
                </div>
                <div className='dashboard-top-sale'>
                    <div className='mb-2 dashboard-top-sale-title'>Top Sales</div>
                    <div className='dashboard-top-sale-cotainer'>
                        {listTopSell.map((e : any) => (
                            <div className='dashboard-top-sale-item'>
                                <div className='dashboard-top-sale-item-img'>
                                    <img src={e.img} alt="" />
                                </div>
                                <div>
                                    <div>{e.name}</div>
                                    <div>{e.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard