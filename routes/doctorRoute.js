const express=require("express");
const router=express.Router();
const validator=require("./../middlewares/errorValidation");
const controller=require("./../controller/doctorController");
const validationObject=require("./../middlewares/doctorExpressValidator");
const calenderRouter = require("./../routes/doctorsCalender")

router.use('/doctors/:doctorId/calender',controller.newAppointment,calenderRouter)

router.route("/doctors")
      .get(controller.getAllDoctors)
      .post(controller.addNewDoctor)
      .patch(controller.updateDoctor)
      .delete(controller.deleteDoctor)
      
//list with filter and sorting 

module.exports=router;
