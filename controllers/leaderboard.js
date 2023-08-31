const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");
 

exports.leaderBoard = async (req, res) => {
    try{
        const userLeaderBoardDetails = await User.findAll({
                 order:[['totalExpense','DESC']]
               });
             res.status(200).json(userLeaderBoardDetails);
//   try {
//     //another way by using joins
//     const userLeaderBoardDetails = await User.findAll({
//       attributes: ["id", "name",[sequelize.fn("sum", sequelize.col("expenses.amount")), "total_cost"]],
//       include:[
//         {
//         model:Expense,
//         attributes:[]
//       }],
//       group:["user.id"],
//       order:[['total_cost','DESC']]
//     });
//     res.status(200).json(userLeaderBoardDetails);
    //1st method
    // const expenses = await Expense.findAll({
    //   attributes: [
    //     "userId",
    //     [sequelize.fn("sum", sequelize.col("expense.amount")), "total_cost"],
    //   ],
    //   group: ["userId"], //groupby query
    // });

    // const userAggregate = {};
    
    // let userLeaderBoardDetails = [];
    // users.forEach((user) => {
    //   userLeaderBoardDetails.push({
    //     name: user.name,
    //     total_cost: userAggregate[user.id] || 0,
    //   });
    // });

    // userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
    // res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
  }
};
