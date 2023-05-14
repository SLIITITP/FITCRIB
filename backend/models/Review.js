const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    BID:{
        type:String,
        require :true, 
    },
    comment:{
        type:String,
        require:false
    },
    stars:{
        type:Number,
        require:true
    }
    
},
{
    timestamps:true,
})

module.exports = mongoose.model("Review",ReviewSchema)