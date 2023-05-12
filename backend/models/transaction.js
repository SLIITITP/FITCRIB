const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    reportedby: {
        type: String,
        required: true
    }

})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;