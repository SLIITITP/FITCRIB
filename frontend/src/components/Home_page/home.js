import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../Home_page/home.css';
import img1 from '../index/index5.jpg';

export default function Home() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    //Log out function
    function logOut() {
        localStorage.clear();
    }
    return (
        <div className="home_page">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" >FitCrib</a>
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
                                        {location.state.id}
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

            <img src={img1} alt="" className="img1" />

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