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


router.route("/clinic/:id")
router.get(
    expressValidation.paramIdInt,
    validator,
    controller.getClinicByID)

router.delete(expressValidation.paramIdInt, validator, controller.deleteClinicByID)

router.route("/clinic/:id/medicien")
.get(expressValidation.paramIdInt, validator, controller.getAllclinics)
.post(expressValidation.paramIdInt, validator, controller.pushMedicien)
.delete(expressValidation.paramIdInt, validator, controller.deleteMedicien)


module.exports = router;
