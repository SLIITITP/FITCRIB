import style_ViewGoal from './style_ViewGoal.css'
import React, { useState, useEffect,useContext } from "react";
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
import UserContext from '../ContextComponent/ContextComponent';







export default function ViewGoal() {
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [targetCal, setTargetCal] = useState("");
  const [calin, setCalin] = useState("");
  const [time, setTime] = useState("");

   const { user } = useContext(UserContext);
  const userID = user._id


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
      .delete(`http://localhost:8070/goal/delete/${goalId}`)
      .then(() => {
        alert("Your Goal Is Deleted");
        window.location.reload("http://localhost:8070/goal/");
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
      .put(`http://localhost:8070/goal/update/${selectedGoal._id}`, updatedGoal)
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
        .get(`http://localhost:8070/goal/${userID}`)
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
//
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Nutrition Goal Report", 80, 20);
    let y = 40;
  
    goals.forEach((goal) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold"); 
      doc.text(`Target Calories: ${goal.targetCal} cal`, 80, y);
  
      doc.setFont("helvetica", "normal"); 
      doc.text(`Calories In: ${goal.calin} cal`, 80, y + 10);
      doc.text(`During: ${goal.time} Week`, 80, y + 20);
      doc.text(`Created At: ${format(new Date(goal.createdAt), "dd/MM/yyyy")}`, 80, y + 30);
  
      doc.setDrawColor(0); 
      doc.setLineWidth(0.5); 
  
      doc.rect(70, y - 5, 80, 40, "S");
  
      y += 50;
    });
  
    // Add watermark text
    const watermarkText = "FITCRIB";
    const textWidth = doc.getStringUnitWidth(watermarkText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textHeight = doc.internal.getFontSize();
    const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    const watermarkY = doc.internal.pageSize.getHeight() - textHeight - 10;
    doc.setTextColor(200);
    doc.setFontSize(48);
    doc.text(watermarkText, x, watermarkY);
  
    doc.save('nutrition_report.pdf');
  }
  
  


  return (
    <div className="NT_d1">
      
      <CardContent>
        {goals.map((goal) => (
          <ListItem key={goal._id}>

                <p className="NT_goaltxtview">Target Calories: {goal.targetCal} | Created At: {format(
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
  
      <Card className='NTview' open={open} onClose={handleClose}>
  <CardContent className="NT_d1">
    {editMode && (
      <div className="NT_popup">
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
          <Link to="/goalSetting/">
        <button type="button" class="btn btn-success">
          Back
        </button>
      </Link>

      </div>

        </div>
      </div>
      
    )}
    
  </CardContent>
  <CardActions className="NT_d1">
    {editMode ? (
      <div> </div>
    ) : (
      <Link to="/goalSetting/">
        <button type="button" class="btn btn-success">
          Back
        </button>
      </Link>
      
    )}
          <button type="button" class="NT-report" onClick={generatePDF}>Generate Report</button>

  </CardActions>
</Card>
    </div>
  );
          }
