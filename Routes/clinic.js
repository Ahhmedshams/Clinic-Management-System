const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const router = express.Router();
const controller = require("../controller/clinic");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validation")



router.route("/clinic")
    .get(controller.getAllclinics)
    .post(expressValidation.clinicValidation, validator, controller.addClinic)
    .patch(expressValidation.clinicValidation, validator, controller.updateClinic)


router.get("/clinic/:id",
    validator,
    controller.getClinicByID)

router.delete("/clinic/:id",
    validator, controller.deleteClinicByID)


module.exports = router;
