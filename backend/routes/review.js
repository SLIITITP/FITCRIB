const router = require("express").Router()
const Review = require("../models/Review")

//create blog
router.post("/",async(req,res)=>{
   const{BID,comment,stars}= req.body
   const reviewBlog = await Review.create({
    BID,
    comment,
    stars
   })
   res.json(reviewBlog)

})
//get reviews for BID
router.get("/:BID",async(req,res)=>{
    const ID = req.params.BID
    const review   = await Review.find({'BID':ID})
  try{
      res.send(review)
     }
      catch(error){
              res.status(404).json(error)
          }
  })

//get all Reviews
router.get("/",async(req,res)=>{
    try{
        const allReviews = await Review.find({})
        res.send(allReviews)
       }
        catch(error){
                res.status(404).json(error)
            } 
})

module.exports = router