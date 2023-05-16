import {React,useEffect, useState} from "react";
import '../style/user-dashboard-style.css';
import axios from "axios";
import { API_URL } from './../utils/constants';
import { useNavigate } from "react-router-dom";

export const UserDashboard = () => {
    const [workout,setWorkout] = useState([{}]);
    const [likes,setLikes] = useState(0)
    const [dislikes,setDisikes] = useState(0)
    const [searchTxt,setSearchTxt] = useState();
    const [filteredWorkout,setFilteredWorkout] = useState([{}]);
    const [isSearch,setIsSearch] = useState(false);
    const navigate = useNavigate();
    const [ip,setIP] = useState('');

    useEffect(() => {
        const getUserCards = async () => {
            
            axios.get(`${API_URL}/workout/getAllworkouts`).then((response) => {
                setWorkout(null)
                setWorkout(response.data);
                console.log(workout)
            });
        }
        getUserCards();
    },[]);

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get('https://geolocation-db.com/json/')
            console.log(res.data);
            setIP(res.data.IPv4)
        }
        getData() 
    },[])

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

    const addLike = (work) =>{  
      setLikes(likes + 1)
        const data = {
            "workoutName":work.workoutName,
            "mainBodyPart":work.mainBodyPart,
            "sideBodyParts":work.sideBodyParts,
            "likes" : likes,
            "dislike": dislikes,
            "link":work.link,
            "description":work.description,
            "trainerName":work.trainerName,
            "trainerId":work.trainerId,
            "approved":work.approved, 
            "thumbnailImage":work.thumbnailImage ,
            "cloudinary_id": work.cloudinary_id,
        }
        console.log(data)
        
        try{
            axios.put(`http://localhost:8070/workout/addLike/${work._id}`,data,).then(()=>{
                alert("Like added");
            }).catch((err)=>{
                alert(err);
            });
        }catch(err){
            alert(err);
        }
    }

    const addDisike = (work) =>{  
        setDisikes(dislikes + 1)
          const data = {
              "workoutName":work.workoutName,
              "mainBodyPart":work.mainBodyPart,
              "sideBodyParts":work.sideBodyParts,
              "likes" : likes,
              "dislike": dislikes,
              "link":work.link,
              "description":work.description,
              "trainerName":work.trainerName,
              "trainerId":work.trainerId,
              "approved":work.approved, 
              "thumbnailImage":work.thumbnailImage ,
              "cloudinary_id": work.cloudinary_id,
          }
          console.log(data)
          
          try{
              axios.put(`http://localhost:8070/workout/addLike/${work._id}`,data,).then(()=>{
                  alert("Like added");
              }).catch((err)=>{
                  alert(err);
              });
          }catch(err){
              alert(err);
          }
      }

    return (
        <div className="main-container">
            <div className="sub-container">
                 <div className="searchBar-wrap">
                    <div className="searchBar-em">
                        <input className="search-input-em" type="text" name="searchWorkout" onChange={searchWorkout} placeholder="Search" />
                        {!isSearch?(
                             <button className="search-button-em">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path fill="#131313" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
                            </button>
                        ):(
                        <button onClick={()=>setIsSearch(!isSearch)} className="search-button-em">
                            X
                        </button>
                        )}

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
                                    <p className="see-more-button" onClick={()=>{navigate('/viewWorkout',{state:workout});}}>see more...</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>{workout.trainerName}</p>
                                </div>
                                <div className="user-dashboard-item-footer-right">
                                    <div className="user-dashboard-item-footer-right-button-list">
                                        <button className="user-dashboard-item-footer-button-like" onClick={()=>addLike(workout)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" id="thumbs-up"><path fill="#1a628c" d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                                            {likes }
                                        </button>
                                        <button className="user-dashboard-item-footer-button-dislike" onClick={()=>addDisike(workout)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" id="thumbs-down"><path fill="#8c1a46" d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"></path></svg>
                                            {dislikes}
                                        </button>
                                        <button className="user-dashboard-item-footer-button-comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" id="comment-medical"><path fill="#0092E4" d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Zm2-9H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Z"></path></svg>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </div>))}

                        {isSearch && filteredWorkout.map((workout) => (
                         <div className="user-dashboard-item">
                            <div className="user-dashboard-item-name">
                                <h1>{workout.workoutName}</h1>
                            </div>
                            <div className="user-dashboard-item-body">
                                <div className="user-dashboard-item-body-image">
                                    <img src="" alt="workout" />
                                </div>
                                <div className="user-dashboard-item-body-text">
                                    <p>{workout.mainBodyPart}</p>
                                </div>
                            </div>
                            <div className="user-dashboard-item-footer">
                                <div className="user-dashboard-item-footer-left">
                                    <img src="" alt="trainer" />
                                    <p>{workout.sideBodyParts}</p>
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
                        </div>))}

                     </div>
                </div>
            </div>
        </div>
    );
}
