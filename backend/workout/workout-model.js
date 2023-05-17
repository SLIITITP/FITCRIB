const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Exercise = new Schema(
  {
    workoutName: { type: String },
    mainBodyPart: { type: String },
    sideBodyParts: { type:Array , default:[] },
    likes: {type:Number},
    dislike:{type:Number},
    link: { type: String },
    description: { type: String },
    thumbnailImage: { type: String }, 
    cloudinary_id: { type: String }, 
    trainerName: { type: String },
    trainerId: { type: String },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

 module.exports = mongoose.model("exersise", Exercise);
