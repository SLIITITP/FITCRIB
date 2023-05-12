import React, { useState, useEffect } from "react";
import '../ReadAlluserPayments/readAllUserPayments.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import moment from "moment";


function ViewAllPayments() {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        getUserPayments();
    }, [])

    const getUserPayments = async () => {
        const response = await axios.get("http://localhost:8070/Payment/readallpayments");

        if (response.status === 200) {
            setData(response.data);
        }
    }

    console.log("data=>", data);

    return (
        <div className="FNViewPaymentsPage">
            <h1 className="FNViewPaymentsHeading">USER PAYMENTS</h1>
            
            <button type="submit" className="FNViewPaymentsCreateBtn" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/addTransaction`;
            }}>ADD A TRANSACTION</button> <br /><br />

            <table className="FNViewPaymentsTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Amount</th>
                        <th style={{ textAlign: "center" }}>Card Number</th>
                        <th style={{ textAlign: "center" }}>Cardholder Name</th>
                    </tr>
                </thead>
                <tbody>
                {data && data.map((item, index) => {
                        
                        return (
                            
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.Amount}</td>
                                <td>{item.CardNumber}</td>
                                <td>{item.CardholderName}</td>
                            </tr>
                        );
                    })}

                </tbody>


            </table>

            

           
            <br /><br /><br /><br /><br /><br /><br/>
            
        </div>
    )
}

export default ViewAllPayments;