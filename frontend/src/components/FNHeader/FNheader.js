import React from "react";
import { useLocation } from 'react-router-dom';

function Header() {

    const location = useLocation();

    //Log out function
    function logOut() {
        localStorage.clear();
        window.location.href = `/login`
    }

    const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add' || location.pathname === '/addpayment';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    return (

        <nav className="navbar navbar-expand-lg" style={{ background: "#333333" }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <b><a className="navbar-brand" href="/adminHome" style={{ color: "#99FF33" }}>FitCrib</a></b>
                {/* change */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/allusers" style={{ color: "#99FF33" }}>All Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/finance" style={{ color: "#99FF33" }}>Finance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addTransaction" style={{ color: "#99FF33" }}>Create a Transaction</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/viewTransaction" style={{ color: "#99FF33" }}>View Transactions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/financialperformance" style={{ color: "#99FF33" }}>Financial Performance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/calculate" style={{ color: "#99FF33" }}>Calculations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/fnfaq" style={{ color: "#99FF33" }}>FAQs</a>
                        </li>
                    </ul>

                    <button className="btn" style={{ background: "#99FF33", color: "black" } } onClick={logOut}>Log Out</button>


                </div>
            </div>
        </nav>
    )
}

export default Header;