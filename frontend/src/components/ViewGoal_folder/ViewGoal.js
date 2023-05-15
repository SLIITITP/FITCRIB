import style_ViewGoal from './style_ViewGoal.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';






export default function ViewGoal() {
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [targetCal, setTargetCal] = useState("");
  const [calin, setCalin] = useState("");
  const [time, setTime] = useState("");

  //Analysis nutrition goal with bar chart
  const chartData = {
    labels: ['Target Calories', 'Calories In'],
    datasets: [
      {
        label: 'Target Calories',
        data: [selectedGoal?.targetCal, selectedGoal?.calin],
        backgroundColor: ['#d0ff00', '#4f820d'],
        hoverBackgroundColor: ['#f7aa0f', '#f7aa0f'],
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  //Delete nutrition goal
  const handleDelete = (goalId) => {
    axios
      .delete(`http://localhost:2080/goal/delete/${goalId}`)
      .then(() => {
        alert("Your Goal Is Deleted");
        window.location.reload("http://localhost:2080/goal/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  //Open nutrition goal
  const handleView = (goal) => {
    setSelectedGoal(goal);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedGoal(null);
    setOpen(false);
  };
//Display graph 
  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setEditMode(true);
    setTargetCal(goal.targetCal);
    setCalin(goal.calin);
    setTime(goal.time);
  };

  //Get user input
  const handleUpdate = () => {
    const updatedGoal = {
      targetCal,
      calin,
      time,
    };
    
    if(targetCal <=calin){
      axios
      .put(`http://localhost:2080/goal/update/${selectedGoal._id}`, updatedGoal)
      .then(() => {
        alert("Congratulations!");
        window.location.reload("");
      })
      .catch((err) => {
        alert(err.message);
        window.location.reload("");
      });
      
     
    } else {
      alert("Error:You are not able to Collect Reward!")
    }
  };

  //Loading User Reward
let imgSrc;
if(targetCal <=calin){
  imgSrc = require('./img/goal.png');
}


  useEffect(() => {
    function getGoals() {
      axios
        .get("http://localhost:2080/goal/")
        .then((res) => {
          console.log(res.data);
          setGoals(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getGoals();
  }, []);

 //Goal Report
const generatePDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Nutrition Goal Report", 55, 13);
  let y = 20;

  goals.forEach((goal) => {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold"); 
    doc.text(`Target Calories: ${goal.targetCal} cal`, 20, y + 15);

    doc.setFont("helvetica", "normal"); 
    doc.text(`Calories In: ${goal.calin} cal`, 20, y + 25);
    doc.text(`During: ${goal.time} Week`, 20, y + 35);
    doc.text(`Created At: ${format(new Date(goal.createdAt), "dd/MM/yyyy")}`, 20, y + 45);

    doc.setDrawColor(0); 
    doc.setLineWidth(0.5); 

  
    doc.rect(8, y + 8, 80, 55, "S");

    y += 80;
  });

  doc.save('my_report.pdf');
}



  return (
    <div className="d1">
      
      <CardContent>
        {goals.map((goal) => (
          <ListItem key={goal._id}>

                <p className="txtview">Target Calories: {goal.targetCal} | Created At: {format(
                new Date(goal.createdAt),
                "dd/MM/yyyy"
              )}</p>
            <ListItemText className="text_header"
          
              primary={goal.name}
          
              
              onClick={() => handleView(goal)}
            />
           
            <ListItemSecondaryAction>
             <button type="button" class="btn btn-info" onClick={() => handleEdit(goal)}>
              Reward
              </button>
              <IconButton edge="end" aria-label="delete"  class="btn btn-outline-danger" onClick={() => handleDelete(goal._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </CardContent>
  
      <Card className='view' open={open} onClose={handleClose}>
  <CardContent className="d1">
    {editMode && (
      <div className="popup">
        <h3 className="center">Target = {targetCal} cal in {time} Week</h3>
        <div className="popup-content">
          <TextField disabled className="text_header" label="Time" variant="outlined" margin="normal" fullWidth value={time} onChange={(e) => setTime(e.target.value)} />
          <TextField disabled label="Target Calories" variant="outlined" margin="normal" fullWidth value={targetCal} onChange={(e) => setTargetCal(e.target.value)} />
          <TextField label="Calories In" variant="outlined" margin="normal" fullWidth value={calin} onChange={(e) => setCalin(e.target.value)} />
          <div class="cardpie" style={{ width: "400px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="img-container">
            <img src={imgSrc} alt="" />
          </div>
          <div>
        <Button type="button" class="btn btn-warning" onClick={handleUpdate}>
          collect
        </Button>
          <Link to="/goalset/">
        <button type="button" class="btn btn-success">
          Back
        </button>
      </Link>

      </div>

        </div>
      </div>
      
    )}
    
  </CardContent>
  <CardActions className="d1">
    {editMode ? (
      <div> </div>
    ) : (
      <Link to="/goalset/">
        <button type="button" class="btn btn-success">
          Back
        </button>
      </Link>
      
    )}
          <button type="button" class="btn btn-report" onClick={generatePDF}>Generate Report</button>

  </CardActions>
</Card>
    </div>
  );
          }
