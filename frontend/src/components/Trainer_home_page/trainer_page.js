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
                <h1>Trainer</h1>
                <button className="RecTrainerbtn" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/AllRecipes`;
                }}>Recipe</button>
                <button className="BlogTrainerbtn" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/AllRecipes`;
                }}>Educational Content</button>
                <button className="ExercTrainerbtn">Exercises</button>
            </div>
        </div>
    )
}