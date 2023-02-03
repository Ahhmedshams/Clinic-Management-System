const mongoose = require('mongoose');
const ErrorResponse = require('./../utils/errorResponse')

require('./../model/appointment');

const appointment = mongoose.model('appointment');



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

// @desc     Create Appointment
// @route    POST /:patientID/appointment
// @access   ----
exports.createAppointment =(request,response,next)=>{
    // console.log(response.patientId)
    let newAppointment = new appointment({
        doctorName: request.body.doctorName,
        date:request.body.date,
        patientId:response.patientId
    })
    newAppointment.save()
    .then(result=>{
        response.status(201).json(result)
    })
    .catch(error=>{
        next(new ErrorResponse(error));
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