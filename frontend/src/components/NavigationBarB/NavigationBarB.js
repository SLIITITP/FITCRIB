import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBarB.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../ContextComponent/ContextComponent";

export default function NavigationBarB(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);
    console.log(user)

    //   const MyWorkouts = () => {
    //     let path = `/MyWorkouts`;
    //     navigate(path);
    //   };

    //   const Home = () => {
    //     let path = `/`;
    //     navigate(path);
    //   }

    const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add' || location.pathname === '/addpayment';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Seller") {
                // history(`/seller_home/${user._id}`, { state: { id:user.Fullname } })
                window.location.href = `/seller_home/${user._id}`;
            }
            else if (user.UserType === "Registered User") {
                // history(`/home/${user._id}`, { state: { id: user.Fullname } })
                window.location.href = `/home/${user._id}`;
            }
            else if (user.UserType === "Trainer") {
                // history(`/trainer_home/${user._id}`, { state: { id:user.Fullname } })
                window.location.href = `/trainer_home/${user._id}`;
            }
        }

    }

    return (
        <>
            <div className='NavigationBarB'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" onClick={HomepagesHandle}>FitCrib</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/MyWorkouts`
                                    }}>MY WORKOUTS</a>
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
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.Fullname}
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><a className="dropdown-item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/profile/${user._id}`
                                            }}>My Profile</a></li>
                                            <li><a className="dropdown-item" href="/login">Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

