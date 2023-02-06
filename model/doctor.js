const mongoose=require("mongoose");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//? full name Schema 
const nameSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required:true
    }
  });
  nameSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

 //? Certificate schema

const doctorSchema=new mongoose.Schema({
name:{
   type:nameSchema,
    required:[true,"Name of the doctor is required"]
},
gender:{
    type:String,
    enum:['Male','Female'],
    required:[true,"Gender of the doctor is required"]
},
email:{
    type:String,
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/,"Please enter a valid email"],
    unique: [true,"This email is already exist"],
    trim: true,
    required:true,
},
phone:{
    type:String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"It is not a valid phone or line number"],
    trim: true,
    required:[true,"Phone Number of the doctor is required"]
},
address:schemas.addressSchema,
speciality:{
    type:String,
    enum:{
        values:["cardiology","dentistry","ear","nose","throat","ENT","nutrition","dermatology"],
        message:"We don't have this speciality"
    },
    trim:true,
},
yearsOfExperience: {
    type: Number,
},
calender:{
    type:Array,
    ref:"calender",
},
clinicId:{
  type:Number,
  ref:"clinic",
},
appointmentId:{
  type:Number,
  ref:"appointment"
},
price:{
type:Number,
},
},{_id:false})
doctorSchema.plugin(AutoIncrement, {id: 'doctor_id_counter', inc_field:'_id'});
mongoose.model("doctors",doctorSchema);