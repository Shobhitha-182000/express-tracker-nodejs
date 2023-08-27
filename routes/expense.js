const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const userAuthntication=require('../middleware/auth');

router.get("/expense" , expenseController.getExpenseForm);

router.post('/expense',userAuthntication, expenseController.saveExpense);

router.get('/get-all-expense',userAuthntication,expenseController.findAll);

router.delete('/expense/:id',expenseController.deleteExpense);
 

module.exports = router;
