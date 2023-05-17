import style_AddDietPlan from "./style_AddDietPlan.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Delete, YouTube } from "@mui/icons-material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditDietPlan from '../EditDietPlan_folder/EditDietPlan';
import UserContext from '../ContextComponent/ContextComponent';




export default function AddDietPlan(){

  const [mealName, setMealname] = useState("");
  const [dayofMeal, setDayofmeal] = useState("");
  const [calin,SetCalin] = useState([]);
  const [goal,SetGoal] = useState([]);
  const [mealplan, setMealplan] = useState([]);
 

  const { user } = useContext(UserContext);
  const userID = user._id


  function sendData(e){
    e.preventDefault();

    const newDietplan = {
      mealName,
      userID,
      dayofMeal,
      goal,
      mealplan
    };

    if (!newDietplan.mealName || !newDietplan.dayofMeal) {
      alert("Please provide both meal name and day of the meal.");
    } else {
      axios.post("http://localhost:8070/dietplan/add", newDietplan)
        .then(() => {
          alert("Your Diet Plan Is Added");
          window.location.href = "/allDietPlans";
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  
  function addMeal(){
    setMealplan([...mealplan, {meal: "", size: "",calin: ""}]);
  }
  function removeMeal(index) {
    const updatedMealplan = [...mealplan];
    updatedMealplan.splice(index, 1);
    setMealplan(updatedMealplan);
  }

  function handleMealChange(index, value){
    const updatedMealplan = [...mealplan];
    updatedMealplan[index].meal = value;
    setMealplan(updatedMealplan);
  }
  const handleSizeChange = (index, value) => {
    // if (!isNaN(value)) {
    //    // Check if the value is a number
      const updatedMealplan = [...mealplan];
      updatedMealplan[index].size = value;
      setMealplan(updatedMealplan);
    // }
  };


  const handleCalinChange = (index, value) => {
    if (!isNaN(value)) { 
      // Check if the value is a number
      const updatedMealplan = [...mealplan];
      updatedMealplan[index].calin = value;
      setMealplan(updatedMealplan);
    }
  };
  

  return (
    <div className="NTcreate_box">
      <form onSubmit={sendData}>
        <div className="ntmb-3">
          <h1 className='NTtextheader'>Create Your Diet Plan</h1>
          <label htmlFor="mealName" className='NTtextheader'>Diet Plan Name</label>
          <input
            type="text"
            className="NTform-control"
            id="mealName"
            placeholder="Meal 1"
            onChange={(e) => {
              setMealname(e.target.value);
            }}
            required
          />
        </div>
        <div className="ntmb-3">
          <label htmlFor="dayofMeal" className='NTtextheader'>Meal Of The Day</label>
          <input
            type="text"
            className="NTform-control"
            id="dayofMeal"
            placeholder="Breakfast"
            onChange={(e) => {
              setDayofmeal(e.target.value);
            }}
            required
          />
        </div>
        <div className="ntmb-3">
          <label htmlFor="goal" className='NTtextheader'>Duration (Week)</label>
          <input
            type="text"
            className="NTform-control"
            id="goal"
            placeholder=""
            onChange={(e) => {
              SetGoal(e.target.value);
            }}
            required
          />
        </div>
        {mealplan.map((meal, index) => (
          <div className="input-group mb-3" key={index}>
            <label htmlFor="meal" className='NTtextheader'>Enter Meal: {index + 1}</label>
            <span className="input-group-text">
              <input
                type="text"
                className="NTform-control"
                placeholder="Rice"
                value={meal.meal}
                onChange={(e) => {
                  handleMealChange(index, e.target.value);
                }}
                required
              />
            </span>
            <label htmlFor="size" className='NTtextheader'>Size:</label>
            <span className="input-group-text">
              <input
                type="text"
                className="NTform-control"
                placeholder="4"
                value={meal.size}
                onChange={(e) => {
                  handleSizeChange(index, e.target.value);
                }}
                required
              />
            </span>
            <label htmlFor="calin" className='NTtextheader'>Calorie Amount (cal):</label>
            <span className="input-group-text">
              <input
                type="text"
                className="NTform-control"
                placeholder=""
                value={meal.calin}
                onChange={(e) => {
                  handleCalinChange(index, e.target.value);
                }}
              />
            </span>
          </div>
        ))}
        <div className="button-container">
          <div>
          <button type="button" className="NTmeal_remove" onClick={removeMeal}>Remove</button>

            <button type="button" className="NTbtn_Addmeal" onClick={addMeal}>Add Meal</button>
          </div>
          <div>
            <button type="submit" className="NTbtn_submit">Submit</button>
          </div>
        </div>
        <div className="nt1">
          <Link className="NT_linlall" to="/allDietPlans">See All Diet Plans Here!</Link>
        </div>
      </form>
    </div>
  );
}

 