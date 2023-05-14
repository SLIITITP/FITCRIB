import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MyWorkouts.css";
import "bootstrap/dist/css/bootstrap.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserContext from '../ContextComponent/ContextComponent';

import axios from "axios";
import UpdateButton from "../UpdateButton/UpdateButton";

export default function MyWorkouts() {

  const { user } = useContext(UserContext);
  const userID = user._id


  const [allWorkouts, setWorkouts] = useState(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  function fetchWorkouts() {
    axios
      .get(`http://localhost:8070/workoutPlan/getWorkouts/${userID}`)
      .then((res) => {
        console.log(res.data)
        setWorkouts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    
    fetchWorkouts();
  }, []);


  let navigate = useNavigate();


  const viewWorkout = (workoutId) => {
    console.log(workoutId);
    setSelectedWorkoutId(workoutId);
    let path = `/SingleWorkout/${workoutId}`;
    navigate(path);
  };

  const createNewWorkoutPlan = () => {
    let path = `/NewWorkoutPlan`;
    navigate(path);
  }

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    let key = event.target.value;
    if(key){
      
      let result = await fetch(`http://localhost:8070/workoutPlan/search/${key}`);
      result = await result.json();

      if(result){
        console.log(result)
        setWorkouts(result);
      }
    }else{
      fetchWorkouts()
    }
  };


  return (
    <>
    <div className="MyWorkouts">
       <section className="h-100" style={{ backgroundColor: "#1F1F1F" }}>
      <Container className="h-100 py-5">
        <Row className="d-flex justify-content-start align-items-center h-100">
          <Col>
            <div className="d-flex justify-content-between align-items-left mb-4">
              <h3 className="fw-normal mb-0 text-black text-white">
              My Workouts
              </h3>
              <div className="d-flex justify-content-end">
                <Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search Workout"
                    aria-label="Search Workout"
                    aria-describedby="button-addon2"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Button variant="outline-success ms-3" id="button-addon2">
                    Search
                  </Button>
                </Form>
              </div>
            </div>

            <div className="workouts">
              {allWorkouts ?
                allWorkouts.map((workout) => (
                  <Card
                    className="rounded-3 mb-4"
                    style={{ backgroundColor: "white" }}
                    key={workout._id}
                  >
                    <Card.Body className="p-4">
                      <Row className="d-flex justify-content-between align-items-center">
                      
                        <Col md={2} lg={2} xl={2}>
                        <div className="Clickable" onClick={() => viewWorkout(workout._id)}>
                          <Card.Img
                            variant="top"
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            className="img-fluid rounded-3"
                            alt="Workout"
                          />
                          </div>
                        </Col>
                        <Col md={3} lg={3} xl={3}>
                          <div className="Clickable" onClick={() => viewWorkout(workout._id)}>
                            <Card.Title className="lead fw-normal mb-2">
                              {workout.workoutName}
                            </Card.Title>
                          </div>
                          <div className="Clickable" onClick={() => viewWorkout(workout._id)}>
                          <Card.Text>
                            <span className="text-muted">
                              {workout.workoutDescription}
                            </span>
                          </Card.Text>
                          </div>
                        </Col>
                        <Col md={2} lg={2} xl={2} className="text-end">
                          <UpdateButton  variant="primary" id = {workout._id}/>
                        </Col>
                        <Col md={1} lg={1} xl={2} className="text-end">
                        <DeleteButton variant="danger" id = {workout._id}/>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )) : (
                  <p>Loading...</p>
                )}
            </div>

            <Card className="mb-4">
              <Card.Body className="p-4 d-flex flex-row">
                <div className="form-outline flex-fill">
                  <Card.Title as="h3">Want to create a new WorkoutPlan?</Card.Title>
                </div>
                <Button
                  variant="outline-success btn-lg ms-3"
                  onClick={createNewWorkoutPlan}
                >
                  Create Workout Plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    </div>
    </>
  );
}


