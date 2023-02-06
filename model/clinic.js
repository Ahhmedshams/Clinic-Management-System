const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new mongoose.Schema({
    _id: Number,
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
    medicines: {type:Array, ref:"medicine"},
    doctors: {type:Array, ref:"doctor"},
    employees: {type:Array, ref:"employee"},
    Patient: {type:Array, ref:"patient"}
},{_id:false})
// schema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt)
//     next();
// })
//

 schema.plugin(AutoIncrement, { id: 'clinic_id_counter', inc_field: '_id' });

mongoose.model("clinic", schema);