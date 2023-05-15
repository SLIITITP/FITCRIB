const router = require("express").Router()
const Approve = require("../models/BlogApprove")

router.post("/",async(req,res)=>{
    const{heading,email,bApprove}= req.body
    const approveBlog = await Approve.create({
     heading,
     email,
     bApprove
    })
    res.json(approveBlog)
 
 })

 router.delete("/:heading",async(req,res)=>{

    const {heading} = req.params.heading

    const app = await Approve.findByIdAndDelete({'heading':heading})
   
})

 router.get("/",async(req,res)=>{
    
    try{
        const PendingBlogs = await Approve.find({})
        res.send(PendingBlogs)
       }
        catch(error){
                res.status(404).json(error)
            }
 })

 router.put("/:email",async(req,res)=>{

    const{heading,email,bApprove} = req.body

    const AppDoc = await Approve.find({'email':email})
    res.json({blogDoc})

    await AppDoc.updateOne({
        heading,
        email,
        bApprove
    })
})

 module.exports = router