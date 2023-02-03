const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({
    _id: Number,
    doctorName: { type: String, required: true, trim: true, lowercase: true ,ref:"doctor"},
    date: { type: String, required: true },
    patientId: {
        type: Number, required: true , ref:'patient'
    },
    description:{
        type:String,
        trim: true,
        maxLength:300,
    },
    isScaned:{ type: Boolean, default: false },
},{_id:false})
schema.plugin(AutoIncrement, { id: 'appointment_id_counter', inc_field: '_id' });
mongoose.model("appointment", schema);