const mongoose=require('mongoose');
const  autoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");


const MedicineScema = new mongoose.Schema({
    // _id: {type:Number},
  
    // image:{type:String,required:true},
    DrugName:{
        type:String,
        required:[true,'Please add a DrugName'],
        trim:true,
        // unique:true
    },
    Dosage:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true},
    Form:{ 
        type:String,
        required:[true,'Please add a form in "cap", "susp" , "jugs", "cream", "Eye_Drops" ,"tab"'],
        enum: ["cap", "susp" , "jugs", "cream", "Eye_Drops" ,"tab"]
    },
    price:{
        type:Number,
        required:[true,'Please add a price']
     },
    quantity:{
        type:Number,
        required:[true,'Please add a quantity']
     },
    
    Mfd_date: {
         type: Date, 
        //  required:[true,'Please add a  mfd_date']
         default:new Date().toLocaleDateString("en-US")
         },
    Exp_date: { 
        type: Date ,
        required:[true,'Please add a  Exp_date']
},
},{_id:false});


MedicineScema.plugin(autoIncrement, {id: 'id_counter', inc_field: '_id' });


module.exports=mongoose.model("medicine",MedicineScema);
