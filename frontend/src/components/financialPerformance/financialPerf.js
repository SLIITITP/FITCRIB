import React, { useState, useEffect, useRef } from "react";
import "../financialPerformance/financialPerf.css";
import axios, { all } from "axios";
import { Progress } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "../FNHeader/FNheader.js";

const FinancialPerf = () => {

    const [allTransaction, setAllTransaction] = useState([]);

    const divRef = useRef(null);

    const saveAsPdf = async (div) => {
        const canvas = await html2canvas(div);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('Financial report-FitCrib.pdf');
    };

    const handleSave = () => {
        saveAsPdf(divRef.current);
    };

    useEffect(() => {
        getTransactions();
    }, [])

    const getTransactions = async () => {
        const res = await axios.get("http://localhost:8070/Transaction");
        setAllTransaction(res.data);
        console.log(res.data);
    }

    //variables for calculations
    const totalTransactions = allTransaction.length; //correct
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'Debit');
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'Credit');

    //variables for percentages
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransactions) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransactions) * 100;

    //variables for total
    const totalAmount = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncome = allTransaction.filter(transaction => transaction.type === 'Debit').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = allTransaction.filter(transaction => transaction.type === 'Credit').reduce((acc, transaction) => acc + transaction.amount, 0);
    const netProfit = totalIncome - totalExpense;

    const totalIncomeAmountPercent = (totalIncome / totalAmount) * 100;
    const totalExpenseAmountPercent = (totalExpense / totalAmount) * 100;

    //chart
    // const [profit, setProfit] = useState([]);
    // setProfit(netProfit);

    return (

        <div className="FNFinancialPage">

            <h1 className="FNFinancialHeading">FINANCIAL PERFORMANCE</h1>
            <br /><br />
            <div className="FNFinancialChart">
                <h2 className="FNFinancialChartHeading"> Total Transactions</h2>
                <h5 className="FNFinancialChartHeading">Income Transactions: {totalIncomeTransactions.length}</h5>
                <h5 className="FNFinancialChartHeading">Expense Transactions: {totalExpenseTransactions.length}</h5>
                <br />
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Progress type="circle" strokeColor={'green'} percent={totalIncomePercent.toFixed(0)} /> &nbsp;&nbsp;
                    <Progress type="circle" strokeColor={'red'} percent={totalExpensePercent.toFixed(0)} />

                </div>
            </div>
            <br /><br />
            <div className="FNFinancialChart2">
                <h2 className="FNFinancialChartHeading"> Revenue Distribution</h2>
                <h5 className="FNFinancialChartHeading">Income Transactions: {totalIncome}</h5>
                <h5 className="FNFinancialChartHeading">Expense Transactions: {totalExpense}</h5>
                <br />
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Progress type="circle" strokeColor={'green'} percent={totalIncomeAmountPercent.toFixed(0)} /> &nbsp;&nbsp;
                    <Progress type="circle" strokeColor={'red'} percent={totalExpenseAmountPercent.toFixed(0)} />

                </div>
            </div>
            <br /><br />

            <br /><br />
            <div className="FNFinancialChart3">
                <h2 className="FNFinancialChartHeading"> Total Transactions</h2>
                <p className="FNFinancialP">{totalTransactions}</p>
            </div>
            <br /><br />
            {/* Totals */}
            <br /><br />
            <div className="FNFinancialIncome">
                <h2 className="FNFinancialDivHeading">Total Income (LKR)</h2>
                <br />
                <p className="FNFinancialPerfP">{totalIncome}</p>
            </div>
            <br /><br />
            <div className="FNFinancialExpenses">
                <h2 className="FNFinancialDivHeading">Total Expenses (LKR)</h2>
                <br />
                <p className="FNFinancialPerfP">{totalExpense}</p>
            </div>
            <br /><br />
            <div className="FNFinancialProfit">
                <h2 className="FNFinancialDivHeading">Net Profit (LKR)</h2>
                <br />
                <p className="FNFinancialPerfP">{netProfit}</p>
            </div>
            <br /><br /><br /><br />
            <div className="FNChartDiv" ref={divRef}>
                <h1 className="FNFinancialChartHeading2">Financial Performance</h1>
                <h2 className="FNFinancialChartHeading3">--FitCrib--</h2>
                <h3 className="FNFinancialChartHeading4">finance@FitCrib.com</h3>
                <br /><br />
                <div className="FNFinanicalChart">
                    <h2 className="FNFinancialChartHeading">Income Transactions</h2>
                    <p className="FNFinancialChartPara2">Amount (LKR)</p>
                    <LineChart width={600} height={300} data={totalIncomeTransactions} margin={{ top: 50, right: 0, bottom: 5, left: 40 }}>
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                    <p className="FNFinancialChartP">No. of Transactions</p>
                </div>
                <br /><br />
                <div className="FNFinanicalChart">
                    <h2 className="FNFinancialChartHeading">Expense Transactions</h2>
                    <p className="FNFinancialChartPara2">Amount (LKR)</p>
                    <LineChart width={600} height={300} data={totalExpenseTransactions} margin={{ top: 50, right: 0, bottom: 5, left: 40 }}>
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                    </LineChart>

                    <p className="FNFinancialChartP">No. of Transactions</p>
                </div>
                <br /><br />
            </div>
            <br/>
            <button onClick={handleSave} className="FNPdfButton">Save as PDF</button>
            <br /><br/>
            <div>
                <p className="FNFinancialPara">Want to calculate a specific amount regarding transactions? </p>
                <a href="/calculate" className="FNLink">Click Here</a>
            </div>


            <br /><br /><br /><br />

        </div>
    )

}



export default FinancialPerf;