import React, { useState, useEffect, PureComponent, useRef } from "react";
import '../Generate Report/generate_report.css';
import axios from "axios";
import FNfootericon from "../Admin_page/adminfootericon.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

    const divRef = useRef(null);

    const saveAsPdf = async (div) => {
        const canvas = await html2canvas(div);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('User report-FitCrib.pdf');
    };

    const handleSave = () => {
        saveAsPdf(divRef.current);
    };

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

    // //Log out function
    // function logOut() {
    //     localStorage.clear();
    //     window.location.href = `/login`
    // }

    return (
        <div className="generateReport_page">

            <div className="background_Report_page">
                <br />

                <h1 className="UserReportHeading">Report</h1>
                <br />
                <div className="UserChart" ref={divRef}>
                    <h1 className="UserReportHeading1">User Report</h1>
                    <h2 className="UserReportHeading2">--FitCrib--</h2>
                    <h3 className="UserReportHeading3">useradmin@FitCrib.com</h3>
                    <br/>
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
                        <h5 className="UserBiechartYaxis">No.of Users</h5>
                        <BarChart className="UserBar"
                            width={600}
                            height={500}
                            data={data1}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 80,
                                bottom: 5,
                            }}
                            barSize={30}
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
                <br/>
                <button onClick={handleSave} className="UserPdfButton">Save as PDF</button>
                <br/><br/>
            </div>

        </div>
    )
}