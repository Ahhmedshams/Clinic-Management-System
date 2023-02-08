const express = require("express");
const router = express.Router();
const controller = require("./../controller/clinic");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');

const advancedResults = require("./../middlewares/advancedResult");
//  require('../model/clinic');
const clinic = mongoose.model('clinic');


router.route("/clinic")
    .get(advancedResults(clinic), controller.getAllclinics)
    .post(expressValidation.clinicPost, validator, controller.addClinic)
    .patch(expressValidation.clinicUpdate, validator, controller.updateClinic)


router.get("/clinic/:id",
    validator,
    controller.getClinicByID)

router.delete("/clinic/:id",
    validator, controller.deleteClinicByID)


module.exports = router;
