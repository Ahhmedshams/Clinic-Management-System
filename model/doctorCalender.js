const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({
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
        totalWorkingHours:
        {
            type:String
        },
        schedule:{
            type:Array
        },
        doctor:
        { 
            type:Number,
            ref:"doctors",
            required:true
        }
},{_id:false})

schema.plugin(autoIncrement, {id: 'calender_id_counter', inc_field: '_id' });

module.exports = mongoose.model('calender',schema)

