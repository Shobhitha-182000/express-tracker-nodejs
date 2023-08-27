// const jwt=require('jsonwebtoken');
// const User = require('../models/user');
// const { use } = require('../routes/expense');

// exports.authorization = (req, res, next) => {
//     try {
//       const token = req.header('Authorization');
//       const user = jwt.verify(token, "Shobhitha@1821");
//       User.findByPk(user.userId)
//         .then((user) => {
//           req.user = user;
//           console.log( '======================'+req.user.id);
//           next();
//         })
//         .catch((err) => {
//           console.log('Error fetching user:', err);
//           return res.status(401).json({ exist: false });
//         });
//     } catch(error) {
//       // return res.status(401).json({ exist: false });
//       return res.status(401).json(error);
//     }
//   };

const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = jwt.verify(token, process.env.secretkey);
    const user = await User.findByPk(decodedToken.userId);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "You are not authenticated" });
  }
};
