const { body, param } = require("express-validator");

exports.patientPost = [
    body("fName").isAlpha()
        .withMessage("fName Shoud be string"),
    body("lName").isAlpha()
        .withMessage("lName Shoud be string"),
    body("gender").isIn(["female", "male"])
        .withMessage("Gender Shoud be One Of ('female','male')"),
    body("age").optional().isInt()
        .withMessage("Age is required"),
    body("email").isEmail()
        .withMessage("Email is required ,Email shoud be like example@email.com"),
    body("password")
        .isString()
        .withMessage("password is required"),
    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),
    body("address")
        .isObject()
        .withMessage("Addres Should Be Object"),
    body("address.city")
        .isString()
        .withMessage("city Should Be string"),
    body("address.street").optional()
        .isString()
        .withMessage("street Should Be string"),
    body("address.building").optional()
        .isInt()
        .withMessage("building Should Be integer")
]
exports.patientUpdate = [
    param("id").isInt().withMessage("id Should be integer"),
    body("fName").optional().isAlpha()
        .withMessage("fName Shoud be string"),
    body("lName").optional().isAlpha()
        .withMessage("lName Shoud be string"),
    body("gender").optional().isIn(["female", "male"])
        .withMessage("Gender Shoud be One Of ('female','male')"),
    body("age").optional().isInt()
        .withMessage("Age is required"),
    body("email").optional().isEmail()
        .withMessage("Email is required ,Email shoud be like example@email.com"),
    body("password").optional()
        .isString()
        .withMessage("password is required"),
    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),
    body("address").optional()
        .isObject()
        .withMessage("Addres Should Be Object"),
    body("address.city").optional()
        .isString()
        .withMessage("city Should Be string"),
    body("address.street").optional()
        .isString()
        .withMessage("street Should Be string"),
    body("address.building").optional()
        .isInt()
        .withMessage("building Should Be integer")
]
exports.clinicPost =
    [
        body("name").isAlpha().withMessage("name should be string")
            .isLength({ max: 20 }).withMessage("length of name less than 20"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("location").isString().withMessage("Location should be string"),
        body("speciality").isIn(['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition']),
        body("medicines").isArray(),
        body("doctors").isArray(),
        body("employees").isArray()
    ]
exports.clinicUpdate =
    [
        param("id").isInt().withMessage("id Should be integer"),
        body("name").optional().isAlpha().withMessage("name should be string")
            .isLength({ max: 20 }).withMessage("length of name less than 20"),
        body("email").optional().isEmail().withMessage("Enter a valid email"),
        body("location").optional().isString().withMessage("Location should be string"),
        body("speciality").optional().isIn(['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition']),
        body("medicines").optional().isArray(),
        body("doctors").optional().isArray(),
        body("employees").optional().isArray()
    ]
exports.invoicePost =
    [
        body("paymentType").isIn(['cash', 'credit card', ' Insurance Card'])
            .withMessage("Payment Type should be cash or credit card or Insurance Card "),
        body("totalCost").isNumeric().withMessage("Total cost should be number"),
        body("date").isDate().withMessage("Please Enter Invalid Date"),
        body("doctor").isNumeric().withMessage("Doctor ID should be number"),
        body("Patient").isNumeric().withMessage("Patient ID should be number")
    ]
exports.invoiceUpdate =
    [
        param("id").isInt().withMessage("id Should be integer"),
        body("paymentType").optional().isIn(['cash', 'credit card', ' Insurance Card'])
            .withMessage("Payment Type should be cash or credit card or Insurance Card "),
        body("totalCost").optional().isNumeric().withMessage("Total cost should be number"),
        body("date").optional().isDate().withMessage("Please Enter Invalid Date"),
        body("doctor").optional().isNumeric().withMessage("Doctor ID should be number"),
        body("Patient").optional().isNumeric().withMessage("Patient ID should be number")
    ]
exports.userPost =
    [
        body("fullName").isString().withMessage("Full Name should be string"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isString().withMessage("password is required"),
        body("phone").optional()
            .isMobilePhone('ar-EG')
            .withMessage("phone Should Be a Valid Phone Number")
            .isLength({ min: 10, max: 14, })
            .withMessage("phone length should be between 10 and 14 numbers"),
        body("role").isIn(['doctor', 'employee', 'patient'])
    ]
exports.userUpdate =
    [
        param("id").isInt().withMessage("id Should be integer"),
        body("fullName").optional().isString().withMessage("Full Name should be string"),
        body("email").optional().isEmail().withMessage("Enter a valid email"),
        body("password").optional().isString().withMessage("password is required"),
        body("phone").optional()
            .isMobilePhone('ar-EG')
            .withMessage("phone Should Be a Valid Phone Number")
            .isLength({ min: 10, max: 14, })
            .withMessage("phone length should be between 10 and 14 numbers"),
        body("role").optional().isIn(['doctor', 'employee', 'patient'])
    ]
exports.paramIdInt = param("id").isInt().withMessage("id Should be Integer")
exports.paramisMongoId = param("id").isMongoId().withMessage("id Should be MongoId");