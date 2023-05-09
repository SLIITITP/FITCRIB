import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import DeleteButton from "../DeleteButton/DeleteButton";
import './NewWorkoutPlan.css';

export default function NewWorkoutPlan() {

  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState([]);

  const handleCreateWorkoutPlan = () => {
    // console.log(exercises)
    // console.log(workoutPlan)

    const newWorkoutPlan = {
      workoutName,
      workoutDescription,
      workoutDuration,
      workoutPlan
    }
    axios.post("http://localhost:8070/workoutPlan/addWorkout", newWorkoutPlan).then(()=>{
      alert("Workour Added")
      navigate(`/MyWorkouts`);
    }).catch((err)=>{
      alert(err)
    })
  };

  
  const handleWorkoutNameChange = (event) => {
    setWorkoutName(event.target.value);
  };

  const handleWorkoutDescriptionChange = (event) => {
    setWorkoutDescription(event.target.value);
  };

  const handleWorkoutDurationChange = (event) => {
    setWorkoutDuration(event.target.value);
  };

  const handleWorkoutPlanChange = (event, dayIndex, index) => {
    const { name, value } = event.target;
    console.log(value)
    console.log(name)
    console.log(dayIndex)
    console.log(index)
    console.log(event.target)
    const list = [...workoutPlan];
    console.log(list[dayIndex][index][name])
    list[dayIndex][index][name] = value;
    setWorkoutPlan(list);
  };
  const addDay = () => {
    const list = [...workoutPlan];
    list.push([]);
    setWorkoutPlan(list);
  };
  const addExercise = (index) => {
    const list = [...workoutPlan];
    list[index].push({ exerciseName: "", setsPerRep: 0, exerciseReps: 0, weight: 0 });
    setWorkoutPlan(list);
  };
  const removeDay = (index) => {
    const list = [...workoutPlan];
    list.splice(index, 1);
    setWorkoutPlan(list);
  };
  const removeExercise = (dayIndex, exerciseIndex) => {
    const list = [...workoutPlan];
    list[dayIndex].splice(exerciseIndex, 1);
    setWorkoutPlan(list);
  };

  const navigate = new useNavigate()

  return (
    <>
    <div className="NewWorkoutPlan">
    <div className="container-md">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-10 col-xl-12">
          
            <div className="card shadow NewWorkoutPlan card w-100 cardoutline">
              <div className="card w-100">
              <div className="card-body NewWorkoutPlan">
              <h1 className="card-title">Create a new Workout Plan</h1>
                  <div className="mb-3">
                    <label htmlFor="workoutName" className="form-label">Workout Name</label>
                    <input type="text" className="form-control NewWorkoutPlan outline" id="workoutName" value={workoutName} onChange={handleWorkoutNameChange} autocomplete="off" required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutDescription" className="form-label">Workout Description</label>
                    <textarea className="form-control NewWorkoutPlan outline" id="workoutDuration" value={workoutDescription} onChange={handleWorkoutDescriptionChange} autocomplete="off" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutDescription" className="form-label">How many months are you hoping to continue the Workout Plan?</label>
                    <input type="text" className="form-control NewWorkoutPlan outline" id="workoutDescription" value={workoutDuration} onChange={handleWorkoutDurationChange} autocomplete="off" required/>
                  </div>
                  {/* <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li className="dropdown-item" value ="0.25">0.25</li>
    <a className="dropdown-item" >Another action</a>
    <a className="dropdown-item" >Something else here</a>
  </div>
</div> */}
                  <div className="mb-3">
                    <h3 class="card-title NewWorkoutPlan">Workout Plan</h3>
                    {workoutPlan.map((day, dayIndex) => (
                      <div key={dayIndex} className="day-container mb-6">
                        <hr/>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h3 class="card-subtitle NewWorkoutPlan">Day {dayIndex + 1}</h3>
                          {workoutPlan.length > 1 && (
                            <button type="button" className="btn btn-danger" onClick={() => removeDay(dayIndex)}>
                              Remove Day
                            </button>
                          )}
                        </div>
                        <div className="exercise-container">
                          {day.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className="exercise mb-2">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h4 class="card-subtitle NewWorkoutPlan">Exercise {exerciseIndex + 1}</h4>
                                <button type="button" className="btn btn-danger" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
                                  Remove Exercise
                                </button>
                              </div>
                              <div className="mb-2">
                                <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Name</label>
                                <input type="text" className="form-control NewWorkoutPlan outline" id={`exerciseName-${dayIndex}-${exerciseIndex}`} name="exerciseName" defaultValue={exercise.exerciseName} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} autocomplete="off"/>
                              </div>
                              <div className="mb-2">
                                <label htmlFor={`setsPerRep-${dayIndex}-${exerciseIndex}`} className="form-label">Sets</label>
                                <input type="number" className="form-control NewWorkoutPlan outline" id={`setsPerRep-${dayIndex}-${exerciseIndex}`} name="setsPerRep" defaultValue={exercise.setsPerRep} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <div className="mb-2">
                                <label htmlFor={`exerciseReps-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Reps</label>
                                <input type="number" className="form-control NewWorkoutPlan outline" id={`exerciseReps-${dayIndex}-${exerciseIndex}`} name="exerciseReps" defaultValue={exercise.exerciseReps} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <div className="mb-2">
                                <label htmlFor={`weight-${dayIndex}-${exerciseIndex}`} className="form-label">Weight</label>
                                <input type="number" className="form-control NewWorkoutPlan outline" id={`weight-${dayIndex}-${exerciseIndex}`} name="weight" defaultValue={exercise.weight} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center NewWorkoutPlan">
                          <button type="button" className="btn btn-primary" onClick={() => addExercise(dayIndex)}>
                            Add Exercise
                          </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center NewWorkoutPlan">
                    <button type="button" className="btn btn-primary" onClick={addDay}>
                      Add Day
                    </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center NewWorkoutPlan">
                  <button type="button" className="btn btn-primary" onClick={handleCreateWorkoutPlan}>
                    Confirm Workout Plan
                  </button>
                  </div>
                </div>
                </div>
              </div>
              
{/*            
            <DeleteButton id = {id}/> */}
          </div>
          
        </div>
      </div>
      </div>
    </>
  );
}
