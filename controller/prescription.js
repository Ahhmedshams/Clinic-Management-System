const express=require("express")
const mongoose=require("mongoose");

require("../model/doctor");
require("../model/prescription") ;  
require('../model/patient');
const patient = mongoose.model('patient');
const doctorSchema = mongoose.model("doctors");
const rescriptionschema = mongoose.model("prescription") ;



exports.getAllrecriptiondata=(request,response,next)=>{
  rescriptionschema.find().populate({
      path: 'docName', select: { fullName:1, gender:1, _id: 0 }
    }).populate({
      path: 'patientName', select: {  name:1,  _id: 0 }
    })
  .then((data)=>{
    response.status(200).json(data) ;
})
.catch(error=> next(error)) ;
}

exports.addrecriptiondata = (request, response, next) => {
doctorSchema.findOne({_id:request.body.id})
patient.findOne({_id:request.body.id})
.then(data=>{
  if (data)
  {
    let newrecriptiondata=rescriptionschema({
      date: request.body.date,
      docName: request.body.docName,
      patientName: request.body.patientName,
      medicine: request.body.medicine
})
newrecriptiondata.save()
      .then((res) => response.status(201).json(res))
      .catch((err) => next(err));
  }
  else{
    next(new Error("not found in doc schema"))
  }
})
 
};




exports.updaterecriptionId = (request, response, next) => {
  rescriptionschema.updateOne({ _id: request.params.id },
      {
          $set: {
            date: request.body.date,
            docName: request.body.docName,
            patientName: request.body.patientName,
            medicine: request.body.medicine
          }
      }).then(result => {
          response.status(201).json(result)
      })
      .catch(error => next(error))
}



exports.getprecriptionByID = (request, response, next) => {
  rescriptionschema.findById(request.params.id)
      .then((data) => {
          response.status(200).json(data)
      })
      .catch(error => next(error))
}


exports.deleteprecriptionByID = (request, response, next) => {
  rescriptionschema.findByIdAndDelete(request.params.id)
      .then((result) => {
          if (result != null) {
              response.status(200).json({ "message": "The recription is deleted" })
          } else {
              throw new Error("This recription is not exist")
          }
      })
      .catch(error => next(error))
}