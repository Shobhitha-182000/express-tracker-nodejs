 const Razorpay=require('razorpay');
// const { Json } = require('sequelize/types/utils');
const Order = require('../models/orders');
const User = require('../models/user');
const userController=require('./user');
const env1=require('dotenv').config();


exports.purchasepremium = async (req, res) => {
  
  try {
    var rzp = new Razorpay({
      key_id: process.env.Razorpay_key_ID,
      key_secret: process.env.Razorpay_key_SECRET,
    });
    const amount = 25000;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something  went wrong", error: err });
  }
};
 

exports.updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2])
      .then(() => {
        return res.status(202).json({
          sucess: true,
          message: "Transaction Successful",
          token: userController.generateToken(userId, undefined, true),
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Sometghing went wrong" });
  }
};
 