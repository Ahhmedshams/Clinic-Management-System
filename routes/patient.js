const express= require("express");
const controller = require("./../controller/patient");
const validator = require("./../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const advancedResults = require ("./../middlewares/advancedResult");

const router = express.Router();
///
const mongoose = require('mongoose');

require('./../model/patient');
const patient= mongoose.model('patient');
router.route("/patient")
.get(advancedResults(patient),controller.getPatients)
.post(validation.patientPost,validator,controller.createPatient)


router.route("/patient/:id")
.get(validation.paramIdInt,validator,controller.getPatient)
.delete(validation.paramIdInt,validator,controller.deletePatient)
.patch(validation.patientUpdate,validator,controller.updatePatient)

module.exports=router;