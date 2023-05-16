import "./OrderPage.css";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';


const OrderPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        const response = await axios.get("http://localhost:8070/ad/orders");

        if (response.status === 200) {
            setData(response.data);
        }
    }

    console.log("data=>", data);

    return (
        <>
            <>
                <body>

                    <div className="orderPgTitle">
                        <h1>Your Order History</h1>
                    </div>

                    <div className='py-4 container'>
                        <div className="row justify-content-center MViewcard" >
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <>
                                            <>
                                                <div className='ViewCard'>
                                                    <div class="MproductVcard text-white">

                                                        <div>
                                                            <img class="card-img" src="..." alt="Card image" />
                                                            <h5 class="card-title order-title">{item.name}</h5>
                                                            <p class="card-text card-price order-price">Price: {item.price}.00 LKR</p>
                                                            <p class="card-text card-price order-qty">Quantity: {item.quantity}</p>
                                                            <p class="card-text card-price order-date">{moment(item.date).format('YYYY-MM-DD')}</p>
                                                            <div className='MVDoubleBtn'>
                                                                <a href="#" className="btn btn-success updateBTN" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.location.href = `/order/${item._id}`;
                                                                }}>Update</a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Viewcard-body" key={index}>
                                                    <p className="card-number">{index + 1}</p>
                                                </div>

                                                <div class="vertical"></div>
                                            </>
                                            <ToastContainer /></>
                                    )
                                })

                            }

                        </div>

                    </div>

                </body>


            </>

        </>
    )
}

export default OrderPage