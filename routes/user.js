const express=require('express');
const userController=require('../controllers/user');
const route=express.Router();

route.get('/signup',userController.getSignupForm);
route.post('/signup',userController.saveUser);
route.get('/:email',userController.checkEmail);



module.exports=route;