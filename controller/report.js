const express = require('express');
const { mongoose } = require('mongoose');
const createCsvWriter  = require('csv-writer').createObjectCsvWriter;

const controllerApp = require("./../controller/appointment");
const controllerInvo = require("./../controller/invoice");


require("./../model/appointment");
const appointment=mongoose.model("appointment")

let fs = require("fs");

exports.getAllreport = (request, response , next)=>{
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
//report data -- excel
exports.getAppointmentReport=(request,response,next)=>{
    appointment.find()
    .populate({path: "doctorId"})
    .populate({path: "patientId", select : {_id:0 ,appointment:0,prescriptions:0,invoices:0,password:0}})
    .then(data=>{
        const csvWriter=createCsvWriter({
            path: "report.csv",
            header: [
                { id: 'patientId', title: 'patient ID' },
                { id: 'doctorId', title: 'Doctor id' },
                { id: 'time', title: 'time' },
                { id: 'date', title: 'date' },
                // { id: 'address', title: 'address' },
                // { id: 'speciality', title: 'speciality' },
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
    console.log("hello")
    appointment.findOne({ date: request.params.date }, { __v: 0 })
    
    .then(data=>{
        response.status(200).json({
            success:true,
            // count:data.length,
            data:data
        })
    })
    .catch(error=>{

        next(new Error(error));
    })
}

// json report 
const filePath = 'apppointmentReport.json';
  exports.jsonReport=(request,response,next)=>{
    appointment.find()
                    .then((data)=>
                    {
                      const formattedReports = data.map(function(e) {
                        return {
                          appointmentId: e.id,
                          doctorId:e.doctorId,
                          date: e.date,
                          time: e.time,
                          patientId:e.patientId,
                          calenderId:e.calenderId,
                          isScaned:e.isScaned
                        };
                      });
                      fs.writeFile(filePath, JSON.stringify(formattedReports), function(err) {
                        if (err) return console.error(err);
                        response.status(200).json({message:`Data saved to ${filePath}.`,data})
                      });
                    })
                    .catch(err=>next(err))
  }


  exports.dailyJsonReport=(request,response,next)=>{
    appointment.findOne({date:request.params.date},{__v:0})
               .then((data)=>{
                const formattedReports = data.map(function(e){
                    return{
                        appointmentId: e.id,
                        doctorId:e.doctorId,
                        date: e.date,
                        time: e.time,
                        patientId:e.patientId,
                        calenderId:e.calenderId,
                        isScaned:e.isScaned
                    }
                });
                fs.writeFile(filePath, JSON.stringify(formattedReports), function(err) {
                    if (err) return console.error(err);
                    response.status(200).json({message:`Data saved to ${filePath}.`,data})
                  });
               })

  }
