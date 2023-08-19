const expense = require("../models/expense");
const Expense = require("../models/expense");
const path = require("path");

exports.getExpenseForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "views", "expense.html"));
};

exports.saveExpense=(req,res,next)=>{
    const {amount,description,category}=req.body;
    console.log(amount);
    Expense.create({
        amount:amount,
        description:description,
        category:category
    })
    .then(expense=>{
        res.status(200).json({data:expense});
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    })
}
