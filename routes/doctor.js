const express = require("express");
const validator = require("../middlewares/errorValidation");
const validation = require("../middlewares/validations")
const controller = require("../controller/doctor");
const calenderRouter = require("./doctorsCalender");
const appointmentRouter = require("./appointment");
const allowedUsers =require("./../middlewares/AuthorizeRole");

require('./../model/doctor');

const mongoose = require('mongoose');
const advancedResults = require("../middlewares/advancedResult");
const { request } = require("express");
const doctors = mongoose.model('doctors');
const router = express.Router();

router.use('/doctors/:doctorId/calender',allowedUsers.checkWithRole("admin","employee","doctor"),controller.reRoute, calenderRouter)
router.use('/doctors/:doctorId/appointment', controller.reRoute, appointmentRouter)


router.route("/doctors")
      .get(allowedUsers.checkWithRole("admin"),advancedResults(doctors), controller.getAllDoctors)
      .post(allowedUsers.checkWithRole("admin"),validation.doctorPost, validator, controller.addNewDoctor)

router.route("/doctors/:id")
      .get(allowedUsers.checkWithRole("doctor","admin"),
            validation.paramIdInt,
            validator, controller.getDoctorById)
      .patch(allowedUsers.checkWithRole("doctor","admin"),validation.updateDoctor, validator, controller.updateDoctor)
      .delete(allowedUsers.checkWithRole("admin"),
            validation.paramIdInt,
            validator, controller.deleteDoctor)


module.exports = router;
