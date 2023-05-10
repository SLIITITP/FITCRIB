const router = require("express").Router();
let Payment = require("../models/payment");

//payment create
router.route("/addpayment").post((req,res)=>{
    const Amount = Number(req.body.Amount);
    const CardNumber = Number(req.body.CardNumber);
    const ExpiryMonth = Number(req.body.ExpiryMonth);
    const ExpiryYear = Number(req.body.ExpiryYear);
    const CardholderName = req.body.CardholderName;
    const SecurityCode = Number(req.body.SecurityCode);

    const newPaymnet = new Payment({
        Amount,
        CardNumber,
        ExpiryMonth,
        ExpiryYear,
        CardholderName,
        SecurityCode
    })

    newPaymnet.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;