const express=require('express');
const userController=require('../controllers/user');
const route=express.Router();

route.get('/signup',userController.getSignupForm);
route.post('/signup',userController.saveUser);



module.exports=route;