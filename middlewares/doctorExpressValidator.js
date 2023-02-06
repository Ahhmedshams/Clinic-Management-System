const {body,query,param,validationResult, check}=require("express-validator");

module.exports=[
    check("fullName")
    .exists().withMessage("Name is required")
    .isString().withMessage("Name must be string")
    .isLength({min:2}).withMessage("Name must be at least 2 characters long"),

//?-------------------------------------------------------------------
    check('gender').exists().withMessage("Gender is required")
    .isIn(["m","M","male","Male","f","F","femal","Female","FEMALE","MALE","not prefer to say"]).withMessage("Gender must be either 'male' or 'female'"),
//?-------------------------------------------------------------------

    check('email').exists().withMessage("Email is required")
    .isEmail().withMessage("Email must be valid"),
//?-------------------------------------------------------------------

     check('password').exists().withMessage("Password is required")
        .isString()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, "i").withMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number"),
//?-------------------------------------------------------------------

    check('phoneNumber').exists().withMessage("Phone number is required")
        .isLength({ min: 10, max: 11 }).withMessage("Phone number must be 11 characters long")
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g).withMessage("Phone number must only contain numbers"),
//?-------------------------------------------------------------------

   check('address.city').exists().withMessage("City is required")
         .isAlpha().withMessage("City name must be string")
        .isLength({ min: 2 }).withMessage("City must be at least 2 characters long"),


    check('address.street').exists().withMessage("Street is required")
         .isString().withMessage("Street name must be string")
        .isLength({ min: 2 }).withMessage("Street must be at least 2 characters long"),


   check('address.building').exists().withMessage("Building is required")
        .isInt()
        .isLength({ min: 1 }).withMessage("Building must be at least 1 character long")
    ];

//?-------------------------------------------------------------------

    check('speciality')
    .exists().withMessage("Speciality is required")
    .isIn(["cardiology","dentistry","ear","nose","throat","ENT","nutrition","dermatology"]).withMessage("Only Valid Specialties are : cardiology,dentistry,ear,nose,throat,nutrition,dermatology")
    .isLength({ min: 5 }).withMessage("Speciality must be at least 5 characters long")
 
//?-------------------------------------------------------------------

 check('yearsOfExperience').isNumeric().withMessage("Year of Experience should be number")

     