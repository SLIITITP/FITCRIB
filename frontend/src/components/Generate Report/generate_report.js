import React, { useState, useEffect, PureComponent } from "react";
import '../Generate Report/generate_report.css';
import axios from "axios";
import FNfootericon from "../Admin_page/adminfootericon.png";
import {
    // PieChart,
    // Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function Generate_Report() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const res = await axios.get('http://localhost:8070/user/')
        setData(res.data)

    }

    //filter
    const RegisteredUser = data.filter(user => user.UserType === 'Registered User').length;
    const Seller = data.filter(user => user.UserType === 'Seller').length;
    const Trainer = data.filter(user => user.UserType === 'Trainer').length;


    const data1 = [
        { name: "Registered User", users: RegisteredUser },
        { name: "Seller", users: Seller },
        { name: "Trainer", users: Trainer }
    ];

    const COLORS = ['#230be7', '#d50fbc', '#22fa07'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    //Log out function
    function logOut() {
        localStorage.clear();
        window.location.href = `/login`
    }

    return (
        <div className="generateReport_page">
            {/* Admin Header */}

            <nav className="navbar navbar-expand-lg" style={{ background: "#333333" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/adminHome" style={{ color: "#99FF33" }}>FitCrib</a>
                    {/* change */}
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/allusers" style={{ color: "#99FF33" }}>All Users</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>Finance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>Create a Transaction</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>View Transactions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>Financial Performance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>Calculations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#99FF33" }}>FAQs</a>
                            </li>
                        </ul>

                        <button className="btn" style={{ background: "#99FF33", color: "black" }} onClick={logOut}>Log Out</button>


                    </div>
                </div>
            </nav>

            <div className="background_Report_page">
                <br />

                <h1 className="ReportHeading">Report</h1>
                <br />
                <div className="chart">
                    <div className="UserPieChart">
                        <PieChart width={400} height={400} className="Userpie">
                            <Pie
                                data={data1}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="users"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}

                            </Pie>
                            <Tooltip />

                        </PieChart>
                        <p className="Rbox">∎ Registered User</p>
                        <p className="Sbox">∎ Seller</p>
                        <p className="Tbox">∎ Trainer</p>
                    </div>

                    <br />
                    <div className="UserBarChart">
                        <br />
                        <BarChart
                            width={600}
                            height={500}
                            data={data1}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 80,
                                bottom: 5,
                            }}
                            barSize={40}
                        >
                            <XAxis
                                dataKey="name"
                                scale="point"
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="users" fill="#ff0000" background={{ fill: "#edb9c0" }} />
                        </BarChart>
                    </div>
                    <br /><br />
                </div>

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
                            window.location.href = `#`;
                        }}>FINANCIAL PERFORMANCE</p>

                        <p className="FNFooterHead4" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `#`;
                        }}>BLOGS</p>

                        <p className="FNFooterHead5" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `#`;
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