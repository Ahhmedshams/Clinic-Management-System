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
////Edit am pm 

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
  const startAt = moment(request.body.startAt, "hh:mm");
  const endAt = moment(request.body.endAt, "hh:mm");
  const date = moment(request.body.date, "DD-MM-yyyy").format("yyyy-MM-DD");
  const timeDiff = moment.duration(endAt.diff(startAt)).asMinutes();

  console.log( endAt.format("h:mm z" ))
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
        startAt: startAt.format("hh:mm"),
        doctor:  request.doctorId,
        date: date,
    }).then(data=>{
        
        if(data){
            console.log(data)
            next(new Error("Data")); 
        }
    })

    let newCalenderId;
  
    let newCalender = new calender({
    weekday: request.body.weekday,
    startAt: startAt.format("hh:mm"),
    endAt: endAt.format("hh:mm"),
    duration: timeDiff,
    date: date,
    doctor: request.doctorId,
  })
  newCalender.save()
  .then(result1=>{
        newCalenderId =result1._id;
        //response.status(201).json(result)
    //Push the  callender to doctor 
        doctors.findByIdAndUpdate(
            { _id: request.doctorId },
            { $push: { calender: newCalenderId } }
        )
        .then(result=>{
         response.status(201).json(result1)
        })
        .catch(error=>{
            next(new ErrorResponse(error));
        })
    })
.catch(error=>{
    next(new Error (error));
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
