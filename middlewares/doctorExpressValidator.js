const {body,query, param,validationResult,check,} = require("express-validator");

exports.addDoctor = [
    body("name")
        .exists()
        .withMessage("Name is required")
        // .isAlpha()
        // .withMessage("Name must be string")
        .isLength({
            min: 2
        })
        .withMessage("Name must be at least 2 characters long"),
    body("gender")
        .exists()
        .withMessage("Gender is required")
        .isIn(["Male", "Female"])
        .withMessage("Gender must be either 'male' or 'female'"),
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    body("phone")
        .exists()
        .withMessage("Phone number is required")
        .isLength({
            min: 10,
            max: 11
        })
        .withMessage("Phone number must be 11 characters long")
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)
        .withMessage("Phone number must only contain numbers"),
    body("address.city")
        .exists()
        .withMessage("City is required")
        .isAlpha()
        .withMessage("City name must be string")
        .isLength({
            min: 2
        })
        .withMessage("City must be at least 2 characters long"),
    body("address.street")
        .optional()
        .isString()
        .withMessage("Street name must be string")
        .isLength({
            min: 2
        })
        .withMessage("Street must be at least 2 characters long"),
    body("address.building")
        .optional()
        .isString()
        .isLength({
            min: 1
        })
        .withMessage("Building must be at least 1 character long"),
    body("speciality")
        .exists()
        .withMessage("Speciality is required")
        .isIn([
            "cardiology",
            "dentistry",
            "ear",
            "nose",
            "throat",
            "ENT",
            "nutrition",
            "dermatology",
        ])
        .withMessage(
            "Only Valid Specialties are : cardiology,dentistry,ear,nose,throat,nutrition,dermatology"
        )
        .isLength({
            min: 5
        })
        .withMessage("Speciality must be at least 5 characters long"),
    body("yearsOfExperience")
        .isNumeric()
        .withMessage("Year of Experience should be number"),
];

exports.updateDoctor = [
    body("_id").isInt().withMessage("Id should be integer"),
    body("name")
        .optional()
        // .isAlpha()
        // .withMessage("Name must be string")
        .isLength({
            min: 2
        })
        .withMessage("Name must be at least 2 characters long"),
    body("gender")
        .optional()
        .isIn(["Male", "Female"])
        .withMessage("Gender must be either 'male' or 'female'"),
    body("email")
        .optional()

        .isEmail()
        .withMessage("Email must be valid"),
    body("phone")
        .optional()

        .isLength({
            min: 10,
            max: 11
        })
        .withMessage("Phone number must be 11 characters long")
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)
        .withMessage("Phone number must only contain numbers"),
    body("address.city")
        .optional()

        .isAlpha()
        .withMessage("City name must be string")
        .isLength({
            min: 2
        })
        .withMessage("City must be at least 2 characters long"),
    body("address.street")
        .optional()
        .isString()
        .withMessage("Street name must be string")
        .isLength({
            min: 2
        })
        .withMessage("Street must be at least 2 characters long"),
    body("address.building")
        .optional()
        .isString()
        .isLength({
            min: 1
        })
        .withMessage("Building must be at least 1 character long"),
    body("speciality")
        .optional()

        .isIn([
            "cardiology",
            "dentistry",
            "ear",
            "nose",
            "throat",
            "ENT",
            "nutrition",
            "dermatology",
        ])
        .withMessage(
            "Only Valid Specialties are : cardiology,dentistry,ear,nose,throat,nutrition,dermatology"
        ),
];