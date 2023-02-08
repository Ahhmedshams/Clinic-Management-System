const mongoose=require("mongoose") ;
const autoIncrement = require('mongoose-sequence')(mongoose);
const schema=new mongoose.Schema({
    _id:{type:Number},
    date:{type:Date},
    docName: {type:Number, required: true, ref: "doctors"},
    patientName: {type: Number, required: true, ref: "patient"},
    medicine: {type: Array,required:true ,ref: 'Medicine' }
})
schema.plugin(autoIncrement, { id: 'prescription_id_counter', inc_field: '_id' });
mongoose.model("prescription",schema) ;///set 


// .populate({
//   path: 'doctorName', select: { firstName: 1, lastName: 1, phone: 1, _id: 0 }
// })