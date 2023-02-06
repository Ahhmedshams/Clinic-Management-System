const mongoose=require("mongoose");
//ToDo Hashing password , ProfileImage , Certificate image or strings


//? Address Schema
const addressSchema=new mongoose.Schema({
    city:{type:String,required:[true,"City is required"]},
    street:{type:String,required:[true,"Please enter the full address of the doctor,Street!"]},
    building:{type:Number,required:[true,"Please enter the full address of the doctor,Building Number!"]},
})

//? Calender Schema



  //? Certificate schema

  const CertificateSchema = new mongoose.Schema({
    name:{
      type: String,
    },
    issuedOn:{
      type: Date,
    },
    expiresOn:{
      type: Date,
    },
    certificateNumber: {
      type: String,
    },
    issuingAuthority: {
      type: String,
    }
  });
    
const doctorSchema=new mongoose.Schema({
_id:{
    type:mongoose.Types.ObjectId,
    auto:true,
  },
name:{
  type:String,
  required:[true,'Please add a name'],
  trim:true,
  maxlength:[50,'Name can not be more than 50 characters']
},
gender:{
  type:String,
  match:/(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say)$/,
  required:[true,"Gender of the doctor is required"]
},
age:{
  type:Number
},
email:{
  type:String,
  required:true,
  unique:true,
  match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please add A valid email']
},
password:{type:String,required:true},

phoneNumber:{
    type:String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"It is not a valid phone or line number"],
    trim: true,
    required:[true,"Phone Number of the doctor is required"]
},
address: {
    type:addressSchema
},
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
calender:{type:Array, ref:"calender"},
certificate:{
    type:CertificateSchema
},
//*------------------------
//!ToDo
clinicId:{

},
appointmentId:{

},
})

mongoose.model("doctors",doctorSchema);