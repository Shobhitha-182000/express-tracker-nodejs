const User = require("../models/user");
const path=require('path');

exports.getSignupForm=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','signup.html'))
}

exports.saveUser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    User.create({
        name:name,
        email:email,
        password:password
    })
    .then(user=>{
        res.redirect('/user/signup');
    })
    .catch(err=> console.log(err));
}

exports.checkEmail = async (req, res, next) => {
    const email = req.params.email;
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }