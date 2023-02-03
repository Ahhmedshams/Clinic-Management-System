const {body,query,param}=require('express-validator');
const mongoose=require('mongoose');

let medicineScemaValidator =[
    // body("_id").isInt({min:1}).withMessage("id should be number..."),
    body("DrugName").isAlpha().withMessage("drug name should be string.....")
    .isLength({max:30}).withMessage("name max length 10 alpha.."),
    body("Dosage").isAlpha().withMessage("Dosage should be string....."),
    body("description").isAlpha().withMessage("description should be string....."),
    body("Form").isIn(["cap", "susp" , "jugs", "cream", "Eye_Drops" ,"tab"]).withMessage("form should be in cap, susp ,jugs, cream, Eye_Drops ,tab..."),
    body("price").isInt({min:1}).withMessage("price should be int....."),
    body("Mfd_date").isDate().withMessage("mfd_date should be date....."),
    body("Exp_date").isDate().withMessage("Exp_date should be date....."),
    
];

module.exports ={
    medicineScemaValidator
};