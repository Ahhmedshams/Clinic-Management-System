const mongoose=require("mongoose") ;
const schema=new mongoose.Schema({
    _id:{ type:mongoose.Types.ObjectId,require:true},
    date:{type:Date},
    docId: {type: mongoose.Types.ObjectId, required: true, ref: "doctors"},
    PatientName: {type: String, required: true, ref: "patient"},
    Medicine: {type:Array  ,required:true ,ref: 'Medicine' },
    description:{type:String,required:true}
})
mongoose.model("Rescription",schema) ;///set 