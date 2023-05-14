const router = require("express").Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Workout = require("../models/workoutPlan.js")

// const picklejs = require('node-pickle');

// const logregModel = picklejs.load(fs.readFileSync('./ml_Model/logreg_model.pkl'));
// const logregTransformer = picklejs.load(fs.readFileSync('../ml_Model/logreg_transform.pkl'));



const {
    createWorkoutPlan,
    getWorkouts,
    singleWorkout,
    deleteWorkout
} = require('../controllers/workoutPlanController')

//Add an Workout to the DB
router.post("/addWorkout", createWorkoutPlan)

//Get all workouts
router.get('/getWorkouts/:userID', getWorkouts)
// router.route("/getWorkouts").get((req,res) => {

//     Workout.find().then((workouts) => {
//         res.json(workouts)
//     }).catch((err) => {
//         console.log(err)
//     })

// })

//Get a single WorkoutPlan
router.get('/:id', singleWorkout)
// router.route("/:id").get(function(req, res) {
//     console.log("Fetch Workouts of="+req.params.id);
//     var id = new mongoose.Types.ObjectId(req.params.id);
//     Workout.findById(id, function(err, workout) {
//           if (err)
//               res.send(err)
//           res.json(workout);
//       });
//   });

//Delete a workout
router.delete('/:id', deleteWorkout)

//Update a Workout
// router.patch('/:id', (req, res) => {
    
// })






router.put('/update/:id', async (req, res) => {
    const { workoutName, workoutDescription, workoutPlan, workoutDuration } = req.body;
    const { id } = req.params;
  
    try {
      const workout = await Workout.findById(id);
  
      if (!workout) {
        return res.status(404).json({ message: 'Workout plan not found' });
      }
  
      workout.workoutName = workoutName;
      workout.workoutDescription = workoutDescription;
      workout.workoutPlan = workoutPlan;
      workout.workoutDuration = workoutDuration
  
      const updatedWorkout = await workout.save();
      res.json(updatedWorkout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



  router.route("/search/:key").get(
    async (req, res) => {
      console.log(req.params.key)
        let result = await Workout.find({
            "$or": [
              { workoutName: { $regex: req.params.key, $options: "i" } },
                // {
                //     workoutDescription: { $regex: req.params.key }
                // },
                // {
                //     workoutPlan.exerciseName: { $regex: req.params.key }
                // }
            ]
        });
        res.json(result);
    })








module.exports = router;