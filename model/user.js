const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    _id: Number,
    fullName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add A valid email']
    },
    password: { type: String, required: true },
    phone: {
        type: String,
        match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, "It is not a valid phone or line number"],
        trim: true,
        required: [true, "Phone Number of the doctor is required"]
    },
    role: {
        type: String, enum: {
            values: ['doctor', 'employee', 'patient'],
            message: 'this not supported'
        }
    }
})

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


Schema.plugin(AutoIncrement, { id: 'user_id_counter', inc_field: '_id' });

mongoose.model("users", Schema)