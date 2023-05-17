import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import index from "../index";
import axios from "axios";
import '../View_user/view_user.css';
import Usericon from '../View_user/usericon.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponent/ContextComponent';
// import M from 'materialize-css'

export default function ViewProfile() {

    const [data, setData] = useState([]);
    const params = useParams();
    const location = useLocation()
    const history = useNavigate();

    // const { user } = useContext(UserContext);
    // console.log(user)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let result = await axios.get(`http://localhost:8070/user/get/${params.id}`);

        if (result.status === 200) {
            setData(result.data);

        }

    }
    console.log(data);

    //delete
    const deleteUser = async (_id) => {
        if (window.confirm("Are you sure that you want to delete this user account?")) {
            const res = await axios.delete(`http://localhost:8070/user/delete/${_id}`);
            if (res.status === 200) {
                window.location.href = `/add`;
                toast.error('User account deleted..!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (data.user.Fullname) {
            if (data.user.UserType === "Seller") {
                history(`/seller_home/${data.user._id}`, { state: { id: data.user.Fullname } })
                window.location.href = `/seller_home/${data.user._id}`;
            }
            else if (data.user.UserType === "Registered User") {
                history(`/home/${data.user._id}`, { state: { id: data.user.Fullname } })
                window.location.href = `/home/${data.user._id}`;
            }
            else if(data.user.UserType === "Trainer") {
                history(`/trainer_home/${data.user._id}`, { state: { id: data.user.Fullname } })
                window.location.href = `/trainer_home/${data.user._id}`;
            } 
        } 

    }


    return (
        <div className="view_page">

            {/* view body */}
            <div className="view_body">

                <br /><br />
                <div className="rectangle">
                    <h1 className="user_page_heading">User Account</h1>
                </div>

                <div className="user">
                    <div class="container py-5">

                        <div class="row">
                            <div class="col-lg-4 ViewUserImgCard">
                                <div class="card mb-4">
                                    <div class="card-body text-center #">
                                        <img src={Usericon} alt="avatar"
                                            class="rounded-circle img-fluid" />
                                        <h3 class="my-3">{data.user?.Fullname}</h3>
                                        <p class="text-muted mb-4" id="ViewUserImgDetails">{data.user?.UserType}</p>
                                    </div>
                                </div>

                            </div>
                            <div class="col-lg-8 ViewUserDetailsCard">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0 ViewUserHeadingCard" id="view_User_heading">Full Name</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.Fullname}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">Email</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.Email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">Address</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.Address}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">Telephone Number</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.TelephoneNumber}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">User Type</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.UserType}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">Gender</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.Gender}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_User_heading">Username</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0" id="view_User_details">{data.user?.Username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button type="submit" className="otherusersbtn" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/users`
                        }} >View Other Users</button>
                        <button type="submit" className="Userupdatebtn" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/update/${params.id}`
                        }}>Update Details</button> &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="Userdeletebtn" onClick={() => deleteUser(params.id)}>Delete My Account</button>
                    </div>
                </div>

            </div>
            <ToastContainer />

        </div>
    )
}