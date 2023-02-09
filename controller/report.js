const express = require('express');
const { mongoose } = require('mongoose');
const createCsvWriter  = require('csv-writer').createObjectCsvWriter;

const controllerApp = require("./../controller/appointment");
const controllerInvo = require("./../controller/invoice");


require("./../model/appointment");
const appointment=mongoose.model("appointment")

exports.getAllreport = (request, response , next)=>{
    console.log(2)
    appointment.find()
    .populate({path: "doctorId", select : {_id:0 }})
    .populate({path: "patientId", select : {_id:0 ,appointment:0,prescriptions:0,invoices:0,password:0}})
    .then(data=>{
        response.status(200).json({
            success:true,
            count:data.length,
            data:data
        })
    })
    .catch(error=>{

        next(new Error(error));
    })
}
//excel
exports.getAppointmentReport=(request,response,next)=>{
    appointment.find()
    .populate({path: "doctorId"})
    .populate({path: "patientId", select : {_id:0 ,appointment:0,prescriptions:0,invoices:0,password:0}})
    .then(data=>{
        const csvWriter=createCsvWriter({
            path: "report.csv",
            header: [
                { id: 'doctorId', title: 'Doctor_ID' },
                { id: 'patientId', title: 'Patient_ID' },
                { id: 'date', title: 'Date' },
                { id: 'time', title: 'Time' },
                { id: 'isScaned', title: 'Scaned' },
                { id: 'calenderId', title: 'calenderId' },
                { id: 'duration', title: 'duration' }
            ]
        });
        console.log(data)
        csvWriter.writeRecords(data)
        .then(function () {
            console.log('Report generated successfully!');
            response.download("report.csv",(err)=>{
                if(err){
                    console.log("Error Sending appointments report",err)
                }
             else {
                console.log('Appointments report sent successfully.');
              }
            })
        })
        .catch((err) => {
            console.log('Error generating appointments report.', err);
            response.status(500).send('Error generating appointments report.');
          });
    })
    .catch(error=>{

        next(new Error(error));
    }) 
}


exports.getDailyreport = (request, response , next)=>{
    appointment.findOne({ date: request.params.date }, { __v: 0 })
    .then(data=>{
        response.status(200).json({
            success:true,
            count:data.length,
            data:data
        })
    })
    .catch(error=>{

        next(new Error(error));
    })
}
