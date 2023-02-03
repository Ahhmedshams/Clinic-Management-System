const mongoose=require("mongoose") ;
const schema=new mongoose.Schema({
    _id:{type:Number,require:true},
    date:{type:Date},
    DocName: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Doctors"},
    PatientName: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Patient"},
    Medicine: {type: mongoose.Schema.Types.ObjectId,required:true ,ref: 'Medicine' }
})
mongoose.model("Rescription",schema) ;///set 