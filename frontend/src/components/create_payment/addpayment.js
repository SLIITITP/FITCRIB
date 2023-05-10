import React, {useState} from "react";
import '../create_payment/addpayment.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Addpayment(){
//catch and send data to the database

    const [Amount, setAmount] = useState("");
    const [CardNumber, setCardNumber] = useState("");
    const [ExpiryMonth, setExpiryMonth] = useState("");
    const [ExpiryYear, setExpiryYear] = useState("");
    const [CardholderName, setCardholderName] = useState("");
    const [SecurityCode, setSecurityCode] = useState("");

    function sendpaymentData(e){
        e.preventDefault();

        const newPaymentDetails ={
            Amount,
            CardNumber,
            ExpiryMonth,
            ExpiryYear,
            CardholderName,
            SecurityCode
        }

        axios.post("http://localhost:8070/payment/addpayment",newPaymentDetails).then(()=>{
            toast.success('Payment Added..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).catch(()=>{
            toast.warn('Payment not added..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    }

//html
    return(
        <div className="pay_page">
            <div className="heading">
                <h1 className="name">FitCrib</h1>
                <ul class="nav justify-content-end nav-underline">
                    <li class="nav-item1">
                        <a class="nav-link" href="/login">LOGIN</a>
                    </li>
                </ul>
            </div>
            <div className="paymentinfo">
                <label for="paymentinfo" className="payinfo">To create an account, you must pay an one time fee of Rs.1000/=. After <br/>
                paying the required fee you can head to the login section</label>
            </div>
            <br/>
            <div className="payment_form">
                <form onSubmit={sendpaymentData}>
                    <br/>
                    <div className="payheading">
                        <h2 className="payheading">Payment Portal</h2>
                    </div>
                    <label for="amount" className="paymentheading">Amount: </label><br/>
                    <input type="number" className="paymentforminput" placeholder="Enter Amount Manually" onChange={(e)=>{
                        setAmount(e.target.value);
                    }}/><br/>

                    <label for="cardnumber" className="paymentheading">CardNumber: </label><br/>
                    <input type="number" className="paymentforminput" placeholder="Enter CardNumber" onChange={(e)=>{
                        setCardNumber(e.target.value);
                    }}/><br/>

                    <label for="ExpiryMonth" className="paymentheading">ExpiryMonth: </label>&nbsp;&nbsp;
                    <select name="months" className="paymentformdropdown" onChange={(e)=>{
                            setExpiryMonth(e.target.value);
                        }}>
                        <option></option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>&nbsp;&nbsp;

                    <label for="ExpiryYear" className="paymentheading">ExpiryYear: </label>&nbsp;&nbsp;
                    <select name="years" className="paymentformdropdown" onChange={(e)=>{
                            setExpiryYear(e.target.value);
                        }}>
                        <option></option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select><br/>

                    <label for="cardholdername" className="paymentheading">CardholderName: </label><br/>
                    <input type="text" className="paymentforminput" placeholder="Enter CardholderName" onChange={(e)=>{
                        setCardholderName(e.target.value);
                    }}/><br/>

                    <label for="securitycode" className="paymentheading">SecurityCode: </label><br/>
                    <input type="number" className="paymentforminput" placeholder="Enter SecurityCode" onChange={(e)=>{
                        setSecurityCode(e.target.value);
                    }}/><br/><br/><br/>

                    <button type="submit" className="paymentsubmit">PayNow</button>


                </form>
            </div>
            <ToastContainer />
        </div>
    )
}