const mongoose = require('mongoose')
const { Schema } = mongoose;
const showSchema =new Schema({
    email:String,
    date:Date,
    screen:{  
         screenName:String,
        maxRow:Number,
        maxColumn:Number,
        email:String,
        seatTypes:[],
        seats:[
            {
                row:String,
                column:String,
                selected:Boolean,
                seatsType:String,
                booked:{
                    type:Boolean,
                    default:false

                },
                locked:{
                    type:Boolean,
                    default:false
                },
                userEmail:String

            }
        ]},
    showName:String,
    showTime:String,
    movieId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Movie'
    }
})

const Shows=mongoose.model('Show',showSchema)
module.exports = Shows
