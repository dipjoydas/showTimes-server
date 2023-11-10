const mongoose = require('mongoose')
const {Schema,model ,ObjectId} = mongoose
const ticketSchema = new Schema({
    _id:ObjectId ,
    name:String,
    email:String ,
    price:Number ,

    tickets:[
        {}
    ],
    timestamp: {
        type:Date,
        default:Date.now
    }
    

})
// tempoOrdersSchema.cle
const Tickets = model('Ticket',ticketSchema)
module.exports = Tickets