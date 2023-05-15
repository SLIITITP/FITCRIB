    const mongoose = require('mongoose');

    const Schema = mongoose.Schema;

    const recipeSchema = new Schema({

          recipename : {
            type : String,
            required: true
          },
          Ingredients:[
            {


              ingredient:{
                type : String,
                required: true


              },
            },
        
          
          ],
            
          image:{
            type : String,
          },
          
          steps:{
            type : String,
            required: true
          },
          Calories:{
            type : Number,
            required: true}

    });

    const Recipe = mongoose.model("Recipe",recipeSchema);

    module.exports = Recipe;