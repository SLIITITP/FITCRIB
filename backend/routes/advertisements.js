const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require("path")
let Advertisement = require("../models/Advertisement");
const Order = require("../models/Order");
const upload = multer({ dest: 'uploads/' })
// const uploadImg = multer({dest: '..images/'})

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {
//         cb(null , uuidv4() + '-' + Data.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg' , 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb (null, false);
//     }
// }

// let upload = multer({ storage, fileFilter});

//---------------create advertisements---------------------------------

router.route("/add").post(async (req, res) => {

    // res.json({files:req.file})

    // const {originalname,path} = req.file
    // const changePath = path.replace(/\\/g,'/');
    // const parts = originalname.split('.')

    // const ext = parts[parts.length - 1]
    // const newPath = changePath + '.' + ext
    // fs.renameSync(path,newPath)

    const name = req.body.name;
    const category = req.body.category;
    // const image = req.body.image;
    const price = Number(req.body.price);
    const weight = Number(req.body.weight);
    const stock = Number(req.body.stock);
    const description = req.body.description;
    const date = new Date(req.body.date);

    const newAd = new Advertisement({

        name,
        category,
        // image : newPath,    
        price,
        weight,
        stock,
        description

    })
    console.log(date)

    newAd.save().then(() => {

        res.json({ newAd })

    }).catch((err) => {
        console.log(err);
    })

})

router.route('/rec').get((req, res) => {
    Advertisement.find()
        .then(ad => res.json(ad))
        .catch(err => res.status(400).json('Error: ' + err));
});

//---------------get all advertisements to display for buyer----------------------------------

router.route("/buyer").get((req, res) => {

    Advertisement.find().then((ads) => {
        res.json(ads)
    }).catch((err) => {
        console.log(err)
    })

})

//---------------get all advertisements to display----------------------------------

router.route("/").get((req, res) => {

    Advertisement.find().then((ads) => {
        res.json(ads)
    }).catch((err) => {
        console.log(err)
    })

})

//---------------update advertisement------------------------------------

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, category, price, weight, stock, description } = req.body;

    const updateAd = {
        name,
        category,
        price,
        weight,
        stock,
        description
    }

    const update = await Advertisement.findByIdAndUpdate(userId, updateAd)
        .then(() => {
            res.status(200).send({ status: "User updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})


//----------------delete advertisememnt----------------------------------

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Advertisement.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Produuct deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Product", error: err.message });
        })
})


//---------------get one advertisement to display------------------------

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const ad = await Advertisement.findById(userId)
        .then((advertisement) => {
            res.status(200).send({ status: "Produuct fetched", advertisement })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching Product", error: err.message })
        })
})

//---------------get one advertisement to checkout------------------------

router.route("/checkout/:id").get(async (req, res) => {
    let userId = req.params.id;
    const ad = await Advertisement.findById(userId)
        .then((advertisement) => {
            res.status(200).send({ status: "Product fetched", advertisement })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching Product", error: err.message })
        })
})

//---------------create an order---------------------------------

router.route("/order").post(async (req, res) => {

    const recipientname = req.body.recipientName;
    const deliveryAddress = req.body.deliveryAddress;
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = req.body.quantity;
    const date = new Date(req.body.date);
    console.log(recipientname)

    const newOrder = new Order({
        recipientname,
        deliveryAddress,
        name,
        price,
        quantity,
        date
    })

    newOrder.save()
        .then(() => {
            res.json({ newOrder })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err)
        })

})

router.route('/rec').get((req, res) => {
    Order.find()
        .then(od => res.json(od))
        .catch(err => res.status(400).json('Error: ' + err));
});



//---------------get one advertisement to display------------------------

router.route("/order/:id").get(async (req, res) => {
    let userId = req.params.id;
    const ad = await Order.findById(userId)
        .then((order) => {
            res.status(200).send({ status: "Produuct fetched", order })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching Product", error: err.message })
        })
})


//---------------get all orders to display----------------------------------

router.route("/orders").get((req, res) => {

    Order.find().then((ads) => {
        res.json(ads)
    }).catch((err) => {
        console.log(err)
    })

})

router.route("/sales/:id").get(async (request, response) => {
    let userId = request.params.id;
    await Goal.findById(userId)
        .then((goal) => {
            // Create a new PDF document
            const doc = new PDFDocument();
            const stream = doc.pipe(fs.createWriteStream("Sales.pdf"));

            // Set the PDF document's properties
            doc.info.Title = "Sales Report";
            doc.info.Author = "Your Name";
            doc.info.Subject = "Your Sales Report";

            // Add text to the PDF document
            doc.fontSize(16).text(`Meal Name: ${Order.deliveryAddress}`);
            doc.fontSize(16).text(`Day of Meal: ${Order.name}`);
            doc.fontSize(16).text(`Goal: ${Order.price}`);
            doc.fontSize(16).text(`Meal Plan: ${Order.quantity}`);
            doc.fontSize(16).text(`Meal Plan: ${Order.date}`);

            // Finalize the PDF document and close the write stream
            doc.end();
            stream.on("finish", () => {
                // Send the PDF file to the client
                response.sendFile("Sales.pdf", { root: "." });
            });
        }).catch((err) => {
            console.log(err.message);
            response.status(500).send({ status: "Error with Get Target Goal", error: err.message });
        })
});

module.exports = router;