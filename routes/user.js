const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/signup", userController.getSignupForm);

router.post("/signup", userController.saveUser);

router.get("/signup/:email", userController.checkEmail);

router.get("/login", userController.getLoginPage);

router.get("/login-page/:email/:password", userController.login);

module.exports = router;
