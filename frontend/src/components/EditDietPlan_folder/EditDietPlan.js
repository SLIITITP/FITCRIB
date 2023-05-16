import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import style_EditDietPlan from './style_EditDietPlan.css';


export default function EditDietPlan({ dietplan, onSave, onCancel }) {
  const [mealplan, setMealplan] = useState(dietplan.mealplan);
  const [selectedDietplan, setSelectedDietplan] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedDietplan, setEditedDietplan] = useState(null);
  const [dietplans, setDietplans] = useState([]);

  const [editedMealName, setEditedMealName] = useState(dietplan.mealName);
const [editedDayOfMeal, setEditedDayOfMeal] = useState(dietplan.dayofMeal);

const handleMealNameChange = (event) => {
  setEditedMealName(event.target.value);
};

const handleDayOfMealChange = (event) => {
  setEditedDayOfMeal(event.target.value);
};



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

  const handleAddMeal = () => {
    setMealplan([...mealplan, { meal: "", size: "" }]);
  };

  const handleRemoveMeal = (index) => {
    const updatedMealplan = [...mealplan.slice(0, index), ...mealplan.slice(index + 1)];
    setMealplan(updatedMealplan);
  };

  const handleSave = () => {
    const updatedDietplan = { ...dietplan };
    updatedDietplan.mealplan = mealplan;
    updatedDietplan.mealName = editedMealName;
    updatedDietplan.dayofMeal = editedDayOfMeal;
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
    <h2>Edit Diet Plan</h2>
    
    <TextField label="Meal Name" value={editedMealName} onChange={handleMealNameChange} />
  <TextField label="Day of Meal" value={editedDayOfMeal} onChange={handleDayOfMealChange} />

  {mealplan.map((meal, index) => (
    <div key={index}>
      <TextField
        label="Meal"
        value={meal.meal}
        onChange={(event) => handleMealChange(event, index)}
      />
      <TextField
        label="Size"
        value={meal.size}
        onChange={(event) => handleSizeChange(event, index)}
      />
      <Button type="button" class="NT_btnViewoneAddEdit" onClick={handleAddMeal}>
        Add
      </Button>

      <Button type="button" class="NT_allbtnDtEdit" onClick={() => handleRemoveMeal(index)}>
        Remove
      </Button>
    </div>
  ))}

  <Button type="button" class="NT_ItemupdateEdit" data-bs-toggle="button" aria-pressed="true" onClick={handleSave}>
    Update
  </Button>
  <Button class="NT_ItemupdateEditCalcel" variant="contained" onClick={onCancel}>
    Cancel
  </Button>
</div>

  );
}
