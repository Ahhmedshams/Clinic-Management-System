const mongoose=require("mongoose")
// const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema =new mongoose.Schema({
    _id:{type:Number},
    fullName:{type:String,required:true,maxLength:20},
    hireDate:{type:Date,default:Date.now},
    birth_date:{type:Date},
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please add A valid email']
    },
    userName:{type:String,required:true,maxLength:30,unique:true},
    role:{type:String,required:true,maxLength:10},///roles decided
    salary:{type:Number},
    phone:{type:String,
        match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"It is not a valid phone or line number"],
        trim: true,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum :["Male","Female"]
    },
    password:{type:String,required:true},
    address:schemas.addressSchema
})



employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

employeeSchema.plugin(AutoIncrement, {id: 'employee_id_counter', inc_field:'_id'});

mongoose.model("employee",employeeSchema)