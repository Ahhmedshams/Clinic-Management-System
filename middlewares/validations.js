const { body, param } = require("express-validator");
//-------------------------Patient-----------------------------//
exports.patientPost = [
    body("name").isString()
        .withMessage("Name Shoud be string"),
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
    body("name").optional()
        .isString()
        .withMessage("Name Shoud be string"),
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
//-------------------------clinic-----------------------------//
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
//-------------------------invoice-----------------------------//   
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
//-------------------------user-----------------------------//
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
    ];

//-------------------------calender-----------------------------//
exports.calenderPost = [
    param("weekday")
        .optional()
        .isString().withMessage("weekday Should be string"),
    param("date")
        .isDate().withMessage("weekday Should be date"),
    param("startAt")
        .isString().withMessage("startAt Should be time"),
    param("endAt")
        .isString().withMessage("endAt Should be time"),
]
exports.calenderUpdate = [
    param("weekday")
        .optional()
        .isString().withMessage("weekday Should be string"),
    param("date")
        .optional()
        .isDate().withMessage("weekday Should be date"),
    param("startAt")
        .optional()
        .isString().withMessage("startAt Should be time"),
    param("endAt")
        .optional()
        .isString().withMessage("endAt Should be time"),
]
//-------------------------appointment-----------------------------//
exports.appointmentPost = [
    param("weekday")
        .optional()
        .isString().withMessage("weekday Should be string"),
    param("doctorName")
        .isString().withMessage("doctorName Should be String"),
    param("startAt")
        .isString().withMessage("startAt Should be time"),
]
exports.appointmentUpdate = [
    param("weekday")
        .optional()
        .isString().withMessage("weekday Should be string"),
    param("doctorName")
        .optional()
        .isString().withMessage("doctorName Should be String"),
    param("startAt")
        .optional()
        .isString().withMessage("startAt Should be time"),
]

//-------------------------employee-----------------------------//

exports.employeePost = [
    body("fullName").isString().withMessage("Name should be string")
        .isLength({ max: 20 }).withMessage("Length of name must be less than 20"),

    body("hireDate").isDate(),
    body("birth_date").optional().isDate().withMessage("Please Enter Valid Date"),
    body("email").isEmail().withMessage("Email Is Not Valid"),

    body("salary").isNumeric().withMessage("Salary should be number"),

    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),

    body("gender").isIn(["Male", "Female"]).withMessage("gender should be Male or Female"),

    body("password").isString().withMessage("password should be string"),
    
    body("clinicId").isNumeric().withMessage("Clinic id should be number"),
    body("address").isObject().withMessage("address should be Object"),
    body("address.city")
        .isString()
        .withMessage("City name must be string"),
    body("address.street")
        .isString()
        .optional()
        .withMessage("Street name must be string"),
    body("address.building")
        .optional()
        .isNumeric()
]

exports.employeeUpdate = [
    body("fullName").isString().optional().withMessage("Name should be string")
        .isLength({ max: 20 }).withMessage("Length of name must be less than 20"),

    body("birth_date").optional().isString().withMessage("Please Enter Valid Date"),

    body("email").isEmail().optional().withMessage("Email Is Not Valid"),

    body("salary").isNumeric().optional().withMessage("Salary should be number"),

    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),

    body("gender").isIn(["Male", "Female"]).optional().withMessage("gender should be Male or Female"),

    body("password").isString().optional().withMessage("password should be string"),
    body("clinicId").isNumeric().withMessage("Clinic id should be number"),
    body("address").isObject().optional().withMessage("address should be Object"),
    body("address.city")
        .isString()
        .withMessage("City name must be string"),
    body("address.street")
        .isString()
        .optional()
        .withMessage("Street name must be string"),
    body("address.building")
        .optional()
        .isNumeric(),
]
//-------------------------doctors-----------------------------//
exports.doctorPost = [
    body("name")
        .isString()
        .withMessage("Name must be string"),
    body("gender")
        .isIn(["male", "female"])
        .withMessage("Gender must be either 'male' or 'female'"),
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),
    body("address.city")
        .isString()
        .withMessage("City name must be string"),
    body("address.street")
        .isString()
        .optional()
        .withMessage("Street name must be string"),
    body("address.building")
        .optional()
        .isNumeric(),
    body("speciality")
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
    body("yearsOfExperience")
        .isNumeric()
        .withMessage("Year of Experience should be number"),
    body("calender").isArray().withMessage("(Calender of the doctor must be array"),
    body("clinicId").isNumeric().withMessage("Clinic id should be number"),
    body("appointmentId").isArray().withMessage("Appointments should be array"),
    body("price").isNumeric().withMessage("Price must be integer")
];

exports.updateDoctor = [
    param("id").isInt().withMessage("Id should be integer"),
    body("name")
        .optional()
        .isString(),
    body("gender")
        .optional()
        .isIn(["Male", "Female"])
        .withMessage("Gender must be either 'male' or 'female'"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email must be valid"),
    body("phone").optional()
        .isMobilePhone('ar-EG')
        .withMessage("phone Should Be a Valid Phone Number")
        .isLength({ min: 10, max: 14, })
        .withMessage("phone length should be between 10 and 14 numbers"),
    body("address.city")
        .optional()
        .isString()
        .withMessage("City name must be string"),
    body("address.street")
        .optional()
        .isString()
        .withMessage("Street name must be string"),
    body("address.building")
        .optional()
        .isNumeric(),
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
    body("calender").optional().isArray().withMessage("(Calender of the doctor must be array"),
    body("clinicId").optional().isNumeric().withMessage("Clinic id should be number"),
    body("appointmentId").optional().isArray().withMessage("Appointments should be array"),
    body("price").optional().isNumeric().withMessage("Price must be integer")
];

exports.medicinePost = [
    // body("_id").isInt({min:1}).withMessage("id should be number..."),
    body("DrugName").isString().withMessage("drug name should be string.....")
        .isLength({ max: 30 }).withMessage("name max length 30 alpha.."),
    body("Dosage").isString().withMessage("Dosage should be string.....")
        .isLength({ min: 3 }).withMessage("Dosage should be with length 6 or more....."),
    body("description").isString().withMessage("description should be string.....")
        .isLength({ min: 6 }).withMessage("description should be with length 6 or more....."),
    body("Form").isIn(["cap", "susp", "jugs", "cream", "Eye_Drops", "tab"]).withMessage("form should be in cap, susp ,jugs, cream, Eye_Drops ,tab..."),
    body("price").isInt({ min: 1 }).withMessage("price should be int....."),
    body("quantity").isInt({ min: 1 }).withMessage("price should be int....."),
    body("Mfd_date").optional().isDate().withMessage("mfd_date should be date....."),
    body("Exp_date").isDate().withMessage("Exp_date should be date.....")
        .isAfter(new Date().toLocaleDateString("en-US").replace(/\//g, "-")).withMessage('Exp-date should be after Today ...'),

];
exports.paramIdInt = param("id").isInt().withMessage("id Should be Integer")
exports.paramisMongoId = param("id").isMongoId().withMessage("id Should be MongoId");