const express = require("express");
const validator =require("../middlewares/errorValidation")
const paymentController=require("./../controller/payment")

const router = express.Router();
const mongoose = require("mongoose")

router.route('/payment/:invoiceId') /// /payment/doctorid
.post(paymentController.payment)

module.exports=router;