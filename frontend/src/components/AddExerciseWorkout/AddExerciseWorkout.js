import { useState } from "react";
import React from "react"
import './Styles.css'
import "bootstrap/dist/css/bootstrap.min.css";


export default function Exercise(props) {
  
  const [exercises, setExercise] = useState([]);
  const[exerciseName, setExerciseName] = useState("")
  const[setsPerRep, setSetsPerRep] = useState("")
  const[exerciseReps, setExerciseReps] = useState("")
  const[weight, setWeight] = useState("")

  const loadExercises = exercises.map((ex, index) => {
    console.log(exercises)
    return (
      <ul key={index}>
        <li>{ex.exerciseName}</li>
        <li>{ex.setsPerRep}</li>
        <li>{ex.exerciseReps}</li>
        <li>{ex.weight}</li>
      </ul>
    );
  });

  

  const handleClicks = () => {
    
    setExercise([
      ...exercises,
      {
        day : props.day,
        exerciseName: exercises.exerciseName,
        setsPerRep: exercises.setsPerRep,
        exerciseReps: exercises.exerciseReps,
        weight: exercises.weight,
      }
    
    ]);
    setExerciseName("")
    setSetsPerRep("")
    setExerciseReps("")
    setWeight("")
  };

  const handleConfirm = () => {
    props.handleClicks( 
      exercises
      // {
      //   day : props.day,
      //   exerciseName: exercises.exerciseName,
      //   sets: exercises.sets,
      //   reps: exercises.reps,
      //   weight: exercises.weight,
      // },
    
    );
    alert("Day Confirmed")
  }



  return (
    <>
      <h1>Day {props.day}</h1>
      <div className="container my-5">
      <h1 className="text-center">Day {props.day}</h1>
      <h2>Add Exercise</h2>
      <form>
        <div className="form-group">
          <label htmlFor="exercise-name">Exercise Name</label>
          <input
            type="text"
            className="form-control"
            id="exercise-name"
            onChange={(e) => (exercises.exerciseName = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sets">Sets</label>
          <input
            type="text"
            className="form-control"
            id="sets"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                exercises.setsPerRep = value;
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reps">Reps</label>
          <input
            type="text"
            className="form-control"
            id="reps"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                exercises.exerciseReps = value;
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                exercises.weight = value;
              }
            }}
          />
        </div>

        <button type="button" className="btn btn-success" onClick={handleClicks}>
          Add Exercise
        </button>

        <div className="form-group mt-3">{loadExercises}</div>

        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
          Confirm Day {props.day}
        </button>
      </form>
    </div>
      
    </>
  );
}
