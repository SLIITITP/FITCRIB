import React from "react";
import './dashboard.css';
//import {useNavigate} from "react-router-dom";
import dashboardpic from "./dashboardpic.png";

function Dashboard(){


    return(
        <div className="FNDashboardBG">
            <br/>
            <h1 className="FNDashboardHeading">FINANCIAL MANAGEMENT SYSTEM</h1>
            <br/><br/>
            <div className="FNDashboardPara">
                <p> FitCrib’s Financial System is here! <br/>
                    You can view the cash inwards and outwards, <br/>
                    register transactions and view the financial<br/>
                    performance of the company here. <br/>
                    HAPPY WORKING!
                </p>
            </div>
            <div>
                <img src={dashboardpic} className="FNDashboardPic"/>
            </div>
            <br/><br/>
            <div className="FNDashboardSqr1">
                <br/>
                <h2 className="FNSqrHeading">Create Transactions</h2>
                <p className="FNSqrDesc">Report all the cash inwards and outwards to the database here. </p>
                
                
                    <button className="FNDashboardButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/addTransaction`;
                                                                            }}>CREATE</button>
                
            </div>

            <div className="FNDashboardSqr2">
                <br/>
                <h2 className="FNSqrHeading">View All Transactions</h2>
                <p className="FNSqrDesc">View all the transactions reported to the database here. </p>
                
                <button className="FNDashboardButton"onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.location.href=`/viewTransaction`;
                                                                    }}>VIEW ALL</button>

            </div>

            <div className="FNDashboardSqr3">
                <br/>
                <h2 className="FNSqrHeading">Check Financial Performance</h2>
                <p className="FNSqrDesc">Full detailed financial performance of the company is displayed here. </p>
              
                <button className="FNDashboardButton" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        window.location.href=`/financialperformance`;
                                                                        }}>CHECK</button>

            </div>

            <br/><br/>
        </div>
        

    )
}

export default Dashboard;