const express=require("express");
const router=express.Router();
const validator=require("./../middlewares/errorValidation");
const controller=require("./../Controller/doctorController");
const validationObject=require("./../middlewares/doctorExpressValidator");


router.route("/doctors")
      .get(controller.getAllDoctors)
      .post(validationObject,validator,controller.addNewDoctor)
      .patch(validationObject,validator,controller.updateDoctor)
      .delete(controller.deleteDoctor)
      
      //list with filter and sorting 

      module.exports=router;
