const express=require('express');
const mongoose = require('mongoose');
const validator = require("../middlewares/errorValidation")
const validation = require("./../middlewares/validations");

const controller= require('../controller/medicine');
const advancedResults = require ("./../middlewares/advancedResult");
const allowedUsers = require("./../middlewares/AuthorizeRole");

require('./../model/medicine');
const medicine = mongoose.model('medicine');

// generate route to carry our method
const router=express.Router();
router.route("/")
.get(allowedUsers.checkWithRole("admin"),advancedResults(medicine),validator,controller.getAllMedicines)
.post(allowedUsers.checkWithRole("admin"),validation.medicinePost ,validator ,controller.addNewMedicine)

router.route("/:id")
.delete(allowedUsers.checkWithRole("admin"),validation.paramIdInt,controller.deleteMedicine)
.get(allowedUsers.checkWithRole("admin"),validation.paramIdInt,controller.getMedicineID)
.patch(allowedUsers.checkWithRole("admin"),validation.medicineUpdate,validator,controller.updateMedicineData)


module.exports=router;