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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" >FitCrib</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">WORKOUT PLANS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">EXERCISES</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">MARKETPLACE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">EDUCATIONAL CONTENT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">NUTRITION PLANS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">RECIPES</a>
                            </li>

                            <li>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {location.state.id}
                                    </a>
                 
                                    <ul class="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/profile/${params.id}`
                                        }}>My Profile</a></li>
                                        <li><a className="dropdown-item" href="/login">Log out</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

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