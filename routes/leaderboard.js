const express=require('express');
const router=express.Router();
const leaderBoardController=require('../controllers/leaderboard');

router.get('/leaderboard',leaderBoardController.leaderBoard);


module.exports=router;