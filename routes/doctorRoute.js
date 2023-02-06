const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/errorValidation");
const controller = require("./../controller/doctorController");
const validationObject = require("./../middlewares/doctorExpressValidator");
const validation = require("./../middlewares/validations");
const rescriptionRouter = require("./../routes/rescription")
const mongoose = require("mongoose")
const advancedResults = require("./../middlewares/advancedResult");
const doctors = mongoose.model("doctors")


router.route("/doctors")
      .get(advancedResults(doctors), controller.getAllDoctors)
      .post(validationObject, validator, controller.addNewDoctor)
      .patch(validationObject, validator, controller.updateDoctor)
      .delete(controller.deleteDoctor)

//list with filter and sorting 

router.route("/doctors/:id")
      .get(
            validation.paramisMongoId, validator, controller.getDoctorById)

router.use("/doctors/:id/rescription", controller.checkID, rescriptionRouter)

module.exports = router;

