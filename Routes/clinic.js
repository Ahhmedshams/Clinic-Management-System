const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("../controller/clinic");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validation")

const router = express.Router();


router.route("/clinic")
    .get(controller.getAllclinics)
    .post(expressValidation.clinicValidation, validator, controller.addClinic)
    .patch(expressValidation.clinicValidation, validator, controller.updateClinic)


router.get("/clinic/:id",
    param("id").isIn().withMessage("id should be integr"),
    validator,
    controller.getClinicByID)

router.delete("/clinic/:id",
    validator, controller.deleteClinicByID)


module.exports = router;
