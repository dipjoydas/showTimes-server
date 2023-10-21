const mongoose = require('mongoose')
const { Schema } = mongoose;
const showSchema =new Schema({
    email:String,
    date:Date,
    screen:{},
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
