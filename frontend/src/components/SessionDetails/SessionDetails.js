import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";


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

  const SessionPDF = () => (
    
    <Document>
    <Page className="DetailsPDF body">
      <h1 className="center">Workout Session Information</h1>
      <Text className="DetailsPDF h1">Workout Name: {session[0].workoutName}</Text>
      <Text className="DetailsPDF p">Day: {session[0].day + 1}</Text>
      <Text className="DetailsPDF p">Session Number: {session[0].sessionNumber}</Text>
      <Text className="DetailsPDF p">Comment: {session[0].sessionComment}</Text>
      <Text className="DetailsPDF p">
        Date of the Session: {moment(session[0].date).format("YYYY-MM-DD")}
      </Text>
    </Page>
  </Document>
    
  );

  return (
    <>
      <div className="SessionDetails">
        {session ? (
          <Card>
            <Card.Header><h1>Session Information</h1></Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Workout Name:</strong> {session[0].workoutName}
              </Card.Text>
              <Card.Text>
                <strong>Day: {session[0].day + 1}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Session Number:</strong> {session[0].sessionNumber}
              </Card.Text>
              <Card.Text>
                <strong>Comment:</strong> {session[0].sessionComment}
              </Card.Text>
              <Card.Text>
                <strong>
                  Date of the Session:{" "}
                  {moment(session[0].date).format("YYYY-MM-DD")}
                </strong>
              </Card.Text>
              <Button variant="primary">
                <PDFDownloadLink document={<SessionPDF />} fileName="session.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? "Generating PDF..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading session data...</p>
        )}
      </div>
    </>
  );
}