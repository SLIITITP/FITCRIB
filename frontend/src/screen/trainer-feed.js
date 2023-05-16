import React, { useEffect, useState } from "react";
import '../style/user-dashboard-style.css';
import '../style/message-modal-style.css';
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf' 
import generatePDF from "./workout_report";

export const TrainerFeed = () => {
    const [modal, setModal] = useState(false);
    const [workout,setWorkout] = useState([{}]);
    const [searchTxt,setSearchTxt] = useState();
    const [filteredWorkout,setFilteredWorkout] = useState([{}]);
    const [isSearch,setIsSearch] = useState(false);
    const [newWorkout,setNewWorkout] = useState([{}]);
    const [singleWorkout,setSingleWorkout] = useState({});
    const navigation = useNavigate()
    const doc = new jsPDF()

    useEffect(() => {
        const getUserCards = async () => {
            axios.get(`${API_URL}/workout/getAllworkouts`).then((response) => {
                setWorkout(response.data);
            });
        }
        getUserCards();
    },[workout]);

    const searchWorkout = (e) => {
        setFilteredWorkout([]);
        setSearchTxt(e.target.value);
        
        console.log(searchTxt);
        setFilteredWorkout(workout.filter((workout) => {
            return workout.workoutName.toLowerCase().includes(searchTxt.toLowerCase());
        }
        ));
        
        searchTxt.length == 0 && setFilteredWorkout(workout);
        setIsSearch(true);
    }

        const setDeleteWorkout = (workout) => {
            setSingleWorkout(workout);
            setModal(true);
        }

        const removeData= async (id) => {
        try {
            await axios.delete(`${API_URL}/workout/deleteWorkout/${id}`);
            const newWorkout = workout.filter((t) => t._id !== id);
            setWorkout(newWorkout);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <div className="main-container">
            <div className="sub-container">
                <h2>Profile</h2>
                <div className="trainer-profile">
                    <div className="trainer-profile-image">
                        <img src="" alt="profile" />
                        <button className="profile-image-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="pen"><path fill="#1a628c" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path></svg>
                        </button>
                    </div>
                    <div className="profile-right">
                        <div className="trainer-profile-text">
                            <h3>Name</h3> 
                            <span>Name</span>
                        </div>
                        <div className="trainer-profile-text">
                            <h4>Rating</h4> 
                            <span>15.0</span>
                        </div>
                        <div className="trainer-profile-text">
                            <h4>Trainer Name</h4> 
                            <span>Name</span>
                        </div>
                    </div>
                </div>
                <h1>Trainer Feed</h1>
                 <div className="searchBar-wrap">
                    <div className="searchBar-em">
                        <input className="search-input-em" type="text" placeholder="Search" />
                        <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path fill="#131313" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
                        </button>
                    </div>
                    <div className="trainerButtons">
                        <a href="./addWorkout" className="trainerButton">
                            Add new post
                        </a>
                         <button className="trainerButton" onClick={() => generatePDF(workout)}>
                            Generate report
                        </button>
                    </div>
                </div>
                <div className="user-dashboard-wrap">
                    <div className="user-dashboard-items">
                     
                     {!isSearch && workout.map((workout) => (  
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>{workout.workoutName}</h1>
                            </div> 
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src={workout.thumbnailImage} className="workout-image" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>{workout.description}</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-feed-buttonList">
                                    <button className="user-dashboard-item-feed-view">
                                        <svg xmlns="http://www.w3.org/2000/svg"  onClick={()=>{navigation('/viewWorkout',{state:workout});}} viewBox="0 0 30 24" id="eye"><path fill="#0092E4" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path></svg>
                                         <span> View</span>
                                    </button>
                                     <button className="user-dashboard-item-feed-edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigation('/editWorkout',{state:workout});}} viewBox="0 0 30 24" id="pen"><path fill="#1a628c" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path></svg>
                                        Edit
                                    </button>
                                     <button className="user-dashboard-item-feed-delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setDeleteWorkout(workout)} viewBox="0 0 24 24" id="trash"><path fill="#8c1a46" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"></path></svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                     ))}

                     {isSearch && filteredWorkout.map((workout) => (  
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>{workout.description}</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-feed-buttonList">
                                    <button className="user-dashboard-item-feed-view">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" id="eye"><path fill="#0092E4" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path></svg>
                                         <span> View</span>
                                    </button>
                                     <button className="user-dashboard-item-feed-edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" id="pen"><path fill="#1a628c" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path></svg>
                                        Edit
                                    </button>
                                     <button className="user-dashboard-item-feed-delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="trash"><path fill="#8c1a46" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"></path></svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                     ))}
                     

                     </div>
                </div>
                {modal && 
                <div className="message-model">
                    <div className="message-model-content">
                        <div className="message-model-header">
                            <h1>Warning</h1>
                            <button className="message-model-close"  onClick={()=>setModal(false)}>
                               X
                            </button>
                        </div>
                        <div className="message-model-body">
                            <div className="message-model-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="exclamation-triangle"><path fill="#d4d643" d="M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"></path></svg>
                            </div>
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div className="message-model-footer">
                            <button className="message-model-cancel" onClick={()=>setModal(false)}>
                                Cancel
                            </button>
                            <button className="message-model-delete" onClick={()=>removeData(singleWorkout._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}
