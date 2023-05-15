  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';

  const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      axios.get('http://localhost:8070/recipe/')
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

    return (
      <div className='RUpdate'>
      <div className="container">
          <div style={{color: "#90EE90"}}>
          <center><h2>All Recipes</h2></center>
          <br />
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
       
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card my-card">
                <div className="card-body">
                  <h4 className="card-title">{recipe.recipename}</h4>
                  <hr />
                  <div class="upload-image1 ml-4 mt-4 bg-slate-300">
                    <img 
                      className='upload-image1'
                      src={recipe.image} alt="" width="90%"/>
                  </div>
                  <p className="card-text"><strong>Ingredients:</strong></p>
                  <ul className="list-group list-group-flush">
                    {recipe.Ingredients.map((ingredient) => (
                      <li key={ingredient._id} className="list-group-item ingredientcolor">{ingredient.ingredient}</li>
                    ))}
                  </ul>
                  <p className="card-text"><strong>Steps:</strong></p>
                  <p className="card-text">{recipe.steps}</p>
                  <p className="card-text"><strong>Calories:</strong> {recipe.Calories}</p>
                  <Link to={`/RURD/recipe/${recipe._id}`} className="btn btn-primary space">
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
          <div className="card mt-4 my-card">
            <div className="card-body">
              <h5>Calories In Selected The Recipes:</h5>
              <h4><ul>
                {selectedRecipes.map((recipe) => (
                  <li key={recipe._id}>{recipe.recipename}</li>
                ))}
              </ul></h4>
              <h3><p>Total Calories: {getTotalCalories()}</p></h3>
            </div>
          </div>
        )}
      </div>
      </div>
    );
  };

  export default AllRecipes;