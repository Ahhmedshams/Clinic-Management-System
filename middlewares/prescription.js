const {body}=require("express-validator") ;
const prescription=[
  // body("id").optional().isNumeric()
  // .withMessage("fName Shoud be string"),
    body("date").isDate().withMessage("lnvalid date"),
    body("docName").isNumeric().withMessage("docname shold be string"),
    body("patientName").isNumeric().withMessage("invalid patient name"),
    body("medicine").isArray().withMessage("Medicine should be array")
  ] ;
 
  module.exports = prescription;