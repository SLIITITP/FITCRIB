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

    // //Log out function
    // function logOut() {
    //     localStorage.clear();
    //     window.location.href = `/login`
    // }

    return (
        <div className="alluser_page">
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

        </div>
    )
}