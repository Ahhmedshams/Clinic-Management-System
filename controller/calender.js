const moment = require("moment");
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('./../utils/errorResponse');
const { response } = require("express");
const momentDurationFormatSetup = require("moment-duration-format");
require('./../model/doctorCalender');
require("./../model/doctor");
const calender= mongoose.model('calender');
const doctors= mongoose.model('doctors');
//------------------------------------------------------------TODO
//error status 


// @desc     Get all Calender
// @route    GET /calender
// @access   Public
exports.getCalenders =  (request,response,next)=>{
    response.status(200).json(response.advancedResults);
}


// @desc     Create calender
// @route    POST /calender
// @access   ----
exports.createCalender = async (request,response,next) => {
   
    if (!(request.body.startAt && request.body.endAt && request.body.date)) {
        next(new ErrorResponse("Please Enter a specific time", 422));
    }
    const doctorId = parseInt(request.doctorId);
    const startAt = moment(request.body.startAt, "h:mm a");
    const endAt = moment(request.body.endAt, "h:mm a");
    const date = moment(request.body.date, "yyyy-MM-DD").format("yyyy-MM-DD");
    const totalWorking = moment.duration(endAt.diff(startAt));
    const totalWorkingMinutes = moment.duration(endAt.diff(startAt)).asMinutes();
    let totalWorkingHours = totalWorking.hours() + 'h,' + totalWorking.minutes() + 'm'
   if(totalWorkingMinutes<=0){
    next(new ErrorResponse ("Error in Time YOU SHOULD USE 24h Format"))
   }
    let numDurations = totalWorkingMinutes /30 ;
    let schedule = [];
    let currentTime = startAt;
    
    for (let i = 1; i < numDurations; i++) {
        if(i==1){
            schedule.push(currentTime.format("h:mm a"))
        }else{
            let newAppointment = await moment(currentTime).add(30,"m");
            schedule.push(newAppointment.format("h:mm a"))
            currentTime = newAppointment;
        }
    }

    calender.findOne({
        weekday: request.body.weekday,
        doctor: doctorId,
        date: date,
    }).then(data=>{
        
        if(data){
            next(new Error(" already exist")); 
        }else{
            let newCalenderId;
            let newCalender = new calender({
            date: date,
            startAt: startAt.format("h:mm a"),
            endAt: endAt.format("h:mm a"),
            totalWorkingHours: totalWorkingHours,
            schedule:schedule,
            doctor: doctorId,
          })
          newCalender.save()
          .then(result1=>{
                newCalenderId =result1._id;
            //Push the  callender to doctor 
                doctors.findByIdAndUpdate(
                    { _id: doctorId},
                    { $push: { calender: newCalenderId } }
                )
                .then(result=>{
                 response.status(201).json(result1)
                })
                .catch(error=>{
                    next(new ErrorResponse(error));
                })//end of catch ater save update doctor 
            })
        .catch(error=>{
            next(new Error (error));
        })//end of catch ater save calender


        }
    })

   

}

// @desc     Get single Calender
// @route    GET /calender/:id
// @access   Public
exports.getCalender =(request,response,next)=>{
    calender.findOne({_id:request.params.id})
    .then(data=>{
        if(data!=null){
            response.status(200).json(data);
        }else{
            next(new ErrorResponse(`calender doesn't exist with id of ${request.params.id}`,404))
        }
    })
    .catch(error=>next(new Error))
}

// @desc     delete calender
// @route    DELETE /calender
// @access   ----
exports.deleteCalender =asyncHandler( async (request,response,next)=>{
    let calenderObject;
    const id = parseInt(request.params.id);
    try{
      let  result = await calender.findOneAndDelete({_id:request.params.id})
        calenderObject = await result
        //PULL calender id from doctor
    doctors.findByIdAndUpdate(
        { _id: calenderObject.doctor },
        { $pull: { calender: { $in: [id] } } },
        { new: true },
        (err, doctor) => {
          if (err) {
            response.status(500).send(err);
          }
          if (doctor) {
            response.status(200).json({success:true,messege:"Delete done successfully",doctorCalender:`${doctor.calender}`})
          } else {
            response.status(400).send("Bad request - User not found");
          }
        }
      );
    }
    catch (error){
        throw next(new Error(error))
    }
    
})
