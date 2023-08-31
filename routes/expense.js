const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const userAuthntication=require('../middleware/auth');

router.get("/expense" , expenseController.getExpenseForm);

router.post('/expense',userAuthntication, expenseController.saveExpense);

router.get('/get-all-expense',userAuthntication,expenseController.findAll);

router.delete('/expense/:id',userAuthntication,expenseController.deleteExpense);

router.get('/expense/:id',userAuthntication,expenseController.getAllExpenseByUserId);
 

module.exports = router;
