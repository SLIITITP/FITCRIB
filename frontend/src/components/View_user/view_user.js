import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import index from "../index";
import axios from "axios";
import '../View_user/view_user.css';
import Usericon from '../View_user/usericon.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import M from 'materialize-css'

export default function ViewProfile() {

    const [data, setData] = useState([]);
    const params = useParams();
    const location = useLocation()
    const history = useNavigate();

    // const Details = async()=>{
    //     let Valid = localStorage.getItem("newUser")

    // }

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let result = await axios.get(`http://localhost:8070/user/get/${params.id}`);

        if (result.status === 200) {
            setData(result.data);
            // console.log(data);
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

    //get all users

    // useEffect(() => {
    //     getUsers();
    // }, [])

    // const getUsers = async () => {
    //     const response = await axios.get("http://localhost:8070/user");

    //     if (response.status === 200) {
    //         setData(response.data);
    //         console.log(data);
    //     }
    // }

    //search

    // const searchModal = async(event) =>{
    //     let key = event.target.value;
    //     if(key){
    //         let result = await fetch(`http://localhost:8070/user/search/${key}`);
    //         result = await result.json()

    //         if(result){
    //             setData(result)
    //         }
    //     }else{
    //         getData();
    //     }
    // }

    // const searchModal = useRef(null);
    // const [search, setSearch] = useState('');
    // const [userDetails, setUserDetails] = useState([]);
    // useEffect(()=>{
    //     M.Modal.init(searchModal.current)
    // },[])

    // const fetchUsers =(query)=>{
    //     setSearch(query)
    //     fetch('/search-users',{
    //         method: "post",
    //         headers:{
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({query})
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         setUserDetails(result.user)
    //     })
    // }

    return (
        <div className="view_page">

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" onClick={HomepagesHandle}>FitCrib</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">WORKOUT PLANS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">EXERCISES</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">MARKETPLACE</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">EDUCATIONAL CONTENT</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">NUTRITION PLANS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">RECIPES</a>
                            </li>

                            <li>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" id="profile_dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* {location.state.id} */}{data.user?.Fullname}
                                    </a>

                                    <ul class="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/profile/${params.id}`
                                        }}>My Profile</a></li>
                                        <li><a class="dropdown-item" href="/login">Log out</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>




            {/* data map */}
            {/* {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.subject}</td>
                                <td>{item.type}</td>
                            </tr>
                        );
                    })}
               */}





            {/* search body */}

            {/* <div id="modal1" class="modal" ref={searchModal}>
                <div className="modal-content">
                    <input type="text" className="signupforminput" placeholder="search users"  onChange={(e) => {
                        searchModal(e.target.value);
                    }} />
                    <ul className="collection">
                        {data && [data].map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.Fullname}</td>
                                    <td>{item.Username}</td>
                                </tr>
                            );
                        })}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                </div>
            </div> */}

            {/* view body */}
            <div className="view_body">

                {/* search bar */}
                {/* <input type="" placeholder="Search user" className="usersearch modal-trigger" data-target="modal1" /> */}

                <br /><br />
                <div className="rectangle">
                    <h1 className="user_page">User Account</h1>
                </div>

                <div className="user">
                    <div class="container py-5">

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="card mb-4">
                                    <div class="card-body text-center">
                                        <img src={Usericon} alt="avatar"
                                            class="rounded-circle img-fluid" />
                                        <h3 class="my-3">{data.user?.Fullname}</h3>
                                        <p class="text-muted mb-4">{data.user?.UserType}</p>
                                    </div>
                                </div>

                            </div>
                            <div class="col-lg-8">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Full Name</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.Fullname}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Email</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.Email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Address</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.Address}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Telephone Number</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.TelephoneNumber}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">User Type</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.UserType}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Gender</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.Gender}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0" id="view_heading">Username</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{data.user?.Username}</p>
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
                        <button type="submit" className="updatebtn" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/update/${params.id}`
                        }}>Update Details</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="deletebtn" onClick={() => deleteUser(params.id)}>Delete My Account</button>
                    </div>
                </div>

            </div>
            <ToastContainer />


            {/* <div>
                <h3>Full name : {data.user?.Fullname}</h3>
                <h3>Email : {data.user?.Email}</h3>
                <h3>Address : {data.user?.Address}</h3>
                <h3>TelephoneNumber : {data.user?.TelephoneNumber}</h3>
                <h3>UserType : {data.user?.UserType}</h3>
                <h3>Gender : {data.user?.Gender}</h3>
                <h3>Username : {data.user?.Username}</h3>
            </div> */}

            {/* footer */}

            <footer className="footer">
                <div class="foot_info">
                    <div class="footer_logo">
                        {/* <!--logo here--> */}
                        {/* <a href="#"><img src="images/logo.png" alt=""></a> */}
                        <h2 className="footer_name">FitCrib</h2>
                    </div>

                </div>


                <div class="bottom_nav">
                    <ul>
                        <li><a href="#">ABOUT US</a></li>
                        <li><a href="#">CONTACT US</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">PRIVACY POLICY</a></li>
                    </ul>
                </div>
                <div class="wrapper">
                    <div class="icon">
                        <span><i class="fa-brands fa-facebook"></i></span>
                    </div>
                    <div class="icon">
                        <span><i class="fa-brands fa-instagram"></i></span>
                    </div>
                    <div class="icon">
                        <span><i class="fa-brands fa-twitter"></i></span>
                    </div>
                    <div class="icon">
                        <span><i class="fa-brands fa-linkedin-in"></i></span>
                    </div>
                </div>
                <hr />
            </footer>

        </div>
    )
}