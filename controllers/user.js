const User = require("../models/user");
const path = require("path");

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
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.redirect("/user/login");
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

exports.login=async (req,res,next)=>{
    const email = req.params.email;
    const password = req.params.password; 
    try{
        const existingUser = await User.findOne({ where: { email: email } });
        console.log(existingUser);
        if(existingUser){
            if(existingUser.password===password){
               return res.redirect('/user/signup');
            }
        }
        return res.send('<h1>Not found</h1>');
    }catch(err){
        return res.status(404).json({message:'user not exits' });
    }
}
