const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    heading:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
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