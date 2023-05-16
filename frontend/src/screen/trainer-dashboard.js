import React from "react";
import '../style/user-dashboard-style.css';

export const TrainerDashboard = () => {
    return (
        <div className="main-container">
            <div className="sub-container">
                 <div className="searchBar-wrap">
                    <div className="searchBar-em">
                        <input className="search-input-em" type="text" placeholder="Search" />
                        <button className="search-button-em">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path fill="#131313" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
                        </button>
                    </div>
                    <div className="trainerButtons">
                        <a href="/trainerFeed" className="trainerButton">
                            My Feed
                        </a>
                         <button className="trainerButton">
                            Add new Post
                        </button>
                    </div>
                </div>
                <div className="user-dashboard-wrap">
                    <div className="user-dashboard-items">
                       
                       <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>Workout Plans</h1>
                            </div>
                            <a href="/viewWorkout" className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>Workout plans are the best way to get started with your fitness journey. They are designed by experts to help you achieve your fitness goals. You can choose from a variety of workout plans based on your fitness level and goals.</p>
                                </div>
                            </a>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>Trainer</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            15
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                            15
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>

                     </div>
                </div>
            </div>
        </div>
    );
}
