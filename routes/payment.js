const express = require("express");
const validator =require("../middlewares/errorValidation")
const paymentController=require("./../controller/payment")

const router = express.Router();
const mongoose = require("mongoose")

router.route('/paymentWithCard/:doctorId') /// /paymentwithcard
.post(paymentController.payment)

router.route('/paymentWithCash/:doctorId')
.post(paymentController.paymentWithCash)

module.exports=router;