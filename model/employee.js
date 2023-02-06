const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema = new mongoose.Schema({
    _id: { type: Number },
    hireDate: { type: Date },
    birth_date: { type: Date },
    salary: { type: Number },
    user: {
        type: Number,
        ref: 'users'
    }
})

employeeSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hasdedPassword = await bcrypt.hash(this.password, salt);
        this.password = hasdedPassword;
        next()
    }
    catch (error) {
        next(error);
    }
})

employeeSchema.plugin(AutoIncrement, { id: 'employee_id_counter', inc_field: '_id' });

mongoose.model("employee", employeeSchema)