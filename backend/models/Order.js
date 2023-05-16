const mongoose = require("mongoose");

const Schema = mongoose.Schema;
        
const orderSchema = new Schema({

     userID : {
        type : String,
        required : true
       
   },
   sellerID : {
        type : String,
        required : true
       
   },
   recipientname : {
        type : String,
        required : true
       
   },
   deliveryAddress : {
        type : String,
        required : true
   },
   name : {
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
   quantity : {
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

const Order = mongoose.model("Order",orderSchema);


module.exports = Order;