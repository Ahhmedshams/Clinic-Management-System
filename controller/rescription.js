const { request, response } = require("express");
const mongoose=require("mongoose") ;
require("../model/RescriptionModel") ;  
const rescriptionschema=mongoose.model("Rescription") ;

async function getdataReciption(){
  const data=await rescriptionschema.find().populate('doctor','name age -salsry -_id')
}

exports.getAllrecriptiondata=async (request,response,next)=>{
  let query;
  if(response.doctorID){
    query = rescriptionschema.find({docId:response.doctorID}).populate({path:"PatientName"}).populate({path:"Medicine"})
  }else{
    query=rescriptionschema.find().populate({path:"PatientName"}).populate({path:"Medicine"})
  }
const rescriptions=await query;
response.status(200).json({
  success:true,
  count:rescriptions.length,
  data:rescriptions
})
}

exports.addrecriptiondata = (request, response, next) => {
  let newrecriptiondata=rescriptionschema({
        _id:mongoose.Types.ObjectId(),
        date: request.body.date,
        docId: request.body.docId,
        PatientName: request.body.PatientName,
        Medicine: request.body.Medicine,
        description:request.body.description
  })
  newrecriptiondata.save()
        .then((res) => response.status(201).json(res))
        .catch((err) => next(err));
};



exports.updaterecriptiondata = (request, response, next) => {
  rescriptionschema.updateOne({_id: request.body.id},
    {
        $set: {
            date: request.body.date,
            DocName: request.body.DocName,
            PatientName: request.body.PatientName,
            Medicine: request.body.Medicine
        }
    }).then((res) => response.status(201).json("updated"))
    .catch((err) => next(err));
};

exports.deleterecriptiondata = (request, response, next) => {
  rescriptionschema.findByIdAndRemove({_id:request.body.id})
        .then((res)=> response.status(200).json({message: "deleted"}))
        .catch((err)=> next(err));
};

