 const RazorPay=require('razorpay');
// const { Json } = require('sequelize/types/utils');
const Orders = require('../models/orders');
const User = require('../models/user');
const env1=require('dotenv').config();


exports.purchasepremium= async (req,res)=>{
  try{
      let rzp=new RazorPay({
        key_id:process.env.key_id,
        key_secret:process.env.key_secret
      })
      
      
      const amount=2500;
      rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err){
          throw new Error(JSON.stringify(err));
        }
        req.user.createOrder({orderid:order.id,status:'PENDING'})
        .then(()=>{
          return res.status(201).json({order,key_id:rzp.key_id});
        })
        .catch(err=>{
          throw new Error(err);
        })
      })
  }
  catch(error){
    return 
  }
}
 
exports.updateTransaction= (req,res)=>{
    try{
      const {paymentid,orderid}=req.body;
      Orders.findOne({where:{orderid:orderid}})
      .then((order)=>{
        order.update({paymentid:paymentid,status:'SUCCESSFULL'})
        .then(()=>{
          req.user.update({ispremiumuser:true})
          .then(()=>{
            return res.status(202).json({ success:true,message:'Transaction Successfully'});
          })
          .catch(err=>{
            throw new Error(err);
          })
        })
         
      })
      .catch(err=>{
        throw new Error(err);
      })
    }
    catch(error){
      return 
    }
}
 