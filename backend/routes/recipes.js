        const router = require("express").Router();
        let Recipe = require("../models/recipe");

        router.route("/add").post((req,res)=>{
            const userId = req.body.userID;
            const recipename = req.body.recipename;
            const Ingredients = req.body.Ingredients;
            const image = req.body.image; //add
            const steps = req.body.steps;
            const Calories = Number(req.body.Calories);

            const newRecipe = new Recipe({
                userId,
                recipename,
                Ingredients,
                image, //add
                steps,
                Calories
            })

            newRecipe.save().then(()=>{
                res.json("Recipe Added")
            }).catch((err)=>{
                console.log(err);
            })
        
        })

        router.route("/:userID").get((req,res)=>{
            const userID = req.params.userID;
            Recipe.find({userId : userID}).then((recipes)=>{
                res.json(recipes)
            }).catch((err)=>{
                console.log(err)
            })

        })

        router.route("/").get((req,res)=>{
            Recipe.find().then((recipes)=>{
                res.json(recipes)
            }).catch((err)=>{
                console.log(err)
            })

        })

        router.route("/search/:query").get((req, res) => {
            const query = req.params.query;
            const regex = new RegExp(query, 'i');
            Recipe.find({ $or: [{ recipename: regex }, { Ingredients: regex }] }).then((recipes) => {
                res.json(recipes)
            }).catch((err) => {
                console.log(err)
            })
        });

        router.route("/update/:id").put(async (req, res) => {
        let recipeId = req.params.id;
        const {recipename, Ingredients, image, steps, Calories} = req.body;

        const updateRecipe = {
            recipename,
            Ingredients,
            image,
            steps,
            Calories 
        }

        const update = await Recipe.findByIdAndUpdate(recipeId, updateRecipe).then(() => {
            res.status(200).send({status: "recipe updated"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        })

        })

        router.route("/delete/:id").delete(async (req, res) => {
        let recipeId = req.params.id;

        await Recipe.findByIdAndDelete(recipeId)
        .then(() => {
            res.status(200).send({status: "recipe deleted"});
        }).catch((errr) => {
            console.log(errr.message);
            res.status(500).send({status: "Error with delete recipe", error: errr.message});

        })
        })

        router.route("/get/:id").get(async (req, res) => {
            let recipeId = req.params.id;
            const recipe = await Recipe.findById(recipeId)
            .then((recipe) => {
                res.status(200).send({status: "recipe fetched", recipe})
            }).catch((err) => {
                console.log(err.message);
                res.status(500).send({status: "Error with get recipe", error: err.message});
        })
        })

        module.exports = router;