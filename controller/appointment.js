var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')

require('./../model/appointment');
require('./../model/doctorCalender');
require("./../model/doctor")
require("./../model/patient")
const calender= mongoose.model('calender');
const doctors= mongoose.model('doctors');
const appointment = mongoose.model('appointment');
const patient= mongoose.model('patient');

// @desc     Create Appointment
// @route    POST /:patientID/appointment
// @access   ----
exports.createAppointment = asyncHandler( async (request,response,next)=>{
    let doctorObject;
    let query;
    if (!(request.body.startAt && request.body.endAt && request.body.date)) {
        next(new ErrorResponse("Please Enter a specific time", 422));
    }

  const startAt = moment(request.body.startAt, "h:mm a");
  const endAt = moment(request.body.endAt, "h:mm a");
  const date = moment(request.body.date, "DD-MM-yyyy").format("yyyy-MM-DD");
  const timeDiff = moment.duration(endAt.diff(startAt)).asMinutes();

  console.log(timeDiff)
  //15 اعاده كشف 
  //30 كشف جديد 
  if (!( timeDiff === 15 || timeDiff === 30 || timeDiff === 60 )){ 
    next(new ErrorResponse(
        "Error in time period, Please enter the anoter time period" 
        ,403));
    }
    query= doctors.findOne({name:request.body.doctorName})
    .then(data=>{
        if(data.length==0){
            next(new ErrorResponse('Wrong Doctor Name'))
        }
         doctorObject=data;
         
        
    }).catch(error=>{
        next(new Error(error))
    }).then(data=>{
        
        
        calender.findOne({
            weekday: request.body.weekday,
            startAt: startAt.format("h:mm a"),
            endAt: endAt.format("h:mm a"),
            doctor:  doctorObject._id,
            date: date,
        }).then(data=>{
            console.log(data)
            if(data){
                let newAppointment = new appointment({
                    doctorName: request.body.doctorName,
                    date:date,
                    patientId:response.patientId,
                    calenderId:data._id
                })
                newAppointment.save()
                .then(result=>{
                    // push appointment in doctor and patient
                    doctors.findByIdAndUpdate(
                        { _id: doctorObject._id},
                        { $push: { appointmentId: result._id } }
                    )
                    .catch(error=>{
                        next(new ErrorResponse(error));
                    })//end of catch ater save update doctor 

                    patient.findByIdAndUpdate(
                        { _id: response.patientId},
                        { $push: { appointment: result._id } }
                    )
                    .catch(error=>{
                        next(new ErrorResponse(error));
                    })//end of catch ater save update patient
                    
                    response.status(201).json(result)
                })
                .catch(error=>{
                    next(new ErrorResponse(error));
                })
            }
            else{
                next(new ErrorResponse(`this doctor is not available in this time`));
            }
        }).catch(error=>{
            next(new ErrorResponse(error));
        })

    })
   
  

    
   
   
}) 

// @desc     GET all or/ Get single Appointment
// @route    GET /appointment/:id
// @access   Public
exports.getAppointment = async (request,response,next)=>{
    
    let query ;
    if(response.patientId){
        query = appointment.find({patientId: response.patientId})
    }else{
        query = appointment.find();
    }
    const appointments= await query;
    response.status(200).json({
        success:true,
        count:appointments.length,
        data:appointments
    })
    
}

// @desc     Update Appointment
// @route    PATCH /appointment/:id
// @access   ----
exports.updateAppointment =(request,response,next)=>{
    if(Object.keys(request.body).length === 0){
        next(new ErrorResponse("Empty data",400))
    }
    patient.updateOne({
        _id:request.params.id
    },{
        $set:{
            doctorName: request.body.doctorName,
            date:request.body.date,
            age:request.body.age,
            PatientId:request.body.PatientId
        }
    }).then(data=>{
        if(data.matchedCount==0){
            next(new ErrorResponse("Not found any id match with ("+request.params.id+") ",404))
        }else{

            if(data.modifiedCount==0){
                next(new ErrorResponse("No changes happen",400))
            }else{
                response.status(201).json({success:true,message:"Update patient"})
            }
            
        }
    })
}

// @desc     Delete Appointment
// @route    DELETE /appointment/:id
// @access   ----
exports.deleteAppointment =(request,response,next)=>{
    appointment.deleteOne({_id:request.params.id})
    .then(data=>{
        if(data.deletedCount==0){
            next(new ErrorResponse("Not found any id match with ("+request.params.id+") ",404))
        }else{
            response.status(200).json({success:true,messege:"Delete done successfully"})
            
        }
    }).catch(error=>next(new ErrorResponse()))
}