const mongoose = require('mongoose')
const { Schema } = mongoose;
const screenSchema =new Schema({
    screenName:String,
    maxRow:Number,
    maxColumn:Number,
    email:String,
    seatTypes:[],
    seats:[]

})
const Screen =mongoose.model('Screen',screenSchema)
module.exports = Screen
