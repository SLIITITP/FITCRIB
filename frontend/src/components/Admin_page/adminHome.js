import React from "react";
import "../Admin_page/adminHome.css";
import usericon from "../Admin_page/usericon.png";
import blogicon from "../Admin_page/blogWicon.png";
import financeicon from "../Admin_page/finance.png";
import FNfootericon from "../Admin_page/adminfootericon.png";


export default function AdminHome() {

    //Log out function
    function logOut() {
        localStorage.clear();
        window.location.href = `/login`
    }

    return (

        <div className="AdminHome">

            {/* <div className="nav"> */}
            {/* Admin Header */}


            {/* </div> */}

            {/* Admin Home Body */}

            <br /><br /><br /><br /><br />
            <h1 className="AdminHomeHeading">FitCrib's <br />Administration <br /> System</h1>
            <br /><br />
            <p className="AdminHomePara">FitCrib's Administraion System is here! <br />You can view User data and the financial <br /> performance of the company and do <br />finance activity using this system.</p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="AdminHomeSecondPart">
                <br /><br />
                <div className="AdminDivDesc1">
                    <img src={usericon} className="AdminDivIcon" />
                    <h2 className="AdminDivHeading"> User Data</h2>
                    <p className="AdminDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="AdminButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/allusers`;
                    }}>ALL USERS</button>
                </div>
                <div className="AdminDivDesc2">
                    <img src={financeicon} className="AdminDivIcon" />
                    <h2 className="AdminDivHeading"> Financial Data</h2>
                    <p className="AdminDivPara">Stakeholder of the company can get an idea about the financial performance of the company by going through the data listed here.</p>
                    <button className="AdminButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/finance`;
                    }}>FINANCE</button>
                </div>
                <div className="AdminDivDesc3">
                    <img src={blogicon} className="AdminDivIcon" />
                    <h2 className="AdminDivHeading"> Blog Data</h2>
                    <p className="AdminDivPara">Blogs and articles can be approved here by the administrators so that they can be viewed by all the users.</p>
                    <br />
                    <button className="AdminButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
                    }}>BLOG DATA</button>
                </div>
                <br /><br />

            </div>

            {/* Admin Footer */}
            <div className="FNFooterDiv">
                <footer className="FNExactFooter">
                    <div>

                        <a href="/adminHome"><img src={FNfootericon} className="FNFooterPic" /></a>
                    </div>
                    <div className="FNFooterHeading">
                        <p>FitCrib's <br /> Administration <br /> System</p>
                    </div>
                    <div>
                        <p className="FNFooterHead1" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/adminHome`;
                        }}>HOME</p>


                        <p className="FNFooterHead2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/allusers`;
                        }}>ALL USERS</p>

                        <p className="FNFooterHead3" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/financialperformance`;
                        }}>FINANCIAL PERFORMANCE</p>

                        <p className="FNFooterHead4" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `#`;
                        }}>BLOGS</p>

                        <p className="FNFooterHead5" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/calculate`;
                        }}>CALCULATIONS</p>
                    </div>

                    <div>
                        <hr className="FNHr"></hr>
                    </div>
                    <div className='footer-bottom'>
                        <p className='FNFooterBottom' style={{ color: "#99FF33" }}>
                            © 2023 FITCRIB All Rights Reserved.
                        </p>

                    </div>

                </footer>

            </div>

        </div>
    )
}