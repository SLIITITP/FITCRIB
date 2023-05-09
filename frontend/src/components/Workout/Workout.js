import Exercise from "../AddExerciseWorkout/AddExerciseWorkout";
import { useState } from "react";
// import {CreateWorkoutMain} from "../CreateWorkoutMain/CreateWorkoutMain"
// import './Workout.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



export default function Workout( props ) {
  const [workoutPlan, setAllExercises] = useState([]);

  const getAllExercises = (exercises) => {
    // return <Exercise target = {getAllExercises}/>
    setAllExercises(() => [...workoutPlan, exercises]);
    
  }
  
    
    
    const workoutName = props.workoutName
    const workoutDescription = props.description

    console.log(props.noOfDays);
    console.log(workoutDescription);

    const exercises = [];
    

    for (let i = 1; i <= props.noOfDays; i++) {
        exercises.push(<Exercise key={i} day={i} handleClicks={getAllExercises}/>);
    }
    console.log(workoutPlan);
	const styles = {
        border: '1px solid crimson', 
   };

   const loadCreateButton = () => {
    return (
      <button onClick={handleCreateWorkoutPlan}>Create WorkoutPlan</button>
    );
  };

  const navigate = new useNavigate()

  const handleCreateWorkoutPlan = () => {
    console.log(exercises)
    console.log(workoutPlan)

    const newWorkoutPlan = {
      workoutName,
      workoutDescription,
      workoutPlan
    }
    axios.post("http://localhost:8070/workoutPlan/addWorkout", newWorkoutPlan).then(()=>{
      alert("Workour Added")
      navigate(`/MyWorkouts`);
    }).catch((err)=>{
      alert(err)
    })
  };

    return (
        <>
		<div style={styles}>
			 <h1>Workout Name : {props.workoutName}</h1>
             <div className = "row">
             
            {exercises}
            
            </div>
		</div>

           <hr />
           <div className="handleCreateWorkoutPlan">{loadCreateButton()}</div>
        </>
    );
}
