const {validationResult}=require('express-validator');
const medicineScema= require("./../model/medicineSchemaModel");
const asyncHandler = require('express-async-handler')



exports.getAllMedicines=(request,response,next)=>{
    medicineScema.find({}).then(data=>{

        response.status(200).json(data);
    }).catch(error=>{
        next(error);
    })
}
exports.getMedicineID=(request,response,next)=>{
    const medicineId = request.params._id;
//    console.log(parseInt(medicineId)!=NaN);
//    console.log("number....");
    medicineScema.findById(medicineId).then(data=>{
        response.status(200).json(data);
    }).catch(error=>{
        next(error);
    })
}
exports.getMedicineName=(request,response,next)=>{
    console.log(request.params)
    // name of drug here ......
    
}

exports.addNewMedicine=(request,response,next)=>{
    let errors= validationResult(request);
    console.log(errors);
    if(!errors.isEmpty()){
        let error =new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current +object.msg+" "," ");
        throw error;

    }else{
        let newMedicine = new medicineScema({
            DrugName: request.body.DrugName,
            Dosage:request.body.Dosage,
            description:request.body.description,
            Form:request.body.Form,
            price:request.body.price,
            Mfd_date:request.body.Mfd_date,
            Exp_date:request.body.Exp_date,
        }) ;
        newMedicine.save().then(data=>{

            response.status(201).json({message:"add medicine",data});
        }) .catch(error=>{
            next(error);
        })  
    }
    
    
}
exports.updateMedicineData=(request,response,next)=>{
    let errors= validationResult(request);
    console.log(errors);
    if(!errors.isEmpty()){
        let error =new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current +object.msg+" "," ");
        throw error;

    }else{
        medicineScema.findByIdAndUpdate(request.body.id,{
            $set:{    
                DrugName: request.body.DrugName,
                Dosage:request.body.Dosage,
                description:request.body.description,
                Form:request.body.Form,
                price:request.body.price,
                Mfd_date:request.body.Mfd_date,
                Exp_date:request.body.Exp_date
            }

        }).then(data=>{
            if(data==null){
                throw new Error ('medicine id is not found !!');
            }
            response.status(200).json({message:"update medicine",data});
        }).catch(error=>next(error))
        
    
    } 
}
exports.deleteMedicine=(request,response,next)=>{
    const medicineId = request.params._id;
    medicineScema.findByIdAndDelete(medicineId)
    .then(data=>{
        if(data==null)
        response.status(200).json({message:"delete medicine",id:request.params});
    }).catch(error=>next(error))

}
