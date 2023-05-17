import React, { useState } from "react";
import '../style/user-dashboard-style.css';
import '../style/add-workout-style.css';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

export const EditWorkout = () => {
    const location = useLocation();
    const [workout,setWorkout] = useState(location.state);
    const navigation = useNavigate();
    
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        console.log(name,value);
        setWorkout({...workout,[name]:value});
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        workout.trainerId = localStorage.getItem("id") || "0000";
        workout.trainerName = localStorage.getItem("name") || "trainer name";
        workout.approved = false;
        try{
            axios.put(`http://localhost:8070/workout/editWorkout/${workout._id}`,workout).then(()=>{
                alert("Workout updated");
            }
            ).catch((err)=>{
                alert(err);
            }
            );
        }catch(err){
            alert(err);
        }
        }
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="add-workout-container">
                    <div className="add-workout-header">
                        <h1>Edit Workout</h1>
                    </div>
                    <div className="add-workout-body">
                        <form className="add-workout-form">
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workout-name">Workout Name : </label>
                                    <input className="add-workout-form-input" type="text" onChange={handleInputChange} value={workout.workoutName} id="workoutName" name="workoutName" placeholder="Workout Name" />
                                    <span className="error-message"></span>
                                </div>
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workout-name">Main affected body part : </label>
                                    <input className="add-workout-form-input" type="text" onChange={handleInputChange} id="mainBodyPart" value={workout.mainBodyPart} name="mainBodyPart" placeholder="Workout Name" />
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workout-name">Side affected body part : </label>
                                    <input className="add-workout-form-input" type="text" onChange={handleInputChange} id="sideBodyParts" value={workout.sideBodyParts} name="sideBodyParts" placeholder="Workout Name" />
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label  className="add-workout-form-label" htmlFor="workout-name">Link : </label>
                                    <input className="add-workout-form-input" type="text" onChange={handleInputChange} id="link" value={workout.link} name="link" placeholder="Workout Name" />
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workout-name">Description : </label>
                                    <textarea className="add-workout-form-textarea" type="text" onChange={handleInputChange} id="description"value={workout.description}  name="description" placeholder="Workout Name" />
                                    <span className="error-message"></span>
                                </div>
                                <div className="add-workout-form-group-images">
                                    <div className="add-workout-form-group-thumbnailImage">
                                        <label htmlFor="workout-name">Thumbnail Image : </label>
                                        <div className="add-workout-form-thumbnailImage-container">
                                            <div className="add-workout-form-thumbnailImage-delete">
                                                X
                                             </div>
                                            <img className="add-workout-form-thumbnailImage" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                        </div>
                                        <input className="add-workout-form-input-thumbnailImage" type="file" id="workout-name" name="workout-name" placeholder="Workout Name" />
                                        <span className="error-message"></span>
                                    </div>
                                    <div className="add-workout-form-group-otherImage">
                                        <label htmlFor="workout-name">Other Image : </label>
                                        <div className="add-workout-form-otherImage-container">
                                           <div className="add-workout-form-otherImage-wrapper">
                                                <div className="add-workout-form-otherImage-delete">
                                                   X
                                                </div>
                                                <img className="add-workout-form-otherImage" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                            </div>
                                            <div className="add-workout-form-otherImage-wrapper">
                                                <div className="add-workout-form-otherImage-delete">
                                                   X
                                                </div>
                                                <img className="add-workout-form-otherImage" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                            </div>
                                            <div className="add-workout-form-otherImage-wrapper">
                                                <div className="add-workout-form-otherImage-delete">
                                                   X
                                                </div>
                                                <img className="add-workout-form-otherImage" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                            </div>
                                            <div className="add-workout-form-otherImage-wrapper">
                                                <div className="add-workout-form-otherImage-delete">
                                                   X
                                                </div>
                                                <img className="add-workout-form-otherImage" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                            </div>
                                            <input className="add-workout-form-input-otherImage" type="file" id="workout-name" name="workout-name" placeholder="Workout Name" />
                                        </div>
                                        <span className="error-message"></span>
                                    </div>
                                </div>
                                <div className="add-workout-form-footer">
                                    <button className="add-workout-form-button" onClick={onSubmit} type="submit">Update Workout</button>
                                    <button className="add-workout-form-button" onClick={()=>navigation("/trainerFeed")} type="button">Cancel</button>
                                </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
