const path = require("path");
const express = require("express"); 
const Workout = require("./workout-model"); 
const Router = express.Router();
const {uploadToCloudinary,removeFromCloudinary}  = require('./cloudanary')
const upload = require('./upload')

/**
 * Add workout details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/addWorkout",upload.single('thumbnailImage'), async (req, res) => {
    try {
      console.log(req.file.path)
      const data = await uploadToCloudinary(req.file.path,"thumbnailImage");
      
      const workout = new Workout({
        "workoutName":req.body.workoutName,
        "mainBodyPart":req.body.mainBodyPart,
        "sideBodyParts":req.body.sideBodyParts,
        "likes":[],
        "dislike":[],
        "link":req.body.link,
        "description":req.body.description,
        "trainerName":req.body.trainerName,
        "trainerId":req.body.trainerId,
        "approved":req.body.approved, 
        "thumbnailImage":data.url ,
        "cloudinary_id": data.public_id,
      });
      console.log(workout);
      await workout.save();
      res.send("successfully new workout added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading workout details. Try again later. " + error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
 
/**
 * update workout details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/editWorkout/:id",upload.single('thumbnailImage'), async (req, res) => {
  try {
    const data = await uploadToCloudinary(req.file.path,"thumbnailImage");
      
    console.log(req.body._id)
    const workoutData = {
      "workoutName":req.body.workoutName,
      "mainBodyPart":req.body.mainBodyPart,
      "sideBodyParts":req.body.sideBodyParts,
      "link":req.body.link,
      "description":req.body.description,
      "trainerName":req.body.trainerName,
      "trainerId":req.body.trainerId,
      "approved":req.body.approved, 
      "thumbnailImage":data.url ,
      "cloudinary_id": data.public_id,
    };
    console.log(workoutData)
    let workout = await Workout.findByIdAndUpdate(req.body._id, workoutData, { new: true });
    res.json(workout);
    console.log(workout)
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

Router.put("/addLike/:id", async (req, res) => {
  try { 

    const data = new Workout({
      "workoutName":req.body.workoutName,
      "mainBodyPart":req.body.mainBodyPart,
      "sideBodyParts":req.body.sideBodyParts,
      "likes":req.body.likes,
      "dislike":req.body.dislike,
      "link":req.body.link,
      "description":req.body.description,
      "trainerName":req.body.trainerName,
      "trainerId":req.body.trainerId,
      "approved":req.body.approved, 
      "thumbnailImage":req.body.thumbnailImage ,
      "cloudinary_id": req.body.cloudinary_id,
    });
    console.log(data)
    let workout = await Workout.findByIdAndUpdate(req.body._id, data, { new: true });
    res.json(workout);
    console.log(workout)
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete workout details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteWorkout/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const workout  = await Workout.findOne({_id:req.params.id})
    const publicId = workout.cloudinary_id
    await removeFromCloudinary(publicId)

    const removed = await Workout.deleteOne({ _id: req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


Router.get("/getWorkout/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const workout = await Workout.find({ "_id":id });
    res.send(workout);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting workout details. Try again later." + error);
  }
}); 

Router.get("/getAllWorkouts", async (req, res) => {
  try {
    const workout = await Workout.find({});
    const sortedByCreationDate = workout.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of workout. Try again later." + error);
  }
});


module.exports = Router;
