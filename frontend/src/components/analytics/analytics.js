import React from "react";
import "../analytics/analytics.css";
import { Progress } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Analytics = ({ data }) => {

    //analytics data variables
    const totalTransactions = data.length;
    const totalIncomeTransactions = data.filter(transaction => transaction.type === 'Debit');
    const totalExpenseTransactions = data.filter(transaction => transaction.type === 'Credit');

    //variables for percentages
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransactions) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransactions) * 100;

    //variables for total
    const totalAmount = data.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncome = data.filter(transaction => transaction.type === 'Debit').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = data.filter(transaction => transaction.type === 'Credit').reduce((acc, transaction) => acc + transaction.amount, 0);
    const netProfit = totalIncome - totalExpense;

    const totalIncomeAmountPercent = (totalIncome / totalAmount) * 100;
    const totalExpenseAmountPercent = (totalExpense / totalAmount) * 100;

    return (
        <div className="FNAnalytics">
            <h1 className="FNAnalyticsHeading">ANALYTICS</h1>
            <br />
            <p className="FNAnalyticsPara">Financial data for the time period you selected is listed below..</p>
            <br />

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

            <br /><br />
            <div className="FNFinancialIncome">
                <h2 className="FNFinancialDivHeading">Total Income (LKR)</h2>
                <br/>
                <p className="FNFinancialPerfP">{totalIncome}</p>
            </div>
            <br /><br />
            <div className="FNFinancialExpenses">
                <h2 className="FNFinancialDivHeading">Total Expenses (LKR)</h2>
                <br/>
                <p className="FNFinancialPerfP">{totalExpense}</p>
            </div>
            <br /><br />
            <div className="FNFinancialProfit">
                <h2 className="FNFinancialDivHeading">Net Profit (LKR)</h2>
                <br/>
                <p className="FNFinancialPerfP">{netProfit}</p>
            </div>
            <br /><br /><br /><br />
        </div>
    )
}

export default Analytics;