const mongoose = require('mongoose')
const {Schema,model } = mongoose
const TempoTicketSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
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
const TempoTickets = model('TempoTicket',TempoTicketSchema)
TempoTickets.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds:120 })
module.exports = TempoTickets