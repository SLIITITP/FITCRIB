import style_AllDietPlan from './style_AllDietPlan.css'
// import './CSS/style_Footer.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, Typography, CardActions, Button, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import format from "date-fns/format";
import EditDietPlan from '../EditDietPlan_folder/EditDietPlan';
import { Edit } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar_folder/SearchBar ";
import jsPDF from "jspdf";








export default function AllDietPlans() {
  const [dietplans, setDietplans] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedDietplan, setSelectedDietplan] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedDietplan, setEditedDietplan] = useState(null);
  const [filteredDietplans, setFilteredDietplans] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);

  



  const handleEdit = (dietplan) => {
    setEditId(dietplan._id);
    setEditedDietplan(dietplan);
  };
  

  const handleDelete = (dietplanId) => {
    axios
      .delete(`http://localhost:2080/dietplan/delete/${dietplanId}`)
      .then(() => {
        window.confirm("Are You Sure To Delete The Diet Plan");
        window.location.reload("http://localhost:2080/dietplan/");
      })
      .catch((err) => {
        alert(err.message)
      });
  };

  const handleView = (dietplan) => {
    setSelectedDietplan(dietplan);
    setEditId(dietplan._id);
    setEditedDietplan(dietplan);
  };

  const handleSave = (dietplan) => {
    const updatedDietplan = { ...editedDietplan };
    axios
      .put(`http://localhost:2080/dietplan/update/${dietplan._id}`, updatedDietplan)
      .then(() => {
        setSelectedDietplan(updatedDietplan);
        window.location.reload("http://localhost:2080/dietplan");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleMealChange = (event, index) => {
    const updatedMeal = { ...editedDietplan.mealplan[index], meal: event.target.value };
    const updatedMealplan = [...editedDietplan.mealplan.slice(0, index), updatedMeal, ...editedDietplan.mealplan.slice(index + 1)];
    setEditedDietplan({ ...editedDietplan, mealplan: updatedMealplan });
  };

  const handleSizeChange = (event, index) => {
    const updatedMeal = { ...editedDietplan.mealplan[index], size: event.target.value };
    const updatedMealplan = [...editedDietplan.mealplan.slice(0, index), updatedMeal, ...editedDietplan.mealplan.slice(index + 1)];
    setEditedDietplan({ ...editedDietplan, mealplan: updatedMealplan });
  };
  
  useEffect(() => {
    function getDietplans() {
      axios
        .get("http://localhost:2080/dietplan/")
        .then((res) => {
          console.log(res.data);
          setDietplans(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDietplans();
  }, []);

  console.log(dietplans);

  
  const renderDietPlanCard = (dietplan) => {
    const handleGeneratePDF = () => {
      axios
        .get(`http://localhost:2080/dietplan/generate-pdf/${dietplan._id}`, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${dietplan.mealName}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    return (
      
     
      
      <Card className="containerdietplan">
     
    <CardContent>
      <Typography variant="h5" component="div">
        {dietplan.mealName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Created on:{" "}
          {format(new Date(dietplan.createdAt), "dd/MM/yyyy HH:mm:ss")}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'space-between' }}>
      <Button size="small"  color="primary"  class="btn btn-success" onClick={() => handleView(dietplan)}>View</Button>
  
          {editId === dietplan._id ? (
            <EditDietPlan
              dietplan={editedDietplan}
              onSave={(updatedDietplan) => handleSave(updatedDietplan)}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <>
             <IconButton size="small" onClick={() => handleEdit(dietplan)}>
  <Edit />
</IconButton>
              <IconButton edge="end" aria-label="delete"  class="btn btn-outline-danger" onClick={() => handleDelete(dietplan._id)}>
                <Delete />
              </IconButton>
              <Button size="small" color="success" onClick={handleGeneratePDF}>
          Generate Report
        </Button>
            </>
          )}
  
        </CardActions>
      </Card>
    
    )
  };


  return (
  <div className='AllDietPlansPageDiv'>
     <div>
      <SearchBar />
      
    </div>
    
      <div  className="viewplan" >  {selectedDietplan ? (
        <div><hr/>
          <h2 className='viewtext'>{selectedDietplan.mealName}</h2><hr></hr>
         
          <p  className='viewtext'><strong>Meal Of The Day:</strong> {selectedDietplan.dayofMeal}</p>
          <p className='viewtext'><strong>Calorie amount:</strong>{selectedDietplan.calin}cal</p>
          <p  className='viewtext'><strong>Meal plan:</strong> {selectedDietplan.mealplan.map(meal => (
            <p key={meal._id}>
              <span>{meal.meal}</span> - <span>{meal.size}</span>
            </p>
          ))}</p>
          <hr/>
          <Button variant="contained" class="btn-back" onClick={() => setSelectedDietplan(null)}>Back</Button>
          
          <Link to="/update/:id"></Link>

        </div>
      ) : (
        <List>
          {dietplans && dietplans.map((dietplan) => (
            <ListItem key={dietplan._id}>
              {renderDietPlanCard(dietplan)}
            </ListItem>
          ))}
        </List>
      )}
          </div>
     

        </div>

            
   

    
  );
  
}
