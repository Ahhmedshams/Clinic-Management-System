const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/errorValidation");
const controller = require("./../controller/calender");
const validation=require("./../middlewares/validations");
const mongoose = require('mongoose');
const advancedResults = require ("./../middlewares/advancedResult");
require('../model/doctorCalender');
 const calender= mongoose.model('calender');


router.route("/")
  .get(advancedResults(calender),controller.getCalenders)
  .post(controller.createCalender)



router.route("/:id")
  .get(validation.paramIdInt,validator,controller.getCalender)
  .delete(validation.paramIdInt,validator,controller.deleteCalender)
  //.patch(validation.patientUpdate,validator,controller.updatePatient)


module.exports = router;
