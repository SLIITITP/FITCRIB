const router = require("express").Router();
let User = require("../models/user");

//create
router.route("/add").post((req,res)=>{
    const Fullname = req.body.Fullname;
    const Email = req.body.Email;
    const Address = req.body.Address;
    const TelephoneNumber = Number(req.body.TelephoneNumber);
    const UserType = req.body.UserType;
    const Gender = req.body.Gender;
    const Username = req.body.Username;
    const Password = req.body.Password;

    const newUser = new User({
        Fullname,
        Email,
        Address,
        TelephoneNumber,
        UserType,
        Gender,
        Username,
        Password
    })

    newUser.save().then(()=>{
        res.json("User Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//view
router.route("/").get((req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {Fullname,Email,Address,TelephoneNumber,UserType,Gender,Username,Password} = req.body;

    const updateUser = {
        Fullname,
        Email,
        Address,
        TelephoneNumber,
        UserType,
        Gender,
        Username,
        Password
    }

    const update = await User.findByIdAndUpdate(userId, updateUser).then(()=>{
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) 
})

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

//view one user 
router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await User.findById(userId).then((user)=>{
        res.status(200).send({status: "User fetched",user})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

//search

router.route("/search/:key").get(
    async(req,res)=>{
        let result = await User.find({
            "$or":[
                {
                    Fullname: { $regex: req.params.key}
                },
                {
                    Username: { $regex: req.params.key}
                }
            ]
        });
        res.send(result);
    }
)
// router.post('/search-users',(req,res)=>{
//     let UserPattern = new RegExp("^"+req.body.query)
//     User.find({Fullname:{$regex:UserPattern}})
//     .select("_id Email")
//     .then(user=>{
//         res.json({user})
//     }).catch(err=>{
//         console.log(err)
//     })
// })

// router.get('/get/:id', (req,res)=>{
//     User.findOne({_id:req.params.id})
//     .select("password")
//     .then(user=>{
//         this.post.find({postedBy:req.params.id})
//         .populate("postedBy","_id Fullname")
//         .exec((err,posts)=>{
//             if(err){
//                 return res.status(422).json({error:err})
//             }
//             res.json({user,posts})
//         })
//     }).catch(err=>{
//         return res.status(404).json({error:"User not found"})
//     })
// })


module.exports = router;