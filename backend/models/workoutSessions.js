const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  workoutId: {
    type: String,
    required: true,
  },
  workoutName: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  sessionNumber: {
    type: Number,
  },
  sessionComment: {
    type: String,
  },
  sentiment : {
    type: String
  },
  // createdAt : {
  //   type : Date,
  //   required : true,
  // }

});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
