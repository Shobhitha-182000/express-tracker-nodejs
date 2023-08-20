const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");

router.get("/expense", expenseController.getExpenseForm);

router.post('/expense',expenseController.saveExpense);

router.get('/get-all-expense',expenseController.findAll);

router.delete('/expense/:id',expenseController.deleteExpense);
 

module.exports = router;
