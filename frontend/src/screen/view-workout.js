import React, { useState } from "react";
import '../style/user-dashboard-style.css';
import '../style/view-workout-style.css';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

import ReactPlayer from 'react-player/youtube'


export const ViewWorkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [workout,setWorkout] = useState(location.state);

    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="workout-view-container">
                    <div className="workout-view-header">
                        <div className="workout-name-wrapper">
                            <a className="backward-navigation" onClick={()=>{navigate(-1)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-left"><path fill="#3c8b1a" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
                            </a>
                            <h1>{workout.workoutName}</h1>
                        </div>
                        <div className="trainerDetails">
                            <img className="trainerDetails-image" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                            <div className="trainerDetails-name">
                                <h3>{workout.trainerName}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="workout-view-body">
                        <div className="workout-view-body-top">
                            <div className="workout-view-body-top-left">
                                <div className="workout-view-body-top-left-video-wrapper">
                                <ReactPlayer url={workout.link} />
                                    <div className="ratings-wrapper">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            {workout.likes}
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            {workout.dislikes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="workout-view-body-top-right">
                                <div className="workout-view-body-top-right-thumbnail">
                                    <img className="workout-view-body-top-right-thumbnail-image" src={workout.thumbnailImage} alt="Avatar" />
                                </div>
                                
                            </div>
                        </div>  
                        <div className="workout-view-body-bottom">
                            <div className="workout-view-body-bottom-left">
                                <div className="row"><h3>Main affected body part : </h3> <span className="tag">{workout.mainBodyPart}</span></div>
                                <div className="row"><h3>Side affected body parts : </h3> <span className="tag">{workout.sideBodyParts}</span></div>
                                <div className="row"><h3>Published date : </h3> <span className="tag">{workout.createdAt.substr(0,10)}</span></div>
                                
                                <h2>Description :</h2>
                                <p>{workout.description}</p>
                            </div>
                            <div className="workout-view-body-bottom-right">
                                <div className="workout-view-body-bottom-right-comment-head">
                                    Comments
                                    <span className="comment-count">26</span>
                                </div>
                                <div className="workout-view-body-bottom-right-comment-body">
                                   

                                    <div className="comment-wrapper">
                                        <div className="comment-pro-image">
                                            <img className="comment-image" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                                        </div>
                                        <div className="comment-details">
                                            <div className="comment-user">
                                                user Name
                                            </div>
                                            <div className="comment">
                                                asdas das d asd as d asd as d asd as d asd sa d
                                                sadasd asdans jdnasjnd ajsnd jasndj nas sad
                                                asd askd aslmd asdansa sd
                                                asd asd sad asd s 
                                                asd asd asd asd asd asd asd asdas das dasd  
                                                as das das dasd asdasda sd asd assd asd asd asd 
                                            </div>
                                        </div>
                                   </div>

                                    <div className="comment-wrapper">
                                        <div className="comment-pro-image">
                                            <img className="comment-image" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                                        </div>
                                        <div className="comment-details">
                                            <div className="comment-user">
                                                user Name
                                            </div>
                                            <div className="comment">
                                                asdas das d asd as d asd as d asd as d asd sa d
                                                sadasd asdans jdnasjnd ajsnd jasndj nas sad
                                                asd askd aslmd asdansa sd
                                                asd asd sad asd s 
                                                asd asd asd asd asd asd asd asdas das dasd  
                                                as das das dasd asdasda sd asd assd asd asd asd 
                                            </div>
                                        </div>
                                   </div>

                                    <div className="comment-wrapper">
                                        <div className="comment-pro-image">
                                            <img className="comment-image" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                                        </div>
                                        <div className="comment-details">
                                            <div className="comment-user">
                                                user Name
                                            </div>
                                            <div className="comment">
                                                asdas das d asd as d asd as d asd as d asd sa d
                                                sadasd asdans jdnasjnd ajsnd jasndj nas sad
                                                asd askd aslmd asdansa sd
                                                asd asd sad asd s 
                                                asd asd asd asd asd asd asd asdas das dasd  
                                                as das das dasd asdasda sd asd assd asd asd asd 
                                            </div>
                                        </div>
                                   </div>

                                    <div className="comment-wrapper">
                                        <div className="comment-pro-image">
                                            <img className="comment-image" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                                        </div>
                                        <div className="comment-details">
                                            <div className="comment-user">
                                                user Name
                                                <div className="comment-edit-wrapper">
                                                    <button className="comment-button-edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="pen"><path fill="#1a628c" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path></svg>
                                                    </button>
                                                    <button className="comment-button-delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="trash"><path fill="#8c1a46" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="comment">
                                               <textarea className="comment-edit-textarea">
                                                 asdas das d asd as d asd as d asd as d asd sa d
                                                sadasd asdans jdnasjnd ajsnd jasndj nas sad
                                                asd askd aslmd asdansa sd
                                                asd asd sad asd s 
                                                asd asd asd asd asd asd asd asdas das dasd  
                                                as das das dasd asdasda sd asd assd asd asd asd 
                                               </textarea>
                                            </div>
                                        </div>
                                   </div>
                                </div>
                                <div className="workout-view-body-bottom-right-comment-footer">
                                    <input type="text" placeholder="Enter comment..." className="workout-view-body-bottom-right-comment-footer-input"/>
                                    <button className="workout-view-body-bottom-right-comment-footer-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-13 0 50 24" id="message"><path fill="#fff" d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}
