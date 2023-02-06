const express=require('express');
const {body,query,param}=require('express-validator');
const {medicineScemaValidator}=require('./../middlewares/dataValidation')
const MedicineController= require('./../controller/medicineController');

// generate route to carry our method
const router=express.Router();

router.get('',MedicineController.getAllMedicines)
.get('/:_id',MedicineController.getMedicineID)
.get('/:DrugName',MedicineController.getMedicineName)
.post("",medicineScemaValidator   ,MedicineController.addNewMedicine)
.delete("/:_id",MedicineController.deleteMedicine)
.patch("",MedicineController.updateMedicineData)


module.exports=router;