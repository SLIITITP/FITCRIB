import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AllRecipes.css';
import UserContext from '../ContextComponent/ContextComponent';

const AllRecipes = () => {
  const { user } = useContext(UserContext);
  const userID = user._id
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8070/recipe/${userID}`)
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRecipeAdd = (recipe) => {
    const newSelectedRecipes = [...selectedRecipes, recipe];
    setSelectedRecipes(newSelectedRecipes);
  };

  const handleRecipeRemove = (recipe) => {
    const newSelectedRecipes = selectedRecipes.filter((selectedRecipe) => selectedRecipe._id !== recipe._id);
    setSelectedRecipes(newSelectedRecipes);
  };

  const getTotalCalories = () => {
    let totalCalories = 0;
    selectedRecipes.forEach((recipe) => {
      totalCalories += parseInt(recipe.Calories);
    });
    return totalCalories;
  };

  const SearchHandleChange = (event) => {
    setSearchTerm(event.target.value);
    axios
      .get(`http://localhost:8070/recipe/search/${event.target.value}`)
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    const tableRows = [];

    const imageUrl = 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/new_york_chicken_and_67791_16x9.jpg'; // replace with your image URL
    doc.addImage(imageUrl, 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

    // Add title
    doc.setFontSize(20);
    doc.setTextColor('#000000');
    doc.text('All The Recipes That  Has Been Added To The System', 15, 20);

    // Create table header
    const tableHeader = [['Recipe Name', 'Ingredients', 'Steps', 'Calories']];

    // Add each recipe as a table row
    recipes.forEach((recipe) => {
      const rowData = [recipe.recipename, recipe.Ingredients.map((ingredient) => ingredient.ingredient).join(', '), recipe.steps, recipe.Calories];
      tableRows.push(rowData);
    });

    // Create table and add data
    doc.autoTable({
      startY: 30,
      head: tableHeader,
      body: tableRows,
      headStyles: {
        fillColor: "#00FF00"
      }
    });

    // Save file
    doc.save('AllRecipes.pdf');
  };

  return (
    <div className='AllRecipePage'>
      <div className="+">
        <div style={{ color: '#90EE90' }}>
          <center>
            <h2>All Recipes</h2>
          </center>
          <br />
        </div>
        <div className="create-recipe-button">
          <Link to="/addRecipe" className="btn btn-primary add">
            Create A Recipe
          </Link>
        </div>
        <form className="form-inline mb-4 d-flex">
          <input
            type="text"
            className="form-control mr-sm-2"
            placeholder="Search Recipe"
            value={searchTerm}
            onChange={SearchHandleChange}
          />
          <button type="submit" className="btn btn-primary search">
            Search
          </button>
        </form>
        <button onClick={handlePDFDownload} className="btn btn-danger redbutton">
          Generate a report
        </button>
        <button onClick={() => (window.location.href = '/RUVA')} className="btn btn-primary greenbutton">
          Registered User
        </button>
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card my-card ">
                <div className="card-body">
                  <h4 className="card-title ingredientcolor">{recipe.recipename}</h4>
                  <hr />
                  <div class="upload-image1 ml-4 mt-4 bg-slate-300">
                    <img
                      className='upload-image1'
                      src={recipe.image} alt="" />
                  </div>
                  <p className="card-text ingredientcolor"><strong>Ingredients:</strong></p>
                  <ul className="list-group list-group-flush">
                    {recipe.Ingredients.map((ingredient) => (
                      <li key={ingredient._id} className="list-group-item ingredientcolor">{ingredient.ingredient}</li>
                    ))}
                  </ul>
                  <p className="card-text ingredientcolor"><strong>Steps:</strong></p>
                  <p className="card-text ingredientcolor">{recipe.steps}</p>
                  <p className="card-text ingredientcolor"><strong>Calories:</strong> {recipe.Calories}</p>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-primary space">
                    View Recipe
                  </Link>
                  {selectedRecipes.some((selectedRecipe) => selectedRecipe._id === recipe._id) ? (
                    <button onClick={() => handleRecipeRemove(recipe)} className="btn btn-danger spacetwo">
                      Remove
                    </button>
                  ) : (
                    <button onClick={() => handleRecipeAdd(recipe)} className="btn btn-primary space">
                      Add To Plate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedRecipes.length > 0 && (
          <div className="card mt-4 my-cardaddtoplate">
            <div className="card-body">
              <u>
                <h2>Total Calories In The Selected Recipes:</h2>
              </u>
              <h4>
                <ul>
                  {selectedRecipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.recipename}</li>
                  ))}
                </ul>
              </h4>
              <h3>
                <p>Total Calories: {getTotalCalories()}</p>
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;