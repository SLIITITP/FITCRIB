
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateRecipe.css';

import { storage } from "../addrecipe/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


const UpdateRecipe = () => {
  const [recipe, setRecipe] = useState({
    recipename: '',
    ingredients: [],
    image: '',
    steps: '',
    calories: 0
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8070/recipe/get/${id}`)
      .then((response) => {
        console.log(response.data);
        const { recipe } = response.data;
        setRecipe({
          recipename: recipe.recipename,
          ingredients: recipe.Ingredients.map((ingredient) => ingredient.ingredient),
          image: recipe.image,
          steps: recipe.steps,
          calories: recipe.Calories
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${v4()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setRecipe(prevState => ({
          ...prevState,
          image: url
        }));
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      recipename: recipe.recipename,
      Ingredients: recipe.ingredients.map((ingredient) => ({ ingredient })),
      image: recipe.image,
      steps: recipe.steps,
      Calories: recipe.calories
    };

    axios.put(`http://localhost:8070/recipe/update/${id}`, updatedRecipe)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/AllRecipes";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddIngredient = () => {
    setRecipe(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, ""]
    }));
  };

  const handleRemoveIngredient = (index) => {
    setRecipe(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients.slice(0, index), ...prevState.ingredients.slice(index + 1)]
    }));
  };

  const handleIngredientChange = (e, index) => {
    const value = e.target.value;
    setRecipe(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients.slice(0, index), value, ...prevState.ingredients.slice(index + 1)]
    }));
  };

  return (
    <div className='RUpdate'>
    <div className="card updatecard">
      <div className="card-header">
        <h2>Update Recipe</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div class="upload-image ml-4 mt-4 bg-slate-300">
              <img 
                className='upload-image'
                src={recipe.image} alt=""/>
            </div>
            <div className='mb-2'>
              <input
                className="bg-gray-50 border border-gray-300 mt-2"
                id="default_size"
                type="file"
                name="image"
                onChange={handleImageChange}
                // required
              />
            </div>
            <label htmlFor="recipename">Recipe Name</label>
            <input type="text" className="form-control" id="recipename" name="recipename" value={recipe.recipename} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="d-flex mb-2">
                <input type="text" className="form-control" id={`ingredient-${index}`} name={`ingredient-${index}`} value={ingredient} onChange={(e) => handleIngredientChange(e, index)} required />
                <button type="button" className="btn btn-danger ml-2 spacetwo" onClick={() => handleRemoveIngredient(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary mb-2 greenbutton" onClick={handleAddIngredient}>Add Ingredient</button>
          </div>
          <div className="form-group">
            <label htmlFor="steps">Steps</label>
            <textarea className="form-control" id="steps" name="steps" value={recipe.steps} onChange={handleInputChange} rows="5" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input type="number" className="form-control" id="calories" name="calories" value={recipe.calories} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary mt-4 greenbutton">Update Recipe</button>
        </form>
      </div>
    </div>
    </div>
  );
};

  export default UpdateRecipe;