import React from "react";
import "../FNFooter/FNfooter.css";
import FNfootericon from "../FNFooter/adminfootericon.png";

function Footer() {
    return (
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
                        window.location.href = `#`;
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

    )
}

export default Footer;