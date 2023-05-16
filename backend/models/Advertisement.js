 const mongoose = require("mongoose");

 const Schema = mongoose.Schema;
         
 const adSchema = new Schema({

    userID : {
         type : String,
         required: true
    },
    name : {
         type : String,
         required: true
    },
    category : {
        type : String,
        required : true
    },

    // image : {
    //     type : String,
    //     required :true
    // },
    price : {
        type : Number,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
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

 })

 const Advertisement = mongoose.model("Advertisement",adSchema);
 

 module.exports = Advertisement;