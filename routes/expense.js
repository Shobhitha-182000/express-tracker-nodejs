const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");

router.get("/expense", expenseController.getExpenseForm);

router.post('/expense',expenseController.saveExpense);

module.exports = router;
