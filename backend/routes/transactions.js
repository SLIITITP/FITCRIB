const router = require("express").Router();

let Transaction = require("../models/transaction");

//create
router.route("/add").post((req, res) => {
    const{ subject, type, amount, date, message, reportedby} = req.body

    const newTransaction = new Transaction({
        subject,
        type,
        amount,
        date,
        message,
        reportedby
    })

    newTransaction.save().then(() => {
        //validations
        if(amount<=0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be positive'})
        }
        if(!subject || !type || !amount || !date || !message || !reportedby){
            return res.status(400).json({message: 'All fields are required!'})
        }
        res.json("Transaction Added!")
    }).catch((error) => {
        console.log(error);
    })
})

//read all
router.route("/").get((req, res) => {

    Transaction.find().then((transactions) => {
        res.json(transactions)
    }).catch((error) => {
        console.log(error);
    })
})

//update
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { subject, type, amount, date, message, reportedby } = req.body;

    const updateTransaction = {
        subject,
        type,
        amount,
        date,
        message,
        reportedby
    }

    const update = await Transaction.findByIdAndUpdate(userId, updateTransaction).then(() => {
        res.status(200).send({ status: "Transaction successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with updating transaction", error: error.message });
    })
})

//delete
router.route("/delete/:id").delete(async (req, res) => {

    let userId = req.params.id;

    await Transaction.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Transaction deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with deleting a transation!", error: error.message });
    })
})


//view only one transaction
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const transaction = await Transaction.findById(userId).then((transaction) => {
        res.status(200).send({ transaction });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching transaction!", error: error.message });
    })
})

//search
router.route("/search/:key").get(
    async (req, resp) => {
        let result = await Transaction.find({
            "$or": [
                {
                    subject: { $regex: req.params.key }
                },
                {
                    type: { $regex: req.params.key }
                },
                {
                    reportedby: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
    })



module.exports = router;