const User = require("../models/user");
const path = require("path");
const bcrypt = require("bcrypt");
const { error } = require("console");
const jwt = require("jsonwebtoken");
const env1=require('dotenv').config();


// Read and parse config.json
const secretKey = process.env.secretkey;

 

//to generate token
function generateToken(id, name) {
  return jwt.sign({ userId: id, name: name }, secretKey,{ expiresIn: '1d' });
}

exports.getSignupForm = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "signup.html"));
};

exports.saveUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.send("This email address is already registered.");
    }
    const saltSource = 10;
    bcrypt.hash(password, saltSource, async (err, hash) => {
      const newUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      return res.redirect("/user/login");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.checkEmail = async (req, res, next) => {
  const email = req.params.email;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    return res.json({ exists: !!existingUser });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLoginPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const user = await User.findOne({ where: { email: email } });
    console.log(user.password);
    if (!user) {
      return res.json({ exists: false, message: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new error("Something went wrong");
      }
      if (result === true) {
        return res.json({
          exists: true,
          message: "loggin Successfully",
          token: generateToken(user.id, user.name),
        });
      } else {
        return res
          .status(401)
          .json({ exists: false, message: "Incorrect password" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = req.user;  
    return res.json({
      username: user.username,
      isPremiumUser: user.ispremiumuser,
      
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserByUserId = (req, res) => {
  const userId = req.params.id;
   User.findByPk(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

