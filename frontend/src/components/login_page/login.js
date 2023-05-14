import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../login_page/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponent/ContextComponent';


export default function Login(){

    const history = useNavigate();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [UserType, setUserType] = useState("");

    async function submit(e){
        e.preventDefault();

        //Users
        let result = await fetch("http://localhost:8070/login", {
            method: 'post',
            body: JSON.stringify({Email, Password, UserType}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.log(result)
        setUser(result);
        console.warn(result)
        if (result.Fullname) {
            localStorage.setItem('newUser', JSON.stringify(result))
            if (result.UserType === "Seller") {
                history(`/seller_home/${result._id}`, { state: { id:result.Fullname } })
                // window.location.href = `/seller_home/${result._id}`;
            }
            else if (result.UserType === "Registered User") {
                history(`/home/${result._id}`, { state: { name:result.Fullname } })
                // window.location.href = `/home/${result._id}`;
            }
            else if (result.UserType === "Trainer") {
                history(`/trainer_home/${result._id}`, { state: { id:result.Fullname } })
                // window.location.href = `/trainer_home/${result._id}`;
            }else if (result.UserType === "Admin") {
                history(`/adminHome`)
                // window.location.href = `/adminHome`;
            }
        } else {
            toast.warn('Please enter correct details..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(e);
        }

    }

    return(
        <div className="login_page">
            <div className="heading"><a href="/" className="loginCompanyName"><h1 className="name">FitCrib</h1></a>
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
                <h1 className="login">LOGIN</h1>
            </div>
            <div className="login_form">
                <form action="POST">
                    <div>
                        <label for="UserType" className="loginheading">UserType: </label><br/>
                        <select className="form-select form-select-lg" required={true} id="UserType" name="UserType" onChange={(e)=>{
                        setUserType(e.target.value)
                             }} value={UserType} style={{ backgroundColor: "aliceblue", fontWeight: "500" }}>
                            <option defaultValue >Select Type</option>
                            <option value="Registered User">Registered User</option>
                            <option value="Seller">Seller</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <label for="email" className="loginheading">Email: </label><br/>
                    <input type="email" className="loginforminput" placeholder="Email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }} value={Email}/><br/>

                    <label for="password" className="loginheading">Password: </label><br/>
                    <input type="password" className="loginforminput" placeholder="Password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }} value={Password}/><br/><br/><br/>

                    <button type="submit" className="loginsubmit" onClick={submit}>LOGIN</button><br/><br/>

                    <label for="loginpage" className="loginheading1">If you don’t have an account ?</label><br/>
                    <label for="redirect" className="loginheading1">please</label>&nbsp;&nbsp;
                    <a href = "/add">Signup</a>&nbsp;&nbsp;
                    <label for="redirect" className="loginheading1">here.</label>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}