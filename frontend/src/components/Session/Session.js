import React, { useState, useEffect } from "react";
// import SongPlayer from "./SongPlayer";
// import HeartRateMonitor from "./HeartRateMonitor";
import "./Sessions.css";
import Stopwatch from "../Stopwatch/Stopwatch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import format from "date-fns/format";

function WorkoutSession() {
  const [comment, setComment] = useState("");
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();
  const { dayIndex } = useParams();
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [sentimentScore, setSentimentScore] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [sessionNumber, setSessionNumber] = useState(null);

  const navigate = new useNavigate();

  useEffect(() => {
    function fetchWorkout() {
      axios
        .get(`http://localhost:8070/workoutPlan/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setWorkout(res.data);
          setWorkoutName(res.data.workoutName);
          setWorkoutDescription(res.data.workoutDescription);
          setWorkoutPlan(res.data.workoutPlan);
          setExercises(res.data.workoutPlan[dayIndex]);
          console.log(res.data.workoutPlan[dayIndex]);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchWorkout();
  }, [id]);

  useEffect(() => {
    function fetchSessions() {
      axios
        .get(`http://localhost:8070/workoutSession/${id}/${dayIndex}`)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.length);
          if (res.data.length === 0) {
            setSessionNumber(1);
          } else {
            setSessionNumber(++res.data.length);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchSessions();
  }, [id]);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  console.log(exercises);
  console.log(sessionNumber);

  const currentExercise = exercises[currentExerciseIndex];
  const prevExercise = exercises[currentExerciseIndex - 1];
  const nextExercise = exercises[currentExerciseIndex + 1];

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };

  const handleEnd = () => {
    console.log(comment);
    axios
      .post("http://localhost:5000/predict", {
        logreg_data: { comment },
      })
      .then((response) => {
        console.log(response.data);
        setSentimentScore(response.data);
        console.log(sentimentScore);
        setDateAndTime(format(new Date(), "dd/MM/yyyy HH:mm:ss"));
        const newSession = {
          workoutId: id,
          workoutName: workoutName,
          day: dayIndex,
          sessionComment: comment,
          sentiment: response.data,
          sessionNumber: sessionNumber,
          date : new Date()
        };
        axios
          .post("http://localhost:8070/workoutSession/addSession", newSession)
          .then(() => {
            alert("Session Added");
            navigate(-1);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="Session" style={{ backgroundColor: "#1F1F1F" }}>   
      <br/>     
        <div className="workout-container">          
          <div className="container">
          <div>
          <h1>{workoutName}</h1>
        </div>
            <div className="workoutSwitch">
              <div className="side-container Session">
                {prevExercise && (
                  <p className="prev-exercise">
                    Previous : {prevExercise.exerciseName}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary Session"
                  onClick={handlePrevious}
                >
                  Previous Exercise
                </button>
              </div>
              <div className="middle-container Session">
                <div className="exercise-header">
                  <h2>Current Exercise</h2>
                  <h4>
                    {currentExercise
                      ? currentExercise.exerciseName
                      : "Loading..."}
                  </h4>
                  <h4>
                    Sets :{" "}
                    {currentExercise
                      ? currentExercise.setsPerRep
                      : "Loading..."}
                  </h4>
                  <h4>
                    Reps per Set :{" "}
                    {currentExercise
                      ? currentExercise.exerciseReps
                      : "Loading..."}
                  </h4>
                  <h4>
                    Weight :{" "}
                    {currentExercise ? currentExercise.weight : "Loading..."}
                  </h4>
                </div>
              </div>
              <div className="side-container Session">
                {nextExercise && (
                  <p className="next-exercise">
                    Next : {nextExercise.exerciseName}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary Session"
                  onClick={handleNext}
                >
                  Next Exercise
                </button>
              </div>
            </div>
            <div className="session">
              <Stopwatch />
            </div>
            <div className="Comment">
              {/* {setDateAndTime(format(new Date(), "dd/MM/yyyy HH:mm:ss"))} */}
              {/* <label>Comments about the Session</label>
      <textarea onChange={handleCommentChange} /> */}
              <div className="mb-3  Session">
              <input type="hidden" name="date" value="<%= new Date().toISOString() %>"/>
                <label
                  htmlFor="workoutDescription"
                  className="form-label Session"
                >
                  Comments about the Session :
                </label>
                <textarea
                  className="form-control Session outline w-100"
                  id="workoutDescription"
                  onChange={handleCommentChange}
                  
                />
              </div>
            </div>
            <div>
              <button  type="button" className="btn btn-danger Session" onClick={handleEnd}>End Session</button>
            </div>
            <br />
          </div>

          {/* <div className="song-player-container">
      <SongPlayer />
    </div>
    <div className="heart-rate-monitor-container">
      <HeartRateMonitor />
    </div> */}
        </div>
        <br/>
      </div>
    </>
  );
}

export default WorkoutSession;
