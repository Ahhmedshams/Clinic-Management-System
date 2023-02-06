const express=require("express");
const router=express.Router();
const validator=require("../middlewares/errorValidation");
const controller=require("../controller/doctor");
const validationObject=require("../middlewares/doctorExpressValidator");
const calenderRouter = require("./doctorsCalender")
const { param} = require("express-validator");

const mongoose = require('mongoose');
const advancedResults = require ("../middlewares/advancedResult");
const doctors= mongoose.model('doctors');


router.use('/doctors/:doctorId/calender',controller.newAppointment,calenderRouter)

router.route("/doctors")
      .get(advancedResults(doctors),controller.getAllDoctors)
      .post(
            //validationObject.addDoctor,validator,
            controller.addNewDoctor)
      .patch(validationObject.updateDoctor,validator,controller.updateDoctor)
      .delete(controller.deleteDoctor)
      
router.route("/doctors/:id")
      .get(
            param("id").isInt().withMessage("Id should be integer"),
            validator,controller.getDoctorById)
      .delete(
            param("id").isInt().withMessage("Id should be integer"),
            validator,controller.deleteDoctorById)
      

module.exports=router;
