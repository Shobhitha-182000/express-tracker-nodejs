const expense = require("../models/expense");
const Expense = require("../models/expense");
const path = require("path");
const userController = require("./user");
 

exports.getExpenseForm = (req, res, next) => {
   
    res.sendFile(path.join(__dirname, "..", "views", "expense.html"));
};

exports.saveExpense = (req, res, next) => {
  
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.create({
    amount: amount,
    description: description,
    category: category,
    userId:req.user.id
  })
    .then((expense) => {
      res.redirect('/expense');
    })
    .catch((error) => console.log(error));
};

exports.findAll=(req,res,next)=>{
   //here req is a global object that is coming from middleware here id is specifying column name
    Expense.findAll({where:{userId:req.user.id}})
    .then((expense) => {
      if (!expense) {
        res.json({ message: "no expense found"});
      }
      res.json(expense);
      console.log(expense);
    })
    .catch((error) => console.log(error));
}

exports.deleteExpense=(req,res,next)=>{
    const expenseId=req.params.id;
    console.log(expenseId);
    Expense.destroy({where:{id:expenseId}})
    .then(expense=>{
        if(expense>1){
            res.json({error:'expense not found'})
        }else{
            res.json({message:'successfully deleted'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    })
}