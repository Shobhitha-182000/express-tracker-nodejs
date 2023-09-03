const express = require('express');
const userAuthentication = require('../middleware/auth');
const premiumController = require('../controllers/premiumControl');
const userController=require('../controllers/user');
const router = express.Router();

router.get('/showLeaderBoard', userAuthentication, premiumController.getLeaderBoard);
router.get('/showfiledownloaded', userAuthentication, premiumController.showfiledownloaded);
 
router.get('/isPremiumUser', userAuthentication, userController.isPremiumUser);

module.exports = router;