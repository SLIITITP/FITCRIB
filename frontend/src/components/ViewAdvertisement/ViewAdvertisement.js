import "./ViewAdvertisement.css";
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../ContextComponent/ContextComponent';



const ViewAdvertisement = () => {

    const { user } = useContext(UserContext);
    const userID = user._id
    const userName = user.name
    const [data, setData] = useState([]);

    useEffect(() => {
        getAds();
    }, [])

    const getAds = async () => {
        const response = await axios.get(`http://localhost:8070/ad/${userID}`);
        if (response.status === 200) {
            setData(response.data);
        }
    };

    const onDeleteAd = async (_id) => {
        if (window.confirm("Are You Sure You Want To Delete This Product?")) {
            const response = await axios.delete(`http://localhost:8070/ad/delete/${_id}`);
            if (response.status === 200) {
                toast.success('Advertisement Deleted Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                getAds();
            }
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
                            <h4 className='MVheader2Name'>Listed products</h4>
                        </div>

                        <div className='MVheader2Btns'>
                            <Link to="/">
                                <button className='btn btn-success' id="SalesBTN" onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/salesReport`;
                                }}>Generate Sales Report</button>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button className='btn btn-success' id="PostBTN" onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `/addAd`;
                            }}>Post an Advertisement</button>
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
                                                            <img class="card-img" src="./_3.jpeg" alt="Card image" />
                                                            <h5 class="card-title">{item.name}</h5>
                                                            <p class="card-text">Weight: {item.weight}kg</p>
                                                            <p class="card-text card-price">Price: {item.price}.00 LKR</p>
                                                            <div className='MVDoubleBtn'>
                                                                <a href="#" className="btn btn-success updateBTN" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.location.href = `/updateAd/${item._id}`;
                                                                }}>Update</a>
                                                                <a href="#" className="btn btn-danger deleteBTN" onClick={() => onDeleteAd(item._id)}>Delete</a>

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