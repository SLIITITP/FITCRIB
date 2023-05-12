import React, { useState, useEffect } from "react";
import '../readAllTransaction/readAllTransaction.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import moment from "moment";
//import { useParams } from "react-router-dom";


function ViewAll() {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        getTransactions();
    }, [])

    const getTransactions = async () => {
        const response = await axios.get("http://localhost:8070/Transaction");

        if (response.status === 200) {
            setData(response.data);
        }
    }
    //delete
    const onDeleteTransaction = async (_id) => {
        if (window.confirm("Are you sure that you want to delete this transaction record?")) {
            const response = await axios.delete(`http://localhost:8070/Transaction/delete/${_id}`);
            if (response.status === 200) {
                toast.success("Transaction deleted!");
                getTransactions();
            }
        }
    }

    //search
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/Transaction/search/${key}`);
            result = await result.json()
            
            if(result){
                setData(result)
            }

        }else{
            getTransactions();
        }


    }


    console.log("data=>", data);

    return (
        <div className="FNViewPage">
            <h1 className="FNViewHeading">TRANSACTION RECORDS</h1>
            {/* Search */}
            <input type="" placeholder="Search Transaction" className="FNViewSearch" onChange={searchHandle} /><FaSearch className="FNSearchIcon" />
            <br /><br />
            <button type="submit" className="FNViewCreateBtn" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/addTransaction`;
            }}>ADD A TRANSACTION</button> <br /><br />
            <table className="FNViewTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Subject</th>
                        <th style={{ textAlign: "center" }}>Type</th>
                        <th style={{ textAlign: "center" }}>Amount</th>
                        <th style={{ textAlign: "center" }}>Transaction Date</th>
                        <th style={{ textAlign: "center" }}>Message</th>
                        <th style={{ textAlign: "center" }}>Reported By</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        
                        return (
                            
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.subject}</td>
                                <td>{item.type}</td>
                                <td>{item.amount}</td>
                                <td>{moment(item.date).format('YYYY-MM-DD')}</td>
                                <td>{item.message}</td>
                                <td>{item.reportedby}</td>
                                <td>


                                    <button className="FNButton FNButton-update" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/updateTransaction/${item._id}`;
                                    }}>Update</button>&nbsp;&nbsp;&nbsp;<br />

                                    <button className="FNButton FNButton-delete" onClick={() => onDeleteTransaction(item._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br /><br /><br /><br /><br /><br /><br/>
            <ToastContainer />
        </div>
    )
}

export default ViewAll;