const express = require("express");
const router = express.Router();
const controller = require("./../controller/clinic");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');
const allowedUsers = require("./../middlewares/AuthorizeRole");

const advancedResults = require("./../middlewares/advancedResult");
//  require('../model/clinic');
const clinic = mongoose.model('clinic');



router.route("/clinic")
    .get(allowedUsers.checkWithRole("admin"), advancedResults(clinic), controller.getAllclinics)
    .post(allowedUsers.checkWithRole("admin"), expressValidation.clinicPost, validator, controller.addClinic)

router.route("/clinic/:id")
    .get(allowedUsers.checkWithRole("admin"), validator, controller.getClinicByID)
    .delete(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.getClinicByID)
    .patch(allowedUsers.checkWithRole("admin"), expressValidation.patientUpdate, validator, controller.updateClinic)

router.route("/clinic/:id/doctor")
    .get(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.getDoctors)
    .post(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.pushDoctors)
    .delete(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.deleteDoctor)

router.route("/clinic/:id/medicien")
    .get(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.getMedicien)
    .post(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.pushMedicien)
    .delete(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.deleteMedicien)

router.route("/clinic/:id/employee")
    .get(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.getEmployees)
    .post(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.pushEmployee)
    .delete(allowedUsers.checkWithRole("admin"), expressValidation.paramIdInt, validator, controller.deleteEmployee)

module.exports = router;

