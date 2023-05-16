const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const  cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
const { DataFrame } = require('pandas-js');
const request = require('request');
const fs = require('fs');
const bcrypt = require("bcryptjs");
const path = require("path")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const jwt=require("jsonwebtoken");
const JWT_SECRET= "kjjhjif565g5955dgdg()gsfsfsgdgh444545[][]47g"
//tharusha exercise em
const workoutModel = require('./workout/workout-controller ')

//image upload
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use("/images",express.static(path.join(__dirname+"/images")))


const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is up and running on port number ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB connection succesfull.")
// })


// app.post('/predict', function(req, res) {
//     request('http://127.0.0.1:5000/logreg_predict_api', function (error, response, body) {
//         console.error('error:', error); // Print the error
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the data received
//         res.send(body); //Display the response on the website
//       });      
// });




const workoutPlanRouter = require('./routes/workoutPlanRoute')
app.use("/workoutPlan", workoutPlanRouter)

const workoutSessionRouter = require('./routes/workoutSessionRoutes')
app.use("/workoutSession", workoutSessionRouter)


//user management
const userRouter = require("./routes/user.js");
app.use("/user",userRouter);

const paymentRouter = require("./routes/payment.js");
const User = require("./models/user.js");
app.use("/payment",paymentRouter);

//login
app.post("/login", async(req,res)=>{

if(req.body.Password && req.body.Email){
    let user = await User.findOne(req.body)
    if(user){
        res.send(user)
    }else{
        res.send({result:"User not found"})
    }
}else{
    res.send({result:"User not found"})
}
})

//financial management
const transactionRouter = require("./routes/transactions.js");
const transactRouter = require("./routes/transactionRoutes.js");

app.use("/transaction", transactionRouter); // loads the js file connected with the transactionRouter
app.use("/transact", transactRouter);

//blog Management

const authBlog = require("./routes/blog")
const Review = require("./routes/review")
//const pdfTemplate = require("./documents/template")//template*/
const BApprove = require("./routes/blogApprove")

app.use("/review",Review)
app.use("/blog",authBlog)
app.use("/bApprove",BApprove)

//nutrition tracking

const dietplanRouter = require("./routes/dietplans");
const goalRouter = require("./routes/goals");

app.use("/dietplan",dietplanRouter);
app.use("/goal",goalRouter);

//recipe management

const recipeRouter = require("./routes/recipes.js");

app.use("/recipe",recipeRouter);


//Marketplace management

const adRouter = require("./routes/advertisements.js");

app.use("/ad",adRouter);


//exericise mangement api point
app.use("/workout", workoutModel);
