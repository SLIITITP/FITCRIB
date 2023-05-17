import style_AllDietPlan from './style_AllDietPlan.css'
// import './CSS/style_Footer.css';
import React, { useState, useEffect, useContext } from "react";
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

import UserContext from '../ContextComponent/ContextComponent';




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

  const { user } = useContext(UserContext);
  const userID = user._id


  



  const handleEdit = (dietplan) => {
    setEditId(dietplan._id);
    setEditedDietplan(dietplan);
  };
  

  const handleDelete = (dietplanId) => {
    axios
      .delete(`http://localhost:8070/dietplan/delete/${dietplanId}`)
      .then(() => {
        window.alert("Dietplan Deleted")
        window.location.reload("http://localhost:8070/dietplan/");
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
      .put(`http://localhost:8070/dietplan/update/${dietplan._id}`, updatedDietplan)
      .then(() => {
        setSelectedDietplan(updatedDietplan);
        window.location.reload("http://localhost:8070/dietplan");
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
        .get(`http://localhost:8070/dietplan/${userID}`)
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
  //   const handleGeneratePDF = () => {
  //     axios
  //       .get(`http://localhost:8070/dietplan/generate-pdf/${dietplan._id}`, {
  //         responseType: "blob",
  //       })
  //       .then((res) => {
  //         const url = window.URL.createObjectURL(new Blob([res.data]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", `${dietplan.mealName}.pdf`);
  //         document.body.appendChild(link);
  //         link.click();
  //         link.parentNode.removeChild(link);
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //   };
  
    return (
      
     
      
      <Card className="NT_containerdietplan">
     
    <CardContent className='NT_VView'>
      <Typography variant="h5" component="div">
        {dietplan.mealName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Created on:{" "}
          {format(new Date(dietplan.createdAt), "dd/MM/yyyy HH:mm:ss")}
      </Typography>
    </CardContent>
    <CardActions className='NTaction' sx={{ justifyContent: 'space-between' }}>
      <button  className="NT_btnViewone" onClick={() => handleView(dietplan)}>View</button>
  
          {editId === dietplan._id ? (
            <EditDietPlan
              dietplan={editedDietplan}
              onSave={(updatedDietplan) => handleSave(updatedDietplan)}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <>
             <button className='NT_Itemupdate' onClick={() => handleEdit(dietplan)}>update</button>
             <button type="button" class="NT_allbtnDt" onClick={() => handleDelete(dietplan._id)}>Delete </button>
              {/* <Button size="small" color="success" onClick={handleGeneratePDF}>
          Generate Report
        </Button> */}
            </>
          )}
  
        </CardActions>
      </Card>
    
    )
  };


  return (
  <div className='AllDietPlansPageDiv'>
     {/* <div className='NT_Seachbar'>
      <SearchBar /></div> */}
      
     <SearchBar />
    
      <div  className="NT_viewplan" >  {selectedDietplan ? (
        <div className='NT_box'><hr/>
          <h2 className='NT_viewtext'>{selectedDietplan.mealName}</h2><hr></hr>
         
          <h4  className='NT_viewtext'><strong>Meal Of The Day:</strong> {selectedDietplan.dayofMeal}</h4>
          <h4 className='NT_viewtext'><strong>Calorie amount:</strong>{selectedDietplan.calin}cal</h4>
          <h5  className='NT_viewtext'><strong>Meal plan:</strong> {selectedDietplan.mealplan.map(meal => (
            <p className='NT_viewtext' key={meal._id}>
              <span>{meal.meal}</span> - <span>{meal.size}</span>
            </p>
          ))}</h5>
          <hr/>
          <Button variant="contained" class="NT_btn-back" onClick={() => setSelectedDietplan(null)}>Back</Button>
          
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
  