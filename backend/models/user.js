const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   Fullname : {
    type : String,
    required : true
   },
   Email : {
      type : String,
      required : true
   },
   Address : {
      type : String,
      required : true
   },
   TelephoneNumber : {
      type : Number,
      required : true
   },
   UserType : {
    type : String,
    required : true
   },
   Gender : {
    type : String,
    required : true
   },
   Username : {
      type : String,
      required : true
   },
   Password : {
      type : String,
      required : true
   }

})

const User = mongoose.model("user",userSchema);
module.exports = User;