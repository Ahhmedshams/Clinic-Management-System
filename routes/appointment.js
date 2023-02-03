const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/appointment");
const validator = require("./../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const advancedResults = require ("./../middlewares/advancedResult");

require('./../model/appointment');
const appointment= mongoose.model('patient');
const router = express.Router();



router.route("/")
.get(controller.getAppointment)
.post(controller.createAppointment)


router.route("/appointment/")
// .get(validation.paramIdInt,validator,controller.getAppointment)
// .delete(validation.paramIdInt,validator,controller.deleteAppointment)
// .patch(controller.updateAppointment)

module.exports=router;