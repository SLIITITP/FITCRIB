import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import '../Update_user/update_user.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Update() {

    const location = useLocation()
    const history = useNavigate();

    const [Fullname, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [TelephoneNumber, setTelephoneNumber] = useState("");
    const [UserType, setUserType] = useState("");
    const [Gender, setGender] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const params = useParams();

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        let result = await fetch(`http://localhost:8070/user/get/${params.id}`);
        result = await result.json();

        console.warn(result);
        setName(result.user.Fullname)
        setEmail(result.user.Email)
        setAddress(result.user.Address)
        setTelephoneNumber(result.user.TelephoneNumber)
        setUserType(result.user.UserType)
        setGender(result.user.Gender)
        setUsername(result.user.Username)
        setPassword(result.user.Password)

    }

    const updateUser = async () => {
        let result = await fetch(`http://localhost:8070/user/update/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ Fullname, Email, Address, TelephoneNumber, UserType, Gender, Username, Password }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json();

        if (result) {
            toast.success('User updated successfully..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            window.location.href = `/profile/${params.id}`;
        }
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (Fullname) {
            if (UserType === "Seller") {
                history(`/seller_home/${params.id}`, { state: { id: Fullname } })
                window.location.href = `/seller_home/${params.id}`;
            }
            else if (UserType === "Registered User") {
                history(`/home/${params.id}`, { state: { id: Fullname } })
                window.location.href = `/home/${params.id}`;
            }
            else if (UserType === "Trainer") {
                history(`/trainer_home/${params.id}`, { state: { id: Fullname } })
                window.location.href = `/trainer_home/${params.id}`;
            }
        }

    }


    return (
        <div className="update_page">
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
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* {location.state.id} */}{Fullname}
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
            <br />
            <div className="rectangle">
                <h1 className="updateprofile">User Profile</h1>
            </div>
            <div className="view_form">
                <form>
                    <label for="fullname" className="viewheading">Full Name: </label><br />
                    <input type="text" className="viewforminput" value={Fullname} onChange={(e) => {
                        setName(e.target.value)
                    }} /><br />

                    <label for="email" className="viewheading">Email: </label><br />
                    <input type="email" className="viewforminput" value={Email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} /><br />

                    <label for="address" className="viewheading">Address: </label><br />
                    <input type="text" className="viewforminput" value={Address} onChange={(e) => {
                        setAddress(e.target.value)
                    }} /><br />

                    <label for="phonenumber" className="viewheading">Telephone Number: </label><br />
                    <input type="number" className="viewforminput" value={TelephoneNumber} onChange={(e) => {
                        setTelephoneNumber(e.target.value)
                    }} /><br />

                    <label for="usertype" className="viewheading">User Type: </label><br />
                    <input type="text" className="viewforminput" value={UserType} onChange={(e) => {
                        setUserType(e.target.value)
                    }} readOnly /><br />


                    <label for="gender" className="viewheading">Gender: </label><br />
                    <input type="text" className="viewforminput" value={Gender} onChange={(e) => {
                        setGender(e.target.value)
                    }} /><br />

                    <label for="username" className="viewheading">Username: </label><br />
                    <input type="text" className="viewforminput" value={Username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} /><br />

                    <label for="password" className="viewheading">Password: </label><br />
                    <input type="password" className="viewforminput" value={Password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} /><br /><br />

                    <button className="userupdatebtn" onClick={updateUser}>Update</button>&nbsp;&nbsp;&nbsp;
                    <button className="userupdatecancelbtn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/profile/${params.id}`;
                    }}>Cancel</button>


                </form>
                <br />
            </div>
            <ToastContainer />

            <br/><br/>

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