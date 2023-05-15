import style_AddDietPlan from "./style_AddDietPlan.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditDietPlan from '../EditDietPlan_folder/EditDietPlan';



export default function AddDietPlan(){

  const [mealName, setMealname] = useState("");
  const [dayofMeal, setDayofmeal] = useState("");
  const [calin,SetCalin] = useState([]);
  const [goal,SetGoal] = useState([]);
  const [mealplan, setMealplan] = useState([]);
 

  const [dietplans, setDietplans] = useState(null);
  const [deleteId, setDeleteId] =useState("");

  function sendData(e){
    e.preventDefault();

    const newDietplan = {
      mealName,
      dayofMeal,
      goal,
      mealplan
    };

    axios.post("http://localhost:2080/dietplan/add",newDietplan).then(()=>{
      alert("Your Dirt Plan  Is Added")
      window.location.reload("http://localhost:2080/dietplan/");

    }).catch((err)=>{
      alert(err)
    });
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

  function handleSizeChange(index, value){
    const updatedMealplan = [...mealplan];
    updatedMealplan[index].size = value;
    setMealplan(updatedMealplan);
  }


  function handleCalinChange(index, value){
    const updatedMealplan = [...mealplan];
    updatedMealplan[index].calin = value;
    setMealplan(updatedMealplan);
  }

  

  return (
    
    <div className="create_box">
      <form onSubmit={sendData}>
        <div className="mb-3">
          <h1 className='textheader'>Create Your Diet Plan</h1>
          <label htmlFor="mealName" className='textheader' >Diet Plan Name</label>
          <input type="text" className="form-control_add" id="mealName" placeholder="Meal 1" onChange={(e)=>{
            setMealname(e.target.value);
          }} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="dayofMeal" className='textheader'>Meal Of The Day</label>
          <input type="text" className="form-control_add" id="dayofMeal" placeholder="Breakfast" onChange={(e)=>{
            setDayofmeal(e.target.value);
          }} required/>
        </div>


       


        <div className="mb-3">
          <label htmlFor="goal" className='textheader'>Duration (Week)</label>
          <input type="text" className="form-control_add" id="goal" placeholder="" onChange={(e)=>{
            SetGoal(e.target.value);
          }} required/>
        </div>


        {mealplan.map((meal, index) => (
          <div className="input-group mb-3" key={index}>
            <label htmlFor="meal" className='textheader'>Enter Meal: {index + 1}</label>
            <span className="input-group-text">
              <input type="text" className="form-control_add" placeholder="Rice" value={meal.meal} onChange={(e) => {
                handleMealChange(index, e.target.value);
              }} required/>
            </span>

            <label htmlFor="size" className='textheader'>Size:</label>
            <span className="input-group-text">
              <input type="text" className="form-control_add" placeholder="4" value={meal.size} onChange={(e) => {
                handleSizeChange(index, e.target.value);
              }} required/>
            </span>



            <label htmlFor="calin" className='textheader'>Calorie Amount (cal):</label>
            <span className="input-group-text">
              <input type="text" className="form-control_add" placeholder="" value={meal.calin} onChange={(e) => {
                handleCalinChange(index, e.target.value);
              }}/>
            </span>

         



          </div>
        ))}
        <div className="button-container"> 
        <button type="button" className="addmeal_btn" onClick={addMeal}>Add Meal</button>
        <button type="button" className="meal_remove" onClick={removeMeal}>Remove</button>


        <button type="submit" className="btn_submit">Submit</button>

        </div>
        
      </form>
      <Link to="/allDietPlans" className="homelink">See All Dietplan Here</Link>


    </div>
  );
}

 