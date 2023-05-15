import React, { useState } from "react";
import '../create_user/adduser.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

export default function Adduser() {

    const [Fullname, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [TelephoneNumber, setTelephoneNumber] = useState("");
    const [UserType, setUserType] = useState("");
    const [Gender, setGender] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newUser = {
            Fullname,
            Email,
            Address,
            TelephoneNumber,
            UserType,
            Gender,
            Username,
            Password,
            confirmpassword
        }

        if (Password !== confirmpassword) {
            toast.error('Passwords do not match...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
          }

        axios.post("http://localhost:8070/user/add", newUser).then(() => {
            alert("User Added")
            window.location.href = `/addpayment`;
        }).catch((err) => {
            alert(err)
        })

    }
    //redirect another page after submitting the form
    // const navigate = useNavigate();

    // function handleClick(){
    //     navigate("/addpayment")
    // }
    //html 


    //password validation
    



    return (
        <div className="reg_page">
            <div className="heading">
            <a href="/" className="SignupCompanyName"><h1 className="name" >FitCrib</h1></a>
                <ul class="nav justify-content-end nav-underline">
                    <li class="nav-item1">
                        <a class="nav-link" href="/login">LOGIN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/add">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <div className="rectangle">
                <h1 className="signup">SIGNUP</h1>
            </div>
            <div className="reg_form">
                <form onSubmit={sendData}>
                    <label for="fullname" className="signupheading">Full Name: </label><br />
                    <input type="text" className="signupforminput" placeholder="Full Name" onChange={(e) => {
                        setName(e.target.value);
                    }} required/><br />

                    <label for="email" className="signupheading">Email: </label><br />
                    <input type="email" className="signupforminput" placeholder="Email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} required/><br />

                    <label for="address" className="signupheading">Address: </label><br />
                    <input type="text" className="signupforminput" placeholder="Address" onChange={(e) => {
                        setAddress(e.target.value);
                    }} required/><br />

                    <label for="phonenumber" className="signupheading">Telephone Number: </label><br />
                    <input type="number" className="signupforminput" placeholder="Telephone Number" onChange={(e) => {
                        setTelephoneNumber(e.target.value);
                    }} required/><br />

                    <label for="usertype" className="signupheading">User Type: </label><br />
                    <input type="radio" className="usertyperadio" name="usertype" value="Registered User" onChange={(e) => {
                        setUserType(e.target.value);
                    }} required/>&nbsp;&nbsp;
                    <label for="Registered User" className="signupheading">Registered User</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="usertyperadio" name="usertype" value="Seller" onChange={(e) => {
                        setUserType(e.target.value);
                    }} required/>&nbsp;&nbsp;
                    <label for="Seller" className="signupheading">Seller</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="usertyperadio" name="usertype" value="Trainer" onChange={(e) => {
                        setUserType(e.target.value);
                    }} required/>&nbsp;&nbsp;
                    <label for="Trainer" className="signupheading">Trainer</label><br />

                    <label for="gender" className="signupheading">Gender: </label><br />
                    <input type="radio" className="genderradio" name="gender" value="Male" onChange={(e) => {
                        setGender(e.target.value);
                    }} required/>&nbsp;&nbsp;
                    <label for="Male" className="signupheading">Male</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="genderradio" name="gender" value="Female" onChange={(e) => {
                        setGender(e.target.value);
                    }} required/>&nbsp;&nbsp;
                    <label for="Female" className="signupheading">Female</label><br />

                    <label for="username" className="signupheading">Username: </label><br />
                    <input type="text" className="signupforminput" placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value);
                    }} required/><br />

                    <label for="password" className="signupheading">Password: </label><br />
                    <input type="password" className="signupforminput" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} required/><br />

                    <label for="password" className="signupheading">Confirm Password: </label><br />
                    <input type="password" className="signupforminput" placeholder="Confirm Password"  onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }} required/><br />

                    <input type="checkbox" className="signupcheckbox" required/>&nbsp;&nbsp;
                    <label for="checkbox" className="signupheading">Accept Privacy Policy and Terms</label><br /><br />

                    <button type="submit" className="signupsubmit">SUBMIT</button>
                    <label for="loginpage" className="signupheading">If you have already an account?</label><br />
                    <label for="redirect" className="signupheading1">please</label>&nbsp;&nbsp;
                    <a href="/login">Login</a>&nbsp;&nbsp;
                    <label for="redirect" className="signupheading1">here.</label>
                </form>
            </div>

            <br />
            <div className="redirectpayment">
                <div className="redirectinforectanegl">
                    <h4 className="redirectinfo">After submitting the registration form <br />head in to the payment portal&nbsp;&nbsp;<a href="/addpayment"><button type="submit" className="paynowbtn">PayNow</button></a></h4>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}