import {React,useState} from "react";
import '../style/user-dashboard-style.css';
import '../style/add-workout-style.css';
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';

 
export const EditWorkout = () => {
    const location = useLocation();
    const [workout,setWorkout] = useState(location.state);
    const navigation = useNavigate();

    const [image, setImage] = useState({path:'', preview: workout.thumbnailImage, data: '' })
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
        workout.thumbnailImage = image.data
 
        try{
            axios.put(`http://localhost:8070/workout/editWorkout/${workout._id}`,workout,{
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }).then(()=>{
                alert("Workout updated");
            }).catch((err)=>{
                alert(err);
            });
        }catch(err){
            alert(err);
        }
    }

    const handleFileChange = (e) => {
        const img = {
          path: e.target.value,
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
        console.log(img)
      }

    
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="add-workout-container">
                    <div className="add-workout-header">
                        <h1>Edit Workout</h1>
                    </div>
                    <div className="add-workout-body">
                        <form enctype="multipart/form-data" className="add-workout-form" onSubmit={(e) =>onSubmit(e)}>
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workoutName">Workout Name : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} value={workout.workoutName} type="text" id="workoutName" name="workoutName" placeholder="Workout Name..." required />
                                    <span className="error-message"></span>
                                </div>
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="mainBodyPart">Main affected body part : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} value={workout.mainBodyPart} type="text" id="mainBodyPart" name="mainBodyPart" placeholder="Workout main effected body part..." required  />
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="sideBodyParts">Side affected body part : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} value={workout.sideBodyParts} type="text" id="sideBodyParts" name="sideBodyParts" placeholder="Workout side effected body part.." required />
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label  className="add-workout-form-label" htmlFor="link">Link : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} value={workout.link} type="text" id="link" name="link" placeholder="Workout Workout video link..." required/>
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="description">Description : </label>
                                    <textarea className="add-workout-form-textarea" onChange={handleInputChange} value={workout.description} type="text" id="description" name="description" placeholder="Workout description..." required />
                                    <span className="error-message"></span>
                                </div>
                                <div className="add-workout-form-group-images">
                                    <div className="add-workout-form-group-thumbnailImage">
                                        <label htmlFor="workout-name">Thumbnail Image : </label>
                                        <div className="add-workout-form-thumbnailImage-container">
                                            <div className="add-workout-form-thumbnailImage-delete" onClick={()=>setImage({data:'',preview:''})}>
                                                X
                                             </div>
                                            <img className="add-workout-form-thumbnailImage" src={image.preview ? image.preview : "https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar" />
                                        </div>
                                        <input className="add-workout-form-input-thumbnailImage" type="file" id="workout-image" name="workout-image" placeholder="Workout image"  onChange={handleFileChange} required/>
                                        <span className="error-message"></span>
                                    </div>
                                    
                                </div>
                                <div className="add-workout-form-footer">
                                    <button className="add-workout-form-button" type="submit" >Update Exercise</button>
                                    <button className="add-workout-form-button" type="cancel" onClick= {()=>{navigation('/trainerFeed')}}>Cancel</button>
                                </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
