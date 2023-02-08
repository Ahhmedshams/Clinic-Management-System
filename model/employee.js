const mongoose=require("mongoose")
 const bcrypt = require("bcrypt");
const schemas = require('./schemas');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    hireDate:{
        type:Date,
        default:new Date().toLocaleDateString("en-US")
    },
    birth_date:{type:Date},
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please add A valid email']
    },
    salary:{type:Number},
    phone:{
        type:String,
        match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"It is not a valid phone or line number"],
        trim: true,
        required:[true,"Phone Number is required"]
        },
    gender:{
        type:String,
        required:true,
        enum :["Male","Female"]
    },
    password:{type:String,required:true},
    clinicId: {
        type: Number,
        ref: "clinic",
      },
    address:schemas.addressSchema
},{_id:false})



employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

employeeSchema.plugin(AutoIncrement, {id: 'employee_id_counter', inc_field:'_id'});

mongoose.model("employee",employeeSchema)