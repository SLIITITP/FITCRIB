const fs  = require('fs')
const router = require("express").Router()
const Post = require("../models/Blog")
const multer = require('multer')
const uploadMiddleware = multer({dest:'..images/'})

//create blog
router.post("/",uploadMiddleware.single('file'),async(req,res)=>{
    
   const {originalname,path} = req.file
   const changePath = path.replace(/\\/g, '/');
  const parts = originalname.split('.')
 
const ext =parts[parts.length - 1]
   const newPath = changePath +'.'+ ext
   fs.renameSync(path,newPath)

   /*const{token} = req.cookies
   jwt.verify(token,secret,{},async(err,info)=>{
    if(err) throw err })*/

    const{heading,username,email,content,category} = req.body
   const blogDoc = await Post.create({
    heading,
    username,
    content,
    email,
    category,
    image:newPath,
   })
   res.json({blogDoc})
  
})

//update blog
router.put("/:id",uploadMiddleware.single('file'),async(req,res)=>{

    const{id,heading,username,email,content,category} = req.body

    let newPath = null;
    if(req.file){
    const {originalname,path} = req.file
   const changePath = path.replace(/\\/g, '/');
  const parts = originalname.split('.')
   const ext =parts[parts.length - 1]
    newPath = changePath +'.'+ ext
   fs.renameSync(path,newPath)
    }

    const blogDoc = await Post.findById(id)
    res.json({blogDoc})

    await blogDoc.updateOne({
        heading,
        username,
        email,
        content,
        category,
        image: newPath ? newPath :blogDoc.image,
    })
})

//delete blog
router.delete("/:id",async(req,res)=>{

    const id = req.params.id;
    await Post.findByIdAndDelete(id)

        .then(() => {

            res.status(200).send({ status: "Blog deleted" });
        })
        .catch((err) => {


            console.log(err.message);

            res.status(500).send({ status: "Error deleting blog", error: err.message });

        });
})

//get blog
router.get("/:id",uploadMiddleware.single('file'),async(req,res)=>{
    const ID = req.params.id

  try{
      const Blog = await Post.findById(ID)
      res.send(Blog)
     }
      catch(error){
              res.status(404).json(error)
          }
  })

//get all blogs
router.get("/",async (req,res)=>{
  
  try{
    const allBlogs = await Post.find({})
    res.send(allBlogs)
   }
    catch(error){
            res.status(404).json(error)
        }
    
})

module.exports = router