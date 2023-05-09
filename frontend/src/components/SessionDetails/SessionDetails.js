import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function SessionDetails() {
  const [workout, setWorkout] = useState(null);
  const { id, sessionNumber, day } = useParams();
  const [session, setSession] = useState(null);

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
        .get(`http://localhost:8070/workoutSession/${id}/${sessionNumber}/${day}`)
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

  return (
    <>
      <div className="SessionDetails">
        {session ? (
          <Card>
            <Card.Header>Session Information</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Day: {day}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Sentiment: {session[0].sentiment}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Comment:</strong> {session.sessionComment}
              </Card.Text>
              <Card.Text>
                <strong>Session Number:</strong> {session.sessionNumber}
              </Card.Text>
              <Card.Text>
                <strong>Workout ID:</strong> {session.workoutId}
              </Card.Text>
              <Card.Text>
                <strong>Workout Name:</strong> {session.workoutName}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading session data...</p>
        )}
      </div>
    </>
  );
}
