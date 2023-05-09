import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function DeleteButton(props) {
  const navigate = new useNavigate();
  const [updateId, setUpdateId] = useState("");

  const updateWokorkout = (workoutId) => {
    let path = `/UpdateWorkout/${workoutId}`;
    navigate(path);
  };


  return (
    <>
      <Button
                      variant = "success"
                      onClick={() => updateWokorkout(props.id)}
                    >
                      Update Plan
                    </Button>
    </>
  );
}
