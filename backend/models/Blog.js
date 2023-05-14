const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    heading:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    content:{
        type:String,
        require :true, 
    },
    image:{
        type:String ,
        require: false,
    },
    category:{
        type:String,
        require :false, 
    },
},
{
    timestamps:true,
})
module.exports = mongoose.model("Blog",BlogSchema)