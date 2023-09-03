const User = require('../models/user');
const sequelize = require('../util/database');
const Expense = require("../models/expense");
const fileDownload = require("../models/filedownload");



const getLeaderBoard = async (req, res, next) =>{
     try {
        const leaderboarsofusers = await  User.findAll({
         order: [['totalExpenses', "DESC"]],
        });
        //console.log(leaderboarsofusers);
        
        res.status(200).json(leaderboarsofusers);
        
     } catch (err) {
         console.log(err);
         res.status(500).json(err);
     }
}
const showfiledownloaded = async (req, res, next) => {
    try {
      const files = await fileDownload.findAll({
        where: { userId: req.user.id },
        attributes: ["fileurl", "createdAt"],
      });
  
      res.status(201).json({ data: files });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  };
module.exports = {getLeaderBoard, showfiledownloaded, };