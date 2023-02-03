const express = require("express");
const { body ,param} = require("express-validator");
const PrescriptionController = require("../controller/rescription");
const router = express.Router();
const validator = require("./../middlewares/errorValidation");
const VPrescription = require("../middlewares/rescriptionValidation");

router
  .route("/resciption")
  .get(PrescriptionController.getAllrecriptiondata) 
  .post(VPrescription,validator,PrescriptionController.addrecriptiondata ) 
  .patch(VPrescription, PrescriptionController.updaterecriptiondata) 
  .delete(PrescriptionController.deleterecriptiondata) ;


module.exports = router;