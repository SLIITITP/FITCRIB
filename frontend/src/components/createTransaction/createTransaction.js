import React, {useState} from "react";
import '../createTransaction/createTransaction.css';
import axios from "axios";
//import {useForm} from "react-hook-form";


function Create(){

    const[subject, setSubject] = useState("");
    const[type, setType] = useState("");
    const[amount, setAmount] = useState("");
    const[date, setDate] = useState("");
    const[message, setMessage] = useState("");
    const[reportedby, setReportedby] = useState("");

    function sendData(e){
        e.preventDefault();
        const newTransaction ={
            subject,
            type,
            amount,
            date,
            message,
            reportedby
        }

        axios.post("http://localhost:8070/Transaction/add", newTransaction).then(()=>{
            alert("Transaction Added!")
            window.location.href=`/viewTransaction`;
        }).catch((error)=>{
            alert("Transaction Adding failed!")
        })
        
    }
    


    return(
        
        <div className="FNCreatePage">
            <h1 className="FNCreateHeading">TRANSACTION RECORDS - CREATE</h1>
            <br/>
            <button type="submit" className="FNCreateBtn"onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    window.location.href=`/alluserpaymentsFN`;
                                                                                    }}>VIEW USER PAYMENTS</button> <br/><br/>
            <button type="submit" className="FNCreateBtn" onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    window.location.href=`/viewTransaction`;
                                                                                    }}>VIEW ALL TRANSACTIONS</button>
            <div className="FNCreateForm">
                <form onSubmit={sendData}>
                    <label for="subject" className="FNCreateFormHeading">Transaction Subject: </label><br/>
                    <input type="text" className="FNCreateFormInput" id="FNCreateSubject" placeholder="Enter Transaction subject here" onChange={(e)=>{
                        setSubject(e.target.value);
                    }} required/>
                    <br/><br/>

                    <label for="type" className="FNCreateFormHeading">Transaction Type: </label><br/>
                    <input type="radio" className="FNCreateFormType" name="FNCreateType" value="Credit" onChange={(e)=>{
                        setType(e.target.value);
                    }}/>
                    <label for="credit" className="FNCreateFormHeading">Credit</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="FNCreateFormType" name="FNCreateType" value="Debit" onChange={(e)=>{
                        setType(e.target.value);
                    }}/>
                    <label for="debit" className="FNCreateFormHeading">Debit</label>
                    <br/><br/>

                    <label for="amount" className="FNCreateFormHeading">Transaction Amount: </label><br/>
                    <input type="number" className="FNCreateFormInput" id="FNCreateAmount" placeholder="Enter Transaction amount here" onChange={(e)=>{
                        setAmount(e.target.value);
                    }} required/>
                    <br/><br/>

                    <label for="date" className="FNCreateFormHeading"> Transaction Date: </label><br/>
                    <input type="date" className="FNCreateFormInput" id="FNCreateAmount" placeholder="Enter Transaction date here" onChange={(e)=>{
                        setDate(e.target.value);
                    }} required/>
                    <br/><br/>

                    <label for="message" className="FNCreateFormHeading">Transaction Message: </label><br/>
                    <textarea className="FNCreateTextArea" placeholder="Enter Transaction message here" rows={4} cols={40} onChange={(e)=>{
                        setMessage(e.target.value);
                    }} required/>
                    <br/><br/>

                    <label for="reporter" className="FNCreateFormHeading">Transaction Reported By: </label><br/>
                    <input type="text" className="FNCreateFormInput" id="FNCreateReported" placeholder="Enter the name of the transaction recorder here" onChange={(e)=>{
                        setReportedby(e.target.value);
                    }} required/>
                    <br/><br/>

                    <button type="submit" className="FNCreateSubmit">Submit</button>&nbsp;&nbsp;&nbsp;
                    <button className="FNButtonCancel" onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    window.location.href=`/finance`;
                                                                                    }}>Cancel</button> <br/>
                    <input type="reset" value="Reset" className="FNCreateReset"></input>

                </form>
                
            </div>
            <br/><br/>
            
        </div>
        
    )
}

export default Create;