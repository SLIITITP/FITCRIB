import React, { useState, useEffect } from "react";
import axios from "axios";
import '../All_users/all_user.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FNfootericon from "../Admin_page/adminfootericon.png";
// import Swal from 'sweetalert2'


export default function All_users() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8070/user");

        if (response.status === 200) {
            setData(response.data);
            console.log(response)
        }
    }

    //delete
    const onDeleteUser = async (_id) => {
        if (window.confirm("Are you sure that you want to delete this user record?")) {
            const response = await axios.delete(`http://localhost:8070/user/delete/${_id}`);
            if (response.status === 200) {
                toast.error('User deleted..!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getUsers();
            }
        }
    }

    //search
    const searchUsers = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/user/search/${key}`);
            result = await result.json()

            if (result) {
                setData(result)
            }

        } else {
            getUsers();
        }


    }


    console.log("data=>", data);

    //Log out function
    function logOut() {
        localStorage.clear();
        window.location.href = `/login`
    }

    return (
        <div className="alluser_page">
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
            <div className="background_viewalluser_page">
                <br />

                <h1 className="ViewUsersHeading">ALL USERS</h1>
                <input type="" placeholder="Search User" className="ViewalluserSearch" onChange={searchUsers} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="reportUserbtn" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/report`;
                }}>Generate Report</button> <br /><br />
                <table className="ViewUsersTable">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>No.</th>
                            <th style={{ textAlign: "center" }}>Fullname</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Address</th>
                            <th style={{ textAlign: "center" }}>Tel.Number</th>
                            <th style={{ textAlign: "center" }}>Gender</th>
                            <th style={{ textAlign: "center" }}>UserType</th>
                            <th style={{ textAlign: "center" }}>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.Fullname}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.TelephoneNumber}</td>
                                    <td>{item.Gender}</td>
                                    <td>{item.UserType}</td>
                                    <td>{item.Username}</td>
                                    <td>

                                        <button className="DeleteViewallbtn DeleteViewallbtn-delete" onClick={() => onDeleteUser(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <br /><br />
                <ToastContainer />
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