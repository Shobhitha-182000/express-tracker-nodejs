const express=require('express');
const router=express.Router();
const passwordController=require('../controllers/forgotpassword');
const authntication=require('../middleware/auth');


router.get('/forgotPasswordPage', passwordController.getforgotPasswordPage);

router.get('/resetPasswordPage/:uuid', passwordController.resetPasswordPage);

router.post('/sendMail', passwordController.sendMail);

router.post('/resetPassword', passwordController.updatePassword);

module.exports = router;


module.exports=router;