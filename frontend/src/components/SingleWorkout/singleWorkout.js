import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleWorkout.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateButton from "../UpdateButton/UpdateButton";
import PieChart from "../SessionTrackerPie/PieChart";

export default function SingleWorkout() {
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();
  const [dayIndex, setIndex] = useState(null);
  const [session, setSession] = useState([]);

  useEffect(() => {
    function fetchWorkout() {
      axios
        .get(`http://localhost:8070/workoutPlan/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setWorkout(res.data);
          console.log(res.data.workoutDuration);
          console.log(res.data.workoutDuration * 4);
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
        .get(`http://localhost:8070/workoutSession/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setSession(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchSessions();
  }, [id]);

  console.log(session);

  const navigate = new useNavigate();

  const handleIndex = (index) => {
    setIndex(index);
    console.log(dayIndex);
    let path = `/Session/${id}/${index}`;
    navigate(path);
  };

  const sessionDetails = (day, sessionNumber) => {
    let path = `/SessionDetails/${id}/${sessionNumber}/${day}`;
    navigate(path);
  };

  return (
    <>
      <div className="SingleWorkout" style={{ backgroundColor: "#1F1F1F" }}>
        <div className="SingleWorkout row gx-8">
          <div className="SingleWorkout col-md-8 col-lg-8 col-xl-8 overflow-auto mb-5 mt-5 workoutPlanContainer">
            {workout ? (
              <div className="SingleWorkout card shadow SingleWorkout cardoutline w-100">
                <br/>
                <div className="SingleWorkout card-body">
                  
                  <h1 className="SingleWorkout card-title">{workout.workoutName}</h1>
                  <p className="SingleWorkout card-text">{workout.workoutDescription}</p>
                  <hr />
                  {workout.workoutPlan &&
                    workout.workoutPlan.map((items, index) => {
                      return (
                        <div key={index} className="SingleWorkout mb-4">
                          <div className="SingleWorkout d-flex justify-content-between align-items-center mb-2">
                            <h4>Day {index + 1}</h4>
                            <button
                              className="SingleWorkout btn btn-outline-success"
                              onClick={() => handleIndex(index)}
                            >
                              Start Session
                            </button>
                          </div>
                          <ul className="SingleWorkout list-group">
                            {items.map((subItems, sIndex) => {
                              return (
                                <li
                                  key={sIndex}
                                  className="SingleWorkout list-group-item d-flex justify-content-between align-items-center"
                                >
                                  <span>{subItems.exerciseName}</span>
                                  <span>
                                    Sets: {subItems.setsPerRep}, Reps:{" "}
                                    {subItems.exerciseReps}, Weight:{" "}
                                    {subItems.weight}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                          <hr/>
                        </div>
                        
                      );
                    })}
                  <div className="SingleWorkout d-flex justify-content-center">
                    <UpdateButton id={workout._id} />
                  </div>
                  <br/>
                  <div className="SingleWorkout d-flex justify-content-center">
                  <DeleteButton id={workout._id} />
                  </div>
                </div >
                
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="SingleWorkout col-md-3 col-lg-3 col-xl-3 overflow-auto mb-5 sessionContainer cardoutline">
            <div className="SingleWorkout card shadow">
              <div>
                <h2>Satisfactory Sessions</h2>
                <br/>
                {session ? (
                  <ul>
                    {session.map((item, index) => {
                      if (item.sentiment === "4" || item.sentiment === "5") {
                        
                        return <li key={index} onClick={() => sessionDetails(item.day, item.sessionNumber)}> Day {item.day + 1} Session {item.sessionNumber} - {item.sessionComment}</li>
                        
                      }
                      return null;
                    })}
                  </ul>
                ) : (
                  <p>Loading ......</p>
                )}
              </div>
              <br/>
              
              <div>
                <h2>Unsatisfactory Sessions</h2>
                <br/>
                {session ? (
                  <ul>
                    {session.map((item, index) => {
                      if (item.sentiment === "1" || item.sentiment === "2" || item.sentiment === "3") {
                        return <li key={index} onClick={() => sessionDetails(item.day, item.sessionNumber)}>Day {item.day + 1} Session {item.sessionNumber} - {item.sessionComment}</li>;
                      }
                      return null;
                    })}
                  </ul>
                ) : (
                  <p>Loading ......</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <PieChart />
      </div>
    </>
  );
}
