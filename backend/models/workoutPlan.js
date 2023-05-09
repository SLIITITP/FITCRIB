const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  exerciseReps: {
    type: Number,
    required: true
  },
  setsPerRep: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const workoutSchema = new mongoose.Schema({

  workoutName: {
    type: String,
    required: true
  },
  workoutDescription: {
    type: String,
  },
  workoutDuration : {
    type: String,
  },
  workoutPlan: {
    type: [[exerciseSchema]],
    required: true
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

