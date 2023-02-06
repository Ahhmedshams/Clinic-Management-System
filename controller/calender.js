const moment = require("moment");
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('./../utils/errorResponse');
const { response } = require("express");
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
    response.status(200).json(response.advancedResults)
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
    const date = moment(request.body.date, "DD-MM-yyyy").format("yyyy-MM-DD");
    const timeDiff = moment.duration(endAt.diff(startAt)).asMinutes();

  console.log( endAt.format("h:mm a" ))
  console.log(timeDiff)

  //15 اعاده كشف 
  //30 كشف جديد 
  //60 جلسه علاج طبيعي -- لو الدكتور علاج طبيعي 
  if (!( timeDiff === 15 || timeDiff === 30 || timeDiff === 60 )){ 
    next(new ErrorResponse(
        "Error in time period, Please enter the anoter time period" 
        ,403));
    }
    calender.findOne({
        weekday: request.body.weekday,
        startAt: startAt.format("h:mm a"),
        doctor: doctorId,
        date: date,
    }).then(data=>{
        
        if(data){
            next(new Error(" already exist")); 
        }else{


            let newCalenderId;
  
            let newCalender = new calender({
            weekday: request.body.weekday,
            startAt: startAt.format("h:mm a"),
            endAt: endAt.format("h:mm a"),
            duration: timeDiff,
            date: date,
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
        (err, usr) => {
          if (err) {
            response.status(500).send(err);
          }
          if (usr) {
            response.send(usr);
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
