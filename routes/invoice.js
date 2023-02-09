const express = require("express");
const router = express.Router();
const controller = require("./../controller/invoice");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');

const advancedResults = require("./../middlewares/advancedResult");
const allowedUsers = require("./../middlewares/AuthorizeRole");

const invoice = mongoose.model('invoice');


router.route("/invoice")
    .get(allowedUsers.checkWithRole("admin"), advancedResults(invoice), controller.getAllinvoice)
    .post(allowedUsers.checkWithRole("admin", "employee"), expressValidation.invoicePost, validator, controller.addInvoice)
   


router.route("/invoice/:id")
.get(allowedUsers.checkWithRole("admin"),validator,controller.getInvoiceByID)
    
.patch(allowedUsers.checkWithRole("admin", "employee"), expressValidation.invoiceUpdate, validator, controller.updateInvoice)

router.delete("/invoice/:id",
    allowedUsers.checkWithRole("admin"),
    validator, controller.deleteInvoiceByID)


module.exports = router;
