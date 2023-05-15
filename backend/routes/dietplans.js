const router = require("express").Router();
const { request, response } = require("express");
let Dietplan = require("../models/dietplan");
const PDFDocument = require("pdfkit");





// Route for generating PDF document
router.route("/generate-pdf/:id").get(async (request, response) => {
    try {
      const dietplanId = request.params.id;
      console.log("dietplanId:", dietplanId);
  
      const dietplan = await Dietplan.findById(dietplanId);
      console.log("dietplan:", dietplan);
  
      if (!dietplan) {
        throw new Error("Diet plan not found");
      }
  
      // Create new PDF document
      const doc = new PDFDocument();
      
      // Set response headers
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader(
        "Content-Disposition",
        `attachment; filename=${dietplan.mealName}.pdf`
      );
      
      // Write content to PDF document
      doc.pipe(response);
      doc.fontSize(16).text(`Meal Name: ${dietplan.mealName}`);
      doc.fontSize(16).text(`Day of Meal: ${dietplan.dayofMeal}`);
      doc.fontSize(16).text(`Goal: ${dietplan.goal}`);
      doc.fontSize(16).text(`Meal Plan: ${dietplan.mealplan}`);
      doc.end();
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Error generating PDF document" });
    }
  });
// Route for adding new diet plan
router.route("/add").post((request,response)=>{
  const mealName = request.body.mealName;
  const dayofMeal = request.body.dayofMeal;
  const goal = request.body.goal;
  const mealplan = request.body.mealplan;

  const newDietplan = new Dietplan({
    mealName,
    dayofMeal,
    goal,
    mealplan
  });

  newDietplan.save().then(() => {
    response.json("Diet Plan Added");
  }).catch((err) => {
    console.log(err);
  });
});

// Route for getting all diet plans
router.route("/").get((request,response)=>{
  Dietplan.find().then((dietplans)=>{
    response.json(dietplans);
  }).catch((err)=>{
    console.log(err);
  });
});


http://localhost:2080/dietplan/update/
router.route("/update/:id").put(async(request,response)=>{
    let dietplanId = request.params.id;
    const {mealName, dayofMeal,goal,mealplan} = request.body;

    const updateDietplan = {
        mealName,
        dayofMeal,
         goal,
        mealplan
       
        
    }
    const update = await Dietplan.findByIdAndUpdate(dietplanId, updateDietplan)
    .then(()=>{
        response.status(200).send({status: "Diet plan updated"})

    }).catch((err)=>{
        console.log(err);
        response.status(500).send({status: "Error with Diet plan updating",error:err.message});

    })
})
http://localhost:2080/dietplan/delete/

router.route("/delete/:id").delete(async (request,response)=>{
    let dietplanId = request.params.id;
    await Dietplan.findByIdAndDelete(dietplanId)
    .then(()=> {
    response.status(200).send({status : "User deleted"});
    }).catch((err)=> {
        console.log(err.message);
        response.status(500).send({status: "Error woth delete Diet paln", error: err.message});

    }) 
})

router.route("/get/:id").get(async(request, response)=>{
    let dietplanId = request.params.id;
    const user = await Dietplan.findById(dietplanId)
    .then((dietplan)=>{ 
        response.status(200).send({status: "Diet plan loaded",dietplan}) 
    }).catch(()=>{
        console.log(err.message);
        response.status(500).send({status: "Error With Get Diet Plan", error: err.message});
    })
})
//Search bar
router.route("/search/:key").get(async(request, response) => {
    try {
      const { key } = request.params;
      const dietplans = await Dietplan.find({
        $or: [
          { mealName: { $regex: key, $options: "i" } },
          { dayofMeal: { $regex: key, $options: "i" } },
        ],
      });
      if (dietplans.length === 0) {
        response.status(404).json({ error: "No diet plan found" });
      } else {
        response.json(dietplans);
      }
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Error searching diet plans" });
    }
  });
  

module.exports = router; 