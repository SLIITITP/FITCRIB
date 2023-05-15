import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

export default function EditDietPlan({ dietplan, onSave, onCancel }) {
  const [mealplan, setMealplan] = useState(dietplan.mealplan);
  const [calin, setCalin] = useState(dietplan.calin);
  const [goal, setGoal] = useState(dietplan.goal);
  const [selectedDietplan, setSelectedDietplan] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedDietplan, setEditedDietplan] = useState(null);
  const [dietplans, setDietplans] = useState([]);

  const handleMealChange = (event, index) => {
    const updatedMeal = { ...mealplan[index], meal: event.target.value };
    const updatedMealplan = [...mealplan.slice(0, index), updatedMeal, ...mealplan.slice(index + 1)];
    setMealplan(updatedMealplan);
  };

  const handleSizeChange = (event, index) => {
    const updatedMeal = { ...mealplan[index], size: event.target.value };
    const updatedMealplan = [...mealplan.slice(0, index), updatedMeal, ...mealplan.slice(index + 1)];
    setMealplan(updatedMealplan);
  };

  const handleCalinChange = (event) => {
    setCalin(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleSave = () => {
    const updatedDietplan = { ...dietplan };
    updatedDietplan.mealplan = mealplan;
    axios
      .put(`http://localhost:8070/dietplan/update/${dietplan._id}`, updatedDietplan)
      .then(() => {
        // Update the dietplans state with the updated diet plan
        setDietplans(prevState => prevState.map((dp) => dp._id === updatedDietplan._id ? updatedDietplan : dp));
        setSelectedDietplan(updatedDietplan);
        setEditId(updatedDietplan._id);
        setEditedDietplan(updatedDietplan);
        alert("Updated Your Diet Plan")
        window.location.reload(`http://localhost:8070/dietplan/get/${dietplan._id}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
    <h2>Edit Goal</h2>

    <TextField label="Calories" value={calin} onChange={handleCalinChange} />
    <TextField label="Goal" value={goal} onChange={handleGoalChange} />

    {mealplan.map((meal, index) => (
      <div key={index}>
        <TextField label="Meal" value={meal.meal} onChange={(event) => handleMealChange(event, index)} />
          <TextField label="Size" value={meal.size} onChange={(event) => handleSizeChange(event, index)} />
        </div>
      ))}

      <Button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true" onClick={handleSave}>Save</Button>
      <Button variant="contained" onClick={onCancel}>Cancel</Button>
    </div>
  );
}
