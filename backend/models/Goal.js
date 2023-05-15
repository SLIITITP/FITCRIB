const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const goalSchema = new Schema({
        //  fields...

  
    targetCal: {
      type: Number,
      required: true,
    },

    calin:{
      type: Number,
      required: true,
    },
    time:{
      type: Number,
      required: true,

      
    },

      //to Display create and update time
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    
  });


const Goal = mongoose.model("Goal",goalSchema);
module.exports = Goal;