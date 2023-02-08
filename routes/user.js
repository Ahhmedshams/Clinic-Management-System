const express = require("express");
const router = express.Router();
const controller = require("./../controller/user");
const authcontroller = require("./../controller/authController");
const validator = require("./../middlewares/errorValidation");
const expressValidation = require("./../middlewares/validations")
const mongoose = require('mongoose');

const advancedResults = require("./../middlewares/advancedResult");
const user = mongoose.model('users');

router.post('/users/signup', authcontroller.signup);

router.route("/users")
    .get(advancedResults(user), controller.getAllUsers)
//     .post(expressValidation.userPost, validator, controller.addUser)
//     .patch(expressValidation.userUpdate, validator, controller.updateUser)


// router.get("/users/:id",
//     validator,
//     controller.getUserByID)

// router.delete("/users/:id",
//     validator, controller.deleteUserByID)


module.exports = router;
