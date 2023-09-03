const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const userAuthentication=require('../middleware/auth');

router.get('/expense', expenseController.getMainPage);

router.get("/expense/getAllExpenses", userAuthentication, expenseController.getAllExpenses);

router.delete("/expense/:id", userAuthentication,expenseController.deleteExpense);

router.get('/expense/getAllExpenses/:page/:limit', userAuthentication, expenseController.getAllExpensesforPagination);
// router.post("/editExpense/:id", userAuthentication,expenseController.editExpense);
router.get('/expense/download', userAuthentication, expenseController.downloadExpenses);

router.post("/expense", userAuthentication,expenseController.addExpense);
 

module.exports = router;
