const {body,param}=require("express-validator");

exports.patientPost=[
    body("fName").isAlpha()
        .withMessage("fName Shoud be string"),
    body("lName").isAlpha()
        .withMessage("lName Shoud be string"),
    body("gender").isIn(["Female","Male"])
        .withMessage("Gender Shoud be One Of ('Female','Male')"),
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
exports.patientUpdate=[
    param("id").isInt().withMessage("id Should be integer"),
    body("fName").optional().isAlpha()
        .withMessage("fName Shoud be string"),
    body("lName").optional().isAlpha()
        .withMessage("lName Shoud be string"),
    body("gender").optional().isIn(["Female","Male"])
        .withMessage("Gender Shoud be One Of ('Female','Male')"),
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


exports.employeePost=[
    body("fullName").isString().withMessage("Name should be string")
    .isLength({ max: 20 }).withMessage("Length of name must be less than 20"),

    body("birth_date").isString().withMessage("Please Enter Valid Date"),

    body("email").isEmail().withMessage("Email Is Not Valid"),
    body("userName").isString().withMessage("userName should be string"),

    body("role").isString().withMessage("role should be string")
    .isLength({ max: 10 }).withMessage("Length of name must be less than 10"),

    body("salary").isNumeric().withMessage("Salary should be number"),
    
    body("phone").optional()
    .isMobilePhone('ar-EG')
    .withMessage("phone Should Be a Valid Phone Number")
    .isLength({ min: 10, max: 14, })
    .withMessage("phone length should be between 10 and 14 numbers"),

    body("gender").isIn(["Male","Female"]).withMessage("gender should be Male or Female"),
    
    body("password").isString().withMessage("password should be string"),

    body("address").isObject().withMessage("address should be Object"),
    body("address.city").isString().withMessage("city must be string"),
    body("address.street").isInt().withMessage("street should be integer"),
    body("address.building").isInt().withMessage("building should be integer")
]

exports.employeeUpdate=[
    body("fullName").isString().optional().withMessage("Name should be string")
    .isLength({ max: 20 }).withMessage("Length of name must be less than 20"),

    body("birth_date").optional().isString().withMessage("Please Enter Valid Date"),

    body("email").isEmail().optional().withMessage("Email Is Not Valid"),
    body("userName").isString().optional().withMessage("userName should be string"),

    body("role").isString().optional().withMessage("role should be string")
    .isLength({ max: 10 }).withMessage("Length of name must be less than 10"),

    body("salary").isNumeric().optional().withMessage("Salary should be number"),
    
    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),

    body("gender").isIn(["Male","Female"]).optional().withMessage("gender should be Male or Female"),
    
    body("password").isString().optional().withMessage("password should be string"),

    body("address").isObject().optional().withMessage("address should be Object"),
    body("address.city").optional().isString().withMessage("city must be string"),
    body("address.street").isInt().optional().withMessage("street should be integer"),
    body("address.building").isInt().optional().withMessage("building should be integer")
]

exports.paramIdInt=param("id").isInt().withMessage("id Should be Integer")
exports.paramisMongoId=param("id").isMongoId().withMessage("id Should be MongoId");