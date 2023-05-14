const Workout = require("../models/workoutPlan.js")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Create a New Workout plan
const createWorkoutPlan = async (req, res) => {
  const newWorkout = new Workout(req.body);

  newWorkout
    .save()
    .then(() => {
      res.json("Workout Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get all workout plans
// const getWorkouts = async (req, res) => {
//     try {
//         const workouts = await Workout.find({});
//         res.status(200).json(workouts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({error: "Server error"});
//     }
// }

// const getWorkouts= (req, res) => {
    

//         Workout.find().then((workouts) => {
//             res.json(workouts)
//         }).catch((err) => {
//             console.log(err)
//         })
    
    
   
// }

const getWorkouts= (req, res) => {
  const userID = req.params.userID;

  Workout.find({userID : userID}).then((workouts) => {
      res.json(workouts)
  }).catch((err) => {
      console.log(err)
  })



}



const singleWorkout = (req, res) => {
    const workoutId = req.params.id;
  
    Workout.findById(workoutId)
      .then((workout) => {
        if (!workout) {
          return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting workout", message: err.message });
      });
  };
  



//Delete a workout plan
//Delete a single workout plan
const deleteWorkout = async(req, res) => {
    const workoutId = req.params.id;
  
    await Workout.findByIdAndDelete(workoutId)
      .then(() => {
        res.status(200).send({status: "Workout deleted"});
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error deleting workout", error: err.message});
      });
  };
  
  

//Update a workout plan


module.exports = {
    createWorkoutPlan,
    getWorkouts,
    singleWorkout,
    deleteWorkout
}