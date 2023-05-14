const mongoose = require ("mongoose")

const ApproveBlogSchema = new mongoose.Schema({

    heading:{
        type:String,
        require:true,
        unique:true
    },
    email : {
        type: String,
        require:true,
        unique:true
    },
    bApprove:{
        type:Boolean,
        require:true,

    }
},
{
    timestamps:true,
})
module.exports = mongoose.model("Blog_Approve",ApproveBlogSchema)
