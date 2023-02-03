const mongoose=require('mongoose');
const  autoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");


const MedicineScema = new mongoose.Schema({
    // _id: {type:Number},
    DrugName:{
        type:String,
        required:[true,'Please add a DrugName'],
        trim:true,
        unique:true},
    Dosage:{type:String,required:true},
    description:{type:String,required:true},
    Form:{ 
        type:String,
        required:true,
        enum: ["cap", "susp" , "jugs", "cream", "Eye_Drops" ,"tab"]
    },
    price:{type:Number},
    Mfd_date: { type: Date, default: Date.now },
    Exp_date: { type: Date },
},{_id:false});


MedicineScema.plugin(autoIncrement, {id: 'id_counter', inc_field: '_id' });


module.exports=mongoose.model("Medicine",MedicineScema);
