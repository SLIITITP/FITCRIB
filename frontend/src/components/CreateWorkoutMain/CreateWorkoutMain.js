import { useState } from "react";
import Workout from "../Workout/Workout";
import Exercise from "../AddExerciseWorkout/AddExerciseWorkout"
// import './CreateWorkoutMain.css'

export default function CreateWorkoutMain() {
  const [workoutName, setWorkoutName] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [noOfDays, setNoOfDays] = useState("");
  const [description, setDescription] = useState("");
  


  
  


  

  const workoutss = workouts.map((workout) => {
    return <Workout key={workout} workoutName={workout} noOfDays={noOfDays} description ={description} />;
  });

  const handleClick = () => {
    setWorkouts([...workouts, workoutName]);
  };

  // const handleLogData = () => {
  //   console.log(allExercises);
  // };

  return (
    <>
      <label>Workout Name</label>
      <input type="text" onChange={(e) => setWorkoutName(e.target.value)} />
      <br />
      <br />
      <label>Description</label>
      <textarea onChange={(e) => setDescription(e.target.value)} />
      <br />
      <br />
      <label>Number of Days</label>
      <input
        type="text"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            setNoOfDays(value);
          }
        }}
      />
      <br />
      <button onClick={handleClick}>submit</button>
      {/* <button onClick={handleLogData}>Log Data</button> */}

      <>{workoutss}</>
      <br></br>
      {/* <Exercise handleClicks={allExercises => setAllExercises(allExercises)}/> */}
      <br></br>
    </>
  );
}
