const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dietSchema = new Schema({
  // fields...
  mealName: {
    type: String,
    required: true,
  },
  dayofMeal: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  // Implement an Array for mealplan
  mealplan: [
    {
      meal: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      
      },
    },
  ],
  // to Display create and update time
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Dietplan = mongoose.model("Dietplan", dietSchema);
module.exports = Dietplan;
