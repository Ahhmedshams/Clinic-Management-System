const mongoose=require("mongoose");
//ToDo Hashing password , ProfileImage , Certificate image or strings

//? full name Schema 
// const nameSchema = new mongoose.Schema({
//     firstName: {
//       type: String,
//       required:true
//     },
//     lastName: {
//       type: String,
//       required:true
//     }
//   });
  
  // nameSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

//? Address Schema
const addressSchema=new mongoose.Schema({
    city:{type:String,required:[true,"City is required"]},
    street:{type:String,required:[true,"Please enter the full address of the doctor,Street!"]},
    building:{type:Number,required:[true,"Please enter the full address of the doctor,Building Number!"]},
})

//? Calender Schema

const CalendarSchema = new mongoose.Schema({
    day:{
        type:String,
        enum:
        [
            "السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة",
            "saturday","sunday","monday","tuesday","wednesday","thurday","friday"
        ]
    },
    date:{
        type:String
    },
    startAt:
    {
        type:String,
        // required:true
    },
    endAt:
    {
        type:String,
        // required:true
    },
    duration:
    {
        type:Number,
    },
    description:
    {
        type:String
    }
  });

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
fullName:{
    type:String,
    required:[true,"Full Name of the doctor is required"]
},
image:{

},
gender:{
    type:String,
    match:/(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say)$/,
    // enum:["m","M","male","Male","f","F","femal","Female","FEMALE","MALE","not prefer to say],
    required:[true,"Gender of the doctor is required"]
},
email:{
    type:String,
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/,"Please enter a valid email"],
    unique: [true,"This email is already exist"],
    trim: true,
    required:true,
},
password: {
    type:String,
    required:true
  },
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
calender:{
    type:CalendarSchema,
    // required:[true,"Calender of the doctor is required"]
},

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
// doctorSchema.pre('save', function(next) {
//     const self = this;
//     mongoose.models.doctors.findOne({ 'FullName.firstName': self.name.firstName, 'name.lastName': self.name.lastName }, function(err, doctor) {
//       if (err) {
//         return next(err);
//       }
//       if (doctor) {
//         return next(new Error(`Doctor with full name "${self.name.firstName} ${self.name.lastName}" already exists`));
//       }
//       return next();
//     });
//   });
mongoose.model("doctors",doctorSchema);