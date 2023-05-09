const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    Amount : {
        type : Number,
        required : true
    },
    CardNumber : {
        type : Number,
        required : true
    },
    ExpiryMonth : {
        type : Number,
        required : true
    },
    ExpiryYear : {
        type : Number,
        required : true
    },
    CardholderName : {
        type : String,
        required : true
    },
    SecurityCode : {
        type : Number,
        required : true
    }

})

const Payment = mongoose.model("payment",paymentSchema);
module.exports = Payment;