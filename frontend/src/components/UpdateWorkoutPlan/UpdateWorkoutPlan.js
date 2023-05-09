import './UpdateWorkoutPlan.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton";


export default function UpdateWorkoutPlan() {
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutDuration, setWorkoutDuration] = useState("");

  const navigate = new useNavigate()

  useEffect(() => {
    function fetchWorkout() {
      axios
        .get(`http://localhost:8070/workoutPlan/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setWorkout(res.data);
          setWorkoutName(res.data.workoutName)
          setWorkoutDescription(res.data.workoutDescription)
          setWorkoutPlan(res.data.workoutPlan)
          setWorkoutDuration(res.data.workoutDuration)
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchWorkout();
  }, [id]);

  
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
    axios
      .delete(`http://localhost:8070/workoutSession/${id}/${index}`)
      .then(() => {
        alert("Related sessions also deleted")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const list = [...workoutPlan];
    list[dayIndex].splice(exerciseIndex, 1);
    setWorkoutPlan(list);
  };

  const updateWorkout = () => {
    axios
      .put(`http://localhost:8070/workoutPlan/update/${id}`, {
        workoutName,
        workoutDescription,
        workoutPlan,
        workoutDuration
      })
      .then(() => {
        navigate(`/SingleWorkout/${id}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
    <div className="UpdateWorkoutPlan">
    <div className="container-md UpdateWorkoutPlan">
      <div className="row justify-content-center UpdateWorkoutPlan">
        <div className="col-md-8 col-lg-10 col-xl-12 UpdateWorkoutPlan">
          {workout ? (
            <div className="card shadow UpdateWorkoutPlan card w-100 cardoutline" >
              <div className= "card w-100 UpdateWorkoutPlan">
              <div className="card-body UpdateWorkoutPlan">
              <h1 className="card-title UpdateWorkoutPlan">Update Workout Plan</h1>
                  <div className="mb-3 UpdateWorkoutPlan">
                    <label htmlFor="workoutName" className="form-label UpdateWorkoutPlan">Workout Name</label>
                    <input type="text" className="form-control UpdateWorkoutPlan outline" id="workoutName" value={workoutName} onChange={handleWorkoutNameChange} />
                  </div>
                  <div className="mb-3 UpdateWorkoutPlan">
                    <label htmlFor="workoutDescription" className="form-label UpdateWorkoutPlan">Workout Description</label>
                    <textarea className="form-control UpdateWorkoutPlan outline" id="workoutDescription" value={workoutDescription} onChange={handleWorkoutDescriptionChange} />
                  </div>
                  <div className="mb-3 UpdateWorkoutPlan">
                    <label htmlFor="workoutDescription" className="form-label UpdateWorkoutPlan">How many months are you hoping to continue the Workout Plan?</label>
                    <input type="text" className="form-control UpdateWorkoutPlan outline" id="workoutDescription" value={workoutDuration} onChange={handleWorkoutDurationChange} />
                  </div>
                  <div className="mb-3 UpdateWorkoutPlan">
                  <h3 class="card-title UpdateWorkoutPlan">Workout Plan</h3>
                    {workoutPlan.map((day, dayIndex) => (
                      <div key={dayIndex} className="day-container mb-6 UpdateWorkoutPlan">
                        <hr/>
                        <div className="d-flex justify-content-between align-items-center mb-2 UpdateWorkoutPlan">
                          <h3 class="card-subtitle UpdateWorkoutPlan">Day {dayIndex + 1}</h3>
                          {workoutPlan.length > 1 && (
                            <button type="button" className="btn btn-danger UpdateWorkoutPlan" onClick={() => removeDay(dayIndex)}>
                              Remove Day
                            </button>
                          )}
                        </div>
                        <hr/>
                        <div className="exercise-container UpdateWorkoutPlan">
                          {day.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className="exercise mb-2 UpdateWorkoutPlan">
                              <div className="d-flex justify-content-between align-items-center mb-2 UpdateWorkoutPlan">
                                <h4 class="card-subtitle UpdateWorkoutPlan">Exercise {exerciseIndex + 1}</h4>
                                <button type="button" className="btn btn-danger UpdateWorkoutPlan" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
                                  Remove Exercise
                                </button>
                              </div>
                              <div className="mb-2 UpdateWorkoutPlan">
                                <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label UpdateWorkoutPlan">Exercise Name</label>
                                <input type="text" className="form-control UpdateWorkoutPlan outline" id={`exerciseName-${dayIndex}-${exerciseIndex}`} name="exerciseName" defaultValue={exercise.exerciseName} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <div className="mb-2 UpdateWorkoutPlan">
                                <label htmlFor={`setsPerRep-${dayIndex}-${exerciseIndex}`} className="form-label UpdateWorkoutPlan">Sets</label>
                                <input type="number" className="form-control UpdateWorkoutPlan outline" id={`setsPerRep-${dayIndex}-${exerciseIndex}`} name="setsPerRep" defaultValue={exercise.setsPerRep} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <div className="mb-2 UpdateWorkoutPlan">
                                <label htmlFor={`exerciseReps-${dayIndex}-${exerciseIndex}`} className="form-label UpdateWorkoutPlan">Exercise Reps</label>
                                <input type="number" className="form-control UpdateWorkoutPlan outline" id={`exerciseReps-${dayIndex}-${exerciseIndex}`} name="exerciseReps" defaultValue={exercise.exerciseReps} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <div className="mb-2 UpdateWorkoutPlan">
                                <label htmlFor={`weight-${dayIndex}-${exerciseIndex}`} className="form-label">Weight</label>
                                <input type="number" className="form-control UpdateWorkoutPlan outline" id={`weight-${dayIndex}-${exerciseIndex}`} name="weight" defaultValue={exercise.weight} onChange={(event) => handleWorkoutPlanChange(event, dayIndex, exerciseIndex)} />
                              </div>
                              <hr/>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center UpdateWorkoutPlan">
                          <button type="button" className="btn btn-primary UpdateWorkoutPlan" onClick={() => addExercise(dayIndex)}>
                            Add Exercise
                          </button>
                          </div>
                        </div>
                        
                      </div>
                      
                      
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center UpdateWorkoutPlan">
                    <button type="button" className="btn btn-primary UpdateWorkoutPlan" onClick={addDay}>
                      Add Day
                    </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center UpdateWorkoutPlan">
                  <button type="button" className="btn btn-primary UpdateWorkoutPlan" onClick={updateWorkout}>
                    Update Workout
                  </button>
                  </div>
                  <br></br>
                  <div className="d-flex justify-content-center UpdateWorkoutPlan">
                  <DeleteButton id = {id}/>
                  </div>
                </div>
                
                </div>
                
              </div>
              
            ) : (
              <p>Loading...</p>
            )}
            
          </div>
          
        </div>
        
      </div>
      </div>
    </>
  );
}
