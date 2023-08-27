const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchase");
const authntication=require('../middleware/auth');

router.get('/premiummembership',authntication,purchaseController.purchasepremium);


router.post('/updatetransaction',authntication,purchaseController.updateTransaction);

module.exports=router;
