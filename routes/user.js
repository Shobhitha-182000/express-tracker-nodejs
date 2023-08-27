const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const authntication=require('../middleware/auth');


router.get("/signup", userController.getSignupForm);

router.post("/signup", userController.saveUser);

router.get("/signup/:email", userController.checkEmail);

router.get("/login", userController.getLoginPage);

router.post("/login", userController.login);

router.get('/get-user',authntication,userController.getUserData);

module.exports = router;
