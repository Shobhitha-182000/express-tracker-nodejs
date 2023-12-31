const path = require("path");

const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");
// const s3service = require("../services/services");
const fileDownload = require('../models/filedownload');
require("dotenv").config();

const downloadExpenses = async (req, res, next) => {
  console.log(req.user.ispremiumuser+'=====premium=====')
  if(req.user.ispremiumuser){
   return res.json({ message: true })
  }else{
    return res.json({ message: false })
  }
  // const t = await sequelize.transaction();
  // try {
  //   const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  //   console.log(expenses);
  //   const stringifiedExpenses = JSON.stringify(expenses);
  //   const userid = req.user.id;
  //   const fileName = `Expense${userid}/${new Date()}.txt`;
  //   // const fileUrl = await s3service.uploadToS3(stringifiedExpenses, fileName);
  //   await fileDownload.create(
  //     { fileurl: fileUrl, userId: req.user.id },
  //     { transaction: t }
  //   );
  //   await t.commit();
  //   res.status(200).send({ fileUrl, success: true });
  // } catch (err) {
  //   t.rollback();
  //   console.log(err);
  //   res.status(500).send({ fileUrl: "", success: false, error: err });
  // }
};

const getMainPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "expense.html"));
  } catch (error) {
    console.log(error);
  }
};

const addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    await Expense.create(
      {
        description: description,
        amount: amount,
        category: category,
        userId: req.user.id,
      },
      { transaction: t }
    );
    await User.update(
      {
        totalExpenses: Number(req.user.totalExpenses) + Number(amount),
      },
      { where: { id: req.user.id }, transaction: t }
    );
    res.status(200).redirect("/expense");
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send("Some error has occurred while adding expense");
  }
};

const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (err) {
    console.log(err);
  }
};

const getAllExpensesforPagination = async (req, res, next) => {
  try {
    const pageNo = req.params.page;
    const limit =  Number(req.params.limit);
    console.log(pageNo, limit);
    const offset = (pageNo - 1) * limit;
    const totalExpenses = await Expense.count({
      where: { userId: req.user.id },
    });
    const totalPages = Math.ceil(totalExpenses / limit);
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      offset: offset,
      limit: limit,
    });
    res.json({ expenses: expenses, totalPages: totalPages });
  } catch (err) {
    console.log(err);
  }
};

const deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log(id, req.user.id);
    const expense = await Expense.findByPk(id);
    console.log(expense);
    await User.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
    );
    await expense.destroy();
    console.log("expense Deleted");
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const editExpense = async (req, res, next) => {
  const id = req.params.id;
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;
  console.log(id, category, description, amount);
  const expense = await Expense.findByPk(id);

  await User.update(
    {
      totalExpenses: req.user.totalExpenses - expense.amount + Number(amount),
    },
    { where: { id: req.user.id } }
  );
  await Expense.update(
    {
      category,
      description,
      amount,
    },
    {
      where: {
        id: id,
        userId: req.user.id,
      },
    }
  );
  res.redirect("/expense");
};
module.exports = {
  getMainPage,
  addExpense,
  getAllExpenses,
  deleteExpense,
  editExpense,
  downloadExpenses,
  getAllExpensesforPagination
};
