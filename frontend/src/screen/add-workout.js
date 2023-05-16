import {React,useState} from "react";
import '../style/user-dashboard-style.css';
import '../style/add-workout-style.css';
import axios from "axios";

const initialState=({
    workoutName:"",
    mainBodyPart: "",
    sideBodyParts: "",
    link: "",
    description: "",
    thumbnailImage: "",
    otherImage: [],
    cloudinary_id: "",
    cloudinary_id_other: [],
    trainerName: "",
    trainerId:"",
    approved: false,

})
export const AddWorkout = () => {
    const [workout,setWorkout] = useState({});
    const [image, setImage] = useState({path:'', preview: '', data: '' })
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

        console.log( workout.thumbnailImage)
        console.log(workout);
        if(workout.workoutName ===""){
            alert("Enter workout name")
        }
        if(workout.mainBodyPart ===""){
            alert("Enter main effected body part")
        }
        if(workout.sideBodyParts ===""){
            alert("Enter side effected body part")
        }
        if(workout.link ===""){
            alert("Enter workout video link")
        }
        if(workout.description ===""){
            alert("Enter workout description")
        }
        if(workout.thumbnailImage ===""){
            alert("Enter workout Image")
        }

        if(workout.workoutName ==="" && workout.mainBodyPart ==="" && workout.sideBodyParts ==="" && workout.link ==="" && workout.description ==="" && workout.thumbnailImage ===""){
            alert("Enter all data")
           }else{
            try{
                axios.post("http://localhost:8070/workout/addWorkout",workout,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                    }
                }).then(()=>{
                    alert("Workout added");
                }).catch((err)=>{
                    alert(err);
                });
            }catch(err){
                alert(err);
            }
        
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
                        <h1>Add Exercise</h1>
                    </div>
                    <div className="add-workout-body">
                        <form enctype="multipart/form-data" className="add-workout-form" onSubmit={(e) =>onSubmit(e)}>
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="workoutName">Exercise Name : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} type="text" id="workoutName" name="workoutName" placeholder="Exercise Name..." required/>
                                    <span className="error-message"></span>
                                </div>
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="mainBodyPart">Main affected body part : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} type="text" id="mainBodyPart" name="mainBodyPart" placeholder="Exercise main effected body part..." required /> {/*pattern={"^[0-9]"*/} 
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="sideBodyParts">Side affected body part : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} type="text" id="sideBodyParts" name="sideBodyParts" placeholder="Exercise side effected body part.." required/>
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label  className="add-workout-form-label" htmlFor="link">Link : </label>
                                    <input className="add-workout-form-input" onChange={handleInputChange} type="text" id="link" name="link" placeholder="Exercise video link..." required/>
                                    <span className="error-message"></span>
                                </div> 
                                <div className="add-workout-form-group">
                                    <label className="add-workout-form-label" htmlFor="description">Description : </label>
                                    <textarea className="add-workout-form-textarea" onChange={handleInputChange} type="text" id="description" name="description" placeholder="Exercise description..." required/>
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
                                    <button className="add-workout-form-button" type="submit" >Add Exercise</button>
                                    <button className="add-workout-form-button" type="cancel">Cancel</button>
                                </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
