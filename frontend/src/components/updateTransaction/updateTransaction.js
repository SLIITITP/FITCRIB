import React, {useEffect, useState} from "react";
import '../updateTransaction/updateTransaction.css';
import {useParams} from "react-router-dom";
import moment from "moment";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";

const  Update = () => {

    const[subject, setSubject] = useState("");
    const[type, setType] = useState("");
    const[amount, setAmount] = useState("");
    const[date, setDate] = useState("");
    const[message, setMessage] = useState("");
    const[reportedby, setReportedby] = useState("");
    const params = useParams();
    //const navigate = useNavigate();

    
    
    useEffect(()=>{
        getTransactionDetails();
    },[])

    const getTransactionDetails = async () =>{
        
        let result = await fetch(`http://localhost:8070/Transaction/get/${params.id}`);
        result = await result.json();

        console.warn(result);
        setSubject(result.transaction.subject)
        setType(result.transaction.type)
        setAmount(result.transaction.amount)
        setDate(result.transaction.date)
        setMessage(result.transaction.message)
        setReportedby(result.transaction.reportedby)
    }

    const updateTransaction = async () => {

        console.warn(subject,type,amount,message,reportedby)
        let result = await fetch(`http://localhost:8070/Transaction/update/${params.id}` , {
            method: 'Put',
            body: JSON.stringify({subject, type, amount, message, reportedby}),
            headers:{
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json()

        if(result){
            alert("Transaction Updated Successfully!")
            
            window.location.href=`/viewTransaction`;
        }
    }


    return(
        <div className="FNUpdatePage">
            <h1 className="FNUpdateHeading">TRANSACTION RECORDS - UPDATE</h1>
            <div className="FNUpdateForm">
                <br/>
                    <label for="subject" className="FNUpdateFormHeading">Transaction Subject: </label><br/>
                    <input type="text" className="FNUpdateFormInput"  value={subject}  onChange={(e)=>{
                        setSubject(e.target.value)
                    }}/>
                    <br/><br/>

                    <label for="type" className="FNUpdateFormHeading">Transaction Type: </label><br/>
                    <input type="text" className="FNUpdateFormInput" readOnly value={type}  onChange={(e)=>{
                        setType(e.target.value)
                    }}/>
                    
                    <br/><br/>

                    <label for="amount" className="FNUpdateFormHeading">Transaction Amount: </label><br/>
                    <input type="number" className="FNUpdateFormInput" id="FNUpdateAmount" value={amount} placeholder="Enter Transaction amount here" required onChange={(e)=>{
                        setAmount(e.target.value);
                    }}/>
                    <br/><br/>

                    <label for="date" className="FNUpdateFormHeading">Transaction Date: </label><br/>
                    <input type="text" className="FNUpdateFormInput" placeholder="Enter Transaction date here" readOnly value={moment(date).format('YYYY-MM-DD')} onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                    <br/><br/>

                    <label for="message" className="FNUpdateFormHeading">Transaction Message: </label><br/>
                    <textarea className="FNUpdateTextArea" placeholder="Enter Transaction message here" value={message} rows={4} cols={40} required onChange={(e)=>{
                        setMessage(e.target.value);
                    }}/>
                    <br/><br/>

                    <label for="reporter" className="FNUpdateFormHeading">Transaction Reported By: </label><br/>
                    <input type="text" className="FNUpdateFormInput" id="FNUpdateReported" value={reportedby} placeholder="Enter the name of the transaction recorder here" required onChange={(e)=>{
                        setReportedby(e.target.value);
                    }}/>
                    <br/><br/>

                    <button className="FNUpdateSubmit" onClick={updateTransaction}>Update</button>&nbsp;&nbsp;&nbsp;
                    <button className="FNButtonCancel" onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    window.location.href=`/viewTransaction`;
                                                                                    }}>Cancel</button> <br/>

            </div>
            <br/><br/>
        </div>
    )
}

export default Update;