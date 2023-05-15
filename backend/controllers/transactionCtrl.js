const transactionModel = require("../models/transaction");
const moment = require("moment");

//date filter
const getAllTransaction = async (req, res) => {
    try {
      const { frequency, selectedDate } = req.body;
      const transactions = await transactionModel.find({
        ...(frequency !== "custom"
          ? {
              date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
              },
            }
          : {
              date: {
                $gte: selectedDate[0],
                $lte: selectedDate[1],
              },
            })
      });
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  module.exports = { getAllTransaction };