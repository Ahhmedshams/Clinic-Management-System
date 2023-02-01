const { body, query, param, validationResult } = require("express-validator");
exports.clinicValidation =
    [
        body("id").isInt().withMessage("Id should be integer"),
        body("name").isAlpha().withMessage("name should be string")
            .isLength({ max: 20 }).withMessage("length of name less than 20"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("location").isString().withMessage("Location should be string"),
        body("speciality").isIn(['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition']),
        body("medicines").isArray(),
        body("doctors").isArray(),
        body("employees").isArray()
    ]
