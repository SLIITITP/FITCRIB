import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../Trainer_home_page/trainer_page.css';

export default function Trainer_home() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    return (
        <div className="trainer_page">
            <div>
                <br/>
                <h1 className="trainerHomeHeading">Trainer Home</h1>
                <br/><br/>
                <p className="trainerHomePara">Welcome to the trainer's corner! All the trainers can access their respective management systems through here. Work Smart!</p>
                <br/><br/>
                <div className="TrainerDivDesc1">
                    <br/>
                    <h2 className="TrainerDivHeading"> Recipe Management </h2>
                    <p className="AdminDivPara">Trainers can access the recipe management system from here. All of the data related to recipes can be viewed by them at any time.</p>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/AllRecipes`;
                                                                            }}>Recipes</button>
                </div>

                <div className="TrainerDivDesc2">
                    <br/>
                    <h2 className="TrainerDivHeading"> Educational Content Management </h2>
                    <p className="AdminDivPara">Trainers can access the educational content management system from here.</p>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`#`;
                                                                            }}>Educational Content</button>
                </div>

                <div className="TrainerDivDesc3">
                    <br/>
                    <h2 className="TrainerDivHeading"> Exercises Management </h2>
                    <p className="AdminDivPara">Trainers can access the exercises management system from here. They can view everything they post from here.</p> 
                    <br/>
                    <button className="AdminButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`#`;
                                                                            }}>Exercises</button>
                </div>
                <br/><br/><br/><br/>
            </div>
        </div>
    )
}