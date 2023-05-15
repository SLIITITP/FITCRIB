import React, { useState,useContext } from 'react';
import axios from 'axios';
import './addrecipe.css';
import UserContext from '../ContextComponent/ContextComponent';

import { storage } from "../addrecipe/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const AddRecipe = () => {
  const { user } = useContext(UserContext);
  const userID = user._id
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredient: '' }]);
  const [image, setImage] = useState(null); // null instead of empty string
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');


  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredient = e.target.value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: '' }]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };

  const handleRecipeSubmit = (e) => {
    e.preventDefault();

    // upload image to Firebase Storage
    const storageRef = ref(storage, `images/${v4()}_${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
      // get public URL of uploaded image
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        const newRecipe = {
          userID: userID,
          recipename: recipeName,
          Ingredients: ingredients,
          image: downloadURL, // pass the public URL to MongoDB instead of the file object
          steps: steps,
          Calories: calories
        };

        axios.post('http://localhost:8070/recipe/add', newRecipe)
          .then(() => {
            alert('Recipe added successfully');
            setRecipeName('');
            setIngredients([{ ingredient: '' }]);
            setImage(null); // set image back to null after successful upload
            setSteps('');
            setCalories('');
            setPreviewUrl(null); // reset previewUrl after successful upload
          })
          .catch((err) => {
            alert(err);
          });
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    });
  };

  const [previewUrl, setPreviewUrl] = useState(null); // add state for preview URL

  return (
    <div className="addrecipe">
      <div className='background-Rcontainer'>
        <div className="Rcontainer">
          <div className="horizontal-barcreate"></div>
          <div className="card createcard">
            <div className="card-header ingredientcolor">
              <h2>Create A Recipe</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleRecipeSubmit}>
                {/* image preview */}
                {previewUrl && (
                  <div class="upload-image ml-4 bg-slate-300">
                    <img
                      className='upload-image'
                      src={previewUrl} alt=""
                    />
                  </div>
                )}
                {/* image input */}
                <input
                  className="bg-gray-50 border border-gray-300"
                  id="default_size"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  required
                />

                <div className="mb-3">
                  <label htmlFor="recipeName" className="form-label ingredientcolor">Recipe Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeName"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                  />
                </div>

                {ingredients.map((ingredient, index) => (
                  <div className="input-group mb-3" key={index}>
                    <label htmlFor="ingredient" className="form-label ingredientcolor">Ingredient {index + 1}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add an Ingredient"
                      value={ingredient.ingredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-primary greenbutton"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </button>

                <div className="mb-3">
                  <label htmlFor="steps" className="form-label ingredientcolor">Steps</label>
                  <textarea
                    className="form-control"
                    id="steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="calories" className="form-label ingredientcolor">Calories</label>
                  <input
                    type="number"
                    className="form-control"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary greenbutton">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
