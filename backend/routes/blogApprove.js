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

 router.delete("/:email",async(req,res)=>{

    const {heading} = req.body
    const email = req.params.email;

    const app = await Approve.find({'email':email})
    await app.updateOne({
        heading,
        
    })

        .then(() => {
           
            res.status(200).send({ status: "Approved" });
        })
        .catch((err) => {

            console.log(err.message);

            res.status(500).send({ status: "Error Approve Blog", error: err.message });

        });
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