const express = require("express");
const {
    getAllTransaction
} = require("../controllers/transactionCtrl");

//router object
const router =  express.Router();

//routes
//getallTransactions
router.post("/get-transaction", getAllTransaction);

module.exports = router;