const express = require("express");
const paymentController=require("./../controller/payment")
const router = express.Router();
const allowedUsers =require("./../middlewares/AuthorizeRole")

router.route('/paymentWithCard/:doctorId') /// /paymentwithcard
.post(allowedUsers.checkWithRole("patient"),paymentController.payment)

router.route('/paymentWithCash')
.post(allowedUsers.checkWithRole("employee"),paymentController.paymentWithCash)

module.exports=router;