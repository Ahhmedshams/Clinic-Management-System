const express = require("express");
const validator = require("../middlewares/errorValidation");
const validation = require("../middlewares/validations")
const controller = require("../controller/doctor");
const calenderRouter = require("./doctorsCalender");
const { param } = require("express-validator");
require('./../model/doctor');

const mongoose = require('mongoose');
const advancedResults = require("../middlewares/advancedResult");
const doctors = mongoose.model('doctors');
const router = express.Router();

router.use('/doctors/:doctorId/calender', controller.newAppointment, calenderRouter)

router.route("/doctors")
      .get(advancedResults(doctors), controller.getAllDoctors)
      .post(validation.doctorPost, validator, controller.addNewDoctor)
      .patch(validation.updateDoctor, validator, controller.updateDoctor)
// .delete(controller.deleteDoctor)

router.route("/doctors/:id")
      .get(
            param("id").isInt().withMessage("Id should be integer"),
            validator, controller.getDoctorById)
      .patch(validation.updateDoctor, validator, controller.updateDoctor)
      .delete(
            param("id").isInt().withMessage("Id should be integer"),
            validator, controller.deleteDoctorById)


module.exports = router;
