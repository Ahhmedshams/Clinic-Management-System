const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({
        weekday:{
            type:String,
            enum:
            [
                "saturday","sunday","monday","tuesday","wednesday","thurday","friday"
            ],
            required:true
        },
        date:
        {
            type:String
        },
        startAt:
        {
            type:String,
            required:true
        },
        endAt:
        {
            type:String,
            required:true
        },
        duration:
        {
            type:Number,
            enum:[15,30,60]
        },
        doctor:
        {
            
            type:mongoose.Types.ObjectId,
            ref:"doctors",
            required:true
        }
},{_id:false})

schema.plugin(autoIncrement, {id: 'calender_id_counter', inc_field: '_id' });

module.exports = mongoose.model('calender',schema)


// 1   , 1,30 
// 2     ,2,30




// 3,30   2,45 
// 2,45   3 




// id 
// email 
// password 
// role 



// p  doc admin 
// userId { }


