import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import UserContext from '../ContextComponent/ContextComponent';
import "../CheckoutProduct/CheckoutProduct.css";

function CheckoutProduct() {

    const { user } = useContext(UserContext);
    const userID = user._id

    const [sellerID, setSellerID] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const navigate = useNavigate();

    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        getAdvertisementDetails();
        setQuantity(new URLSearchParams(location.search).get('quantity'));
    }, []);

    const getAdvertisementDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/ad/get/${params.id}`);
            const result = response.data.advertisement;
            console.log(result);
            setSellerID(result.userID);
            setName(result.name);
            setPrice(result.price);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(sellerID)
    const sendData = (e) => {
        e.preventDefault();

        const newOrder = {
            userID,
            sellerID,
            recipientName,
            deliveryAddress,
            name,
            price,
            quantity,
            date: new Date()
        };

        axios.post("http://localhost:8070/ad/order", newOrder)
            .then(() => {

                toast.success('Order Placed Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                window.location.href = `/AllOrders`
            })

            .catch((err) => {
                console.error(err);
                toast.error('Failed to place the order', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    };

    return (
        <>
            <div className='CheckoutProduct'>
                <div className="form createForm" id="createForm">
                    <div className='py-4 CreataFormData'>
                        <div className='container' id="MPbackg">
                            <div className='card-header MPCreateFormHead' id="MPcformhead">
                                <h4><b>Checkout Product</b></h4>
                            </div>
                            <div className='row'>
                                <div className=''>
                                    <div className='card MPCreataFormData1'>

                                        <div className='card-body'>

                                            <div className='row'>
                                                <div className="MPcheckoutsemiHeading">
                                                    <p><b>Customer Details</b></p>
                                                </div>
                                                <div className='col-md-11 checkInputF'>
                                                    <label for="MformName" className="form-label M_AddFormName">Recipient Name</label>
                                                    <input type="text" className="form-control M_AddFormNameInput" onChange={(e) => {
                                                        setRecipientName(e.target.value);
                                                    }} />
                                                    <br />
                                                </div>
                                                {/* <!-- Add a hidden input field for the date field --> */}
                                                <input type="hidden" name="date" value="<%= new Date().toISOString() %>" />
                                                <div className='col-md-11 checkInputF'>
                                                    <label for="MformName" className="form-label M_AddFormAddress">Delivery Address</label>
                                                    <input type="text" className="form-control M_AddFormAddrInput" onChange={(e) => {
                                                        setDeliveryAddress(e.target.value);
                                                    }} />
                                                    <br />
                                                </div>
                                                <div className="checkoutsemiHeading">
                                                    <p><b>Product Details</b></p>
                                                </div>
                                                <div className='col-md-9 productTable'>
                                                    <table className='table table-bordered center'>
                                                        <thead>
                                                            <tr>
                                                                <th>Product Name</th>
                                                                <th>Price (LKR)</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }}>{name}</td>
                                                                <td onChange={(e) => {
                                                                    setPrice(e.target.value);
                                                                }}>{price}.00</td>
                                                                <td>{quantity}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="checkoutsemiHeading2"><br></br>
                                                    <h4><b><span id="checktotal">TOTAL : </span>{price * quantity}.00 LKR</b></h4><br></br>
                                                </div>
                                                <div className="checkoutsemiHeading">
                                                    <p><b>Card Details</b></p>
                                                </div>
                                                <div className='col-md-11 checkInputF'>
                                                    <div className='form-group mb-3'>
                                                        <label>Name on Card</label>
                                                        <input type='text' name='CName' className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-11 checkInputF'>
                                                    <div className='form-group mb-3'>
                                                        <label>Card Number</label>
                                                        <input type='text' name='CNumber' className='form-control' placeholder="xxxx-xxxx-xxxx-xxxx" />
                                                    </div>
                                                </div>
                                                <div className='col-md-3 checkInputF'>
                                                    <div className='form-group mb-3'>
                                                        <label>Expiry month</label>
                                                        <select class="form-control" id="expirationMonth" name="expirationMonth">
                                                            <option value="" selected>Month</option>
                                                            <option value="01">January</option>
                                                            <option value="02">February</option>
                                                            <option value="03">March</option>
                                                            <option value="04">April</option>
                                                            <option value="05">May</option>
                                                            <option value="06">June</option>
                                                            <option value="07">July</option>
                                                            <option value="08">August</option>
                                                            <option value="09">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-md-3'>
                                                    <div className='form-group mb-3'>
                                                        <label>Expiry Year</label>
                                                        <select class="form-control" id="expirationYear" name="expirationYear">
                                                            <option value="" selected>Year</option>
                                                            <option value="2023">2023</option>
                                                            <option value="2024">2024</option>
                                                            <option value="2025">2025</option>
                                                            <option value="2026">2026</option>
                                                            <option value="2027">2027</option>
                                                            <option value="2028">2028</option>
                                                            <option value="2029">2029</option>
                                                            <option value="2030">2030</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-md-3'>
                                                    <div className='form-group mb-3'>
                                                        <label>Security Code</label>
                                                        <input type='password' name='Cpasswd' className='form-control' placeholder="CVV" /><br></br>
                                                    </div>
                                                </div>
                                                <div className='col-md-4 checkCancelBTN'>
                                                    <div className='form-group mb-3'>
                                                        <button type='button' className='btn btn-secondary form-control' onClick={(e) => {
                                                            e.preventDefault();
                                                            window.location.href = `/get/${params.id}`;
                                                        }}>Cancel</button>
                                                    </div>
                                                </div>
                                                <div className='col-md-4 checkSubmitBTN'>
                                                    <div className='form-group text-end ml-3'>
                                                        <button type='button' className='btn btn-success form-control' onClick={sendData}>Place Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                    {/* <ToastContainer /> */}
                </div>
            </div>
        </>
    )
}

export default CheckoutProduct;