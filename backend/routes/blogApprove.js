const router = require("express").Router()
const Approve = require("../models/BlogApprove")
const fs  = require('fs')
const multer = require('multer')
const uploadMiddleware = multer({dest:'images/'})


router.post("/",uploadMiddleware.single('file'),async(req,res)=>{
    
        const {originalname,path} = req.file
        const changePath = path.replace(/\\/g, '/');
       const parts = originalname.split('.')
      
     const ext =parts[parts.length - 1]
        const newPath = changePath +'.'+ ext
        fs.renameSync(path,newPath)

         const{userId,heading,username,email,content,category} = req.body
        const blogDoc = await Approve.create({
          userId,
         heading,
         username,
         content,
         email,
         category,
         image:newPath,
        })
        res.json({blogDoc})
       
     })

 router.delete("/:id",async(req,res)=>{

    const ID = req.params.id

    const app = await Approve.findByIdAndDelete(ID)
    res.json("Approve Deleted")
   
})
//get all pending blogs
router.get("/",async (req,res)=>{
  
    try{
      const allBlogs = await Approve.find({})
      res.send(allBlogs)
     }
      catch(error){
              res.status(404).json(error)
          }
      
  })
  

 module.exports = router