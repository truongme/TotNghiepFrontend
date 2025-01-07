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
    

    const [listTopSell, setListTopSell] = useState<any>([])
    const token = sessionStorage.getItem("token");
    const [revenue, setRevenue] = useState<number>();
    const [revenuePending, setRevenuePending] = useState<number>();
    const [totalProduct, setTotalProduct] = useState<number>()
    const [dataRenvenue, setDataRenvenue] = useState<number[]>([])
    const [dataRenvenueProduct, setDataRenvenueProduct] = useState<number[]>([])

    const generateLast31DaysLabels = (): string[] => {
        const labels: string[] = [];
        const today = new Date();

        for (let i = 0; i < 31; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - (30 - i)); // Generate dates in order
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
            labels.push(formattedDate); // Push the formatted date in dd/mm format
        }

        return labels;
    };


    const data: ChartData<'bar' | 'line'> = {
        labels: generateLast31DaysLabels(),
        datasets: [
        {
            type: 'line' as const,
            label: 'Số lượng Order',
            data: dataRenvenueProduct,
            borderColor: '#FFF27A',
            backgroundColor: '#FFF27A',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1', 
        },
        {
            type: 'bar' as const,
            label: 'Doanh thu',
            data: dataRenvenue,
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

    const getRevence = async () => {
        const date = new Date(); 
        const startDate = new Date(date); 
        startDate.setMonth(startDate.getMonth() - 1); // Start date is one month ago
        const endDate = new Date(date); 
        endDate.setDate(endDate.getDate() + 1); // End date is tomorrow

        try {
            const response: any = await axios.post(`${WebUrl}/api/v1/statistics/get-revenue`, {
                status: "PAID",
                startDate: startDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
                endDate: endDate.toISOString().slice(0, 10),     // Format as YYYY-MM-DD
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    'Authorization': `Bearer ${token}`, 
                }
            });

            setRevenue(response.data.totalAmount);

        } catch (error) {
            console.error('Error get top sell:', error);
        }
    };


    const getRevencePending = async () => {
        const date = new Date(); 
        const startDate = new Date(date); 
        startDate.setMonth(startDate.getMonth() - 1); 
        const endDate = new Date(date); 
        endDate.setDate(endDate.getDate() + 1);
        try{
            const response: any = await axios.post(`${WebUrl}/api/v1/statistics/get-revenue`, {
                status: "PENDING",
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
            } , {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    'Authorization': `Bearer ${token}`, 
                }
            });
            setRevenuePending(response.data.totalAmount)

        } catch (error) {
        console.error('Error get top sell:', error);
        }
    }

    const getTotalProduct = async () => {
        const date = new Date(); 
        const startDate = new Date(date); 
        startDate.setMonth(startDate.getMonth() - 1); 
        const endDate = new Date(date); 
        endDate.setDate(endDate.getDate() + 1);
        try{
            const response: any = await axios.post(`${WebUrl}/api/v1/statistics/get-total-products-sold`, {
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
            } , {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    'Authorization': `Bearer ${token}`, 
                }
            });
            setTotalProduct(response.data.totalProductsSold)

        } catch (error) {
        console.error('Error get top sell:', error);
        }
    }

    const getDataRenvueChart = async () => {
        const date = new Date(); 
        const startDate = new Date(date); 
        startDate.setMonth(startDate.getMonth() - 1); 
        const endDate = new Date(date); 
        endDate.setDate(endDate.getDate() + 1);
        try{
            const response: any = await axios.post(`${WebUrl}/api/v1/statistics/get-revenue-by-day`, {
                status: "PENDING",
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
            } , {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    'Authorization': `Bearer ${token}`, 
                }
            });

            const groupedData: Record<string, number> = {};

            response.data.forEach((entry: any) => {
                const day = entry.date; // Format: YYYY-MM-DD
                if (!groupedData[day]) {
                    console.log(day)
                    groupedData[day] = 0;
                }
                groupedData[day] += entry.totalAmount;
            });

            const resultArray: number[] = [];
            const date = new Date();
            const startDateLabel = new Date(date); 
            startDateLabel.setMonth(startDateLabel.getMonth() - 1); 
            startDateLabel.setDate(startDateLabel.getDate() + 1);  

            for (let d = new Date(startDateLabel); d <= date; d.setDate(d.getDate() + 1)) {
                const formattedDate = d.toISOString().slice(0, 10); 
                resultArray.push(groupedData[formattedDate] || 0);
            }

            setDataRenvenueProduct(resultArray);

        } catch (error) {
        console.error('Error get top sell:', error);
        }
    }

    const getDataProductChart = async () => {
        
        const date = new Date(); 

        const startDate = new Date(date); 
        startDate.setMonth(startDate.getMonth() - 1); 
        const endDate = new Date(date); 
        endDate.setDate(endDate.getDate() + 1);
        try{
            const response: any = await axios.post(`${WebUrl}/api/v1/statistics/get-products-sold-by-day`, {
                status: "PAID",
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
            } , {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    'Authorization': `Bearer ${token}`, 
                }
            });

            const groupedData: Record<string, number> = {};

            response.data.forEach((entry: any) => {
                const day = entry.date;
                if (!groupedData[day]) {
                    groupedData[day] = 0;
                }
                groupedData[day] += entry.totalProductsSold;
            });

           const resultArray: number[] = [];
            const date = new Date();
            const startDateLabel = new Date(date); 
            startDateLabel.setMonth(startDateLabel.getMonth() - 1); 
            startDateLabel.setDate(startDateLabel.getDate() + 1);  

            for (let d = new Date(startDateLabel); d <= date; d.setDate(d.getDate() + 1)) {
                const formattedDate = d.toISOString().slice(0, 10); 
                resultArray.push(groupedData[formattedDate] || 0);
            }
            setDataRenvenue(resultArray);

        } catch (error) {
        console.error('Error get top sell:', error);
        }
    }

    useEffect(() => {
        getTopSell();
        getRevence();
        getTotalProduct();
        getRevencePending();
        getDataRenvueChart();
        getDataProductChart()
    },[])

    return (
        <div className='container dashboard-container pt-3 pb-3'>
            <div className='dashboard-main p-3 mb-3'>
                <div className='dashboard-main-title'>Sales Distribution</div>
                <div className='dashboard-main-content'>
                   
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <FaChartLine />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Sales</div>
                           <p>{formatPrice(revenuePending || 1000000)}</p>
                        </div>
                    </div>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <RiTShirtFill />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Product</div>
                            <p>{totalProduct}</p>
                        </div>
                    </div>
                    <div className='dashboard-main-item'>
                        <div className='dashboard-main-icon'>
                            <FaUser />
                        </div>
                        <div className='dashboard-main-item-title'>
                            <div>Total Client</div>
                            <p>2</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='dashboard-main-chart-container'>
                <div className='dashboard-main-chart'>
                    <div className='mb-2 dashboard-main-chart-title'>Revenue statistics for the last 30 days</div>
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