const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    // _id: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add A valid email']
    },
    password: { type: String, required: true },
    role: {
        type: String, enum: {
            values: ['doctor', 'employee', 'patient'],
            message: 'this not supported'
        }
    },
    patientRef_id: {
        type: Number,
        ref: 'patient',
        default:0
    },
    employeeRef_id: {
        type: Number,
        ref: 'employee',
        default:0
    },
    doctorsRef_id: {
        type: Number,
        ref: 'doctors',
        default:0
    }
}, { _id: false })


Schema.pre('save', async function (next) {
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


Schema.plugin(AutoIncrement, { id: '_id_counter', inc_field: '_id' });

mongoose.model("users", Schema)