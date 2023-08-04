const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/signup", userController.getSignupForm);

router.post("/signup", userController.saveUser);

router.get("/signup/:email", userController.checkEmail);

router.get("/login", userController.getLoginPage);

router.post("/login", userController.login);

module.exports = router;
