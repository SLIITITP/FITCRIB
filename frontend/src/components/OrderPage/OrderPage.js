import "../ViewAdvertisement/ViewAdvertisement.css";
import "../OrderPage/OrderPage.css";
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../ContextComponent/ContextComponent';



const ViewAdvertisement = () => {

    const { user } = useContext(UserContext);
    const userID = user._id

    const [data, setData] = useState([]);

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        const response = await axios.get(`http://localhost:8070/ad/orders/${userID}`);

        if (response.status === 200) {
            setData(response.data);
        }
    }    

    console.log("data=>", data);

    return (
        <>
            <div className="ViewAdvertisement">
                <body>
                    <div className='MSellerPageHeader1'>
                        <h1>Hello, {user.Fullname}</h1>
                    </div>
                    <div className='MSellerPageHeader2'>
                        <div>
                            <h4 className='MVheader2Name'>Ordered products</h4>
                        </div>

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
                                                            <p class="card-text card-price order-price">Price :<span id="orderCWeightnum"> {item.price}.00 LKR</span></p>
                                                            <p class="card-text card-price order-qty">Quantity : <span id="orderCqtynum"> {item.quantity} </span></p>
                                                            <p class="card-text card-price order-date">Order Date : {moment(item.date).format('YYYY-MM-DD')}</p>
                                                            <div className='MVDoubleBtn'>
                                                                <a href="#" className="btn btn-success updateBTN" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.location.href = `/getProduct/${item._id}`;
                                                                }}>View Product</a>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Viewcard-body" key={index}>
                                                    <p className="MPcard-number">{index + 1}</p>
                                                </div>

                                                {/* <div class="vertical"></div> */}
                                            </>
                                            <ToastContainer /></>
                                    )
                                })
                            }
                        </div>
                    </div>
                </body>
            </div>
        </>
    )
}

export default ViewAdvertisement