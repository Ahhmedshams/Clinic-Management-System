const express=require("express")
const doctor=require("./../Model/doctorModel");
const mongoose=require("mongoose");
const { Result } = require("express-validator");
const { request, response } = require("express");
const doctorSchema=mongoose.model("doctors");
const rescriptionschema=mongoose.model("Rescription")


exports.checkID=(request,response,next)=>{
    rescriptionschema.findOne({_id:request.params.id})
    .then(data=>{
      if(data!=null){
        response.doctorID=request.params.id;
        next()
      }
      else
      {
        next(new ErrorResponse(`doctor doesn't exist with id of ${request.params.id}`,404))
      }
    }).catch(error=>{
      next(new Error(error))
  })
  }
  

exports.getAllDoctors=(request,response,next)=>{
    doctorSchema.find({})
                .then((data)=>{
                    response.status(200).json({
                        message:"List of Doctors",data
                    });
                    console.log("params",request.params);
                })
                .catch(error=>{next(error)})
}
 // *-------------------------------------------------------------------------------

exports.addNewDoctor=(request,response,next)=>{
    let newDoctor= new doctorSchema({
        _id: mongoose.Types.ObjectId(),
        fullName:request.body.fullName,
        gender:request.body.gender,
        email:request.body.email,
        password:request.body.password,
        phoneNumber:request.body.phoneNumber,
        address:request.body.address,
        speciality:request.body.speciality,
        yearsOfExperience:request.body.yearsOfExperience,
        calender:request.body.calender,
        certificate:request.body.certificate,
    });
    newDoctor.save()
             .then((result)=>{
                response.status(200).json({message:"Doctor added successfully",result })
             })
      
             .catch(error=>{next(error)})
}
// *-------------------------------------------------------------------------------
exports.updateDoctor=(request,response,next)=>{
       doctorSchema.updateOne(
        {_id:mongoose.Types.ObjectId(request.body.id)},
        {$set:{
            fullName:request.body.fullName,
            gender:request.body.gender,
            email:request.body.email,
            password:request.body.password,
            phoneNumber:request.body.phoneNumber,
            address:request.body.address,
            speciality:request.body.speciality,
            yearsOfExperience:request.body.yearsOfExperience,
            calender:request.body.calender,
            certificate:request.body.certificate,
        }},
        {}
        )
        .then(result=>{
            if(result.matchedCount==0){
                throw new Error("This doctor is not exist");
            }
            else{
                response.status(200).json({message:"Doctor updated successfully"})
            }
        })
        .catch(error=>{next(error)})
}
// *-------------------------------------------------------------------------------
exports.deleteDoctor=(request,response,next)=>{
     doctorSchema.findByIdAndDelete({_id:mongoose.Types.ObjectId(request.body._id)},{})
                  .then(result=>{
                    if(result!=null){response.status(200).json({message:"Doctor deleted successfully "})}
                    else{throw new Error("This doctor in not exist")}
                  })
                  .catch(error=>{next(error)})

}


exports.getDoctorById=(request,response,next)=>{
  doctorSchema.findOne({_id:request.params.id})
  .then(data=>{
    if(data)
            response.status(200).json(data)
            else
            next(new Error("Employee doesn't exist"));
        }).catch(error=>next(error))
}