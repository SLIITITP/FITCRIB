const router = require("express").Router();
const { request, response } = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
let Goal = require("../models/Goal");

router.route("/create").post((request,response)=>{
    const targetCal = Number(request.body.targetCal);
    const calin = Number(request.body.calin);
    const  time = Number(request.body.time);

    const newGoal = new Goal({
        targetCal,
        calin,
        time
    })

    newGoal.save().then(()=>{
        response.json("Goal Setted")
    }).catch((err)=>{
        console.log(err);
    })
});

router.route("/").get((request,response)=>{
    Goal.find().then((goals)=>{
        response.json(goals)
    }).catch((err)=>{
        console.log(err)
    })
});

router.route("/update/:id").put(async(request,response)=>{
    let userId = request.params.id;
    const {targetCal, calin, time} = request.body;

    const updateGoal = {
        targetCal,
        calin,
        time
    }
    
    if(calin <= targetCal){
        // Display alert
        response.status(200).send({status: "TargetCal is equal to Calin. Please adjust your goals."})
    } else {
        const update = await Goal.findByIdAndUpdate(userId, updateGoal)
        .then(()=>{
            response.status(200).send({status: "Your Goal Is Setted"})
        }).catch((err)=>{
            console.log(err);
            response.status(500).send({status: "Error with Your Goal updating",error:err.message});
        })
    }
});

router.route("/delete/:id").delete(async (request,response)=>{
    let userId = request.params.id;
    await Goal.findByIdAndDelete(userId)
    .then(()=> {
        response.status(200).send({status : "Target Goal deleted"});
    }).catch((err)=> {
        console.log(err.message);
        response.status(500).send({status: "Error with delete Target Goal", error: err.message});
    }) 
});

router.route("/get/:id").get(async (request,response)=>{
    let userId = request.params.id;
    await Goal.findById(userId)
    .then((goal)=> {
        // Create a new PDF document
        const doc = new PDFDocument();
        const stream = doc.pipe(fs.createWriteStream("goal.pdf"));

        // Set the PDF document's properties
        doc.info.Title = "Goal Report";
        doc.info.Author = "Your Name";
        doc.info.Subject = "Your Goal Report";

        // Add text to the PDF document
        doc.fontSize(20).text(`Goal: ${goal.targetCal} calories`);
        doc.fontSize(14).text(`Calories In: ${goal.calin}`);
        doc.fontSize(14).text(`Time: ${goal.time} days`);

        // Finalize the PDF document and close the write stream
        doc.end();
        stream.on("finish", () => {
            // Send the PDF file to the client
            response.sendFile("goal.pdf", { root: "." });
        });
    }).catch((err)=> {
        console.log(err.message);
        response.status(500).send({status: "Error with Get Target Goal", error: err.message});
    }) 
});

//Search Goal 
router.route("/search/:key").get(async (request, response) => {
  try {
    const { key } = request.params;
    const goals = await Goal.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { targetCal: key },
        { calin: key },
        { time: key }
      ],
    });
    if (goals.length === 0) {
      response.status(404).json({ error: "No goals found" });
    } else {
      response.json(goals);
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "Error searching goals" });
  }
});



module.exports = router;
