const express=require('express');
const mongoose = require('mongoose');
const validator = require("../middlewares/errorValidation")
const validation = require("./../middlewares/validations");

const controller= require('../controller/medicine');
const advancedResults = require ("./../middlewares/advancedResult");

require('./../model/medicine');
const medicine = mongoose.model('medicine');

// generate route to carry our method
const router=express.Router();
router.route("/")
.get(advancedResults(medicine),validator,controller.getAllMedicines)
.post(validation.medicinePost ,validator ,controller.addNewMedicine)

router.route("/:id")
.delete(validation.paramIdInt,controller.deleteMedicine)
.patch(validation.paramIdInt,validator,controller.updateMedicineData)
.get(validation.paramIdInt,controller.getMedicineID)

module.exports=router;