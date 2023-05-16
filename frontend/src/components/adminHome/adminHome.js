import React from "react";
import "../adminHome/adminHome.css";
import usericon from "../adminHome/usericon.png";
import blogicon from "../adminHome/blogWicon.png";
import financeicon from "../adminHome/finance.png";

export default function AdminHome(){
    return(
        <div className="AdminHome">
            <br/><br/><br/><br/><br/>
            <h1 className="AdminHomeHeading">FitCrib's <br/>Administration <br/> System</h1>
            <br/><br/>
            <p className="AdminHomePara">FitCrib's Administraion System is here! <br/>You can view User data and the financial <br/> performance of the company and do <br/>finance related activity using this system.</p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="AdminHomeSecondPart">
                <br/><br/>
                <div className="AdminDivDesc1">
                    <img src={usericon} className="AdminDivIcon"/>
                    <h2 className="AdminDivHeading"> User Data</h2>
                    <p className="AdminDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/allusers`;
                                                                            }}>ALL USERS</button>
                </div>
                <div className="AdminDivDesc2">
                    <img src={financeicon} className="AdminDivIcon"/>
                    <h2 className="AdminDivHeading"> Financial Data</h2>
                    <p className="AdminDivPara">Stakeholder of the company can get an idea about the financial performance of the company by going through the data listed here.</p>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/finance`;
                                                                            }}>FINANCE</button>
                </div>
                <div className="AdminDivDesc3">
                    <img src={blogicon} className="AdminDivIcon"/>
                    <h2 className="AdminDivHeading"> Blog Data</h2>
                    <p className="AdminDivPara">Blogs and articles can be approved here by the administrators so that they can be viewed by all the users.</p>
                    <br/>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/bApprove`;
                                                                            }}>BLOG DATA</button>
                </div>
                <br/><br/>
                
            </div>
            
        </div>
    )
}