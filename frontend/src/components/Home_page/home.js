import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../Home_page/home.css';
import NavigationBarB from '../NavigationBarB/NavigationBarB'
import UserContext from '../ContextComponent/ContextComponent';
import myworkouticon from '../Home_page/Myworkouticon.png';
import exerciseicon from '../Home_page/exerciseicon.png';
import Edcontenticon from '../Home_page/Edcontenticon.png';
import Recipesicon from '../Home_page/recipesicon.png';
import Marketicon from '../Home_page/marketicon.png';
import Nutritionicon from '../Home_page/nutritionicon.png';


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
        <div className="ReHomePage">
            {/* <NavigationBarB id = {params.id} name = {user?.Fullname}/> */}
            <br /><br /><br />
            <h1 className="ReUserHomeHeading">Don't Stop Till <br /> You Drop</h1>
            <br /><br />
            <p className="ReUserHomePara1">The best way to</p>
            <p className="ReUserHomePara2">make sure your body and mind</p>
            <p className="ReUserHomePara3">are ready for</p>
            <p className="ReUserHomePara4">work is to wake them up with a good workout.</p>
            <br />
            <p className="ReUserHomeDescription">Welcome to our fitness website! Discover a wide range <br /> of resources, including workout plans, nutrition advice, and <br />expert tips, to help you achieve your health and wellness goals. <br /><b style={{ color: "rgb(242, 121, 8)" }}>Join our community and start your fitness journey today!</b></p>
            <br /><br /><br />

            <div className="ReHomePageSecondPart">
                <br /><br />
                <div className="ReUserDiv1">
                    <img src={myworkouticon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">My Workout</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/MyWorkouts`;
                    }}>MY WORKOUTS</button>

                </div>

                <div className="ReUserDiv2">
                    <img src={exerciseicon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">Exercises</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/userDashboard`;
                    }}>EXERCISES</button>

                </div>

                <div className="ReUserDiv3">
                    <img src={Marketicon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">MarketPlace</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/buyer`;
                    }}>MARKETPLACE</button>

                </div>

                <div className="ReUserDiv4">
                    <img src={Edcontenticon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">Educational Content</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/Bview`;
                    }}>EDUCATIONAL CONTENT</button>

                </div>

                <div className="ReUserDiv5">
                    <img src={Nutritionicon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">Nutrition Plans</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/mainNT`;
                    }}>NUTRITION PLANS</button>

                </div>

                <div className="ReUserDiv6">
                    <img src={Recipesicon} className="ReUserDivIcon" />
                    <h2 className="ReUserDivHeading">Recipes</h2>
                    <p className="ReUserDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="ReUserHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/RUVA`;
                    }}>RECIPES</button>

                </div>
                <br /><br />
            </div>
        </div>
    )
}