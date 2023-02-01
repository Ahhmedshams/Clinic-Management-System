const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unquie: true },
    email: {
        type: String, required: true, trim: true, lowercase: true, unquie: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location: { type: String, required: true },
    speciality: {
        type: String, enum: {
            values: ['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition'],
            message: 'this Specialization is not supported'
        }
    },
    medicines: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: { type: String, required: [true, "Name is required"] },
            dosage: { type: String, required: [true, "Dosage is required"] },
            form: { type: String, required: [true, "form is required"] },
            Mfd_date: { type: Date, required: [true, "Mfd date is required"] },
            Exp_date: { type: Date, required: [true, "Exp date is required"] },
            description: { type: String, required: [true, "description is required"] },
        }
    ],
    doctors: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type: String, required: [true, "Full name of doctor is required"] },
            gender: {
                type: String, enum: {
                    values: ['male', 'female'],
                    message: 'gender is required'
                }
            },
            email: {
                type: String, required: true, trim: true, lowercase: true, unquie: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            },
            phone: {
                type: String, type: String,
                match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
                required: [true, "phone date is required"]
            },
            calendar: { type: String, required: [true, "Calender of dr is required"] },
            speciality: {
                type: String, enum: {
                    values: ['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition'],
                    message: 'this Specialization not supported'
                }
            },
            certificates: { type: String, required: [true, "certificates should be uploaded"] }
        }
    ],
    employees: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type: String, required: [true, "Full name of doctor is required"] },
            startDate: { type: Date, required: [true, ""] },
            birthDay: { type: Date, required: false },
            email: {
                type: String, required: true, trim: true, lowercase: true, unquie: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            },
            username: { type: String, unique: true, required: true },
            password: { type: String, required: true },
            roles: {
                type: [{
                    type: String,
                    enum: ['user', 'security', 'nurse', 'clean worker']
                }],
                default: ['user']
            },
            salary: { type: Number, min: 2500, max: 8000 },
            phone: {
                type: String, type: String,
                match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
                required: [true, "phone date is required"]
            },
            gender: {
                type: String, enum: {
                    values: ['male', 'female'],
                    message: 'gender is required'
                }
            }
        }
    ]
})
schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
mongoose.model("clinic", schema);