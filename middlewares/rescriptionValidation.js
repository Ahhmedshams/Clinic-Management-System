const {body}=require("express-validator") ;
const VPrescription=[
    body("id").isNumeric().withMessage("Id should a number"),
    body("Date").isDate().withMessage("lnvalid date"),
    body("docName").isString().withMessage("docname shold be string"),
    body("PatientName").isString().withMessage("invalid patient name"),
    body("Medicine").isArray().withMessage("Medicine should be array")
  ] ;
 
  module.exports = VPrescription;