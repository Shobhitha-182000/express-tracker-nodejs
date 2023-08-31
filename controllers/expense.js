const expense = require("../models/expense");
const Expense = require("../models/expense");
const path = require("path");
const userController = require("./user");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getExpenseForm = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "expense.html"));
};
exports.saveExpense = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { amount, description, category } = req.body;
    const expense = await Expense.create(
      {
        amount,
        description,
        category,
        userId: req.user.id,
      },
      { transaction: t }
    );
    const totalExpense = Number(req.user.totalExpense) + Number(amount);
    await User.update(
      { totalExpense },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    res.redirect("/expense");
  } catch (error) {
    await t.rollback();
    console.error("Error while saving expense:", error);
    console.error(error.stack);
    res.status(500).send("An error occurred while saving the expense.");
  }
};

exports.findAll = (req, res, next) => {
  //here req is a global object that is coming from middleware here id is specifying column name
  Expense.findAll({ where: { userId: req.user.id } })
    .then((expense) => {
      if (!expense) {
        res.json({ message: "no expense found" });
      }
      res.json(expense);
      console.log(expense);
    })
    .catch((error) => console.log(error));
};

exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findByPk(expenseId);
    console.log(req.user.totalExpense+',,,,,,,,')

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const deletedRows = await Expense.destroy({ where: { id: expenseId } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const updatedTotalExpense = req.user.totalExpense - expense.amount;
    await User.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Expense successfully deleted" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllExpenseByUserId = (req, res) => {
  const userId = req.params.id;
  Expense.findAll({ where: { userId: userId } })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
