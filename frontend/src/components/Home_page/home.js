import React, {useEffect, useState, useContext} from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import '../Home_page/home.css';
import img1 from '../index/index5.jpg';
import NavigationBarB from '../NavigationBarB/NavigationBarB'
import UserContext from '../ContextComponent/ContextComponent';


export default function Home() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    const { user } = useContext(UserContext);
    console.log(user)

    //Log out function
    function logOut() {
        localStorage.clear();
    }
    
    return (
        <div className="home_page">
            <NavigationBarB id = {params.id} name = {user?.Email}/>

            <img src={img1} alt="" className="img1" />

            <footer className="footer">
                <div className="foot_info">
                    <div className="footer_logo">
                        {/* <!--logo here--> */}
                        {/* <a href="#"><img src="images/logo.png" alt=""></a> */}
                        <h2 className="footer_name">FitCrib</h2>
                    </div>

                </div>


                <div className="bottom_nav">
                    <ul>
                        <li><a href="#">ABOUT US</a></li>
                        <li><a href="#">CONTACT US</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">PRIVACY POLICY</a></li>
                    </ul>
                </div>
                <div className="wrapper">
                    <div className="icon">
                        <span><i className="fa-brands fa-facebook"></i></span>
                    </div>
                    <div className="icon">
                        <span><i className="fa-brands fa-instagram"></i></span>
                    </div>
                    <div className="icon">
                        <span><i className="fa-brands fa-twitter"></i></span>
                    </div>
                    <div className="icon">
                        <span><i className="fa-brands fa-linkedin-in"></i></span>
                    </div>
                </div>
                <hr />
            </footer>



        </div>
    )
}