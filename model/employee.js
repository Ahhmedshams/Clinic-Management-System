const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema =new mongoose.Schema({
    _id:{type:Number},
    fullName:{type:String,required:true,maxLength:20},
    hireDate:{type:Date},
    birth_date:{type:Date},
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please add A valid email']
    },
    userName:{type:String,required:true,maxLength:30,unique:true},
    role:{type:String,required:true,maxLength:10},
    salary:{type:Number},
    phone:{type:String,required:true},
    gender:{
        type:String,
        required:true,
        enum :["Male","Female"]
    },
    password:{type:String,required:true},
    address:schemas.addressSchema
})

employeeSchema.pre('save',async function (next){
    try{
        const salt = await bcrypt.genSalt(12);
        const hasdedPassword = await bcrypt.hash(this.password,salt);
        this.password=hasdedPassword;
        next()
    }
    catch(error){
        next(error);
    }
})

employeeSchema.plugin(AutoIncrement, {id: 'employee_id_counter', inc_field:'_id'});

mongoose.model("employee",employeeSchema)