const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/appointment");
const validator = require("./../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const advancedResults = require ("./../middlewares/advancedResult");
const allowedUsers =require("./../middlewares/AuthorizeRole");

require('./../model/appointment');
const appointment= mongoose.model('appointment');
const router = express.Router({caseSensitive:false});


router.route("/")
.get(allowedUsers.checkWithRole("employee","admin","patient"),advancedResults(appointment),controller.getAppointment)
.post(allowedUsers.checkWithRole("admin","patient"),validation.appointmentPost,validator,controller.createAppointment)


router.route("/:id")
.get(allowedUsers.checkWithRole("patient"),allowedUsers.checkWithId,controller.getAppointment)
.delete(allowedUsers.checkWithRole("patient"),allowedUsers.checkWithId,validation.paramIdInt,validator, controller.deleteAppointment)
.patch(allowedUsers.checkWithRole("patient"),allowedUsers.checkWithId,validation.appointmentUpdate,validator,controller.updateAppointment)



module.exports=router;