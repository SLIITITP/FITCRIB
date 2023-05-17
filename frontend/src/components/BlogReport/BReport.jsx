import React, { useState, useEffect, PureComponent, useRef } from "react";
import './bReport.css';
import axios from "axios";
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
        pdf.save('Blog report-FitCrib.pdf');
    };

    const handleSave = () => {
        saveAsPdf(divRef.current);
    };

    useEffect(() => {
        getBlogs();
    }, [])

    const getBlogs = async () => {
        const res = await axios.get('http://localhost:8070/blog')
        setData(res.data)
    }


    /*Phisic">Phisic</option>
    <option id="bOption" value="Health">Health</option>
    <option id="bOption" value="Diet">Diet</option>
    <option id="bOption" value="Exercises"
    */
    //filter
    const Health = data.filter(blog => blog.category === 'Phisic').length;
    const Diet = data.filter(blog => blog.category === 'Health').length;
    const Exercises = data.filter(blog => blog.category === 'Diet').length;
    const Phisic = data.filter(blog => blog.category === 'Exercises').length


    const data1 = [
        { name: "Phisic", blogs: Phisic },
        { name: "Health", blogs: Health },
        { name: "Diet", blogs: Diet },
        { name: "Exercises", blogs: Exercises }
    ];

    const COLORS = ['#230be7', '#d50fbc', '#22fa07','#0722fa'];

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

            <div className="backgroundBReport">
                <br />
                <h1 className="UserReportHeading">Report</h1>
                <br />
                <div className="BlogChart" ref={divRef}>
                    <h1 className="BlogReportHeading1">Blog Report</h1>
                    <h2 className="BlogReportHeading2">--FitCrib--</h2>
                    <h3 className="BlogReportHeading3">blogadmin@FitCrib.com</h3>
                    <br/>
                    <div className="BlogPieChart">
                        <PieChart width={400} height={400} className="Userpie">
                            <Pie
                                data={data1}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="blogs"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}

                            </Pie>
                            <Tooltip />

                        </PieChart>
                        <p className="Rbox">∎  Phisic</p>
                        <p className="Sbox">∎  Health</p>
                        <p className="Tbox">∎  Diet</p>
                        <p className="Ebox">∎  Exercise</p>
                    </div>

                    <br />

                    <div className="UserBarChart">
                        <br />
                        <h5 className="UserBiechartYaxis">No.of blogs</h5>
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
                            <Bar dataKey="blogs" fill="#CC0033" background={{ fill: "#edb9c0" }} />
                        </BarChart>
                    </div>
                    <br /><br />
                </div>
                <br/>
                <button onClick={handleSave} className="blogPDFBtn">Save as PDF</button>
                <br/><br/>
            </div>

        </div>
    )
}