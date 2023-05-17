import '../ViewSalesReport/ViewSalesReport.css'
import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import jsPDF from "jspdf"
import { red } from '@mui/material/colors';
import UserContext from '../ContextComponent/ContextComponent';

function OrderPage() {

    const { user } = useContext(UserContext);
    const userID = user._id

    const [data, setData] = useState([]);

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        const response = await axios.get(`http://localhost:8070/ad/orders/seller/${userID}`);

        if (response.status === 200) {
            setData(response.data);
        }
    }

    //Generate Report

    const generatePDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
        doc.setFontSize(23);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(22, 160, 37);
        doc.text("FITCRIB FITNESS", 70, 25);
        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(66, 77, 111);
        doc.text("Sales Report", 86, 35);
        doc.setFontSize(13);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(85, 88, 96);
        doc.text("sales@fitcrib.com", 85, 42);
        let y = 50;
        doc.setTextColor(22, 160, 37);

        // Table headers
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setLineWidth(0.5);
        doc.rect(10, y, 190, 10, "S");
        doc.text("Order No.", 15, y + 8);
        doc.text("Recipient Name", 35, y + 8);
        doc.text("Delivery Address", 70, y + 8);
        doc.text("Product Name", 105, y + 8);
        doc.text("Price (LKR)", 135, y + 8);
        doc.text("Quantity", 160, y + 8);
        doc.text("Order Date", 180, y + 8);
        doc.setTextColor(0, 0, 0);

        // Table rows
        doc.setFont("helvetica", "normal");
        y += 10;

        data.forEach((order, index) => {
            const rowY = y + index * 10;
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.rect(10, rowY, 190, 10, "S");
            doc.text(String(index + 1), 20, rowY + 8);
            doc.text(order.recipientname, 35, rowY + 8);
            doc.text(order.deliveryAddress, 70, rowY + 8);
            doc.text(order.name, 105, rowY + 8);
            doc.text(`${order.price}.00`, 135, rowY + 8);
            doc.text(String(order.quantity), 165, rowY + 8);
            doc.text(moment(order.date).format("YYYY-MM-DD"), 180, rowY + 8);
        });

        doc.save("Sales_Report.pdf");
    };


    console.log("data=>", data);

    return (
        <div className='ViewSalesReport'>

            <button className="btn btn-success Vbackto" onClick={(e) => { e.preventDefault(); window.location.href = `/SellerHome/${userID}`; }} >Back</button>

            <div>
                <div className='col-md-9 productTable'>

                    <h1 className="MReportHeading">FITCRIB Fitness</h1>
                    <h3 className='MReportHeading2'>Sales Report</h3>
                    <h3 className='MReportHeading3'>sales@fitcrib.com</h3>

                    <button className='btn btn-success MSaveReportBTN' onClick={generatePDF}>Save Report</button>

                    <table className="table table-bordered center MReportTable">
                        <thead>
                            <tr className='MReportTableHeading'>
                                <th style={{ textAlign: "center", width: "3cm" }}>Order No.</th>
                                <th style={{ textAlign: "center", width: "5cm" }}>Recipient Name</th>
                                <th style={{ textAlign: "center", width: "7cm" }}>Delivery Address</th>
                                <th style={{ textAlign: "center", width: "5cm" }}>Product Name</th>
                                <th style={{ textAlign: "center" }}>Price (LKR)</th>
                                <th style={{ textAlign: "center" }}>Quantity</th>
                                <th style={{ textAlign: "center", width: "3cm" }}>Order Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {

                                return (

                                    <tr className='MReportTableData' key={index}>
                                        <th style={{ textAlign: "center" }} scope="row">{index + 1}</th>
                                        <td style={{ textAlign: "center" }}>{item.recipientname}</td>
                                        <td style={{ textAlign: "center" }}>{item.deliveryAddress}</td>
                                        <td style={{ textAlign: "center" }}>{item.name}</td>
                                        <td style={{ textAlign: "center" }}>{item.price}.00</td>
                                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                                        <td style={{ textAlign: "center" }}>{moment(item.date).format('YYYY-MM-DD')}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <ToastContainer />

        </div>
    )
}

export default OrderPage;