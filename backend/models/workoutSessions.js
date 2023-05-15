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
  date: {
    type: Date,
    default: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
