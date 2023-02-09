const express = require("express");
const { body ,param} = require("express-validator");
const prescriptionController = require("../controller/prescription");
const router = express.Router();
const validator = require("../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const vprescription = require("../middlewares/prescription");
const allowedUsers =require("./../middlewares/AuthorizeRole");

router
  .route("/prescription")
  .get(allowedUsers.checkWithRole("admin","doctor","patient"),prescriptionController.getAllrecriptiondata) 
  .post(allowedUsers.checkWithRole("doctor"),vprescription,validator,prescriptionController.addrecriptiondata ) 
  



  router.route("/prescription/:id")
  .get(allowedUsers.checkWithRole("admin"),validation.paramIdInt,validator,
  prescriptionController.getprecriptionByID)


.patch(allowedUsers.checkWithRole("doctor"),
  validation.paramIdInt,
  validator,prescriptionController.updaterecriptionId
)


  .delete(allowedUsers.checkWithRole("admin"), validation.paramIdInt,
  validator, prescriptionController.deleteprecriptionByID)


module.exports = router;